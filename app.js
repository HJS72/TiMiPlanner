/* TiMiPlanner v0.1
   Minimal client-side app for managing tasks for parents and children.
   This is intended as a starting point; expand the data model and backend as needed.
*/

// --- Data helpers --------------------------------------------------------------
const STORAGE_KEY = "timiplanner:data";
const DEFAULT_LOCALE = "en";

const templates = {
  login: document.querySelector("#login-template"),
};

const translations = {
  en: {
    "login.title": "Welcome back",
    "login.username": "Username",
    "login.password": "Password",
    "login.submit": "Log in",
    "login.error": "Invalid username or password.",
    "login.hint": "Use the demo accounts: parent / parent, lina / lina.",
    "logout": "Log out",
    "welcome": "Hello",

    "tab.dashboard": "Dashboard",
    "tab.statistics": "Statistics",
    "tab.tasks": "Tasks",
    "tab.settings": "Settings",

    "stats.title": "Statistics",
    "stats.rangeMonth": "Last month",
    "stats.rangeThreeMonths": "Last 3 months",
    "stats.rangeYear": "Last year",
    "stats.allChildren": "All children",
    "stats.childFilter": "Child",
    "stats.total": "Tasks",
    "stats.done": "Done",
    "stats.weekOf": "Week of {{date}}",
    "stats.noData": "No tasks in selected period.",

    "dashboard.title": "Overview",
    "dashboard.tasks": "tasks",
    "dashboard.assigned": "assigned",
    "dashboard.unassigned": "unassigned",
    "dashboard.unassignedTasks": "Unassigned tasks",
    "dashboard.unscheduledTasks": "Not scheduled",
    "dashboard.noUnscheduled": "No unscheduled tasks.",
    "dashboard.moreTasks": "+{{count}} more",
    "dashboard.noTasks": "No tasks assigned yet.",
    "dashboard.calendarTitle": "Weekly overview",
    "dashboard.calendarWeekRange": "Week {{start}} to {{end}}",
    "dashboard.prevWeek": "Previous week",
    "dashboard.nextWeek": "Next week",
    "dashboard.childInfo": "Here is your weekly plan. You can see tasks assigned to you and check your calendar.",
    "dashboard.noTasksChild": "No tasks yet — ask your parents to add one!",

    "tasks.title": "Tasks",
    "tasks.create": "New task",
    "tasks.sortDue": "Sort by due date",
    "tasks.sortAssigned": "Sort by assignee",
    "tasks.noTasks": "No tasks to show.",

    "task.title": "Title",
    "task.description": "Description",
    "task.dueDate": "Due date",
    "task.duration": "Duration (minutes)",
    "task.durationShort": "Duration",
    "task.durationMinError": "Duration must be at least 15 minutes.",
    "task.weekly": "Weekly",
    "task.done": "Done",
    "task.targetWeek": "Schedule in",
    "task.thisWeek": "This week",
    "task.nextWeek": "Next week",
    "task.assignedTo": "Assigned to",
    "task.save": "Save",
    "task.cancel": "Cancel",
    "task.edit": "Edit",
    "task.delete": "Delete",
    "task.deleteConfirm": "Delete this task? This cannot be undone.",
    "task.saveError": "Please provide a title.",
    "task.editTitle": "Edit task",
    "task.createTitle": "Create task",
    "task.due": "Due",
    "task.readonly": "Read-only",

    "calendar.today": "Today",

    "settings.title": "Settings",
    "settings.help": "Parents can configure Webcal links per child and one shared Webcal calendar for all children.",
    "settings.profileTitle": "Personal settings",
    "settings.name": "Display name",
    "settings.username": "Username",
    "settings.passwordNew": "New password",
    "settings.passwordKeep": "Leave blank to keep current password.",
    "settings.saveProfile": "Save personal settings",
    "settings.profileSaved": "Personal settings saved.",
    "settings.profileErrorName": "Please enter a display name.",
    "settings.profileErrorUsername": "Please enter a username.",
    "settings.profileErrorUsernameTaken": "That username is already in use.",
    "settings.userManagementTitle": "User management",
    "settings.userManagementHelp": "Parents can add users and update usernames, passwords, and profile settings.",
    "settings.addUserTitle": "Add user",
    "settings.role": "Role",
    "settings.roleParent": "Parent",
    "settings.roleChild": "Child",
    "settings.childAvatar": "Child avatar",
    "settings.childColor": "Task color",
    "settings.childAvatarHint": "Use 1-2 characters (e.g., L, M, or an emoji).",
    "settings.addUserButton": "Add user",
    "settings.addUserSuccess": "User created.",
    "settings.addUserErrorPassword": "Please enter a password.",
    "settings.existingUsersTitle": "Existing users",
    "settings.userTableName": "Name",
    "settings.userTableUsername": "Username",
    "settings.userTableRole": "Role",
    "settings.userTableLanguage": "Language",
    "settings.userTableActions": "Actions",
    "settings.editUserButton": "Edit",
    "settings.deleteUserButton": "Delete",
    "settings.backToUsers": "Back to users",
    "settings.editUserTitle": "Edit user",
    "settings.saveUserButton": "Save user",
    "settings.userSaved": "User saved.",
    "settings.userDeleted": "User deleted.",
    "settings.deleteUserConfirm": "Delete user {{name}}? This cannot be undone.",
    "settings.deleteUserBlockedSelf": "You cannot delete the user you are currently signed in with.",
    "settings.deleteUserBlockedLastParent": "You cannot delete the last parent user.",
    "settings.parentOnly": "Only parents can manage users and import calendars.",
    "settings.language": "Language",
    "settings.languageSelect": "Choose your language",
    "settings.importTitle": "Import calendar (iCal)",
    "settings.importUrl": "Calendar URL",
    "settings.importAssign": "Assign to",
    "settings.importButton": "Import",
    "settings.importInfo": "Paste a public iCal URL (e.g., from iCloud) and assign it to a child. Imported events are read-only.",
    "settings.importing": "Importing…",
    "settings.importSuccess": "Imported {{count}} events.",
    "settings.importFail": "Import failed. Check the URL and try again.",
    "settings.importError": "Please enter a calendar URL.",
    "settings.importedEvent": "Imported event",
    "settings.webcalTitle": "Webcal sync",
    "settings.webcalCommon": "Common Webcal link (all children)",
    "settings.webcalCommonSyncEnabled": "Enable sync for common Webcal link",
    "settings.webcalChildLink": "Child Webcal link",
    "settings.webcalLinkSyncEnabled": "Enable sync for this Webcal link",
    "settings.webcalHint": "Use webcal:// or https:// links. Webcal links are fetched via https.",
    "settings.syncInterval": "Sync interval (minutes)",
    "settings.syncSave": "Save sync settings",
    "settings.syncNow": "Sync now",
    "settings.syncSaved": "Sync settings saved.",
    "settings.syncRunning": "Syncing calendars...",
    "settings.syncDone": "Synced {{count}} events.",
    "settings.syncFailed": "Calendar sync failed. Please verify your links.",
    "settings.syncInvalidInterval": "Please enter a valid interval (minimum 5 minutes).",
    "settings.syncStatus": "Sync status",
    "settings.syncLast": "Last sync",
    "settings.syncCount": "Imported events",
    "settings.syncSources": "Sources",
    "settings.syncError": "Last error",
    "settings.syncNoError": "No errors",
    "settings.syncNever": "Never",
    "settings.syncNoSources": "No Webcal sources configured yet.",
    "settings.syncPolicy": "Backend sync: every {{interval}} min, imports next 3 months, deletes tasks older than 3 months.",
    "settings.syncFetchHint": "If links are correct but sync still fails, the source may block browser access (CORS).",
    "settings.connection": "Connection",
    "settings.connectionOk": "Working",
    "settings.connectionError": "Not working",
    "settings.connectionUnknown": "Not configured",

    "footer.help": "Tip: Use the settings page to import another calendar.",
    "footer.version": "v0.9",
    "footer.screen": "Screen: {{size}}",
    "footer.lastAction": "Last action: {{action}}",
    "footer.lastActionNone": "No recent action",
    "action.taskAdded": "New task added",
    "action.taskDeleted": "Task deleted",
    "action.taskScheduled": "Task scheduled",
    "action.taskUnscheduled": "Task moved to not scheduled",
    "action.taskDone": "Task marked as done",
    "action.taskUndone": "Task marked as not done",
    "action.taskDurationChanged": "Task changed duration to {{minutes}} min",
  },
  de: {
    "login.title": "Willkommen zurück",
    "login.username": "Benutzername",
    "login.password": "Passwort",
    "login.submit": "Einloggen",
    "login.error": "Ungültiger Benutzername oder Passwort.",
    "login.hint": "Demo-Konten: parent / parent, lina / lina.",
    "logout": "Ausloggen",
    "welcome": "Hallo",

    "tab.dashboard": "Übersicht",
    "tab.statistics": "Statistik",
    "tab.tasks": "Aufgaben",
    "tab.settings": "Einstellungen",

    "stats.title": "Statistik",
    "stats.rangeMonth": "Letzter Monat",
    "stats.rangeThreeMonths": "Letzte 3 Monate",
    "stats.rangeYear": "Letztes Jahr",
    "stats.allChildren": "Alle Kinder",
    "stats.childFilter": "Kind",
    "stats.total": "Aufgaben",
    "stats.done": "Erledigt",
    "stats.weekOf": "Woche ab {{date}}",
    "stats.noData": "Keine Aufgaben im gewählten Zeitraum.",

    "dashboard.title": "Übersicht",
    "dashboard.tasks": "Aufgaben",
    "dashboard.assigned": "zugewiesen",
    "dashboard.unassigned": "nicht zugewiesen",
    "dashboard.unassignedTasks": "Nicht zugewiesene Aufgaben",
    "dashboard.unscheduledTasks": "Nicht eingeplant",
    "dashboard.noUnscheduled": "Keine nicht eingeplanten Aufgaben.",
    "dashboard.moreTasks": "+{{count}} mehr",
    "dashboard.noTasks": "Noch keine Aufgaben zugewiesen.",
    "dashboard.calendarTitle": "Wochenübersicht",
    "dashboard.calendarWeekRange": "Woche {{start}} bis {{end}}",
    "dashboard.prevWeek": "Vorherige Woche",
    "dashboard.nextWeek": "Nächste Woche",
    "dashboard.childInfo": "Hier ist dein Wochenplan. Du siehst Aufgaben, die dir zugewiesen sind, und deinen Kalender.",
    "dashboard.noTasksChild": "Noch keine Aufgaben – bitte deine Eltern fügen etwas hinzu!",

    "tasks.title": "Aufgaben",
    "tasks.create": "Neue Aufgabe",
    "tasks.sortDue": "Nach Fälligkeit sortieren",
    "tasks.sortAssigned": "Nach Zuweisung sortieren",
    "tasks.noTasks": "Keine Aufgaben vorhanden.",

    "task.title": "Titel",
    "task.description": "Beschreibung",
    "task.dueDate": "Fälligkeitsdatum",
    "task.duration": "Dauer (Minuten)",
    "task.durationShort": "Dauer",
    "task.durationMinError": "Die Dauer muss mindestens 15 Minuten betragen.",
    "task.weekly": "Wöchentlich",
    "task.done": "Erledigt",
    "task.targetWeek": "Einplanen in",
    "task.thisWeek": "Diese Woche",
    "task.nextWeek": "Nächste Woche",
    "task.assignedTo": "Zugewiesen an",
    "task.save": "Speichern",
    "task.cancel": "Abbrechen",
    "task.edit": "Bearbeiten",
    "task.delete": "Löschen",
    "task.deleteConfirm": "Diese Aufgabe löschen? Das kann nicht rückgängig gemacht werden.",
    "task.saveError": "Bitte einen Titel angeben.",
    "task.editTitle": "Aufgabe bearbeiten",
    "task.createTitle": "Aufgabe erstellen",
    "task.due": "Fällig",
    "task.readonly": "Schreibgeschützt",

    "calendar.today": "Heute",

    "settings.title": "Einstellungen",
    "settings.help": "Eltern können pro Kind eigene Webcal-Links sowie einen gemeinsamen Webcal-Kalender für alle Kinder konfigurieren.",
    "settings.profileTitle": "Persönliche Einstellungen",
    "settings.name": "Anzeigename",
    "settings.username": "Benutzername",
    "settings.passwordNew": "Neues Passwort",
    "settings.passwordKeep": "Leer lassen, um das aktuelle Passwort zu behalten.",
    "settings.saveProfile": "Persönliche Einstellungen speichern",
    "settings.profileSaved": "Persönliche Einstellungen gespeichert.",
    "settings.profileErrorName": "Bitte gib einen Anzeigenamen ein.",
    "settings.profileErrorUsername": "Bitte gib einen Benutzernamen ein.",
    "settings.profileErrorUsernameTaken": "Dieser Benutzername ist bereits vergeben.",
    "settings.userManagementTitle": "Benutzerverwaltung",
    "settings.userManagementHelp": "Eltern können Benutzer hinzufügen und Benutzernamen, Passwörter sowie Profileinstellungen ändern.",
    "settings.addUserTitle": "Benutzer hinzufügen",
    "settings.role": "Rolle",
    "settings.roleParent": "Eltern",
    "settings.roleChild": "Kind",
    "settings.childAvatar": "Kinder-Avatar",
    "settings.childColor": "Aufgabenfarbe",
    "settings.childAvatarHint": "Verwende 1-2 Zeichen (z. B. L, M oder ein Emoji).",
    "settings.addUserButton": "Benutzer hinzufügen",
    "settings.addUserSuccess": "Benutzer erstellt.",
    "settings.addUserErrorPassword": "Bitte gib ein Passwort ein.",
    "settings.existingUsersTitle": "Bestehende Benutzer",
    "settings.userTableName": "Name",
    "settings.userTableUsername": "Benutzername",
    "settings.userTableRole": "Rolle",
    "settings.userTableLanguage": "Sprache",
    "settings.userTableActions": "Aktionen",
    "settings.editUserButton": "Bearbeiten",
    "settings.deleteUserButton": "Löschen",
    "settings.backToUsers": "Zurück zur Benutzerliste",
    "settings.editUserTitle": "Benutzer bearbeiten",
    "settings.saveUserButton": "Benutzer speichern",
    "settings.userSaved": "Benutzer gespeichert.",
    "settings.userDeleted": "Benutzer gelöscht.",
    "settings.deleteUserConfirm": "Benutzer {{name}} löschen? Das kann nicht rückgängig gemacht werden.",
    "settings.deleteUserBlockedSelf": "Du kannst den aktuell angemeldeten Benutzer nicht löschen.",
    "settings.deleteUserBlockedLastParent": "Der letzte Eltern-Benutzer kann nicht gelöscht werden.",
    "settings.parentOnly": "Nur Eltern können Benutzer verwalten und Kalender importieren.",
    "settings.language": "Sprache",
    "settings.languageSelect": "Wähle deine Sprache",
    "settings.importTitle": "Kalender importieren (iCal)",
    "settings.importUrl": "Kalender-URL",
    "settings.importAssign": "Zugewiesen an",
    "settings.importButton": "Importieren",
    "settings.importInfo": "Füge eine öffentliche iCal-URL (z. B. von iCloud) ein und weise sie einem Kind zu. Importierte Ereignisse sind schreibgeschützt.",
    "settings.importing": "Importiere…",
    "settings.importSuccess": "{{count}} Ereignisse importiert.",
    "settings.importFail": "Import fehlgeschlagen. Überprüfe die URL und versuche es erneut.",
    "settings.importError": "Bitte gib eine Kalender-URL ein.",
    "settings.importedEvent": "Importiertes Ereignis",
    "settings.webcalTitle": "Webcal-Synchronisierung",
    "settings.webcalCommon": "Gemeinsamer Webcal-Link (alle Kinder)",
    "settings.webcalCommonSyncEnabled": "Sync für gemeinsamen Webcal-Link aktivieren",
    "settings.webcalChildLink": "Webcal-Link des Kindes",
    "settings.webcalLinkSyncEnabled": "Sync für diesen Webcal-Link aktivieren",
    "settings.webcalHint": "Verwende webcal:// oder https:// Links. Webcal-Links werden über https geladen.",
    "settings.syncInterval": "Synchronisationsintervall (Minuten)",
    "settings.syncSave": "Sync-Einstellungen speichern",
    "settings.syncNow": "Jetzt synchronisieren",
    "settings.syncSaved": "Sync-Einstellungen gespeichert.",
    "settings.syncRunning": "Kalender werden synchronisiert...",
    "settings.syncDone": "{{count}} Ereignisse synchronisiert.",
    "settings.syncFailed": "Kalender-Synchronisierung fehlgeschlagen. Bitte überprüfe die Links.",
    "settings.syncInvalidInterval": "Bitte gib ein gültiges Intervall ein (mindestens 5 Minuten).",
    "settings.syncStatus": "Sync-Status",
    "settings.syncLast": "Letzte Synchronisierung",
    "settings.syncCount": "Importierte Ereignisse",
    "settings.syncSources": "Quellen",
    "settings.syncError": "Letzter Fehler",
    "settings.syncNoError": "Keine Fehler",
    "settings.syncNever": "Nie",
    "settings.syncNoSources": "Noch keine Webcal-Quellen konfiguriert.",
    "settings.syncPolicy": "Backend-Sync: alle {{interval}} Min., importiert die nächsten 3 Monate, löscht Aufgaben älter als 3 Monate.",
    "settings.syncFetchHint": "Wenn die Links korrekt sind, aber der Sync fehlschlägt, blockiert die Quelle evtl. Browserzugriff (CORS).",
    "settings.connection": "Verbindung",
    "settings.connectionOk": "Funktioniert",
    "settings.connectionError": "Fehler",
    "settings.connectionUnknown": "Nicht konfiguriert",

    "footer.help": "Tipp: Im Einstellungsbereich kannst du einen weiteren Kalender importieren.",
    "footer.version": "v0.9",
    "footer.screen": "Bildschirm: {{size}}",
    "footer.lastAction": "Letzte Aktion: {{action}}",
    "footer.lastActionNone": "Keine letzte Aktion",
    "action.taskAdded": "Neue Aufgabe hinzugefugt",
    "action.taskDeleted": "Aufgabe geloscht",
    "action.taskScheduled": "Aufgabe eingeplant",
    "action.taskUnscheduled": "Aufgabe als nicht eingeplant markiert",
    "action.taskDone": "Aufgabe als erledigt markiert",
    "action.taskUndone": "Aufgabe als nicht erledigt markiert",
    "action.taskDurationChanged": "Aufgabendauer auf {{minutes}} min geandert",
  },
};

