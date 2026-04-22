const express = require("express");
const fs = require("fs");
const os = require("os");
const path = require("path");
const http = require("http");
const https = require("https");
const { spawn } = require("child_process");
const multer = require("multer");
const sqlite3 = require("sqlite3").verbose();
const packageJson = require("./package.json");

const app = express();
const PORT = process.env.PORT || 5500;
const dbPath = path.join(__dirname, "timiplanner.db");
const db = new sqlite3.Database(dbPath);
let syncTimer = null;
let syncPromise = null;
let scheduledIntervalMinutes = null;
const UPDATER_CONFIG_PATH = path.join(__dirname, "updater-config.json");
const UPDATER_STATUS_PATH = path.join(__dirname, "updater-status.json");
const UPDATES_TEMP_ROOT = path.join(os.tmpdir(), "timiplanner-updates");

fs.mkdirSync(UPDATES_TEMP_ROOT, { recursive: true });

const upload = multer({
  dest: UPDATES_TEMP_ROOT,
  limits: {
    fileSize: 200 * 1024 * 1024,
  },
});

function formatBuildVersion(date = new Date()) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `0.${month}${day}.${hours}${minutes}`;
}

const BUILD_VERSION = formatBuildVersion();
const APP_VERSION = typeof packageJson.version === "string" && packageJson.version
  ? packageJson.version
  : BUILD_VERSION;
const DEFAULT_UPDATER_CONFIG = Object.freeze({
  repositoryUrl: "https://github.com/HJS72/TiMiPlanner",
  owner: "HJS72",
  repo: "TiMiPlanner",
  restartCommand: "",
  preservePaths: [
    "timiplanner.db",
    "timiplanner.db-shm",
    "timiplanner.db-wal",
    "updater-config.json",
    "updater-status.json",
  ],
});

