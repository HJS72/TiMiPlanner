const express = require("express");
const path = require("path");
const http = require("http");
const https = require("https");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 5500;
const dbPath = path.join(__dirname, "timiplanner.db");
const db = new sqlite3.Database(dbPath);
let syncTimer = null;
let syncPromise = null;
let scheduledIntervalMinutes = null;

app.use(express.json({ limit: "100kb" }));
app.use(express.static(path.join(__dirname)));

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS app_state (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      data TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

function dbGetState() {
  return new Promise((resolve, reject) => {
    db.get("SELECT data, updated_at FROM app_state WHERE id = 1", (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (!row) {
        resolve({ data: null, updatedAt: null });
        return;
      }

      try {
        resolve({ data: JSON.parse(row.data), updatedAt: row.updated_at || null });
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

function dbSaveState(value) {
  return new Promise((resolve, reject) => {
    const json = JSON.stringify(value);
    db.run(
      `
        INSERT INTO app_state (id, data, updated_at)
        VALUES (1, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(id) DO UPDATE SET
          data = excluded.data,
          updated_at = CURRENT_TIMESTAMP
      `,
      [json],
      (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      }
    );
  });
}

function ensureDefaultUsersInState(state) {
  const next = state && typeof state === "object" ? { ...state } : {};
  const rawUsers = Array.isArray(next.users) ? [...next.users] : [];
  const users = [];
  const seenUserIds = new Set();

  rawUsers.forEach((user) => {
    if (!user || typeof user !== "object") return;
    const key = typeof user.id === "string" && user.id ? user.id : `${user.role || "user"}:${user.username || ""}`;
    if (seenUserIds.has(key)) return;
    seenUserIds.add(key);
    users.push(user);
  });

  const hasParent = users.some((user) => user && user.role === "parent");
  const hasChild = users.some((user) => user && user.role === "child");

  if (!hasParent) {
    users.push({
      id: "parent-1",
      username: "parent",
      password: "parent",
      role: "parent",
      name: "Parent",
      locale: "en",
    });
  }

  if (!hasChild) {
    users.push({
      id: "child-1",
      username: "lina",
      password: "lina",
      role: "child",
      name: "Lina",
      locale: "en",
      color: "#3ba3d9",
      avatar: "L",
      webcalUrl: "",
      webcalEnabled: true,
    });
  }

  next.users = users;
  if (!Array.isArray(next.tasks)) next.tasks = [];
  if (!next.sessions || typeof next.sessions !== "object") next.sessions = {};
  if (!next.calendarSync || typeof next.calendarSync !== "object") {
    next.calendarSync = { intervalMinutes: 60 };
  }

  if (!Object.prototype.hasOwnProperty.call(next.calendarSync, "commonUrl")) next.calendarSync.commonUrl = "";
  if (!Object.prototype.hasOwnProperty.call(next.calendarSync, "commonEnabled")) next.calendarSync.commonEnabled = true;
  if (!Object.prototype.hasOwnProperty.call(next.calendarSync, "lastSyncedAt")) next.calendarSync.lastSyncedAt = null;
  if (!Object.prototype.hasOwnProperty.call(next.calendarSync, "lastCount")) next.calendarSync.lastCount = 0;
  if (!Object.prototype.hasOwnProperty.call(next.calendarSync, "lastError")) next.calendarSync.lastError = "";
  if (!Object.prototype.hasOwnProperty.call(next.calendarSync, "sourceCount")) next.calendarSync.sourceCount = 0;

  next.tasks = Array.isArray(next.tasks) ? next.tasks : [];
  next.tasks = next.tasks.map((task) => {
    if (!task || typeof task !== "object") return task;
    const normalizedDuration = normalizeTaskDurationMinutes(task.durationMinutes, 30);
    return { ...task, durationMinutes: normalizedDuration };
  });

  return next;
}

function normalizeTaskDurationMinutes(value, fallback = 30) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return Math.max(15, fallback);
  const roundedToQuarter = Math.round(parsed / 15) * 15;
  return Math.max(15, roundedToQuarter);
}

function getNow() {
  return new Date();
}

function getFutureCutoffMonths(months = 3) {
  const d = getNow();
  d.setMonth(d.getMonth() + months);
  return d;
}

function getPastCutoffMonths(months = 3) {
  const d = getNow();
  d.setMonth(d.getMonth() - months);
  return d;
}

function cleanupTasksOlderThanThreeMonths(tasks) {
  const cutoff = getPastCutoffMonths(3);
  return (Array.isArray(tasks) ? tasks : []).filter((task) => {
    if (!task || !task.dueDate) return true;
    const due = new Date(task.dueDate);
    if (Number.isNaN(due.getTime())) return true;
    return due >= cutoff;
  });
}

function parseICalDate(value) {
  if (!value) return null;

  if (/^\d{8}$/.test(value)) {
    const y = value.slice(0, 4);
    const m = value.slice(4, 6);
    const d = value.slice(6, 8);
    return new Date(`${y}-${m}-${d}T00:00:00`);
  }

  if (/^\d{8}T\d{6}Z$/.test(value)) {
    const iso = value.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, "$1-$2-$3T$4:$5:$6Z");
    return new Date(iso);
  }

  if (/^\d{8}T\d{6}$/.test(value)) {
    const iso = value.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:$6");
    return new Date(iso);
  }

  return new Date(value);
}

function parseICal(icsText) {
  const lines = String(icsText || "").split(/\r?\n/);
  const events = [];
  let current = null;

  function finalizeEvent() {
    if (!current || !current.start) {
      current = null;
      return;
    }

    const start = new Date(current.start);
    const end = current.end ? new Date(current.end) : null;
    if (!Number.isNaN(start.getTime())) {
      events.push({
        start,
        end: end && !Number.isNaN(end.getTime()) ? end : null,
        summary: current.summary || "",
        description: current.description || "",
      });
    }
    current = null;
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith("BEGIN:VEVENT")) {
      current = {};
      continue;
    }
    if (line.startsWith("END:VEVENT")) {
      finalizeEvent();
      continue;
    }
    if (!current) continue;

    if (line.startsWith("DTSTART")) current.start = parseICalDate(line.split(":").slice(1).join(":"));
    if (line.startsWith("DTEND")) current.end = parseICalDate(line.split(":").slice(1).join(":"));
    if (line.startsWith("SUMMARY:")) current.summary = line.replace("SUMMARY:", "");
    if (line.startsWith("DESCRIPTION:")) current.description = line.replace("DESCRIPTION:", "");
  }

  return events;
}

function getSyncIntervalMinutes(state) {
  const raw = Number(state && state.calendarSync && state.calendarSync.intervalMinutes);
  if (!Number.isFinite(raw)) return 60;
  return Math.max(5, Math.round(raw));
}

async function runWebcalSyncAndCleanup() {
  if (syncPromise) return syncPromise;

  syncPromise = (async () => {
    const { data } = await dbGetState();
    const state = ensureDefaultUsersInState(data || {});
    state.tasks = cleanupTasksOlderThanThreeMonths(state.tasks);

    const now = getNow();
    const futureCutoff = getFutureCutoffMonths(3);
    const childUsers = (state.users || []).filter((u) => u && u.role === "child");
    const commonEnabled = !state.calendarSync || state.calendarSync.commonEnabled !== false;
    const commonUrl = commonEnabled ? normalizeWebcalUrl(state.calendarSync && state.calendarSync.commonUrl) : "";

    const imported = [];
    const seen = new Set();
    const syncErrors = [];
    let hadError = false;

    let sourceCount = 0;
    childUsers.forEach((child) => {
      if (child.webcalEnabled !== false && normalizeWebcalUrl(child.webcalUrl || "")) sourceCount += 1;
    });
    if (commonUrl) sourceCount += 1;

    for (const child of childUsers) {
      const childUrl = child.webcalEnabled !== false ? normalizeWebcalUrl(child.webcalUrl || "") : "";
      const sourceUrls = [];
      if (childUrl) sourceUrls.push(childUrl);
      if (commonUrl) sourceUrls.push(commonUrl);

      for (const sourceUrl of sourceUrls) {
        try {
          const icsText = await fetchText(sourceUrl);
          const events = parseICal(icsText);
          events.forEach((ev) => {
            if (!ev.start || Number.isNaN(ev.start.getTime())) return;
            if (ev.start < now || ev.start > futureCutoff) return;

            const dedupeKey = `${child.id}|${ev.start.toISOString()}|${ev.summary || ""}|${sourceUrl}`;
            if (seen.has(dedupeKey)) return;
            seen.add(dedupeKey);

            const durationRaw = ev.end && ev.start ? Math.round((ev.end.getTime() - ev.start.getTime()) / 60000) : 30;
            imported.push({
              id: `webcal-${child.id}-${Buffer.from(dedupeKey).toString("base64").replace(/[^a-zA-Z0-9]/g, "").slice(0, 24)}`,
              title: ev.summary || "Imported event",
              description: ev.description || "",
              assignedTo: child.id,
              createdBy: "webcal",
              dueDate: ev.start.toISOString(),
              durationMinutes: normalizeTaskDurationMinutes(Math.max(15, durationRaw), 30),
              recurrence: "",
              type: "imported-webcal",
              isReadonly: true,
            });
          });
        } catch (error) {
          hadError = true;
          syncErrors.push(`${sourceUrl}: ${error && error.message ? error.message : "Unknown error"}`);
        }
      }
    }

    state.tasks = (state.tasks || []).filter((task) => task.type !== "imported-webcal");
    state.tasks.push(...imported);

    if (!state.calendarSync || typeof state.calendarSync !== "object") {
      state.calendarSync = { intervalMinutes: 60, commonUrl: "", commonEnabled: true, lastSyncedAt: null, lastCount: 0, lastError: "", sourceCount: 0 };
    }
    state.calendarSync.lastSyncedAt = new Date().toISOString();
    state.calendarSync.lastCount = imported.length;
    state.calendarSync.sourceCount = sourceCount;
    state.calendarSync.lastError = syncErrors.length > 0 ? syncErrors[0] : "";

    await dbSaveState(state);
    return { count: imported.length, hadError, sourceCount };
  })();

  try {
    return await syncPromise;
  } finally {
    syncPromise = null;
  }
}

async function scheduleWebcalSyncFromState() {
  const { data } = await dbGetState();
  const state = ensureDefaultUsersInState(data || {});
  const intervalMinutes = getSyncIntervalMinutes(state);

  if (syncTimer && scheduledIntervalMinutes === intervalMinutes) {
    return;
  }

  if (syncTimer) {
    clearInterval(syncTimer);
    syncTimer = null;
  }

  scheduledIntervalMinutes = intervalMinutes;
  syncTimer = setInterval(() => {
    runWebcalSyncAndCleanup().catch((error) => {
      console.error("Scheduled webcal sync failed", error);
    });
  }, intervalMinutes * 60 * 1000);
}

async function ensureDatabaseSeeded() {
  const current = await dbGetState();

  if (!current.data) {
    await dbSaveState(
      ensureDefaultUsersInState({
        users: [],
        tasks: [],
        sessions: {},
        calendarSync: { intervalMinutes: 60 },
      })
    );
    return;
  }

  const repaired = ensureDefaultUsersInState(current.data);
  const before = JSON.stringify(current.data);
  const after = JSON.stringify(repaired);

  if (before !== after) {
    await dbSaveState(repaired);
  }
}

function normalizeWebcalUrl(value) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";

  if (/^webcal:\/\//i.test(trimmed)) {
    return trimmed.replace(/^webcal:\/\//i, "https://");
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return "";
}

function fetchText(url, redirectsLeft = 5) {
  return new Promise((resolve, reject) => {
    let parsed;
    try {
      parsed = new URL(url);
    } catch (error) {
      reject(new Error("Invalid URL"));
      return;
    }

    const transport = parsed.protocol === "https:" ? https : parsed.protocol === "http:" ? http : null;
    if (!transport) {
      reject(new Error("Unsupported protocol"));
      return;
    }

    const requestOptions = {
      method: "GET",
      hostname: parsed.hostname,
      port: parsed.port || undefined,
      path: `${parsed.pathname}${parsed.search}`,
      headers: {
        "User-Agent": "TiMiPlanner-Webcal/1.0",
        Accept: "text/calendar,text/plain,*/*",
      },
    };

    if (parsed.protocol === "https:") {
      // Some enterprise/self-hosted calendar endpoints use self-signed certs.
      // Disable certificate verification for this backend proxy request.
      requestOptions.rejectUnauthorized = false;
    }

    const req = transport.request(
      requestOptions,
      (res) => {
        const statusCode = res.statusCode || 0;

        if ([301, 302, 307, 308].includes(statusCode) && res.headers.location) {
          if (redirectsLeft <= 0) {
            reject(new Error("Too many redirects"));
            return;
          }

          const redirectedUrl = new URL(res.headers.location, parsed).toString();
          res.resume();
          fetchText(redirectedUrl, redirectsLeft - 1).then(resolve).catch(reject);
          return;
        }

        if (statusCode < 200 || statusCode >= 300) {
          res.resume();
          reject(new Error(`Remote responded with status ${statusCode}`));
          return;
        }

        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          resolve(Buffer.concat(chunks).toString("utf8"));
        });
      }
    );

    req.on("error", (error) => {
      reject(error);
    });

    req.setTimeout(15000, () => {
      req.destroy(new Error("Request timeout"));
    });

    req.end();
  });
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/state", async (_req, res) => {
  try {
    const state = await dbGetState();
    const normalized = ensureDefaultUsersInState(state.data || {});

    if (!state.data || JSON.stringify(state.data) !== JSON.stringify(normalized)) {
      await dbSaveState(normalized);
      const saved = await dbGetState();
      res.json({ ok: true, ...saved });
      return;
    }

    res.json({ ok: true, ...state });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message || "Failed to load state." });
  }
});