function nowISO() {
  const d = new Date();
  return d.toISOString();
}

const DEFAULT_CHILD_COLORS = ["#3ba3d9", "#2ecc71", "#f39c12", "#e74c3c", "#9b59b6", "#16a085"];

function normalizeHexColor(value, fallback = "#3ba3d9") {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed;
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    const r = trimmed[1];
    const g = trimmed[2];
    const b = trimmed[3];
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return fallback;
}

function hexToRgba(hex, alpha = 1) {
  const normalized = normalizeHexColor(hex);
  const r = parseInt(normalized.slice(1, 3), 16);
  const g = parseInt(normalized.slice(3, 5), 16);
  const b = parseInt(normalized.slice(5, 7), 16);
  const safeAlpha = Math.max(0, Math.min(1, alpha));
  return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
}

function getDefaultAvatar(user) {
  const source = (user?.name || user?.username || "C").trim();
  return source ? source.charAt(0).toUpperCase() : "C";
}

function normalizeAvatar(value, fallbackUser = null) {
  const raw = (value || "").trim();
  if (!raw) return getDefaultAvatar(fallbackUser);
  return raw.slice(0, 2);
}

function normalizeTaskDurationMinutes(value, fallback = 30) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return Math.max(15, fallback);
  const roundedToQuarter = Math.round(parsed / 15) * 15;
  return Math.max(15, roundedToQuarter);
}

function getTaskDurationMinutes(task) {
  return normalizeTaskDurationMinutes(task && task.durationMinutes, 30);
}

function formatDurationMinutes(minutes) {
  return `${normalizeTaskDurationMinutes(minutes)} min`;
}

function applyUserDefaults(data) {
  if (!data || !Array.isArray(data.users)) return data;

  let childIndex = 0;
  let changed = false;

  if (!data.calendarSync || typeof data.calendarSync !== "object") {
    data.calendarSync = {
      intervalMinutes: 60,
      commonUrl: "",
      lastSyncedAt: null,
      lastCount: 0,
      lastError: "",
      sourceCount: 0,
    };
    changed = true;
  }

  if (!data.calendarSync.intervalMinutes || Number.isNaN(Number(data.calendarSync.intervalMinutes))) {
    data.calendarSync.intervalMinutes = 60;
    changed = true;
  }

  if (typeof data.calendarSync.commonUrl !== "string") {
    data.calendarSync.commonUrl = "";
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(data.calendarSync, "commonEnabled")) {
    data.calendarSync.commonEnabled = true;
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(data.calendarSync, "lastSyncedAt")) {
    data.calendarSync.lastSyncedAt = null;
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(data.calendarSync, "lastCount")) {
    data.calendarSync.lastCount = 0;
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(data.calendarSync, "lastError")) {
    data.calendarSync.lastError = "";
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(data.calendarSync, "sourceCount")) {
    data.calendarSync.sourceCount = 0;
    changed = true;
  }

  data.users.forEach((user) => {
    if (!user || typeof user !== "object") return;
    if (!user.locale) {
      user.locale = data.locale || DEFAULT_LOCALE;
      changed = true;
    }

    if (user.role === "child") {
      const fallbackColor = DEFAULT_CHILD_COLORS[childIndex % DEFAULT_CHILD_COLORS.length];
      const nextColor = normalizeHexColor(user.color || user.childColor || fallbackColor, fallbackColor);
      if (user.color !== nextColor) {
        user.color = nextColor;
        changed = true;
      }
      const nextAvatar = normalizeAvatar(user.avatar, user);
      if (user.avatar !== nextAvatar) {
        user.avatar = nextAvatar;
        changed = true;
      }
      if (typeof user.webcalUrl !== "string") {
        user.webcalUrl = "";
        changed = true;
      }
      if (!Object.prototype.hasOwnProperty.call(user, "webcalEnabled")) {
        user.webcalEnabled = true;
        changed = true;
      }
      childIndex += 1;
    }
  });

  if (Array.isArray(data.tasks)) {
    const originalCount = data.tasks.length;
    data.tasks = data.tasks.filter((task) => {
      if (!task || typeof task !== "object") return false;
      const isLegacyDefaultSoccerTask = task.id === "task-2"
        && task.title === "Soccer practice"
        && task.isReadonly === true
        && task.createdBy === "import";
      return !isLegacyDefaultSoccerTask;
    });
    if (data.tasks.length !== originalCount) {
      changed = true;
    }

    data.tasks.forEach((task) => {
      if (!task || typeof task !== "object") return;
      let normalizedWeekly = task.weekly === true;
      const normalizedDone = task.done === true;
      if (Object.prototype.hasOwnProperty.call(task, "recurrence")) {
        if (task.recurrence === "weekly") {
          normalizedWeekly = true;
        }
        delete task.recurrence;
        changed = true;
      }
      if (task.weekly !== normalizedWeekly) {
        task.weekly = normalizedWeekly;
        changed = true;
      }
      if (task.weekly === true) {
        const currentAssignments = (task.weeklyAssignments && typeof task.weeklyAssignments === "object")
          ? task.weeklyAssignments
          : {};
        if (task.weeklyAssignments !== currentAssignments) {
          task.weeklyAssignments = currentAssignments;
          changed = true;
        }

        const due = parseDate(task.dueDate);
        if (due) {
          const dueIsScheduled = due.getHours() !== 0 || due.getMinutes() !== 0 || due.getSeconds() !== 0 || due.getMilliseconds() !== 0;
          if (dueIsScheduled) {
            const key = getWeekKey(due);
            if (!task.weeklyAssignments[key]) {
              task.weeklyAssignments[key] = due.toISOString();
              changed = true;
            }
          }

          const anchor = getCurrentWeekStart(due);
          anchor.setHours(0, 0, 0, 0);
          const anchorIso = anchor.toISOString();
          if (task.dueDate !== anchorIso) {
            task.dueDate = anchorIso;
            changed = true;
          }
        }
      } else if (Object.prototype.hasOwnProperty.call(task, "weeklyAssignments")) {
        delete task.weeklyAssignments;
        changed = true;
      }
      if (task.done !== normalizedDone) {
        task.done = normalizedDone;
        changed = true;
      }
      const normalizedDuration = normalizeTaskDurationMinutes(task.durationMinutes, 30);
      if (task.durationMinutes !== normalizedDuration) {
        task.durationMinutes = normalizedDuration;
        changed = true;
      }
    });
  }

  if (changed) {
    writeStorage(data);
  }

  return data;
}

function readStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Could not parse storage", e);
    return null;
  }
}

let pendingDbWriteTimer = null;
let pendingDbWriteSnapshot = null;
let pendingDbWritePromise = null;
let pendingDbWriteResolve = null;

async function readStorageFromDatabase() {
  try {
    const response = await fetch("/api/state", { method: "GET" });
    if (!response.ok) return null;
    const payload = await response.json();
    if (!payload || payload.ok !== true || !payload.data || typeof payload.data !== "object") {
      return null;
    }
    return { data: payload.data, updatedAt: payload.updatedAt || null };
  } catch (error) {
    console.warn("Database state read failed", error);
    return null;
  }
}

async function writeStorageToDatabase(value) {
  try {
    await fetch("/api/state", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: value }),
    });
  } catch (error) {
    console.warn("Database state write failed", error);
  }
}

async function performPendingDatabaseWrite() {
  const snapshot = pendingDbWriteSnapshot;
  pendingDbWriteSnapshot = null;
  pendingDbWriteTimer = null;

  try {
    if (snapshot) {
      await writeStorageToDatabase(snapshot);
    }
  } finally {
    const resolve = pendingDbWriteResolve;
    pendingDbWritePromise = null;
    pendingDbWriteResolve = null;
    if (resolve) {
      resolve();
    }
  }
}

function scheduleDatabaseWrite(value) {
  pendingDbWriteSnapshot = JSON.parse(JSON.stringify(value));

  if (!pendingDbWritePromise) {
    pendingDbWritePromise = new Promise((resolve) => {
      pendingDbWriteResolve = resolve;
    });
  }

  if (pendingDbWriteTimer) {
    clearTimeout(pendingDbWriteTimer);
  }

  pendingDbWriteTimer = setTimeout(() => {
    performPendingDatabaseWrite().catch((error) => {
      console.warn("Database state write failed", error);
    });
  }, 150);

  return pendingDbWritePromise;
}

async function flushDatabaseWrite() {
  if (!pendingDbWritePromise) {
    return;
  }

  if (pendingDbWriteTimer) {
    clearTimeout(pendingDbWriteTimer);
    await performPendingDatabaseWrite();
    return;
  }

  await pendingDbWritePromise;
}

function writeStorage(value) {
  return scheduleDatabaseWrite(value);
}

function initializeData() {
  const initial = {
    locale: DEFAULT_LOCALE,
    users: [
      { id: "parent-1", username: "parent", password: "parent", role: "parent", name: "Parent", locale: DEFAULT_LOCALE },
      { id: "child-1", username: "lina", password: "lina", role: "child", name: "Lina", locale: DEFAULT_LOCALE, color: "#3ba3d9", avatar: "L", webcalUrl: "", webcalEnabled: true },
      { id: "child-2", username: "max", password: "max", role: "child", name: "Max", locale: DEFAULT_LOCALE, color: "#2ecc71", avatar: "M", webcalUrl: "", webcalEnabled: true },
    ],
    sessions: {
      // sessionId: { userId }
    },
    tasks: [
      {
        id: "task-1",
        title: "Practice piano",
        description: "At least 20 minutes of scales or a song.",
        assignedTo: "child-1",
        createdBy: "parent-1",
        dueDate: new Date(new Date().setHours(18, 0, 0, 0)).toISOString(),
        durationMinutes: 30,
        weekly: false,
        done: false,
        type: "regular",
        isReadonly: false,
      },
      {
        id: "task-2",
        title: "do laundry",
        description: "",
        assignedTo: "child-1",
        createdBy: "parent-1",
        dueDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
        durationMinutes: 30,
        weekly: false,
        done: false,
        type: "regular",
        isReadonly: false,
      },
    ],
    importedCalendars: [
      // { id, title, url, assignedTo, lastFetched, events: [] }
    ],
    calendarSync: {
      intervalMinutes: 60,
      commonUrl: "",
      commonEnabled: true,
      lastSyncedAt: null,
      lastCount: 0,
      lastError: "",
      sourceCount: 0,
    },
  };

  const normalized = applyUserDefaults(initial);
  return normalized;
}

function translate(key, params = {}) {
  const locale = appState.locale || DEFAULT_LOCALE;
  const catalog = translations[locale] || translations[DEFAULT_LOCALE] || {};
  let text = catalog[key] || key;

  Object.entries(params).forEach(([k, v]) => {
    text = text.replace(new RegExp(`\\{\\{${k}\\}\\}`, "g"), v);
  });

  return text;
}

function t(key, params) {
  return translate(key, params);
}

const iconMap = {
  menu: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
  dashboard: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM3 21h8v-6H3v6z" fill="currentColor"/>
    </svg>
  `,
  statistics: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  tasks: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  settings: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" stroke="currentColor" stroke-width="2"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  add: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  edit: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  delete: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  prev: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  next: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  today: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9h18M7 3v2M17 3v2M6 12h2M10 12h2M14 12h2M6 16h2M10 16h2M14 16h2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2"/>
    </svg>
  `,
  calendarCheck: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" stroke-width="2"/>
      <path d="M8 2v4M16 2v4M3 9h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 14l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  save: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="17,21 17,13 7,13 7,21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="7,3 7,8 15,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  cancel: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  import: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  search: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
      <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  filter: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  refresh: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="23,4 23,10 17,10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="1,20 1,14 7,14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20.49,9A9,9,0,0,0,5.64,5.64L1,10m22,4l-4.64,4.36A9,9,0,0,1,3.51,15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  logout: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5M17 16l4-4m0 0l-4-4m4 4H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  lock: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
};

function icon(name) {
  return iconMap[name] || "";
}

function createReadonlyLock() {
  return createElement("span", {
    className: "readonly-lock",
    html: icon("lock"),
    attrs: { title: t("task.readonly"), "aria-label": t("task.readonly") },
  });
}

function setLocale(locale) {
  appState.locale = locale;
  storage.locale = locale;
  writeStorage(storage);
  renderApp();
}

function logDebug(msg, ...rest) {
  if (window.location.search.includes("debug")) {
    console.debug(msg, ...rest);
  }
}