const DEFAULT_APP_STATE = {
  "locale": "en",
  "users": [
    {
      "id": "parent-1",
      "username": "parent",
      "password": "parent",
      "role": "parent",
      "name": "Parent",
      "locale": "de"
    },
    {
      "id": "child-1",
      "username": "lina",
      "password": "lina",
      "role": "child",
      "name": "Lina",
      "locale": "de",
      "color": "#ffc7c7",
      "avatar": "L",
      "webcalUrl": "",
      "webcalEnabled": true
    },
    {
      "id": "child-2",
      "username": "max",
      "password": "max",
      "role": "child",
      "name": "Max",
      "locale": "en",
      "color": "#94cbff",
      "avatar": "M",
      "webcalUrl": "",
      "webcalEnabled": true
    }
  ],
  "sessions": {},
  "tasks": [
    {
      "id": "task-62d79662d3ad719db405ccdc",
      "title": "Flöte üben",
      "description": "15 min. Flöte üben",
      "assignedTo": "child-1",
      "createdBy": "parent-1",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 10,
      "targetWeek": "current",
      "weekly": false,
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false
    },
    {
      "id": "task-992119ef481eb819db405ccdd",
      "title": "Flöte üben",
      "description": "15 min. Flöte üben",
      "assignedTo": "child-1",
      "createdBy": "parent-1",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 10,
      "targetWeek": "current",
      "weekly": false,
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false
    },
    {
      "id": "task-50eb7be733dce819db405ccdd",
      "title": "Flöte üben",
      "description": "15 min. Flöte üben",
      "assignedTo": "child-1",
      "createdBy": "parent-1",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 10,
      "targetWeek": "current",
      "weekly": false,
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false
    },
    {
      "id": "task-b81576eb3eda419db4065246",
      "title": "Trompete üben",
      "description": "15 min Trompete üben",
      "assignedTo": "child-2",
      "createdBy": "parent-1",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 10,
      "targetWeek": "current",
      "weekly": false,
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false
    },
    {
      "id": "task-b63906f6f5d87819db4065246",
      "title": "Trompete üben",
      "description": "15 min Trompete üben",
      "assignedTo": "child-2",
      "createdBy": "parent-1",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 10,
      "targetWeek": "current",
      "weekly": false,
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false
    },
    {
      "id": "task-7563c516804c719db4065246",
      "title": "Trompete üben",
      "description": "15 min Trompete üben",
      "assignedTo": "child-2",
      "createdBy": "parent-1",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 10,
      "targetWeek": "current",
      "weekly": false,
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false
    },
    {
      "title": "Tisch decken oder abräumen",
      "description": "alleine Tisch decken oder abräumen (inkl. Spülmaschine einräumen)",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 5,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-5e7d5774a04f819db41a8512",
      "assignedTo": "child-1",
      "createdBy": "parent-1"
    },
    {
      "title": "Tisch decken oder abräumen",
      "description": "alleine Tisch decken oder abräumen (inkl. Spülmaschine einräumen)",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 5,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-c525ee6f2087819db41a8513",
      "assignedTo": "child-1",
      "createdBy": "parent-1"
    },
    {
      "title": "Tisch decken oder abräumen",
      "description": "alleine Tisch decken oder abräumen (inkl. Spülmaschine einräumen)",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 5,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-9c1c44a978fda19db41a8513",
      "assignedTo": "child-1",
      "createdBy": "parent-1"
    },
    {
      "title": "Tisch decken oder abräumen",
      "description": "alleine Tisch decken oder abräumen (inkl. Spülmaschine einräumen)",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 5,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-397cbcbb72d9f819db41a8513",
      "assignedTo": "child-1",
      "createdBy": "parent-1"
    },
    {
      "title": "Tisch decken oder abräumen",
      "description": "alleine Tisch decken oder abräumen (inkl. Spülmaschine einräumen)",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 5,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-5c75c37dc9b2519db41a8513",
      "assignedTo": "child-1",
      "createdBy": "parent-1"
    },
    {
      "title": "Tisch decken oder abräumen",
      "description": "alleine Tisch decken oder abräumen (inkl. Spülmaschine einräumen)",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 5,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-add75cfa3b18c819db41a8513",
      "assignedTo": "child-2",
      "createdBy": "parent-1"
    },
    {
      "title": "Tisch decken oder abräumen",
      "description": "alleine Tisch decken oder abräumen (inkl. Spülmaschine einräumen)",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 5,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-0ab43a4da70fb19db41a8513",
      "assignedTo": "child-2",
      "createdBy": "parent-1"
    },
    {
      "title": "Tisch decken oder abräumen",
      "description": "alleine Tisch decken oder abräumen (inkl. Spülmaschine einräumen)",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 5,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-dd753affb0763819db41a8513",
      "assignedTo": "child-2",
      "createdBy": "parent-1"
    },
    {
      "title": "Tisch decken oder abräumen",
      "description": "alleine Tisch decken oder abräumen (inkl. Spülmaschine einräumen)",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 5,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-7783ab4a83494819db41a8514",
      "assignedTo": "child-2",
      "createdBy": "parent-1"
    },
    {
      "title": "Tisch decken oder abräumen",
      "description": "alleine Tisch decken oder abräumen (inkl. Spülmaschine einräumen)",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 5,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-b3ab0d92c10f419db41a8514",
      "assignedTo": "child-2",
      "createdBy": "parent-1"
    },
    {
      "title": "In der Küche helfen",
      "description": "z.B. beim Tischdecken, Abräumen, Kochen",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 2,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-3b986252c9e6919db41b64e2",
      "assignedTo": "child-1",
      "createdBy": "parent-1"
    },
    {
      "title": "In der Küche helfen",
      "description": "z.B. beim Tischdecken, Abräumen, Kochen",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 2,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-46e8ea2245d2d19db41b64e2",
      "assignedTo": "child-1",
      "createdBy": "parent-1"
    },
    {
      "title": "In der Küche helfen",
      "description": "z.B. beim Tischdecken, Abräumen, Kochen",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 2,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-98a47f2ad8361819db41b64e2",
      "assignedTo": "child-1",
      "createdBy": "parent-1"
    },
    {
      "title": "In der Küche helfen",
      "description": "z.B. beim Tischdecken, Abräumen, Kochen",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 2,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-6449be3d6160319db41b64e2",
      "assignedTo": "child-1",
      "createdBy": "parent-1"
    },
    {
      "title": "In der Küche helfen",
      "description": "z.B. beim Tischdecken, Abräumen, Kochen",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 2,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-b05123c7585da19db41b64e3",
      "assignedTo": "child-1",
      "createdBy": "parent-1"
    },
    {
      "title": "In der Küche helfen",
      "description": "z.B. beim Tischdecken, Abräumen, Kochen",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 2,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-5eceba1baaeb4819db41b64e3",
      "assignedTo": "child-2",
      "createdBy": "parent-1"
    },
    {
      "title": "In der Küche helfen",
      "description": "z.B. beim Tischdecken, Abräumen, Kochen",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 2,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-79e7fb96e6cb119db41b64e3",
      "assignedTo": "child-2",
      "createdBy": "parent-1"
    },
    {
      "title": "In der Küche helfen",
      "description": "z.B. beim Tischdecken, Abräumen, Kochen",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 2,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-74a909b4a08a719db41b64e3",
      "assignedTo": "child-2",
      "createdBy": "parent-1"
    },
    {
      "title": "In der Küche helfen",
      "description": "z.B. beim Tischdecken, Abräumen, Kochen",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 2,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-13deb031bcd6f19db41b64e3",
      "assignedTo": "child-2",
      "createdBy": "parent-1"
    },
    {
      "title": "In der Küche helfen",
      "description": "z.B. beim Tischdecken, Abräumen, Kochen",
      "dueDate": "2026-04-19T22:00:00.000Z",
      "durationMinutes": 15,
      "points": 2,
      "targetWeek": "current",
      "weekly": true,
      "weeklyAssignments": {},
      "completionStatus": "open",
      "done": false,
      "type": "regular",
      "isReadonly": false,
      "id": "task-c66ad3d092071819db41b64e4",
      "assignedTo": "child-2",
      "createdBy": "parent-1"
    }
  ],
  "importedCalendars": [],
  "bonusRedemptions": [],
  "calendarSync": {
    "intervalMinutes": 60,
    "commonUrl": "",
    "commonEnabled": true,
    "lastSyncedAt": "2026-04-22T07:42:17.634Z",
    "lastCount": 0,
    "lastError": "",
    "sourceCount": 0
  },
  "bonuses": [
    {
      "id": "bonus-1879d733dee67819db417b151",
      "label": "15 min Switch",
      "pointsRequired": 50,
      "maxPerWeek": 2,
      "assignedTo": "all",
      "createdAt": "2026-04-22T07:29:04.849Z"
    }
  ]
};