app.put("/api/state", async (req, res) => {
  const value = req.body && req.body.data;
  if (!value || typeof value !== "object") {
    res.status(400).json({ ok: false, error: "Body must include a data object." });
    return;
  }

  try {
    const normalized = ensureDefaultUsersInState(value);
    normalized.tasks = cleanupTasksOlderThanThreeMonths(normalized.tasks);
    await dbSaveState(normalized);
    await scheduleWebcalSyncFromState();
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message || "Failed to save state." });
  }
});

app.post("/api/sync/run", async (_req, res) => {
  try {
    const result = await runWebcalSyncAndCleanup();
    res.json({ ok: true, ...result });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message || "Failed to run sync." });
  }
});

app.post("/api/webcal/fetch", async (req, res) => {
  const normalizedUrl = normalizeWebcalUrl(req.body && req.body.url);
  if (!normalizedUrl) {
    res.status(400).json({ ok: false, error: "Please provide a valid webcal/http(s) URL." });
    return;
  }

  try {
    const text = await fetchText(normalizedUrl);
    const hasCalendarMarker = text.includes("BEGIN:VCALENDAR");

    res.json({
      ok: true,
      url: normalizedUrl,
      hasCalendarMarker,
      text,
    });
  } catch (error) {
    res.status(502).json({
      ok: false,
      error: error && error.message ? error.message : "Unable to fetch calendar source.",
    });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

ensureDatabaseSeeded()
  .then(() => {
    return runWebcalSyncAndCleanup()
      .catch((error) => {
        console.error("Initial webcal sync failed", error);
      })
      .then(() => scheduleWebcalSyncFromState());
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`TiMiPlanner server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database seed", error);
    process.exit(1);
  });