function makeId(prefix = "id") {
  return `${prefix}-${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
}

function parseDate(input) {
  if (!input) return null;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

function isWebcalTask(task) {
  return !!task && (task.createdBy === "webcal" || task.type === "imported-webcal");
}

function getCurrentWeekStart(date = new Date()) {
  const start = getWeekStart(date);
  start.setHours(0, 0, 0, 0);
  return start;
}

function getNextWeekStart(date = new Date()) {
  const start = getCurrentWeekStart(date);
  start.setDate(start.getDate() + 7);
  return start;
}

function getWeekAnchorDate(selection) {
  const start = selection === "next" ? getNextWeekStart() : getCurrentWeekStart();
  return start;
}

function getStatisticsRangeStart(range) {
  const now = new Date();
  const start = getCurrentWeekStart(now);
  if (range === "1y") {
    start.setMonth(start.getMonth() - 12);
  } else if (range === "1m") {
    start.setMonth(start.getMonth() - 1);
  } else {
    start.setMonth(start.getMonth() - 3);
  }
  return getCurrentWeekStart(start);
}

function getWeekStartsInRange(start, end) {
  const weeks = [];
  const cursor = getCurrentWeekStart(start);
  const limit = getCurrentWeekStart(end);
  while (cursor.getTime() <= limit.getTime()) {
    weeks.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 7);
  }
  return weeks;
}

function isTaskInWeekForStats(task, weekStart) {
  if (!task || !weekStart) return false;
  const due = parseDate(task.dueDate);
  if (!due) return false;
  const taskWeekStart = getCurrentWeekStart(due).getTime();
  const targetWeekStart = getCurrentWeekStart(weekStart).getTime();
  if (task.weekly === true) {
    return targetWeekStart >= taskWeekStart;
  }
  return taskWeekStart === targetWeekStart;
}

function isTaskDoneInWeekForStats(task, weekStart) {
  if (!task || task.done !== true || !weekStart) return false;
  if (task.weekly === true) {
    return !!getWeeklyAssignmentDate(task, weekStart);
  }
  return isTaskInWeekForStats(task, weekStart);
}

function getWeekKey(date) {
  const start = getCurrentWeekStart(date);
  return start.toISOString().split("T")[0];
}

function getWeeklyAssignmentDate(task, referenceDate) {
  if (!task || task.weekly !== true) return null;
  if (!task.weeklyAssignments || typeof task.weeklyAssignments !== "object") return null;
  const key = getWeekKey(referenceDate);
  const raw = task.weeklyAssignments[key];
  if (!raw) return null;
  const parsed = parseDate(raw);
  return parsed || null;
}

function setWeeklyAssignmentDate(task, scheduledDate) {
  if (!task || task.weekly !== true) return;
  if (!task.weeklyAssignments || typeof task.weeklyAssignments !== "object") {
    task.weeklyAssignments = {};
  }
  task.weeklyAssignments[getWeekKey(scheduledDate)] = scheduledDate.toISOString();
}

function clearWeeklyAssignmentDate(task, referenceDate) {
  if (!task || task.weekly !== true) return;
  if (!task.weeklyAssignments || typeof task.weeklyAssignments !== "object") return;
  const key = getWeekKey(referenceDate);
  if (Object.prototype.hasOwnProperty.call(task.weeklyAssignments, key)) {
    delete task.weeklyAssignments[key];
  }
}

function getTaskWeekSelection(task) {
  if (task && (task.targetWeek === "current" || task.targetWeek === "next")) {
    return task.targetWeek;
  }

  const due = parseDate(task && task.dueDate);
  if (!due) return "current";

  const weekStart = getCurrentWeekStart(due).getTime();
  const currentWeekStart = getCurrentWeekStart().getTime();
  const nextWeekStart = getNextWeekStart().getTime();

  if (weekStart === nextWeekStart) return "next";
  if (weekStart === currentWeekStart) return "current";
  return due > getNextWeekStart() ? "next" : "current";
}

function isTaskInCurrentWeek(task) {
  return isTaskInWeek(task, new Date());
}

function isTaskInWeek(task, referenceDate = new Date()) {
  if (!task) return false;
  const due = parseDate(task.dueDate);
  if (!due) return false;

  const dueWeekStart = getCurrentWeekStart(due).getTime();
  const referenceWeekStart = getCurrentWeekStart(referenceDate).getTime();
  if (task.weekly === true) {
    return referenceWeekStart >= dueWeekStart;
  }
  return dueWeekStart === referenceWeekStart;
}

function isTaskScheduledInWeek(task, referenceDate = new Date()) {
  if (!task) return false;
  if (task.weekly === true) {
    return !!getWeeklyAssignmentDate(task, referenceDate);
  }
  return isTaskScheduled(task);
}

function getTaskOccurrenceForDate(task, date) {
  const due = parseDate(task && task.dueDate);
  if (!due || !date) return null;

  if (task.weekly === true) {
    const dueWeekStart = getCurrentWeekStart(due).getTime();
    const dateWeekStart = getCurrentWeekStart(date).getTime();
    if (dateWeekStart < dueWeekStart) return null;
    const assignment = getWeeklyAssignmentDate(task, date);
    if (!assignment) return null;
    return assignment.toDateString() === date.toDateString() ? assignment : null;
  }

  // Unscheduled tasks (00:00) belong only in the not-scheduled list.
  if (!isTaskScheduled(task)) return null;

  return due.toDateString() === date.toDateString() ? due : null;
}

function isTaskScheduled(task) {
  if (isWebcalTask(task)) return true;
  const due = parseDate(task && task.dueDate);
  if (!due) return false;
  return due.getHours() !== 0 || due.getMinutes() !== 0 || due.getSeconds() !== 0 || due.getMilliseconds() !== 0;
}

function canToggleTaskDone(task, referenceDate = null) {
  if (!task || task.isReadonly) return false;
  const due = referenceDate instanceof Date ? referenceDate : parseDate(referenceDate || task.dueDate);
  if (!due) return false;
  return due.getTime() <= Date.now();
}

function isTaskCreatedByParent(task) {
  if (!task || !task.createdBy) return false;
  const creator = getUserById(task.createdBy);
  return !!creator && creator.role === "parent";
}

function canCurrentUserCreateTask() {
  return !!appState.currentUser && (hasRole(appState.currentUser, "parent") || hasRole(appState.currentUser, "child"));
}

function canCurrentUserDeleteTask(task) {
  if (!task || task.isReadonly || !appState.currentUser) return false;
  if (hasRole(appState.currentUser, "parent")) return true;
  return hasRole(appState.currentUser, "child")
    && task.createdBy === appState.currentUser.id
    && task.assignedTo === appState.currentUser.id;
}

function canCurrentUserEditTask(task) {
  if (!task || task.isReadonly || !appState.currentUser) return false;
  if (hasRole(appState.currentUser, "parent")) return true;
  return hasRole(appState.currentUser, "child")
    && task.createdBy === appState.currentUser.id
    && task.assignedTo === appState.currentUser.id;
}

function canCurrentUserScheduleTask(task) {
  if (!task || task.isReadonly || !appState.currentUser) return false;
  if (hasRole(appState.currentUser, "parent")) return true;
  return hasRole(appState.currentUser, "child")
    && task.assignedTo === appState.currentUser.id
    && isTaskCreatedByParent(task);
}

function formatDate(date, options = { month: "short", day: "numeric" }) {
  if (!date) return "";
  return new Intl.DateTimeFormat(appState.locale, options).format(date);
}

function formatDayMonth(date) {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}`;
}

function formatTime(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat(appState.locale, { hour: "2-digit", minute: "2-digit" }).format(date);
}

function formatTime24(date) {
  if (!date) return "";
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function getCurrentUser() {
  const sessionId = sessionStorage.getItem("sessionId");
  const fallbackUserId = sessionStorage.getItem("sessionUserId");
  let userId = fallbackUserId || null;

  if (sessionId && storage.sessions && storage.sessions[sessionId]) {
    userId = storage.sessions[sessionId].userId;
    sessionStorage.setItem("sessionUserId", userId);
  }

  if (!userId) return null;

  const user = storage.users.find((u) => u.id === userId) || null;
  if (user) {
    appState.locale = user.locale || DEFAULT_LOCALE;
  } else {
    sessionStorage.removeItem("sessionUserId");
  }
  return user;
}

function shouldShowDemoLoginHint() {
  const defaultParent = storage.users.find((u) => u.id === "parent-1" && u.role === "parent");
  if (!defaultParent) return false;
  return defaultParent.username === "parent" && defaultParent.password === "parent";
}

function hasRole(user, role) {
  return !!user && user.role === role;
}

function guard(fn) {
  return () => {
    if (!appState.currentUser) {
      renderLogin();
      return;
    }
    fn();
  };
}

// --- Persistence / CRUD -------------------------------------------------------
function saveTask(task) {
  const idx = storage.tasks.findIndex((t) => t.id === task.id);
  if (idx >= 0) {
    storage.tasks[idx] = task;
  } else {
    storage.tasks.push(task);
  }
  writeStorage(storage);
}

function deleteTask(taskId) {
  const task = storage.tasks.find((t) => t.id === taskId);
  if (!task || !canCurrentUserDeleteTask(task)) return;
  storage.tasks = storage.tasks.filter((t) => t.id !== taskId);
  setLastAction("action.taskDeleted");
  writeStorage(storage);
}

function getTasksForUser(user) {
  if (!user) return [];
  if (hasRole(user, "parent")) return storage.tasks;
  return storage.tasks.filter((task) => task.assignedTo === user.id);
}

function getChildUsers() {
  return storage.users.filter((u) => u.role === "child");
}

function getParentUsers() {
  return storage.users.filter((u) => u.role === "parent");
}

function getUserById(userId) {
  return storage.users.find((u) => u.id === userId) || null;
}

function getUserColor(user) {
  if (!user || user.role !== "child") return "#3ba3d9";
  return normalizeHexColor(user.color || user.childColor || "#3ba3d9");
}

function getUserAvatar(user) {
  if (!user) return "?";
  return normalizeAvatar(user.avatar, user);
}

function normalizeUsername(username) {
  return (username || "").trim().toLowerCase();
}

function getUserByUsername(username) {
  const normalized = normalizeUsername(username);
  return storage.users.find((u) => normalizeUsername(u.username) === normalized);
}

function isUsernameTaken(username, excludeUserId = null) {
  const normalized = normalizeUsername(username);
  if (!normalized) return false;

  return storage.users.some((u) => {
    if (excludeUserId && u.id === excludeUserId) return false;
    return normalizeUsername(u.username) === normalized;
  });
}

function createSession(user) {
  const sessionId = makeId("session");
  storage.sessions[sessionId] = { userId: user.id, createdAt: nowISO() };
  writeStorage(storage);
  sessionStorage.setItem("sessionId", sessionId);
  sessionStorage.setItem("sessionUserId", user.id);
  appState.currentUser = user;
}

function clearSession() {
  const sessionId = sessionStorage.getItem("sessionId");
  if (sessionId) {
    delete storage.sessions[sessionId];
    writeStorage(storage);
  }
  sessionStorage.removeItem("sessionId");
  sessionStorage.removeItem("sessionUserId");
  appState.currentUser = null;
}

// --- UI helpers ---------------------------------------------------------------
function q(selector) {
  return document.querySelector(selector);
}

function qsAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function createElement(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.className) el.className = options.className;
  if (options.text) el.textContent = options.text;
  if (options.html) el.innerHTML = options.html;
  if (options.attrs) {
    Object.entries(options.attrs).forEach(([k, v]) => el.setAttribute(k, v));
  }
  return el;
}

function clear(root) {
  while (root.firstChild) root.removeChild(root.firstChild);
}

function setTooltipIfTruncated(containerEl, textEl, tooltipText) {
  requestAnimationFrame(() => {
    if (!containerEl) return;
    containerEl.setAttribute("title", tooltipText);
  });
}

function setLastAction(actionKey, params = {}) {
  appState.lastAction = { key: actionKey, params };
}

function getLastActionLabel() {
  if (!appState.lastAction || !appState.lastAction.key) {
    return t("footer.lastActionNone");
  }
  return t(appState.lastAction.key, appState.lastAction.params || {});
}

function getScreenSizeLabel() {
  const width = Math.max(0, Math.round(window.innerWidth || 0));
  const height = Math.max(0, Math.round(window.innerHeight || 0));
  return `${width}x${height}`;
}

function shouldCompactOverviewWeekHeader() {
  const width = Math.max(0, Math.round(window.innerWidth || 0));
  const totalLabelLength = [t("dashboard.prevWeek"), t("calendar.today"), t("dashboard.nextWeek")]
    .join("")
    .length;

  if (width <= 560) return true;
  if (width >= 920) return false;

  if (totalLabelLength >= 30) return width <= 860;
  if (totalLabelLength >= 24) return width <= 800;
  return width <= 720;
}

function syncOverviewWeekHeaderLayout(header, nav) {
  if (!header || !nav) return;

  const applyCompactState = () => {
    header.classList.remove("compact");
    nav.classList.remove("compact");

    let compact = shouldCompactOverviewWeekHeader();
    if (!compact && header.scrollWidth > header.clientWidth) {
      compact = true;
    }

    header.classList.toggle("compact", compact);
    nav.classList.toggle("compact", compact);
  };

  requestAnimationFrame(applyCompactState);
}

// --- Rendering ---------------------------------------------------------------
function renderApp() {
  const root = q("#root");
  clear(root);

  if (!appState.currentUser) {
    return renderLogin();
  }

  renderShell(root);
}