function cloneState(value) {
  return JSON.parse(JSON.stringify(value));
}

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
  const hasStateData = !!state && typeof state === "object" && Object.keys(state).length > 0;
  const next = hasStateData ? { ...state } : cloneState(DEFAULT_APP_STATE);
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
    const normalizedPoints = normalizeTaskPoints(task.points, 1);
    return { ...task, durationMinutes: normalizedDuration, points: normalizedPoints };
  });

  if (!Array.isArray(next.bonuses)) next.bonuses = [];
  if (!Array.isArray(next.bonusRedemptions)) next.bonusRedemptions = [];

  return next;
}

function normalizeTaskDurationMinutes(value, fallback = 30) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return Math.max(15, fallback);
  const roundedToQuarter = Math.round(parsed / 15) * 15;
  return Math.max(15, roundedToQuarter);
}

function normalizeTaskPoints(value, fallback = 1) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return Math.max(1, Math.round(fallback));
  return Math.max(1, Math.round(parsed));
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
              points: 1,
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

function normalizePreservePath(value) {
  if (typeof value !== "string") return "";
  const normalized = value.trim().replace(/\\/g, "/").replace(/^\/+/, "");
  if (!normalized || normalized.includes("..")) {
    return "";
  }
  return normalized;
}

function parseGitHubRepo(repositoryUrl, owner, repo) {
  const normalizedOwner = typeof owner === "string" ? owner.trim() : "";
  const normalizedRepo = typeof repo === "string" ? repo.trim() : "";
  if (normalizedOwner && normalizedRepo) {
    return {
      repositoryUrl: `https://github.com/${normalizedOwner}/${normalizedRepo}`,
      owner: normalizedOwner,
      repo: normalizedRepo,
    };
  }

  const raw = typeof repositoryUrl === "string" ? repositoryUrl.trim() : "";
  if (!raw) {
    return { ...DEFAULT_UPDATER_CONFIG };
  }

  const shorthand = raw.replace(/^https?:\/\/github\.com\//i, "").replace(/\.git$/i, "").replace(/^\/+|\/+$/g, "");
  const parts = shorthand.split("/").filter(Boolean);
  if (parts.length >= 2) {
    return {
      repositoryUrl: `https://github.com/${parts[0]}/${parts[1]}`,
      owner: parts[0],
      repo: parts[1],
    };
  }

  return { ...DEFAULT_UPDATER_CONFIG };
}

function normalizeUpdaterConfig(value = {}) {
  const parsedRepo = parseGitHubRepo(value.repositoryUrl, value.owner, value.repo);
  const preservePaths = Array.isArray(value.preservePaths)
    ? value.preservePaths.map(normalizePreservePath).filter(Boolean)
    : DEFAULT_UPDATER_CONFIG.preservePaths;

  return {
    repositoryUrl: parsedRepo.repositoryUrl,
    owner: parsedRepo.owner,
    repo: parsedRepo.repo,
    restartCommand: typeof value.restartCommand === "string" ? value.restartCommand.trim() : "",
    preservePaths: Array.from(new Set([...(preservePaths.length ? preservePaths : DEFAULT_UPDATER_CONFIG.preservePaths)])),
  };
}

function readJsonFile(filePath, fallbackValue) {
  try {
    if (!fs.existsSync(filePath)) {
      return fallbackValue;
    }
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.warn(`Failed to read ${path.basename(filePath)}`, error);
    return fallbackValue;
  }
}

function writeJsonFile(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function loadUpdaterConfig() {
  return normalizeUpdaterConfig(readJsonFile(UPDATER_CONFIG_PATH, DEFAULT_UPDATER_CONFIG));
}

function saveUpdaterConfig(value) {
  const config = normalizeUpdaterConfig(value);
  writeJsonFile(UPDATER_CONFIG_PATH, config);
  return config;
}

function getDefaultUpdaterStatus() {
  return {
    status: "idle",
    message: "No update started yet.",
    error: "",
    source: "",
    currentVersion: BUILD_VERSION,
    targetVersion: "",
    startedAt: null,
    finishedAt: null,
    lastCheckedAt: null,
    latestRelease: null,
  };
}

function loadUpdaterStatus() {
  const raw = readJsonFile(UPDATER_STATUS_PATH, getDefaultUpdaterStatus());
  return {
    ...getDefaultUpdaterStatus(),
    ...(raw && typeof raw === "object" ? raw : {}),
    currentVersion: BUILD_VERSION,
  };
}

function saveUpdaterStatus(value) {
  const next = {
    ...getDefaultUpdaterStatus(),
    ...(value && typeof value === "object" ? value : {}),
    currentVersion: BUILD_VERSION,
  };
  writeJsonFile(UPDATER_STATUS_PATH, next);
  return next;
}

function normalizeVersion(value) {
  return typeof value === "string" ? value.trim().replace(/^v/i, "") : "";
}

function compareVersions(left, right) {
  const a = normalizeVersion(left);
  const b = normalizeVersion(right);
  if (!a && !b) return 0;
  if (!a) return -1;
  if (!b) return 1;
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function isUpdaterRunning() {
  return loadUpdaterStatus().status === "running";
}

function fetchRemote(url, options = {}) {
  const redirectsLeft = Number.isInteger(options.redirectsLeft) ? options.redirectsLeft : 5;
  const requestHeaders = options.headers && typeof options.headers === "object" ? options.headers : {};

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
        Accept: "*/*",
        ...requestHeaders,
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
          fetchRemote(redirectedUrl, { ...options, redirectsLeft: redirectsLeft - 1 }).then(resolve).catch(reject);
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
          resolve({
            buffer: Buffer.concat(chunks),
            headers: res.headers,
            statusCode,
          });
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

function fetchText(url, redirectsLeft = 5) {
  return fetchRemote(url, {
    redirectsLeft,
    headers: {
      Accept: "text/calendar,text/plain,*/*",
    },
  }).then((result) => result.buffer.toString("utf8"));
}

async function fetchJson(url, headers = {}) {
  const result = await fetchRemote(url, {
    headers: {
      Accept: "application/vnd.github+json,application/json",
      ...headers,
    },
  });

  try {
    return JSON.parse(result.buffer.toString("utf8"));
  } catch (error) {
    throw new Error("Remote returned invalid JSON");
  }
}

async function fetchLatestGitHubRelease(config) {
  if (!config.owner || !config.repo) {
    throw new Error("GitHub repository is not configured.");
  }

  const payload = await fetchJson(`https://api.github.com/repos/${config.owner}/${config.repo}/releases/latest`, {
    "X-GitHub-Api-Version": "2022-11-28",
  });

  if (!payload || typeof payload !== "object") {
    throw new Error("GitHub release response was empty.");
  }

  const tagName = typeof payload.tag_name === "string" ? payload.tag_name : "";
  const releaseVersion = normalizeVersion(payload.name || tagName || "");

  return {
    tagName,
    version: releaseVersion,
    name: typeof payload.name === "string" ? payload.name : tagName,
    publishedAt: payload.published_at || null,
    htmlUrl: typeof payload.html_url === "string" ? payload.html_url : `${config.repositoryUrl}/releases`,
    zipballUrl: typeof payload.zipball_url === "string"
      ? payload.zipball_url
      : `${config.repositoryUrl}/archive/refs/tags/${encodeURIComponent(tagName)}.zip`,
    prerelease: payload.prerelease === true,
    available: compareVersions(BUILD_VERSION, releaseVersion) < 0,
  };
}

function createUpdateJobTempDir() {
  return fs.mkdtempSync(path.join(UPDATES_TEMP_ROOT, "job-"));
}

function startDetachedUpdater({ zipPath, source, targetVersion, restartCommand, preservePaths }) {
  const existingStatus = loadUpdaterStatus();
  const nextStatus = saveUpdaterStatus({
    ...existingStatus,
    status: "running",
    message: "Update package staged. Installing update...",
    error: "",
    source,
    targetVersion: targetVersion || "",
    startedAt: new Date().toISOString(),
    finishedAt: null,
  });

  const child = spawn(process.execPath, [path.join(__dirname, "update-runner.js")], {
    cwd: __dirname,
    detached: true,
    stdio: "ignore",
    env: {
      ...process.env,
      TIMI_UPDATE_PROJECT_ROOT: __dirname,
      TIMI_UPDATE_ZIP_PATH: zipPath,
      TIMI_UPDATE_CURRENT_PID: String(process.pid),
      TIMI_UPDATE_RESTART_COMMAND: restartCommand || "",
      TIMI_UPDATE_PRESERVE_PATHS: JSON.stringify(preservePaths || []),
      TIMI_UPDATE_STATUS_PATH: UPDATER_STATUS_PATH,
      TIMI_UPDATE_SOURCE: source || "",
      TIMI_UPDATE_TARGET_VERSION: targetVersion || "",
      TIMI_UPDATE_APP_VERSION: APP_VERSION,
    },
  });
  child.unref();
  return nextStatus;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/meta", (_req, res) => {
  res.json({ ok: true, buildVersion: BUILD_VERSION, appVersion: APP_VERSION });
});

app.get("/api/update/status", (_req, res) => {
  res.json({
    ok: true,
    config: loadUpdaterConfig(),
    status: loadUpdaterStatus(),
  });
});

app.post("/api/update/config", (req, res) => {
  try {
    const config = saveUpdaterConfig(req.body || {});
    res.json({ ok: true, config, status: loadUpdaterStatus() });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message || "Failed to save update settings." });
  }
});

app.post("/api/update/check", async (_req, res) => {
  try {
    const config = loadUpdaterConfig();
    const latestRelease = await fetchLatestGitHubRelease(config);
    const status = saveUpdaterStatus({
      ...loadUpdaterStatus(),
      latestRelease,
      lastCheckedAt: new Date().toISOString(),
      message: latestRelease.available ? "A newer release is available." : "Already on the latest release.",
      error: "",
    });

    res.json({ ok: true, config, status });
  } catch (error) {
    const status = saveUpdaterStatus({
      ...loadUpdaterStatus(),
      lastCheckedAt: new Date().toISOString(),
      error: error.message || "Failed to check GitHub release.",
      message: "Release check failed.",
    });
    res.status(502).json({ ok: false, error: status.error, status, config: loadUpdaterConfig() });
  }
});

app.post("/api/update/release", async (_req, res) => {
  if (isUpdaterRunning()) {
    res.status(409).json({ ok: false, error: "An update is already running.", status: loadUpdaterStatus() });
    return;
  }

  try {
    const config = loadUpdaterConfig();
    const latestRelease = await fetchLatestGitHubRelease(config);
    const jobDir = createUpdateJobTempDir();
    const zipPath = path.join(jobDir, "release.zip");
    const zipResponse = await fetchRemote(latestRelease.zipballUrl, {
      headers: { Accept: "application/octet-stream" },
    });

    fs.writeFileSync(zipPath, zipResponse.buffer);

    const status = startDetachedUpdater({
      zipPath,
      source: "github-release",
      targetVersion: latestRelease.version || latestRelease.tagName,
      restartCommand: config.restartCommand,
      preservePaths: config.preservePaths,
    });

    saveUpdaterStatus({
      ...status,
      latestRelease,
      lastCheckedAt: new Date().toISOString(),
    });

    res.json({ ok: true, config, status: loadUpdaterStatus() });
  } catch (error) {
    const status = saveUpdaterStatus({
      ...loadUpdaterStatus(),
      status: "failed",
      finishedAt: new Date().toISOString(),
      error: error.message || "Failed to download the release package.",
      message: "Release update could not be started.",
    });
    res.status(500).json({ ok: false, error: status.error, status, config: loadUpdaterConfig() });
  }
});

app.post("/api/update/upload", upload.single("zip"), (req, res) => {
  if (isUpdaterRunning()) {
    if (req.file && req.file.path) {
      fs.rmSync(req.file.path, { force: true });
    }
    res.status(409).json({ ok: false, error: "An update is already running.", status: loadUpdaterStatus() });
    return;
  }

  const file = req.file;
  if (!file || !file.path) {
    res.status(400).json({ ok: false, error: "Please upload a ZIP archive." });
    return;
  }

  try {
    const config = loadUpdaterConfig();
    const uploadedName = typeof file.originalname === "string" ? file.originalname : "update.zip";
    const safeName = uploadedName.toLowerCase();
    if (!safeName.endsWith(".zip")) {
      fs.rmSync(file.path, { force: true });
      res.status(400).json({ ok: false, error: "Only ZIP archives are supported." });
      return;
    }

    const status = startDetachedUpdater({
      zipPath: file.path,
      source: "zip-upload",
      targetVersion: "",
      restartCommand: config.restartCommand,
      preservePaths: config.preservePaths,
    });

    saveUpdaterStatus({
      ...status,
      message: `Uploaded package ${uploadedName}. Installing update...`,
    });

    res.json({ ok: true, config, status: loadUpdaterStatus() });
  } catch (error) {
    fs.rmSync(file.path, { force: true });
    const status = saveUpdaterStatus({
      ...loadUpdaterStatus(),
      status: "failed",
      finishedAt: new Date().toISOString(),
      error: error.message || "Failed to start uploaded update.",
      message: "Uploaded update could not be started.",
    });
    res.status(500).json({ ok: false, error: status.error, status, config: loadUpdaterConfig() });
  }
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