function renderShell(root) {
  if (appState.currentTab === "calendar") {
    appState.currentTab = "dashboard";
  }
  if (appState.currentTab === "tasks") {
    appState.currentTab = "dashboard";
  }
  if (!hasRole(appState.currentUser, "parent") && appState.currentTab === "settings") {
    appState.currentTab = "dashboard";
  }

  const header = createElement("header", { className: "header" });
  const menuBtn = createElement("button", { className: "button secondary menu-toggle", html: icon("menu") });
  menuBtn.addEventListener("click", () => {
    clearMenuHideTimer();
    appState.menuOpen = !appState.menuOpen;
    renderApp();
  });

  const logo = createElement("div", { className: "logo", html: `<span class="logo-icon">${icon("calendarCheck")}</span><span class="logo-text">TiMiPlanner</span>` });

  const toolbar = createElement("div", { className: "toolbar" });

  // Context-aware toolbar buttons
  if (hasRole(appState.currentUser, "parent")) {
    if (appState.selectedTask && !appState.selectedTask.isReadonly) {
      const editBtn = createElement("button", {
        className: "button secondary compact-on-small",
        html: `${icon("edit")}<span class="button-label">${t("task.edit")}</span>`,
        attrs: { "aria-label": t("task.edit"), title: t("task.edit") },
      });
      editBtn.addEventListener("click", () => buildTaskForm(appState.selectedTask));
      toolbar.appendChild(editBtn);

      const deleteBtn = createElement("button", {
        className: "button danger compact-on-small",
        html: `${icon("delete")}<span class="button-label">${t("task.delete")}</span>`,
        attrs: { "aria-label": t("task.delete"), title: t("task.delete") },
      });
      deleteBtn.addEventListener("click", () => {
        if (confirm(t("task.deleteConfirm"))) {
          deleteTask(appState.selectedTask.id);
          appState.selectedTask = null;
          renderApp();
        }
      });
      toolbar.appendChild(deleteBtn);
    }
  }

  const greeting = createElement("div", {
    className: "help",
    html: `${t("welcome")}, <strong>${appState.currentUser.name}</strong>`,
  });

  const nav = createElement("nav", { className: `nav ${appState.menuOpen ? "open" : ""}` });
  nav.addEventListener("mouseenter", () => {
    clearMenuHideTimer();
  });
  nav.addEventListener("mouseleave", () => {
    if (appState.menuOpen) {
      scheduleMenuHide();
    }
  });
  const tabs = [
    { id: "dashboard", label: t("tab.dashboard") },
    { id: "statistics", label: t("tab.statistics") },
  ];
  if (hasRole(appState.currentUser, "parent")) {
    tabs.push({ id: "settings", label: t("tab.settings") });
  }

  tabs.forEach((tab) => {
    const btn = createElement("button", {
      className: "nav-item",
      html: `${icon(tab.id)}<span>${tab.label}</span>`,
    });
    btn.addEventListener("mouseenter", () => {
      clearMenuHideTimer();
    });
    btn.addEventListener("click", () => {
      clearMenuHideTimer();
      appState.currentTab = tab.id;
      appState.menuOpen = false;
      renderApp();
    });
    if (appState.currentTab === tab.id) {
      btn.classList.add("primary");
    }
    nav.appendChild(btn);
  });

  // Add logout button to menu
  const logoutBtn = createElement("button", { className: "nav-item menu-logout", html: `${icon("logout")}<span>${t("logout")}</span>` });
  logoutBtn.addEventListener("mouseenter", () => {
    clearMenuHideTimer();
  });
  logoutBtn.addEventListener("click", () => {
    clearMenuHideTimer();
    clearSession();
    renderApp();
  });
  nav.appendChild(logoutBtn);

  header.appendChild(menuBtn);
  header.appendChild(logo);
  header.appendChild(toolbar);
  header.appendChild(greeting);
  header.appendChild(nav);

  const content = createElement("main", { className: "content" });

  if (appState.currentTab === "dashboard") {
    renderDashboard(content);
  } else if (appState.currentTab === "statistics") {
    renderStatistics(content);
  } else if (appState.currentTab === "settings") {
    renderSettings(content);
  }

  root.appendChild(header);
  root.appendChild(content);

  const footer = createElement("footer", { className: "footer" });
  footer.innerHTML = `<span>${t("footer.lastAction", { action: getLastActionLabel() })}</span><span>${t("footer.screen", { size: getScreenSizeLabel() })}</span><span>${t("footer.version")}</span>`;
  root.appendChild(footer);
}

function renderLogin() {
  const root = q("#root");
  clear(root);

  const loginContainer = createElement("div", { className: "login-container" });

  const panel = createElement("section", { className: "panel" });
  const title = createElement("h2", { text: t("login.title") });
  const form = createElement("form", { className: "form" });

  const usernameField = createElement("label");
  usernameField.innerHTML = `<span>${t("login.username")}</span>`;
  const usernameInput = createElement("input", {
    className: "input",
    attrs: { type: "text", name: "username", autocomplete: "username" },
  });
  usernameField.appendChild(usernameInput);

  const passwordField = createElement("label");
  passwordField.innerHTML = `<span>${t("login.password")}</span>`;
  const passwordInput = createElement("input", {
    className: "input",
    attrs: { type: "password", name: "password", autocomplete: "current-password" },
  });
  passwordField.appendChild(passwordInput);

  const error = createElement("div", { className: "help" });

  const submit = createElement("button", { className: "button primary", text: t("login.submit") });
  submit.type = "submit";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const user = getUserByUsername(username);

    if (!user || user.password !== password) {
      error.textContent = t("login.error");
      return;
    }

    createSession(user);
    appState.currentUser = user;
    appState.currentTab = "dashboard";
    renderApp();
  });

  form.appendChild(usernameField);
  form.appendChild(passwordField);
  form.appendChild(error);
  form.appendChild(submit);

  panel.appendChild(title);
  panel.appendChild(form);
  if (shouldShowDemoLoginHint()) {
    const hint = createElement("div", { className: "help" });
    hint.textContent = t("login.hint");
    panel.appendChild(hint);
  }
  loginContainer.appendChild(panel);
  root.appendChild(loginContainer);
}

function renderDashboard(container) {
  const panel = createElement("section", { className: "panel dashboard-panel" });
  panel.appendChild(createElement("h2", { text: t("dashboard.title") }));

  const user = appState.currentUser;
  if (hasRole(user, "parent") || hasRole(user, "child")) {
    const parentMode = hasRole(user, "parent");
    const children = parentMode ? getChildUsers() : [user];
    const weekReferenceDate = parseDate(appState.calendarDate) || new Date();
    const overview = createElement("div", { className: "grid grid-2" });

    children.forEach((child) => {
      const childPanel = createElement("div", { className: "task" });
      const childColor = getUserColor(child);
      childPanel.style.background = hexToRgba(childColor, 0.12);
      childPanel.style.borderColor = hexToRgba(childColor, 0.42);

      const headerRow = createElement("div", { className: "overview-child-header" });
      const titleWrap = createElement("div", { className: "overview-child-title" });
      const heading = createElement("h3", { text: child.name });
      const tasks = storage.tasks.filter((t) => t.assignedTo === child.id);
      const weeklyTasks = tasks.filter((task) => isTaskInWeek(task, weekReferenceDate));
      const weeklyDone = weeklyTasks.filter((task) => task.done === true).length;
      const stats = createElement("span", { className: "overview-child-stats", text: `${weeklyTasks.length} / ${weeklyDone}` });

      const unscheduledTasks = tasks.filter((task) => !isTaskScheduledInWeek(task, weekReferenceDate) && isTaskInWeek(task, weekReferenceDate));
      const unscheduledDropZone = createElement("div", { className: "overview-unscheduled-dropzone" });
      if (parentMode || hasRole(user, "child")) {
        unscheduledDropZone.addEventListener("dragover", (event) => {
          event.preventDefault();
        });
        unscheduledDropZone.addEventListener("drop", (event) => handleDropToUnscheduled(event, child.id));
      }

      const badgeDiv = createElement("div", { className: "overview-child-actions" });
      const unscheduledBadge = createElement("span", { className: "badge", text: `${unscheduledTasks.length} ${t("dashboard.unscheduledTasks")}` });
      unscheduledBadge.style.background = hexToRgba(childColor, 0.18);
      unscheduledBadge.style.color = childColor;
      badgeDiv.appendChild(unscheduledBadge);

      if (parentMode || (hasRole(user, "child") && canCurrentUserCreateTask())) {
        const addTaskBtn = createElement("button", {
          className: "button secondary overview-inline-button compact-on-small",
          html: `${icon("add")}<span class="button-label">${t("tasks.create")}</span>`,
          attrs: { "aria-label": t("tasks.create"), title: t("tasks.create") },
        });
        addTaskBtn.addEventListener("click", () => buildTaskForm(null, { assignedTo: child.id }));
        badgeDiv.appendChild(addTaskBtn);
      }

      titleWrap.appendChild(heading);
      titleWrap.appendChild(stats);
      headerRow.appendChild(titleWrap);
      headerRow.appendChild(badgeDiv);

      childPanel.appendChild(headerRow);

      if (unscheduledTasks.length > 0) {
        const list = createElement("div", { className: "overview-unscheduled-table" });
        unscheduledTasks.forEach((task) => {
          const item = createElement("div", { className: "overview-task-item" });
          const title = createElement("span", { className: "overview-task-title", text: task.title });
          item.appendChild(title);

          const actions = createElement("div", { className: "overview-unscheduled-actions" });

          let doneLabel = null;

          if (canToggleTaskDone(task)) {
            doneLabel = createElement("label", { className: "task-done-toggle" });
            const doneInput = createElement("input", {
              className: "input-checkbox",
              attrs: { type: "checkbox", "aria-label": t("task.done") },
            });
            doneInput.checked = task.done === true;
            doneInput.addEventListener("click", (event) => {
              event.stopPropagation();
            });
            doneInput.addEventListener("change", () => {
              task.done = doneInput.checked;
              saveTask(task);
              setLastAction(doneInput.checked ? "action.taskDone" : "action.taskUndone");
              renderApp();
            });
            doneLabel.appendChild(doneInput);
            doneLabel.appendChild(createElement("span", { text: t("task.done") }));
          }

          if (!task.isReadonly && (parentMode || canCurrentUserScheduleTask(task))) {
            item.setAttribute("draggable", "true");
            item.addEventListener("dragstart", (event) => {
              event.dataTransfer.setData("text/plain", task.id);
            });
          }

          if (!task.isReadonly && (parentMode || canCurrentUserDeleteTask(task))) {
            if (parentMode) {
              const edit = createElement("button", {
                className: "button secondary overview-inline-button compact-on-small",
                html: `${icon("edit")}<span class="button-label">${t("task.edit")}</span>`,
                attrs: { "aria-label": t("task.edit"), title: t("task.edit") },
              });
              edit.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                buildTaskForm(task);
              });
              actions.appendChild(edit);
            }

            const del = createElement("button", {
              className: "button danger overview-inline-button compact-on-small",
              html: `${icon("delete")}<span class="button-label">${t("task.delete")}</span>`,
              attrs: { "aria-label": t("task.delete"), title: t("task.delete") },
            });
            del.addEventListener("click", (event) => {
              event.preventDefault();
              event.stopPropagation();
              if (!confirm(t("task.deleteConfirm"))) return;
              deleteTask(task.id);
              renderApp();
            });

            actions.appendChild(del);
          }

          if (!actions.hasChildNodes()) {
            actions.classList.add("empty");
          }
          item.appendChild(actions);

          if (task.isReadonly) {
            item.appendChild(createReadonlyLock());
          }

          if (doneLabel) {
            item.appendChild(doneLabel);
          }
          list.appendChild(item);
        });
        unscheduledDropZone.appendChild(list);
      } else {
        const none = createElement("div", { className: "help", text: t("dashboard.noUnscheduled") });
        unscheduledDropZone.appendChild(none);
      }

      childPanel.appendChild(unscheduledDropZone);

      overview.appendChild(childPanel);
    });

    panel.appendChild(overview);
    const weekPanel = renderParentWeekCalendar(parseDate(appState.calendarDate) || new Date(), {
      assigneeIds: parentMode ? null : [user.id],
      interactive: true,
    });
    weekPanel.style.marginTop = "0.85rem";
    weekPanel.style.marginBottom = "calc(0.9rem - 15px)";
    panel.appendChild(weekPanel);
  }

  container.appendChild(panel);
}

function renderTaskCard(task, showActions = true) {
  const card = createElement("div", { className: "task" });
  const assignee = getUserById(task.assignedTo);
  const assigneeColor = getUserColor(assignee);
  card.style.borderColor = hexToRgba(assigneeColor, 0.35);
  card.style.background = hexToRgba(assigneeColor, 0.1);

  const titleRow = createElement("div", { className: "task-title-row" });
  const title = createElement("h3", { text: task.title });
  const avatar = createElement("span", { className: "user-avatar" });
  avatar.textContent = getUserAvatar(assignee);
  avatar.title = assignee ? assignee.name : "";
  avatar.style.background = hexToRgba(assigneeColor, 0.2);
  avatar.style.borderColor = hexToRgba(assigneeColor, 0.5);
  titleRow.appendChild(avatar);
  titleRow.appendChild(title);
  if (task.isReadonly) {
    titleRow.appendChild(createReadonlyLock());
  }

  const metaText = isTaskScheduled(task)
    ? `${t("task.due")}: ${formatDate(new Date(task.dueDate))} • ${t("task.durationShort")}: ${formatDurationMinutes(getTaskDurationMinutes(task))}`
    : `${t("task.targetWeek")}: ${t(getTaskWeekSelection(task) === "next" ? "task.nextWeek" : "task.thisWeek")}`;
  const meta = createElement("div", { className: "meta", text: metaText });

  const badges = createElement("div", { className: "badges" });
  if (assignee) {
    const assignedBadge = createElement("span", { className: "badge", text: `${getUserAvatar(assignee)} ${assignee.name}` });
    assignedBadge.style.background = hexToRgba(assigneeColor, 0.15);
    assignedBadge.style.color = assigneeColor;
    badges.appendChild(assignedBadge);
  }
  if (task.weekly === true) {
    badges.appendChild(createElement("span", { className: "badge", text: t("task.weekly") }));
  }
  if (task.done === true) {
    badges.appendChild(createElement("span", { className: "badge", text: t("task.done") }));
  }
  if (task.isReadonly) {
    badges.appendChild(createElement("span", { className: "badge", text: t("task.readonly") }));
  }

  card.appendChild(titleRow);
  card.appendChild(meta);

  if (canToggleTaskDone(task)) {
    const doneRow = createElement("label", { className: "task-done-toggle" });
    const doneInput = createElement("input", {
      className: "input-checkbox",
      attrs: { type: "checkbox", "aria-label": t("task.done") },
    });
    doneInput.checked = task.done === true;
    doneInput.addEventListener("change", () => {
      task.done = doneInput.checked;
      saveTask(task);
      setLastAction(doneInput.checked ? "action.taskDone" : "action.taskUndone");
      renderApp();
    });
    doneRow.appendChild(doneInput);
    doneRow.appendChild(createElement("span", { text: t("task.done") }));
    card.appendChild(doneRow);
  }

  card.appendChild(badges);

  if (task.description) {
    const desc = createElement("div", { className: "help", text: task.description });
    card.appendChild(desc);
  }

  if (showActions && !task.isReadonly && hasRole(appState.currentUser, "parent")) {
    const actions = createElement("div", { className: "task-card-actions" });
    const edit = createElement("button", {
      className: "button secondary compact-on-small",
      html: `${icon("edit")}<span class="button-label">${t("task.edit")}</span>`,
      attrs: { "aria-label": t("task.edit"), title: t("task.edit") },
    });
    edit.addEventListener("click", () => buildTaskForm(task));
    const del = createElement("button", {
      className: "button danger compact-on-small",
      html: `${icon("delete")}<span class="button-label">${t("task.delete")}</span>`,
      attrs: { "aria-label": t("task.delete"), title: t("task.delete") },
    });
    del.addEventListener("click", () => {
      if (confirm(t("task.deleteConfirm"))) {
        deleteTask(task.id);
        renderApp();
      }
    });

    actions.appendChild(edit);
    actions.appendChild(del);
    card.appendChild(actions);
  }

  return card;
}

function buildTaskForm(existingTask = null, defaults = {}) {
  if (existingTask && !canCurrentUserEditTask(existingTask)) {
    return;
  }
  if (!existingTask && !canCurrentUserCreateTask()) {
    return;
  }

  const childMode = hasRole(appState.currentUser, "child");

  const existingOverlay = document.querySelector(".task-editor-overlay");
  if (existingOverlay) {
    existingOverlay.remove();
  }

  const overlay = createElement("div", { className: "task-editor-overlay settings-overlay" });
  const panel = createElement("section", { className: "task-editor-dialog settings-overlay-dialog card settings-card" });

  const header = createElement("div", { className: "task-editor-header" });
  const heading = createElement("h2", { text: existingTask ? t("task.editTitle") : t("task.createTitle") });
  const closeBtn = createElement("button", {
    className: "button secondary compact-on-small",
    html: `${icon("cancel")}<span class="button-label">${t("task.cancel")}</span>`,
    attrs: { "aria-label": t("task.cancel"), title: t("task.cancel") },
  });
  closeBtn.type = "button";
  closeBtn.addEventListener("click", () => {
    overlay.remove();
  });
  header.appendChild(heading);
  header.appendChild(closeBtn);
  panel.appendChild(header);

  const form = createElement("form", { className: "form" });

  const titleLabel = createElement("label");
  titleLabel.innerHTML = `<span>${t("task.title")}</span>`;
  const titleInput = createElement("input", { className: "input", attrs: { type: "text", name: "title" } });
  titleLabel.appendChild(titleInput);

  const descLabel = createElement("label");
  descLabel.innerHTML = `<span>${t("task.description")}</span>`;
  const descInput = createElement("textarea", { className: "textarea", attrs: { rows: "3", name: "description" } });
  descLabel.appendChild(descInput);

  const weekLabel = createElement("label");
  weekLabel.innerHTML = `<span>${t("task.targetWeek")}</span>`;
  const weekSelect = createElement("select", { className: "select", attrs: { name: "targetWeek" } });
  weekSelect.innerHTML = `
    <option value="current">${t("task.thisWeek")}</option>
    <option value="next">${t("task.nextWeek")}</option>
  `;
  weekLabel.appendChild(weekSelect);

  const assigneeLabel = createElement("label");
  assigneeLabel.innerHTML = `<span>${t("task.assignedTo")}</span>`;
  const assigneeSelect = createElement("select", { className: "select", attrs: { name: "assignedTo" } });
  getChildUsers().forEach((child) => {
    const option = createElement("option", { text: child.name, attrs: { value: child.id } });
    assigneeSelect.appendChild(option);
  });
  assigneeLabel.appendChild(assigneeSelect);

  const durationLabel = createElement("label");
  durationLabel.innerHTML = `<span>${t("task.duration")}</span>`;
  const durationInput = createElement("input", {
    className: "input",
    attrs: { type: "number", name: "durationMinutes", min: "15", step: "15" },
  });
  durationInput.value = "30";
  durationLabel.appendChild(durationInput);

  const weeklyLabel = createElement("label");
  weeklyLabel.innerHTML = `<span>${t("task.weekly")}</span>`;
  const weeklyInput = createElement("input", {
    className: "input-checkbox",
    attrs: { type: "checkbox", name: "weekly" },
  });
  weeklyInput.checked = false;
  weeklyLabel.appendChild(weeklyInput);

  const doneLabel = createElement("label");
  doneLabel.innerHTML = `<span>${t("task.done")}</span>`;
  const doneInput = createElement("input", {
    className: "input-checkbox",
    attrs: { type: "checkbox", name: "done" },
  });
  doneInput.checked = false;
  doneLabel.appendChild(doneInput);

  const error = createElement("div", { className: "help" });

  const actions = createElement("div", { style: "display:flex;gap:0.75rem;flex-wrap:wrap;" });
  const saveBtn = createElement("button", {
    className: "button primary compact-on-small",
    html: `${icon("save")}<span class="button-label">${t("task.save")}</span>`,
    attrs: { "aria-label": t("task.save"), title: t("task.save") },
  });
  saveBtn.type = "submit";
  if (existingTask && canCurrentUserDeleteTask(existingTask)) {
    const deleteBtn = createElement("button", {
      className: "button danger compact-on-small",
      html: `${icon("delete")}<span class="button-label">${t("task.delete")}</span>`,
      attrs: { "aria-label": t("task.delete"), title: t("task.delete") },
    });
    deleteBtn.type = "button";
    deleteBtn.addEventListener("click", () => {
      if (!confirm(t("task.deleteConfirm"))) return;
      deleteTask(existingTask.id);
      overlay.remove();
      renderApp();
    });
    actions.appendChild(deleteBtn);
  }
  const cancelBtn = createElement("button", {
    className: "button secondary compact-on-small",
    html: `${icon("cancel")}<span class="button-label">${t("task.cancel")}</span>`,
    attrs: { "aria-label": t("task.cancel"), title: t("task.cancel") },
  });
  cancelBtn.type = "button";
  cancelBtn.addEventListener("click", () => {
    overlay.remove();
  });

  actions.appendChild(saveBtn);
  actions.appendChild(cancelBtn);

  form.appendChild(titleLabel);
  form.appendChild(descLabel);
  form.appendChild(weekLabel);
  form.appendChild(assigneeLabel);
  form.appendChild(durationLabel);
  form.appendChild(weeklyLabel);
  form.appendChild(doneLabel);
  form.appendChild(error);
  form.appendChild(actions);

  if (existingTask) {
    titleInput.value = existingTask.title;
    descInput.value = existingTask.description;
    weekSelect.value = getTaskWeekSelection(existingTask);
    assigneeSelect.value = existingTask.assignedTo;
    durationInput.value = String(getTaskDurationMinutes(existingTask));
    weeklyInput.checked = existingTask.weekly === true;
    doneInput.checked = existingTask.done === true;
  } else {
    if (defaults && defaults.assignedTo) {
      assigneeSelect.value = defaults.assignedTo;
    }
  }

  if (childMode) {
    assigneeSelect.value = appState.currentUser.id;
    assigneeSelect.disabled = true;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const assignedTo = childMode ? appState.currentUser.id : assigneeSelect.value;
    const targetWeek = weekSelect.value;
    const durationMinutes = normalizeTaskDurationMinutes(durationInput.value, 30);
    const weekly = weeklyInput.checked;
    const done = doneInput.checked;

    if (!title) {
      error.textContent = t("task.saveError");
      return;
    }

    if (durationMinutes < 15) {
      error.textContent = t("task.durationMinError");
      return;
    }

    const dueAnchor = getWeekAnchorDate(targetWeek);
    const dueDate = existingTask && parseDate(existingTask.dueDate)
      ? new Date(existingTask.dueDate)
      : dueAnchor;

    const weeklyAssignments = (existingTask && existingTask.weeklyAssignments && typeof existingTask.weeklyAssignments === "object")
      ? { ...existingTask.weeklyAssignments }
      : {};

    const weeklyAnchor = getCurrentWeekStart(dueDate);
    weeklyAnchor.setHours(0, 0, 0, 0);

    const task = existingTask
      ? {
          ...existingTask,
          title,
          description: descInput.value.trim(),
          dueDate: weekly ? weeklyAnchor.toISOString() : dueDate.toISOString(),
          durationMinutes,
          targetWeek,
          assignedTo,
          weekly,
          weeklyAssignments: weekly ? weeklyAssignments : undefined,
          done,
        }
      : {
          id: makeId("task"),
          title,
          description: descInput.value.trim(),
          assignedTo,
          createdBy: appState.currentUser.id,
          dueDate: weekly ? weeklyAnchor.toISOString() : dueAnchor.toISOString(),
          durationMinutes,
          targetWeek,
          weekly,
          weeklyAssignments: weekly ? {} : undefined,
          done,
          type: "regular",
          isReadonly: false,
        };

    if (existingTask && !canCurrentUserEditTask(task)) {
      return;
    }
    if (!existingTask && childMode) {
      task.assignedTo = appState.currentUser.id;
      task.createdBy = appState.currentUser.id;
    }

    saveTask(task);
    setLastAction(existingTask ? "action.taskScheduled" : "action.taskAdded");
    overlay.remove();
    renderApp();
  });

  panel.appendChild(form);
  overlay.appendChild(panel);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.remove();
    }
  });
  document.body.appendChild(overlay);
}

function renderTaskList(container) {
  const panel = createElement("section", { className: "panel" });
  panel.appendChild(createElement("h2", { text: t("tasks.title") }));

  const actions = createElement("div", { style: "display:flex;gap:0.75rem;flex-wrap:wrap;" });
  if (hasRole(appState.currentUser, "parent")) {
    const createBtn = createElement("button", {
      className: "button primary compact-on-small",
      html: `${icon("add")}<span class="button-label">${t("tasks.create")}</span>`,
      attrs: { "aria-label": t("tasks.create"), title: t("tasks.create") },
    });
    createBtn.addEventListener("click", () => buildTaskForm());
    actions.appendChild(createBtn);
  }

  const sortSelect = createElement("select", { className: "select" });
  sortSelect.innerHTML = `
    <option value="due">${t("tasks.sortDue")}</option>
    <option value="assigned">${t("tasks.sortAssigned")}</option>
  `;
  sortSelect.value = appState.taskSort;
  sortSelect.addEventListener("change", () => {
    appState.taskSort = sortSelect.value;
    renderApp();
  });
  actions.appendChild(sortSelect);

  panel.appendChild(actions);

  const tasks = getTasksForUser(appState.currentUser).slice();

  if (appState.taskSort === "assigned") {
    tasks.sort((a, b) => a.assignedTo.localeCompare(b.assignedTo));
  } else {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  if (tasks.length === 0) {
    panel.appendChild(createElement("div", { className: "help", text: t("tasks.noTasks") }));
  } else {
    const grid = createElement("div", { className: "grid grid-2" });
    tasks.forEach((task) => grid.appendChild(renderTaskCard(task, true)));
    panel.appendChild(grid);
  }

  container.appendChild(panel);
}

function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
  // Calculate diff to get to Monday (1): if Sunday (0) add 1, otherwise subtract (day-1)
  const diff = day === 0 ? 1 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

function handleDrop(e) {
  e.preventDefault();
  const taskId = e.dataTransfer.getData("text/plain");
  const dropTarget = e.target.closest("[data-date][data-time]") || e.currentTarget;
  const date = dropTarget ? dropTarget.getAttribute("data-date") : null;
  const time = dropTarget ? dropTarget.getAttribute("data-time") : null;
  if (!taskId || !date || !time) return;

  const task = storage.tasks.find(t => t.id === taskId);
  if (!task || task.isReadonly || !canCurrentUserScheduleTask(task)) return;

  const [hour, min] = time.split(':').map(Number);
  const newDate = new Date(date);
  newDate.setHours(hour, min, 0, 0);

  if (task.weekly === true) {
    setWeeklyAssignmentDate(task, newDate);
  } else {
    task.dueDate = newDate.toISOString();
  }

  setLastAction("action.taskScheduled");
  writeStorage(storage);
  renderApp();
}

function handleDropToUnscheduled(e, childId) {
  e.preventDefault();
  const taskId = e.dataTransfer.getData("text/plain");
  if (!taskId) return;

  const task = storage.tasks.find((candidate) => candidate.id === taskId);
  if (!task || task.isReadonly || !canCurrentUserScheduleTask(task)) return;

  const referenceDate = parseDate(appState.calendarDate) || new Date();

  const unscheduledDate = getCurrentWeekStart(referenceDate);
  unscheduledDate.setHours(0, 0, 0, 0);

  task.assignedTo = childId;
  if (task.weekly === true) {
    clearWeeklyAssignmentDate(task, referenceDate);
  } else {
    task.targetWeek = "current";
    task.dueDate = unscheduledDate.toISOString();
  }

  setLastAction("action.taskUnscheduled");
  writeStorage(storage);
  renderApp();
}

function attachWeeklyTaskResize(task, taskEl, slotMinutes, slotHeight) {
  if (!canCurrentUserScheduleTask(task)) return;

  const handle = createElement("span", { className: "overview-week-task-resize-handle" });
  handle.setAttribute("title", t("task.duration"));

  handle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });

  handle.addEventListener("mousedown", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const startY = event.clientY;
    const startDuration = getTaskDurationMinutes(task);
    let nextDuration = startDuration;
    let changed = false;

    taskEl.classList.add("resizing");

    const onMouseMove = (moveEvent) => {
      const deltaPx = moveEvent.clientY - startY;
      const deltaMinutes = (deltaPx / slotHeight) * slotMinutes;
      const snapped = normalizeTaskDurationMinutes(startDuration + deltaMinutes, startDuration);
      if (snapped === nextDuration) return;

      nextDuration = snapped;
      changed = true;
      const previewHeight = Math.max(26, (nextDuration / slotMinutes) * slotHeight);
      taskEl.style.height = `${previewHeight}px`;
    };

    const onMouseUp = async () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      taskEl.classList.remove("resizing");

      if (!changed) return;
      task.durationMinutes = nextDuration;
      setLastAction("action.taskDurationChanged", { minutes: String(nextDuration) });
      await writeStorage(storage);
      renderApp();
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  taskEl.appendChild(handle);
}

function renderParentWeekCalendar(referenceDate = new Date(appState.calendarDate), options = {}) {
  const allowedAssigneeIds = Array.isArray(options.assigneeIds) ? options.assigneeIds : null;
  const interactive = options.interactive !== false;
  const panel = createElement("section", { className: "panel overview-week-panel" });
  const weekStartDate = getWeekStart(new Date(referenceDate));
  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekEndDate.getDate() + 6);

  const header = createElement("div", { className: "overview-week-header" });
  const title = createElement("h2", {
    className: "overview-week-title",
    text: t("dashboard.calendarWeekRange", {
      start: formatDayMonth(weekStartDate),
      end: formatDayMonth(weekEndDate),
    }),
  });

  const nav = createElement("div", { className: "overview-week-nav" });
  const prevBtn = createElement("button", {
    className: "button secondary",
    html: `${icon("prev")}<span class="button-label">${t("dashboard.prevWeek")}</span>`,
    attrs: { "aria-label": t("dashboard.prevWeek"), title: t("dashboard.prevWeek") },
  });
  const todayBtn = createElement("button", {
    className: "button secondary",
    html: `${icon("today")}<span class="button-label">${t("calendar.today")}</span>`,
    attrs: { "aria-label": t("calendar.today"), title: t("calendar.today") },
  });
  const nextBtn = createElement("button", {
    className: "button secondary",
    html: `<span class="button-label">${t("dashboard.nextWeek")}</span>${icon("next")}`,
    attrs: { "aria-label": t("dashboard.nextWeek"), title: t("dashboard.nextWeek") },
  });

  prevBtn.addEventListener("click", () => {
    const prevWeekStart = new Date(weekStartDate);
    prevWeekStart.setDate(prevWeekStart.getDate() - 7);
    appState.calendarDate = prevWeekStart.toISOString();
    renderApp();
  });

  todayBtn.addEventListener("click", () => {
    appState.calendarDate = new Date().toISOString();
    renderApp();
  });

  nextBtn.addEventListener("click", () => {
    const nextWeekStart = new Date(weekStartDate);
    nextWeekStart.setDate(nextWeekStart.getDate() + 7);
    appState.calendarDate = nextWeekStart.toISOString();
    renderApp();
  });

  nav.appendChild(prevBtn);
  nav.appendChild(todayBtn);
  nav.appendChild(nextBtn);
  header.appendChild(title);
  header.appendChild(nav);
  syncOverviewWeekHeaderLayout(header, nav);

  panel.appendChild(header);
  const slotMinutes = 30;
  const slotHeight = 42;
  const headerHeight = 56;
  const totalSlots = (24 * 60) / slotMinutes;
  let currentTimeTop = null;
  const scrollWrap = createElement("div", { className: "overview-week-scroll" });
  const grid = createElement("div", { className: "overview-week-grid" });

  const timeColumn = createElement("div", { className: "overview-time-column" });
  const timeHeader = createElement("div", { className: "overview-time-header", text: "Time" });
  timeColumn.appendChild(timeHeader);

  for (let slot = 0; slot < totalSlots; slot++) {
    const totalMinutes = slot * slotMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const label = createElement("div", {
      className: "overview-time-slot",
      text: minutes === 0 ? `${hours.toString().padStart(2, "0")}:00` : "",
    });
    label.style.height = `${slotHeight}px`;
    timeColumn.appendChild(label);
  }

  grid.appendChild(timeColumn);

  for (let day = 0; day < 7; day++) {
    const date = new Date(weekStartDate);
    date.setDate(date.getDate() + day);

    const dayColumn = createElement("div", { className: "overview-week-day" });
    const isToday = date.toDateString() === new Date().toDateString();
    if (isToday) {
      dayColumn.classList.add("current-day");
    }

    const dayHeader = createElement("div", { className: "overview-day-header" });
    const dayName = createElement("div", { className: "overview-day-name", text: formatDate(date, { weekday: "short" }) });
    const dayNum = createElement("div", { className: "overview-day-num", text: formatDayMonth(date) });
    dayHeader.appendChild(dayName);
    dayHeader.appendChild(dayNum);
    dayColumn.appendChild(dayHeader);

    const lane = createElement("div", { className: "overview-day-lane" });
    lane.style.height = `${totalSlots * slotHeight}px`;

    for (let slot = 0; slot < totalSlots; slot++) {
      const totalMinutes = slot * slotMinutes;
      const hour = Math.floor(totalMinutes / 60);
      const minute = totalMinutes % 60;
      const slotEl = createElement("div", { className: "overview-grid-slot" });
      slotEl.setAttribute("data-date", date.toISOString().split("T")[0]);
      slotEl.setAttribute("data-time", `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
      if (interactive) {
        slotEl.addEventListener("dragover", (event) => event.preventDefault());
        slotEl.addEventListener("drop", handleDrop);
      }
      lane.appendChild(slotEl);
    }

    const tasks = storage.tasks
      .filter((task) => !allowedAssigneeIds || allowedAssigneeIds.includes(task.assignedTo))
      .map((task) => {
        const occurrenceDue = getTaskOccurrenceForDate(task, date);
        if (!occurrenceDue) return null;
        return { task, due: occurrenceDue };
      })
      .filter(Boolean);

    const cardMinHeight = 14;
    const cardVerticalGap = 2;
    const cardHorizontalPadding = 6;

    const laidOutTasks = tasks
      .map((occurrence) => {
        const due = occurrence.due;
        if (!due) return null;
        const durationMinutes = getTaskDurationMinutes(occurrence.task);
        const totalMinutes = (due.getHours() * 60) + due.getMinutes();
        const top = (totalMinutes / slotMinutes) * slotHeight;
        const durationHeight = (durationMinutes / slotMinutes) * slotHeight;
        const cardHeight = Math.max(cardMinHeight, durationHeight);
        return {
          task: occurrence.task,
          due,
          top: Math.max(0, top),
          height: cardHeight,
          end: Math.max(0, top) + cardHeight + cardVerticalGap,
          column: 0,
          columnCount: 1,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.top - b.top);

    const active = [];
    laidOutTasks.forEach((entry) => {
      for (let i = active.length - 1; i >= 0; i -= 1) {
        if (active[i].end <= entry.top) {
          active.splice(i, 1);
        }
      }

      const usedColumns = new Set(active.map((item) => item.column));
      let column = 0;
      while (usedColumns.has(column)) {
        column += 1;
      }

      entry.column = column;
      active.push(entry);
    });

    laidOutTasks.forEach((entry) => {
      let maxColumn = entry.column;
      laidOutTasks.forEach((other) => {
        const overlaps = entry.top < other.end && other.top < entry.end;
        if (overlaps) {
          maxColumn = Math.max(maxColumn, other.column);
        }
      });
      entry.columnCount = Math.max(1, maxColumn + 1);
    });

    laidOutTasks.forEach((entry) => {
      const due = entry.due;
      if (!due) return;

      const canSchedule = interactive && canCurrentUserScheduleTask(entry.task);
      const canEdit = interactive && canCurrentUserEditTask(entry.task);

      const assignee = getUserById(entry.task.assignedTo);
      const assigneeColor = getUserColor(assignee);
      const taskEl = createElement("div", {
        className: "overview-week-task-card",
        attrs: { draggable: (!entry.task.isReadonly && canSchedule) ? "true" : "false" },
      });
      taskEl.style.top = `${entry.top}px`;
      taskEl.style.height = `${entry.height}px`;
      taskEl.style.background = hexToRgba(assigneeColor, 0.18);
      taskEl.style.borderColor = hexToRgba(assigneeColor, 0.5);
      taskEl.style.left = `calc(${cardHorizontalPadding}px + (${entry.column} * (100% - ${cardHorizontalPadding * 2}px) / ${entry.columnCount}))`;
      taskEl.style.width = `calc((100% - ${cardHorizontalPadding * 2}px) / ${entry.columnCount} - 2px)`;
      taskEl.style.right = "auto";

      const avatar = createElement("span", { className: "user-avatar tiny", text: getUserAvatar(assignee) });
      avatar.style.background = hexToRgba(assigneeColor, 0.24);
      avatar.style.borderColor = hexToRgba(assigneeColor, 0.5);

      const text = createElement("span", { className: "overview-week-task-label", text: entry.task.title });
      taskEl.appendChild(avatar);
      taskEl.appendChild(text);

      if (canToggleTaskDone(entry.task, due)) {
        const doneLabel = createElement("label", { className: "task-done-toggle inline" });
        const doneInput = createElement("input", {
          className: "input-checkbox",
          attrs: { type: "checkbox", "aria-label": t("task.done") },
        });
        doneInput.checked = entry.task.done === true;
        doneInput.addEventListener("click", (event) => {
          event.stopPropagation();
        });
        doneInput.addEventListener("mousedown", (event) => {
          event.stopPropagation();
        });
        doneInput.addEventListener("change", () => {
          entry.task.done = doneInput.checked;
          saveTask(entry.task);
          setLastAction(doneInput.checked ? "action.taskDone" : "action.taskUndone");
          renderApp();
        });
        doneLabel.appendChild(doneInput);
        taskEl.appendChild(doneLabel);
      }

      if (entry.task.isReadonly) {
        taskEl.appendChild(createReadonlyLock());
      } else if (canSchedule) {
        taskEl.addEventListener("dragstart", (event) => {
          event.dataTransfer.setData("text/plain", entry.task.id);
        });
        attachWeeklyTaskResize(entry.task, taskEl, slotMinutes, slotHeight);
      }

      const assigneeName = assignee ? assignee.name : t("task.unassigned");
      const tooltipText = `${entry.task.title} • ${formatTime24(due)} • ${formatDurationMinutes(getTaskDurationMinutes(entry.task))} • ${assigneeName}`;
      setTooltipIfTruncated(taskEl, text, tooltipText);

      taskEl.addEventListener("click", () => {
        if (entry.task.isReadonly || !canEdit) return;
        appState.selectedTask = entry.task;
        buildTaskForm(entry.task);
      });

      lane.appendChild(taskEl);
    });

    if (isToday) {
      const now = new Date();
      const minutesNow = (now.getHours() * 60) + now.getMinutes();
      const lineTop = (minutesNow / slotMinutes) * slotHeight;
      if (lineTop >= 0 && lineTop <= totalSlots * slotHeight) {
        const nowLine = createElement("div", { className: "overview-now-line" });
        nowLine.style.top = `${lineTop}px`;
        lane.appendChild(nowLine);
        currentTimeTop = lineTop;
      }
    }

    dayColumn.appendChild(lane);
    grid.appendChild(dayColumn);
  }

  scrollWrap.appendChild(grid);
  panel.appendChild(scrollWrap);

  if (currentTimeTop !== null) {
    requestAnimationFrame(() => {
      const target = Math.max(0, currentTimeTop - (headerHeight + 120));
      scrollWrap.scrollTop = target;
    });
  }

  return panel;
}

function renderSettings(container) {
  const panel = createElement("section", { className: "panel" });
  panel.appendChild(createElement("h2", { text: t("settings.title") }));

  const help = createElement("div", { className: "help" });
  help.textContent = t("settings.help");
  panel.appendChild(help);

  const profileSection = createElement("div", { className: "card settings-card" });
  profileSection.appendChild(createElement("h3", { text: t("settings.profileTitle") }));

  const profileForm = createElement("form", { className: "form" });

  const profileNameLabel = createElement("label");
  profileNameLabel.innerHTML = `<span>${t("settings.name")}</span>`;
  const profileNameInput = createElement("input", { className: "input", attrs: { type: "text", name: "name" } });
  profileNameInput.value = appState.currentUser.name || "";
  profileNameLabel.appendChild(profileNameInput);

  const profileUsernameLabel = createElement("label");
  profileUsernameLabel.innerHTML = `<span>${t("settings.username")}</span>`;
  const profileUsernameInput = createElement("input", { className: "input", attrs: { type: "text", name: "username", autocomplete: "username" } });
  profileUsernameInput.value = appState.currentUser.username || "";
  profileUsernameLabel.appendChild(profileUsernameInput);

  const profileLangLabel = createElement("label");
  profileLangLabel.innerHTML = `<span>${t("settings.languageSelect")}</span>`;
  const profileLangSelect = createElement("select", { className: "select", attrs: { name: "language" } });
  profileLangSelect.innerHTML = `
    <option value="en">English</option>
    <option value="de">Deutsch</option>
  `;
  profileLangSelect.value = appState.currentUser.locale || appState.locale;
  profileLangLabel.appendChild(profileLangSelect);

  const profilePasswordLabel = createElement("label");
  profilePasswordLabel.innerHTML = `<span>${t("settings.passwordNew")}</span>`;
  const profilePasswordInput = createElement("input", {
    className: "input",
    attrs: { type: "password", name: "password", autocomplete: "new-password", placeholder: t("settings.passwordKeep") },
  });
  profilePasswordLabel.appendChild(profilePasswordInput);

  const profileHint = createElement("div", { className: "help", text: t("settings.passwordKeep") });

  const profileChildAvatarLabel = createElement("label");
  profileChildAvatarLabel.innerHTML = `<span>${t("settings.childAvatar")}</span>`;
  const profileChildAvatarInput = createElement("input", { className: "input", attrs: { type: "text", maxlength: "2", name: "childAvatar" } });
  profileChildAvatarInput.value = getUserAvatar(appState.currentUser);
  profileChildAvatarLabel.appendChild(profileChildAvatarInput);

  const profileChildColorLabel = createElement("label");
  profileChildColorLabel.innerHTML = `<span>${t("settings.childColor")}</span>`;
  const profileChildColorInput = createElement("input", { className: "input input-color", attrs: { type: "color", name: "childColor" } });
  profileChildColorInput.value = getUserColor(appState.currentUser);
  profileChildColorLabel.appendChild(profileChildColorInput);

  const profileChildWebcalLabel = createElement("label");
  profileChildWebcalLabel.innerHTML = `<span>${t("settings.webcalChildLink")}</span>`;
  const profileChildWebcalInput = createElement("input", {
    className: "input",
    attrs: { type: "text", name: "childWebcal", placeholder: "webcal://..." },
  });
  profileChildWebcalInput.value = appState.currentUser.webcalUrl || "";
  profileChildWebcalLabel.appendChild(profileChildWebcalInput);

  const profileChildWebcalEnabledLabel = createElement("label");
  profileChildWebcalEnabledLabel.innerHTML = `<span>${t("settings.webcalLinkSyncEnabled")}</span>`;
  const profileChildWebcalEnabledInput = createElement("input", {
    className: "input-checkbox",
    attrs: { type: "checkbox", name: "childWebcalEnabled" },
  });
  profileChildWebcalEnabledInput.checked = appState.currentUser.webcalEnabled !== false;
  profileChildWebcalEnabledLabel.appendChild(profileChildWebcalEnabledInput);

  const profileChildHint = createElement("div", { className: "help", text: t("settings.childAvatarHint") });
  const profileResult = createElement("div", { className: "help" });

  const profileSaveBtn = createElement("button", {
    className: "button primary compact-on-small",
    html: `${icon("save")}<span class="button-label">${t("settings.saveProfile")}</span>`,
    attrs: { "aria-label": t("settings.saveProfile"), title: t("settings.saveProfile") },
  });
  profileSaveBtn.type = "submit";

  profileForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    profileResult.textContent = "";

    const name = profileNameInput.value.trim();
    const username = profileUsernameInput.value.trim();
    const password = profilePasswordInput.value;
    const locale = profileLangSelect.value;
    const childAvatar = profileChildAvatarInput.value;
    const childColor = profileChildColorInput.value;
    const childWebcal = profileChildWebcalInput.value.trim();
    const childWebcalEnabled = profileChildWebcalEnabledInput.checked;

    if (!name) {
      profileResult.textContent = t("settings.profileErrorName");
      return;
    }

    if (!username) {
      profileResult.textContent = t("settings.profileErrorUsername");
      return;
    }

    if (isUsernameTaken(username, appState.currentUser.id)) {
      profileResult.textContent = t("settings.profileErrorUsernameTaken");
      return;
    }

    const userIdx = storage.users.findIndex((u) => u.id === appState.currentUser.id);
    if (userIdx < 0) return;

    storage.users[userIdx].name = name;
    storage.users[userIdx].username = username;
    storage.users[userIdx].locale = locale;
    if (storage.users[userIdx].role === "child") {
      storage.users[userIdx].avatar = normalizeAvatar(childAvatar, storage.users[userIdx]);
      storage.users[userIdx].color = normalizeHexColor(childColor, getUserColor(storage.users[userIdx]));
      storage.users[userIdx].webcalUrl = childWebcal;
      storage.users[userIdx].webcalEnabled = childWebcalEnabled;
    }
    if (password) {
      storage.users[userIdx].password = password;
    }

    appState.currentUser = storage.users[userIdx];
    appState.locale = locale;
    storage.locale = locale;
    await writeStorage(storage);

    if (storage.users[userIdx].role === "child") {
      try {
        await flushDatabaseWrite();
        await syncCalendars({ silent: true });
      } catch (error) {
        console.error("Profile webcal sync failed", error);
      }
    }

    profilePasswordInput.value = "";
    profileResult.textContent = t("settings.profileSaved");
    renderApp();
  });

  profileForm.appendChild(profileNameLabel);
  profileForm.appendChild(profileUsernameLabel);
  profileForm.appendChild(profileLangLabel);
  profileForm.appendChild(profilePasswordLabel);
  if (appState.currentUser.role === "child") {
    profileForm.appendChild(profileChildAvatarLabel);
    profileForm.appendChild(profileChildColorLabel);
    profileForm.appendChild(profileChildWebcalLabel);
    profileForm.appendChild(profileChildWebcalEnabledLabel);
    profileForm.appendChild(profileChildHint);
  }
  profileForm.appendChild(profileHint);
  profileForm.appendChild(profileSaveBtn);
  profileForm.appendChild(profileResult);
  const parentMode = hasRole(appState.currentUser, "parent");
  if (!parentMode) {
    profileSection.appendChild(profileForm);
    panel.appendChild(profileSection);
    panel.appendChild(createElement("div", { className: "help", text: t("settings.parentOnly") }));
    container.appendChild(panel);
    return;
  }

  const userMgmtSection = createElement("div", { className: "card settings-card" });
  userMgmtSection.appendChild(createElement("h3", { text: t("settings.userManagementTitle") }));
  userMgmtSection.appendChild(createElement("div", { className: "help", text: t("settings.userManagementHelp") }));

  const tableHeader = createElement("div", { className: "settings-users-header" });
  tableHeader.appendChild(createElement("h4", { className: "settings-subtitle", text: t("settings.existingUsersTitle") }));
  const openAddUserBtn = createElement("button", {
    className: "button primary compact-on-small",
    html: `${icon("add")}<span class="button-label">${t("settings.addUserButton")}</span>`,
    attrs: { "aria-label": t("settings.addUserButton"), title: t("settings.addUserButton") },
  });
  openAddUserBtn.type = "button";
  openAddUserBtn.addEventListener("click", () => {
    appState.settingsEditingUserId = "__new__";
    renderApp();
  });
  tableHeader.appendChild(openAddUserBtn);
  userMgmtSection.appendChild(tableHeader);

  const tableWrap = createElement("div", { className: "settings-users-table-wrap" });
  const table = createElement("table", { className: "settings-users-table" });
  const thead = createElement("thead");
  const headRow = createElement("tr");
  [
    t("settings.userTableName"),
    t("settings.userTableUsername"),
    t("settings.userTableRole"),
    t("settings.userTableLanguage"),
    t("settings.userTableActions"),
  ].forEach((label) => {
    headRow.appendChild(createElement("th", { text: label }));
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = createElement("tbody");
  storage.users.forEach((user) => {
    const row = createElement("tr");
    row.appendChild(createElement("td", { text: user.name || "" }));
    row.appendChild(createElement("td", { text: user.username || "" }));
    row.appendChild(createElement("td", { text: t(user.role === "parent" ? "settings.roleParent" : "settings.roleChild") }));
    row.appendChild(createElement("td", { text: user.locale === "de" ? "Deutsch" : "English" }));

    const actionsCell = createElement("td");
    const actionsRow = createElement("div", { className: "settings-table-actions" });
    const editBtn = createElement("button", {
      className: "button secondary compact-on-small",
      html: `${icon("edit")}<span class="button-label">${t("settings.editUserButton")}</span>`,
      attrs: { "aria-label": t("settings.editUserButton"), title: t("settings.editUserButton") },
    });
    editBtn.type = "button";
    editBtn.addEventListener("click", () => {
      appState.settingsEditingUserId = user.id;
      renderApp();
    });

    const deleteBtn = createElement("button", {
      className: "button danger compact-on-small",
      html: `${icon("delete")}<span class="button-label">${t("settings.deleteUserButton")}</span>`,
      attrs: { "aria-label": t("settings.deleteUserButton"), title: t("settings.deleteUserButton") },
    });
    deleteBtn.type = "button";
    deleteBtn.addEventListener("click", async () => {
      if (appState.currentUser && appState.currentUser.id === user.id) {
        alert(t("settings.deleteUserBlockedSelf"));
        return;
      }
      if (user.role === "parent" && getParentUsers().length <= 1) {
        alert(t("settings.deleteUserBlockedLastParent"));
        return;
      }
      if (!confirm(t("settings.deleteUserConfirm", { name: user.name }))) {
        return;
      }

      storage.users = storage.users.filter((candidate) => candidate.id !== user.id);
      storage.tasks = storage.tasks.filter((task) => task.assignedTo !== user.id);
      await writeStorage(storage);
      if (user.role === "child") {
        try {
          await flushDatabaseWrite();
          await syncCalendars({ silent: true });
        } catch (error) {
          console.error("User delete sync failed", error);
        }
      }
      alert(t("settings.userDeleted"));
      renderApp();
    });

    actionsRow.appendChild(editBtn);
    actionsRow.appendChild(deleteBtn);
    actionsCell.appendChild(actionsRow);
    row.appendChild(actionsCell);
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  tableWrap.appendChild(table);
  userMgmtSection.appendChild(tableWrap);

  const isAddMode = appState.settingsEditingUserId === "__new__";
  const editingUser = isAddMode ? null : storage.users.find((user) => user.id === appState.settingsEditingUserId);
  if (appState.settingsEditingUserId && !isAddMode && !editingUser) {
    appState.settingsEditingUserId = null;
  }

  if (appState.settingsEditingUserId) {
    const overlay = createElement("div", { className: "settings-overlay" });
    const dialog = createElement("div", { className: "settings-overlay-dialog card settings-card" });
    const overlayHeader = createElement("div", { className: "settings-editor-header" });
    overlayHeader.appendChild(createElement("h4", { text: isAddMode ? t("settings.addUserTitle") : `${t("settings.editUserTitle")}: ${editingUser.name}` }));
    const closeOverlayBtn = createElement("button", {
      className: "button secondary compact-on-small",
      html: `${icon("prev")}<span class="button-label">${t("settings.backToUsers")}</span>`,
      attrs: { "aria-label": t("settings.backToUsers"), title: t("settings.backToUsers") },
    });
    closeOverlayBtn.type = "button";
    closeOverlayBtn.addEventListener("click", () => {
      appState.settingsEditingUserId = null;
      renderApp();
    });
    overlayHeader.appendChild(closeOverlayBtn);
    dialog.appendChild(overlayHeader);

    const formUser = isAddMode
      ? {
          id: null,
          role: "parent",
          locale: appState.locale || DEFAULT_LOCALE,
          name: "",
          username: "",
          avatar: "",
          color: DEFAULT_CHILD_COLORS[getChildUsers().length % DEFAULT_CHILD_COLORS.length],
          webcalUrl: "",
          webcalEnabled: true,
        }
      : editingUser;

    const userForm = createElement("form", { className: "form settings-grid-2" });
    const userRoleEditable = isAddMode;

    const userNameLabel = createElement("label");
    userNameLabel.innerHTML = `<span>${t("settings.name")}</span>`;
    const userNameInput = createElement("input", { className: "input", attrs: { type: "text" } });
    userNameInput.value = formUser.name || "";
    userNameLabel.appendChild(userNameInput);

    const userRoleLabel = createElement("label");
    userRoleLabel.innerHTML = `<span>${t("settings.role")}</span>`;
    let userRoleSelect = null;
    let userRoleText = null;
    if (userRoleEditable) {
      userRoleSelect = createElement("select", { className: "select" });
      userRoleSelect.innerHTML = `
        <option value="parent">${t("settings.roleParent")}</option>
        <option value="child">${t("settings.roleChild")}</option>
      `;
      userRoleSelect.value = formUser.role;
      userRoleLabel.appendChild(userRoleSelect);
    } else {
      userRoleText = createElement("input", { className: "input", attrs: { type: "text", readonly: "readonly" } });
      userRoleText.value = t(formUser.role === "parent" ? "settings.roleParent" : "settings.roleChild");
      userRoleLabel.appendChild(userRoleText);
    }

    const userUsernameLabel = createElement("label");
    userUsernameLabel.innerHTML = `<span>${t("settings.username")}</span>`;
    const userUsernameInput = createElement("input", { className: "input", attrs: { type: "text", autocomplete: "username" } });
    userUsernameInput.value = formUser.username || "";
    userUsernameLabel.appendChild(userUsernameInput);

    const userLocaleLabel = createElement("label");
    userLocaleLabel.innerHTML = `<span>${t("settings.languageSelect")}</span>`;
    const userLocaleSelect = createElement("select", { className: "select" });
    userLocaleSelect.innerHTML = `
      <option value="en">English</option>
      <option value="de">Deutsch</option>
    `;
    userLocaleSelect.value = formUser.locale || DEFAULT_LOCALE;
    userLocaleLabel.appendChild(userLocaleSelect);

    const userPasswordLabel = createElement("label", { className: "settings-span-2" });
    userPasswordLabel.innerHTML = `<span>${t("settings.passwordNew")}</span>`;
    const userPasswordInput = createElement("input", {
      className: "input",
      attrs: { type: "password", autocomplete: "new-password", placeholder: t("settings.passwordKeep") },
    });
    userPasswordLabel.appendChild(userPasswordInput);

    const userAvatarLabel = createElement("label");
    userAvatarLabel.innerHTML = `<span>${t("settings.childAvatar")}</span>`;
    const userAvatarInput = createElement("input", { className: "input", attrs: { type: "text", maxlength: "2" } });
    userAvatarInput.value = formUser.role === "child" ? getUserAvatar(formUser) : "";
    userAvatarLabel.appendChild(userAvatarInput);

    const userColorLabel = createElement("label");
    userColorLabel.innerHTML = `<span>${t("settings.childColor")}</span>`;
    const userColorInput = createElement("input", { className: "input input-color", attrs: { type: "color" } });
    userColorInput.value = formUser.role === "child" ? getUserColor(formUser) : DEFAULT_CHILD_COLORS[0];
    userColorLabel.appendChild(userColorInput);

    const userWebcalLabel = createElement("label", { className: "settings-span-2" });
    userWebcalLabel.innerHTML = `<span>${t("settings.webcalChildLink")}</span>`;
    const userWebcalInput = createElement("input", {
      className: "input",
      attrs: { type: "text", placeholder: "webcal://..." },
    });
    userWebcalInput.value = formUser.webcalUrl || "";
    userWebcalLabel.appendChild(userWebcalInput);

    const userWebcalEnabledLabel = createElement("label", { className: "settings-span-2" });
    userWebcalEnabledLabel.innerHTML = `<span>${t("settings.webcalLinkSyncEnabled")}</span>`;
    const userWebcalEnabledInput = createElement("input", {
      className: "input-checkbox",
      attrs: { type: "checkbox" },
    });
    userWebcalEnabledInput.checked = formUser.webcalEnabled !== false;
    userWebcalEnabledLabel.appendChild(userWebcalEnabledInput);

    const userChildHint = createElement("div", { className: "help settings-span-2", text: t("settings.childAvatarHint") });
    const userResult = createElement("div", { className: "help settings-span-2" });
    const userSaveBtn = createElement("button", {
      className: "button primary settings-span-2 compact-on-small",
      html: `${icon("save")}<span class="button-label">${isAddMode ? t("settings.addUserButton") : t("settings.saveUserButton")}</span>`,
      attrs: {
        "aria-label": isAddMode ? t("settings.addUserButton") : t("settings.saveUserButton"),
        title: isAddMode ? t("settings.addUserButton") : t("settings.saveUserButton"),
      },
    });
    userSaveBtn.type = "submit";

    function currentRole() {
      return userRoleSelect ? userRoleSelect.value : formUser.role;
    }

    function toggleChildFields() {
      const showChild = currentRole() === "child";
      userAvatarLabel.style.display = showChild ? "grid" : "none";
      userColorLabel.style.display = showChild ? "grid" : "none";
      userWebcalLabel.style.display = showChild ? "grid" : "none";
      userWebcalEnabledLabel.style.display = showChild ? "grid" : "none";
      userChildHint.style.display = showChild ? "block" : "none";
    }

    if (userRoleSelect) {
      userRoleSelect.addEventListener("change", toggleChildFields);
    }
    toggleChildFields();

    userForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      userResult.textContent = "";

      const name = userNameInput.value.trim();
      const username = userUsernameInput.value.trim();
      const newPassword = userPasswordInput.value;
      const locale = userLocaleSelect.value;
      const role = currentRole();
      const avatar = userAvatarInput.value;
      const color = userColorInput.value;
      const webcalUrl = userWebcalInput.value.trim();
      const webcalEnabled = userWebcalEnabledInput.checked;

      if (!name) {
        userResult.textContent = t("settings.profileErrorName");
        return;
      }
      if (!username) {
        userResult.textContent = t("settings.profileErrorUsername");
        return;
      }
      if (isUsernameTaken(username, isAddMode ? null : formUser.id)) {
        userResult.textContent = t("settings.profileErrorUsernameTaken");
        return;
      }
      if (isAddMode && !newPassword) {
        userResult.textContent = t("settings.addUserErrorPassword");
        return;
      }

      let savedUser = null;
      if (isAddMode) {
        savedUser = {
          id: makeId(role === "parent" ? "parent" : "child"),
          username,
          password: newPassword,
          role,
          name,
          locale,
        };
        if (role === "child") {
          savedUser.avatar = normalizeAvatar(avatar, savedUser);
          savedUser.color = normalizeHexColor(color, DEFAULT_CHILD_COLORS[getChildUsers().length % DEFAULT_CHILD_COLORS.length]);
          savedUser.webcalUrl = webcalUrl;
          savedUser.webcalEnabled = webcalEnabled;
        }
        storage.users.push(savedUser);
      } else {
        const userIdx = storage.users.findIndex((candidate) => candidate.id === formUser.id);
        if (userIdx < 0) return;
        storage.users[userIdx].name = name;
        storage.users[userIdx].username = username;
        storage.users[userIdx].locale = locale;
        if (storage.users[userIdx].role === "child") {
          storage.users[userIdx].avatar = normalizeAvatar(avatar, storage.users[userIdx]);
          storage.users[userIdx].color = normalizeHexColor(color, getUserColor(storage.users[userIdx]));
          storage.users[userIdx].webcalUrl = webcalUrl;
          storage.users[userIdx].webcalEnabled = webcalEnabled;
        }
        if (newPassword) {
          storage.users[userIdx].password = newPassword;
        }
        savedUser = storage.users[userIdx];
      }

      if (!savedUser) return;

      if (appState.currentUser && appState.currentUser.id === savedUser.id) {
        appState.currentUser = savedUser;
        appState.locale = savedUser.locale || appState.locale;
      }

      await writeStorage(storage);
      if (savedUser.role === "child") {
        try {
          await flushDatabaseWrite();
          await syncCalendars({ silent: true });
        } catch (error) {
          console.error("User save sync failed", error);
        }
      }

      appState.settingsEditingUserId = null;
      renderApp();
    });

    userForm.appendChild(userNameLabel);
    userForm.appendChild(userRoleLabel);
    userForm.appendChild(userUsernameLabel);
    userForm.appendChild(userLocaleLabel);
    userForm.appendChild(userAvatarLabel);
    userForm.appendChild(userColorLabel);
    userForm.appendChild(userWebcalLabel);
    userForm.appendChild(userWebcalEnabledLabel);
    userForm.appendChild(userChildHint);
    userForm.appendChild(userPasswordLabel);
    userForm.appendChild(userSaveBtn);
    userForm.appendChild(userResult);
    dialog.appendChild(userForm);
    overlay.appendChild(dialog);
    userMgmtSection.appendChild(overlay);
  }
  panel.appendChild(userMgmtSection);

  const section = createElement("div", { className: "card settings-card" });
  section.appendChild(createElement("h3", { text: t("settings.webcalTitle") }));

  const form = createElement("form", { className: "form" });
  const commonLabel = createElement("label");
  commonLabel.innerHTML = `<span>${t("settings.webcalCommon")}</span>`;
  const commonInput = createElement("input", {
    className: "input",
    attrs: { type: "text", name: "commonWebcal", placeholder: "webcal://..." },
  });
  commonInput.value = (storage.calendarSync && storage.calendarSync.commonUrl) || "";
  commonLabel.appendChild(commonInput);

  const commonEnabledLabel = createElement("label");
  commonEnabledLabel.innerHTML = `<span>${t("settings.webcalCommonSyncEnabled")}</span>`;
  const commonEnabledInput = createElement("input", {
    className: "input-checkbox",
    attrs: { type: "checkbox", name: "commonWebcalEnabled" },
  });
  commonEnabledInput.checked = !storage.calendarSync || storage.calendarSync.commonEnabled !== false;
  commonEnabledLabel.appendChild(commonEnabledInput);

  const intervalLabel = createElement("label");
  intervalLabel.innerHTML = `<span>${t("settings.syncInterval")}</span>`;
  const intervalInput = createElement("input", {
    className: "input",
    attrs: { type: "number", name: "syncInterval", min: "5", step: "1" },
  });
  intervalInput.value = String((storage.calendarSync && storage.calendarSync.intervalMinutes) || 60);
  intervalLabel.appendChild(intervalInput);

  const syncHelp = createElement("div", { className: "help", text: t("settings.webcalHint") });
  const result = createElement("div", { className: "help" });

  const actionRow = createElement("div", { style: "display:flex;gap:0.75rem;flex-wrap:wrap;" });
  const saveBtn = createElement("button", {
    className: "button primary compact-on-small",
    html: `${icon("save")}<span class="button-label">${t("settings.syncSave")}</span>`,
    attrs: { "aria-label": t("settings.syncSave"), title: t("settings.syncSave") },
  });
  saveBtn.type = "submit";

  const syncNowBtn = createElement("button", {
    className: "button secondary compact-on-small",
    html: `${icon("refresh")}<span class="button-label">${t("settings.syncNow")}</span>`,
    attrs: { "aria-label": t("settings.syncNow"), title: t("settings.syncNow") },
  });
  syncNowBtn.type = "button";

  syncNowBtn.addEventListener("click", async () => {
    result.textContent = t("settings.syncRunning");
    try {
      const syncResult = await syncCalendars({ silent: true });
      if (syncResult.hadError) {
        result.textContent = t("settings.syncFailed");
      } else {
        result.textContent = t("settings.syncDone", { count: syncResult.count });
      }
      renderApp();
    } catch (error) {
      console.error(error);
      result.textContent = t("settings.syncFailed");
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    result.textContent = "";

    const intervalMinutes = Number(intervalInput.value);
    if (!Number.isFinite(intervalMinutes) || intervalMinutes < 5) {
      result.textContent = t("settings.syncInvalidInterval");
      return;
    }

    if (!storage.calendarSync || typeof storage.calendarSync !== "object") {
      storage.calendarSync = {
        intervalMinutes: 60,
        commonUrl: "",
        commonEnabled: true,
        lastSyncedAt: null,
        lastCount: 0,
        lastError: "",
        sourceCount: 0,
      };
    }

    storage.calendarSync.commonUrl = commonInput.value.trim();
    storage.calendarSync.commonEnabled = commonEnabledInput.checked;
    storage.calendarSync.intervalMinutes = Math.round(intervalMinutes);
    writeStorage(storage);
    setupCalendarSyncTimer();

    result.textContent = t("settings.syncSaved");
  });

  actionRow.appendChild(saveBtn);
  actionRow.appendChild(syncNowBtn);

  form.appendChild(commonLabel);
  form.appendChild(commonEnabledLabel);
  form.appendChild(intervalLabel);
  form.appendChild(actionRow);
  form.appendChild(syncHelp);
  form.appendChild(createElement("div", { className: "help", text: t("settings.syncFetchHint") }));

  const status = createElement("div", { className: "help" });
  const lastSync = storage.calendarSync && storage.calendarSync.lastSyncedAt
    ? formatDate(new Date(storage.calendarSync.lastSyncedAt), { year: "numeric", month: "short", day: "numeric" }) + " " + formatTime(new Date(storage.calendarSync.lastSyncedAt))
    : t("settings.syncNever");
  const lastCount = Number((storage.calendarSync && storage.calendarSync.lastCount) || 0);
  const sourceCount = Number((storage.calendarSync && storage.calendarSync.sourceCount) || 0);
  const lastError = (storage.calendarSync && storage.calendarSync.lastError) || "";
  const hasSources = sourceCount > 0;
  const connectionState = !hasSources
    ? "unknown"
    : lastError
      ? "error"
      : "ok";
  const connectionLabel = connectionState === "ok"
    ? t("settings.connectionOk")
    : connectionState === "error"
      ? t("settings.connectionError")
      : t("settings.connectionUnknown");

  const connectionRow = createElement("div", { className: "sync-connection-row" });
  const connectionLight = createElement("span", { className: `status-light ${connectionState}` });
  const connectionText = createElement("span", { text: `${t("settings.connection")}: ${connectionLabel}` });
  connectionRow.appendChild(connectionLight);
  connectionRow.appendChild(connectionText);

  status.appendChild(createElement("strong", { text: t("settings.syncStatus") }));
  status.appendChild(createElement("br"));
  status.appendChild(createElement("div", { text: t("settings.syncPolicy", { interval: String(getSyncIntervalMinutes()) }) }));
  status.appendChild(connectionRow);
  status.appendChild(createElement("div", { text: `${t("settings.syncLast")}: ${lastSync}` }));
  status.appendChild(createElement("div", { text: `${t("settings.syncCount")}: ${lastCount}` }));
  status.appendChild(createElement("div", { text: sourceCount > 0 ? `${t("settings.syncSources")}: ${sourceCount}` : t("settings.syncNoSources") }));
  status.appendChild(createElement("div", { text: `${t("settings.syncError")}: ${lastError || t("settings.syncNoError")}` }));

  form.appendChild(status);
  form.appendChild(result);

  section.appendChild(form);
  panel.appendChild(section);
  container.appendChild(panel);
}

function renderStatistics(container) {
  const panel = createElement("section", { className: "panel" });
  panel.appendChild(createElement("h2", { text: t("stats.title") }));

  const parentMode = hasRole(appState.currentUser, "parent");

  const range = appState.statisticsRange || "3m";
  const rangeBar = createElement("div", { className: "statistics-range" });
  const rangeOptions = [
    { key: "1m", label: t("stats.rangeMonth") },
    { key: "3m", label: t("stats.rangeThreeMonths") },
    { key: "1y", label: t("stats.rangeYear") },
  ];

  rangeOptions.forEach((option) => {
    const btn = createElement("button", { className: `button secondary statistics-filter-button ${range === option.key ? "active" : ""}`, text: option.label });
    btn.addEventListener("click", () => {
      appState.statisticsRange = option.key;
      renderApp();
    });
    rangeBar.appendChild(btn);
  });

  panel.appendChild(rangeBar);

  const children = parentMode ? getChildUsers() : [appState.currentUser];
  const selectedChildId = parentMode ? (appState.statisticsChildId || "all") : appState.currentUser.id;

  if (parentMode) {
    const childFilterBar = createElement("div", { className: "statistics-child-filter" });
    childFilterBar.appendChild(createElement("span", { className: "help", text: `${t("stats.childFilter")}:` }));

    const childOptions = [
      { id: "all", name: t("stats.allChildren") },
      ...children.map((child) => ({ id: child.id, name: child.name })),
    ];

    childOptions.forEach((option) => {
      const isActive = selectedChildId === option.id;
      const btn = createElement("button", { className: `button secondary statistics-filter-button ${isActive ? "active" : ""}`, text: option.name });
      btn.addEventListener("click", () => {
        appState.statisticsChildId = option.id;
        renderApp();
      });
      childFilterBar.appendChild(btn);
    });

    panel.appendChild(childFilterBar);
  }

  const activeChildren = selectedChildId === "all"
    ? children
    : children.filter((child) => child.id === selectedChildId);

  const now = new Date();
  const start = getStatisticsRangeStart(range);
  const weekStarts = getWeekStartsInRange(start, now);

  const weekData = weekStarts.map((weekStart) => {
    const perChild = {};
    children.forEach((child) => {
      perChild[child.id] = { total: 0, done: 0 };
    });

    storage.tasks.forEach((task) => {
      const slot = perChild[task.assignedTo];
      if (!slot) return;
      if (!isTaskInWeekForStats(task, weekStart)) return;
      slot.total += 1;
      if (isTaskDoneInWeekForStats(task, weekStart)) {
        slot.done += 1;
      }
    });

    return { weekStart, perChild };
  });

  const maxTotal = Math.max(
    1,
    ...weekData.flatMap((week) => activeChildren.map((child) => week.perChild[child.id].total))
  );
  const totalTasksInRange = weekData.reduce((sum, week) => {
    return sum + activeChildren.reduce((childSum, child) => childSum + week.perChild[child.id].total, 0);
  }, 0);

  if (weekData.length === 0 || activeChildren.length === 0 || totalTasksInRange === 0) {
    panel.appendChild(createElement("div", { className: "help", text: t("stats.noData") }));
    container.appendChild(panel);
    return;
  }

  const legend = createElement("div", { className: "statistics-legend" });
  activeChildren.forEach((child) => {
    const marker = createElement("span", { className: "statistics-legend-color" });
    marker.style.background = hexToRgba(getUserColor(child), 0.85);
    const item = createElement("div", { className: "statistics-legend-item" });
    item.appendChild(marker);
    item.appendChild(createElement("span", { text: child.name }));
    legend.appendChild(item);
  });
  panel.appendChild(legend);

  const chartShell = createElement("div", { className: "statistics-chart-shell" });
  const yAxis = createElement("div", { className: "statistics-y-axis" });
  const axisValues = [];
  for (let value = maxTotal; value >= 0; value -= 1) {
    axisValues.push(value);
  }

  axisValues.forEach((value) => {
    const ratio = maxTotal > 0 ? value / maxTotal : 0;
    const tick = createElement("div", { className: "statistics-y-tick" });
    tick.style.bottom = `${Math.round(ratio * 150)}px`;
    tick.appendChild(createElement("span", { className: "statistics-y-label", text: String(value) }));
    yAxis.appendChild(tick);
  });

  const chart = createElement("div", { className: "statistics-chart" });

  weekData.forEach((week) => {
    const weekCol = createElement("div", { className: "statistics-week" });
    const bars = createElement("div", { className: "statistics-bars" });
    const weekEnd = new Date(week.weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    axisValues.forEach((value) => {
      const ratio = maxTotal > 0 ? value / maxTotal : 0;
      const gridLine = createElement("div", { className: "statistics-grid-line" });
      gridLine.style.bottom = `${Math.round(ratio * 150)}px`;
      bars.appendChild(gridLine);
    });

    activeChildren.forEach((child) => {
      const childStats = week.perChild[child.id];
      const totalHeight = (childStats.total / maxTotal) * 150;
      const doneHeight = (childStats.done / maxTotal) * 150;

      const barWrap = createElement("div", { className: "statistics-bar-wrap" });
      barWrap.setAttribute("data-tooltip", `${child.name} | ${formatDayMonth(week.weekStart)} - ${formatDayMonth(weekEnd)} | ${t("stats.total")}: ${childStats.total}, ${t("stats.done")}: ${childStats.done}`);

      const stack = createElement("div", { className: "statistics-bar-stack" });

      const totalBar = createElement("div", { className: "statistics-bar statistics-bar-total" });
      totalBar.style.height = `${childStats.total > 0 ? Math.max(2, totalHeight) : 0}px`;
      totalBar.style.background = hexToRgba(getUserColor(child), 0.28);
      totalBar.style.borderColor = hexToRgba(getUserColor(child), 0.55);

      stack.appendChild(totalBar);

      const doneBar = createElement("div", { className: "statistics-bar statistics-bar-done-secondary" });
      doneBar.style.height = `${childStats.done > 0 ? Math.max(2, doneHeight) : 0}px`;
      doneBar.style.background = hexToRgba(getUserColor(child), 0.9);
      doneBar.style.borderColor = hexToRgba(getUserColor(child), 0.96);
      stack.appendChild(doneBar);

      barWrap.appendChild(stack);
      bars.appendChild(barWrap);
    });

    weekCol.appendChild(bars);
    weekCol.appendChild(createElement("div", { className: "statistics-week-label", text: formatDayMonth(week.weekStart) }));
    weekCol.appendChild(createElement("div", { className: "statistics-week-label secondary", text: formatDayMonth(weekEnd) }));
    chart.appendChild(weekCol);
  });

  chartShell.appendChild(yAxis);
  chartShell.appendChild(chart);
  panel.appendChild(chartShell);
  container.appendChild(panel);
}

function normalizeCalendarUrl(url) {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  if (/^webcal:\/\//i.test(trimmed)) {
    return trimmed.replace(/^webcal:\/\//i, "https://");
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return "";
}

function getSyncIntervalMinutes() {
  const configured = Number(storage.calendarSync && storage.calendarSync.intervalMinutes);
  if (!Number.isFinite(configured)) return 60;
  return Math.max(5, Math.round(configured));
}

function setupCalendarSyncTimer() {
  // Sync scheduling is backend-owned and persisted in SQLite.
}

async function syncCalendars({ silent = false } = {}) {
  const response = await fetch("/api/sync/run", { method: "POST" });
  let payload = null;
  try {
    payload = await response.json();
  } catch (_error) {
    payload = null;
  }

  if (!response.ok || !payload || payload.ok !== true) {
    throw new Error((payload && payload.error) || "Failed to run sync.");
  }

  await refreshStorageFromDatabase({ renderIfChanged: !silent, force: true });
  return { count: Number(payload.count) || 0, hadError: !!payload.hadError };
}

async function refreshStorageFromDatabase({ renderIfChanged = true, force = false } = {}) {
  const remote = await readStorageFromDatabase();
  if (!remote || !remote.data) return false;

  if (!force && appState.stateUpdatedAt && remote.updatedAt && appState.stateUpdatedAt === remote.updatedAt) {
    return false;
  }

  storage = applyUserDefaults(remote.data);
  appState.stateUpdatedAt = remote.updatedAt || nowISO();

  const previousUserId = appState.currentUser ? appState.currentUser.id : null;
  if (previousUserId) {
    appState.currentUser = getUserById(previousUserId);
    if (!appState.currentUser) {
      sessionStorage.removeItem("sessionId");
      sessionStorage.removeItem("sessionUserId");
    }
  } else {
    appState.currentUser = getCurrentUser();
  }

  if (appState.currentUser) {
    appState.locale = appState.currentUser.locale || appState.locale;
  }

  if (renderIfChanged) {
    renderApp();
  }

  return true;
}

function setupStateRefreshTimer() {
  if (appState.stateRefreshTimer) {
    clearInterval(appState.stateRefreshTimer);
    appState.stateRefreshTimer = null;
  }

  appState.stateRefreshTimer = setInterval(() => {
    refreshStorageFromDatabase({ renderIfChanged: true }).catch((error) => {
      console.error("State refresh failed", error);
    });
  }, 15000);
}

// --- Initialization ----------------------------------------------------------
let storage = initializeData();

function clearMenuHideTimer() {
  if (appState.menuHideTimer) {
    clearTimeout(appState.menuHideTimer);
    appState.menuHideTimer = null;
  }
}

function scheduleMenuHide() {
  clearMenuHideTimer();
  appState.menuHideTimer = setTimeout(() => {
    appState.menuHideTimer = null;
    const openMenu = document.querySelector(".nav.open");
    if (!openMenu || openMenu.matches(":hover")) {
      return;
    }
    appState.menuOpen = false;
    renderApp();
  }, 5000);
}

const appState = {
  locale: storage.locale || DEFAULT_LOCALE,
  currentTab: "dashboard",
  statisticsRange: "3m",
  statisticsChildId: "all",
  calendarDate: new Date().toISOString(),
  taskSort: "due",
  menuOpen: false,
  currentUser: null,
  syncTimer: null,
  stateRefreshTimer: null,
  stateUpdatedAt: null,
  settingsEditingUserId: null,
  lastAction: null,
  menuHideTimer: null,
};

async function bootstrapApp() {
  const remoteState = await readStorageFromDatabase();
  if (remoteState && remoteState.data) {
    storage = applyUserDefaults(remoteState.data);
    appState.stateUpdatedAt = remoteState.updatedAt || nowISO();
  } else {
    // Persist default state so database is the source of truth.
    writeStorage(storage);
  }

  appState.currentUser = getCurrentUser();
  setupStateRefreshTimer();

  window.addEventListener("resize", () => {
    if (!appState.currentUser) return;
    renderApp();
  });

  renderApp();
}

bootstrapApp();
