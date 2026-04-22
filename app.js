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
    "stats.collected": "Collected",
    "stats.completed": "Done",
    "stats.open": "Open",
    "stats.pointsHistoryTitle": "Points history",
    "stats.bonusHistoryTitle": "Bonus history",
    "stats.weekRange": "Week",
    "stats.noBonusAchieved": "No bonus achieved",
    "stats.bonusAchievedCount": "{{count}} bonus achieved",
    "stats.weekOf": "Week of {{date}}",
    "stats.noData": "No tasks in selected period.",
    "stats.currentDate": "Date",
    "stats.currentWeek": "Week",
    "stats.weekShort": "CW",
    "stats.tasksChartTitle": "Tasks",
    "stats.pointsChartTitle": "Points",
    "stats.bonusTableTitle": "Bonus",
    "stats.period": "Period",
    "stats.child": "Child",
    "stats.achievedBonus": "Achieved bonus",
    "stats.redeemedBonus": "Redeemed",

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
    "dashboard.weekPointsSummary": "Points this week: {{collected}} collected, {{redeemed}} redeemed, {{available}} available",
    "dashboard.openTasks": "Open",
    "dashboard.noOpen": "No open tasks.",
    "dashboard.bonusTitle": "Bonuses",
    "dashboard.noBonus": "No bonuses set.",
    "dashboard.bonusProgress": "{{current}} / {{required}} pts",
    "dashboard.bonusAchieved": "Achieved!",

    "bonus.createTitle": "New Bonus",
    "bonus.editTitle": "Edit Bonus",
    "bonus.label": "Reward",
    "bonus.points": "Required points",
    "bonus.assignedTo": "For",
    "bonus.allChildren": "All children",
    "bonus.save": "Save",
    "bonus.cancel": "Cancel",
    "bonus.delete": "Delete",
    "bonus.deleteConfirm": "Delete this bonus?",
    "bonus.saveError": "Please provide a title and a valid point value.",
    "bonus.addBtn": "Add bonus",
    "bonus.maxPerWeek": "Max. per week",
    "bonus.redeem": "Redeem",
    "bonus.redeemed": "Redeemed",
    "bonus.release": "Release",
    "bonus.releaseConfirm": "Release this redeemed bonus?",
    "bonus.available": "Available: {{points}} pts",
    "bonus.redeemedThisWeek": "Redeemed this week: {{count}}",
    "dashboard.doneTasks": "Done",
    "dashboard.confirmedTasks": "Confirmed",
    "dashboard.noDone": "No done tasks yet.",
    "dashboard.noConfirmed": "No confirmed tasks yet.",

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
    "task.doneByChild": "Done (child)",
    "task.confirmed": "Confirmed",
    "task.open": "Open",
    "task.markDone": "Mark done",
    "task.confirmFinal": "Confirm",
    "task.targetWeek": "Schedule in",
    "task.thisWeek": "This week",
    "task.nextWeek": "Next week",
    "task.inTwoWeeks": "In two weeks",
    "task.inThreeWeeks": "In three weeks",
    "task.inFourWeeks": "In four weeks",
    "task.count": "Quantity",
    "task.points": "Points",
    "task.pointsShort": "pts",
    "task.assignedTo": "Assigned to",
    "task.allChildren": "All children",
    "task.scheduleDays": "Weekdays",
    "task.startTime": "Start time",
    "task.schedulePairError": "Please select both weekdays and a start time, or leave both empty.",
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
    "footer.version": "Version {{version}}",
    "footer.screen": "Screen: {{size}}",
    "footer.lastAction": "Last action: {{action}}",
    "footer.lastActionNone": "No recent action",
    "action.taskAdded": "New task added",
    "action.taskDeleted": "Task deleted",
    "action.taskScheduled": "Task scheduled",
    "action.taskUnscheduled": "Task moved to not scheduled",
    "action.taskDone": "Task marked as done",
    "action.taskUndone": "Task marked as not done",
    "action.taskDoneByChild": "Task marked done by child",
    "action.taskConfirmed": "Task confirmed by parent",
    "action.taskReopened": "Task reopened",
    "action.taskDurationChanged": "Task changed duration to {{minutes}} min",
    "action.bonusRedeemed": "Bonus redeemed",
    "action.bonusReleased": "Redeemed bonus released",
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
    "stats.collected": "Gesammelt",
    "stats.completed": "Erledigt",
    "stats.open": "Offen",
    "stats.pointsHistoryTitle": "Punkte-Historie",
    "stats.bonusHistoryTitle": "Bonus-Historie",
    "stats.weekRange": "Woche",
    "stats.noBonusAchieved": "Kein Bonus erreicht",
    "stats.bonusAchievedCount": "{{count}} Bonus erreicht",
    "stats.weekOf": "Woche ab {{date}}",
    "stats.noData": "Keine Aufgaben im gewählten Zeitraum.",
    "stats.currentDate": "Datum",
    "stats.currentWeek": "KW",
    "stats.weekShort": "KW",
    "stats.tasksChartTitle": "Aufgaben",
    "stats.pointsChartTitle": "Punkte",
    "stats.bonusTableTitle": "Bonus",
    "stats.period": "Zeitraum",
    "stats.child": "Kind",
    "stats.achievedBonus": "Erreichter Bonus",
    "stats.redeemedBonus": "Eingelöst",

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
    "dashboard.weekPointsSummary": "Punkte diese Woche: {{collected}} gesammelt, {{redeemed}} eingelöst, {{available}} verfügbar",
    "dashboard.openTasks": "Offene Aufgaben",
    "dashboard.noOpen": "Keine offenen Aufgaben.",
    "dashboard.doneTasks": "Erledigte Aufgaben",
    "dashboard.confirmedTasks": "Bestätigte Aufgaben",
    "dashboard.noDone": "Noch keine erledigten Aufgaben.",
    "dashboard.noConfirmed": "Noch keine bestätigten Aufgaben.",
    "dashboard.openTasks": "Offene Aufgaben",
    "dashboard.noOpen": "Keine offenen Aufgaben.",
    "dashboard.bonusTitle": "Bonuspunkte-Ziele",
    "dashboard.noBonus": "Noch keine Bonusziele angelegt.",
    "dashboard.bonusProgress": "{{current}} / {{required}} Pkt",
    "dashboard.bonusAchieved": "Erreicht!",

    "bonus.createTitle": "Neuer Bonus",
    "bonus.editTitle": "Bonus bearbeiten",
    "bonus.label": "Belohnung",
    "bonus.points": "Benötigte Punkte",
    "bonus.assignedTo": "Für",
    "bonus.allChildren": "Alle Kinder",
    "bonus.save": "Speichern",
    "bonus.cancel": "Abbrechen",
    "bonus.delete": "Löschen",
    "bonus.deleteConfirm": "Diesen Bonus löschen?",
    "bonus.saveError": "Bitte Titel und gültige Punktzahl angeben.",
    "bonus.addBtn": "Bonus hinzufügen",
    "bonus.maxPerWeek": "Max. pro Woche",
    "bonus.redeem": "Einlösen",
    "bonus.redeemed": "Eingelöst",
    "bonus.release": "Freigeben",
    "bonus.releaseConfirm": "Diesen eingelösten Bonus wieder freigeben?",
    "bonus.available": "Verfügbar: {{points}} Pkt",
    "bonus.redeemedThisWeek": "Diese Woche eingelöst: {{count}}",

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
    "task.doneByChild": "Erledigt (Kind)",
    "task.confirmed": "Bestätigt",
    "task.open": "Offen",
    "task.markDone": "Als erledigt markieren",
    "task.confirmFinal": "Final bestätigen",
    "task.targetWeek": "Einplanen in",
    "task.thisWeek": "Diese Woche",
    "task.nextWeek": "Nächste Woche",
    "task.inTwoWeeks": "In zwei Wochen",
    "task.inThreeWeeks": "In drei Wochen",
    "task.inFourWeeks": "In vier Wochen",
    "task.count": "Anzahl",
    "task.points": "Punkte",
    "task.pointsShort": "Pkt",
    "task.assignedTo": "Zugewiesen an",
    "task.allChildren": "Alle Kinder",
    "task.scheduleDays": "Wochentage",
    "task.startTime": "Startzeit",
    "task.schedulePairError": "Bitte wähle Wochentage und eine Startzeit aus oder lasse beides leer.",
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
    "footer.version": "Version {{version}}",
    "footer.screen": "Bildschirm: {{size}}",
    "footer.lastAction": "Letzte Aktion: {{action}}",
    "footer.lastActionNone": "Keine letzte Aktion",
    "action.taskAdded": "Neue Aufgabe hinzugefugt",
    "action.taskDeleted": "Aufgabe geloscht",
    "action.taskScheduled": "Aufgabe eingeplant",
    "action.taskUnscheduled": "Aufgabe als nicht eingeplant markiert",
    "action.taskDone": "Aufgabe als erledigt markiert",
    "action.taskUndone": "Aufgabe als nicht erledigt markiert",
    "action.taskDoneByChild": "Aufgabe vom Kind als erledigt markiert",
    "action.taskConfirmed": "Aufgabe durch Elternteil bestätigt",
    "action.taskReopened": "Aufgabe wieder geöffnet",
    "action.taskDurationChanged": "Aufgabendauer auf {{minutes}} min geandert",
    "action.bonusRedeemed": "Bonus eingelöst",
    "action.bonusReleased": "Eingelöster Bonus freigegeben",
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

function normalizeTaskPoints(value, fallback = 1) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return Math.max(1, Math.round(fallback));
  return Math.max(1, Math.round(parsed));
}

function normalizeTaskCompletionStatus(value, fallback = "open") {
  const allowed = ["open", "child_done", "confirmed"];
  if (typeof value === "string" && allowed.includes(value)) {
    return value;
  }
  return allowed.includes(fallback) ? fallback : "open";
}

function getTaskDurationMinutes(task) {
  return normalizeTaskDurationMinutes(task && task.durationMinutes, 30);
}

function getTaskPoints(task) {
  return normalizeTaskPoints(task && task.points, 1);
}

function getTaskCompletionStatus(task) {
  if (!task || typeof task !== "object") return "open";
  const fallback = task.done === true ? "confirmed" : "open";
  return normalizeTaskCompletionStatus(task.completionStatus, fallback);
}

function isTaskConfirmed(task) {
  return getTaskCompletionStatus(task) === "confirmed";
}

function isTaskChildDone(task) {
  return getTaskCompletionStatus(task) === "child_done";
}

function getTaskStatusLabel(task) {
  if (isTaskConfirmed(task)) return t("task.confirmed");
  if (isTaskChildDone(task)) return t("task.doneByChild");
  return t("task.open");
}

function getTaskStatusIconName(task) {
  if (isTaskConfirmed(task)) return "statusCircleConfirmed";
  if (isTaskChildDone(task)) return "statusCircleDone";
  return "statusCircle";
}

// Returns { iconName, cssClass, clickable } for the status circle button.
function getTaskStatusCircleProps(task, due) {
  const status = getTaskCompletionStatus(task);
  if (status === "confirmed") {
    return { iconName: "statusCircleConfirmed", cssClass: "scb-confirmed" };
  }
  if (status === "child_done") {
    return { iconName: "statusCircleDone", cssClass: "scb-child-done" };
  }
  // open — distinguish future vs past/now
  const dueDate = due instanceof Date ? due : parseDate(due || (task && task.dueDate));
  const isFuture = dueDate && dueDate.getTime() > Date.now();
  return { iconName: "statusCircle", cssClass: isFuture ? "scb-future" : "scb-past" };
}

function makeTaskStatusCircleBtn(task, due) {
  const { iconName, cssClass } = getTaskStatusCircleProps(task, due);
  const label = getTaskStatusLabel(task);
  const canAct = !task.isReadonly && (canCurrentUserMarkTaskDone(task, due) || canCurrentUserConfirmTask(task, due));
  const el = createElement(canAct ? "button" : "span", {
    className: `task-status-circle-btn ${cssClass}`,
    html: icon(iconName),
    attrs: { title: label, "aria-label": label },
  });
  if (canAct) {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!cycleTaskCompletionStatus(task, due)) return;
      saveTask(task);
      renderApp();
    });
  }
  return el;
}

function formatDurationMinutes(minutes) {
  return `${normalizeTaskDurationMinutes(minutes)} min`;
}

function applyUserDefaults(data) {
  if (!data || !Array.isArray(data.users)) return data;

  let childIndex = 0;
  let changed = false;

  if (!Array.isArray(data.bonuses)) {
    data.bonuses = [];
    changed = true;
  }

  if (!Array.isArray(data.bonusRedemptions)) {
    data.bonusRedemptions = [];
    changed = true;
  }

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
      const normalizedCompletionStatus = normalizeTaskCompletionStatus(
        task.completionStatus,
        task.done === true ? "confirmed" : "open"
      );
      const normalizedDone = normalizedCompletionStatus === "confirmed";
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
      if (task.completionStatus !== normalizedCompletionStatus) {
        task.completionStatus = normalizedCompletionStatus;
        changed = true;
      }
      const normalizedDuration = normalizeTaskDurationMinutes(task.durationMinutes, 30);
      if (task.durationMinutes !== normalizedDuration) {
        task.durationMinutes = normalizedDuration;
        changed = true;
      }
      const normalizedPoints = normalizeTaskPoints(task.points, 1);
      if (task.points !== normalizedPoints) {
        task.points = normalizedPoints;
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

async function readAppMeta() {
  try {
    const response = await fetch("/api/meta", { method: "GET" });
    if (!response.ok) return null;
    const payload = await response.json();
    if (!payload || payload.ok !== true) {
      return null;
    }
    return payload;
  } catch (error) {
    console.warn("App meta read failed", error);
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
  statusCircle: `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" fill="currentColor"/>
    </svg>
  `,
  statusCircleDone: `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" fill="currentColor"/>
      <path d="M8 12l2.5 2.5L16 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>
  `,
  statusCircleConfirmed: `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" fill="currentColor"/>
      <path d="M7.5 12l2.5 2.5L15.5 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M11.5 12l2.5 2.5 4-4.5" stroke="rgba(255,255,255,0.55)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
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

function formatLocalDateKey(date) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseLocalDateKey(dateKey) {
  if (typeof dateKey !== "string") return null;
  const match = dateKey.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!year || !month || !day) return null;
  const d = new Date(year, month - 1, day, 0, 0, 0, 0);
  return Number.isNaN(d.getTime()) ? null : d;
}

function getTaskScheduledDate(task, fallbackDueDate = null) {
  const fromKey = parseLocalDateKey(task && task.scheduledDateKey);
  if (fromKey) return fromKey;
  const due = fallbackDueDate || parseDate(task && task.dueDate);
  if (!due) return null;
  const normalized = new Date(due);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

function getTaskScheduledMinutes(task, fallbackDueDate = null) {
  const raw = task && typeof task.scheduledTime === "string" ? task.scheduledTime.trim() : "";
  const match = raw.match(/^(\d{1,2}):(\d{2})$/);
  if (match) {
    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      return (hours * 60) + minutes;
    }
  }

  const due = fallbackDueDate || parseDate(task && task.dueDate);
  if (!due) return null;
  return (due.getHours() * 60) + due.getMinutes();
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

const TASK_WEEK_OPTIONS = ["current", "next", "next2", "next3", "next4"];
const TASK_WEEKDAY_OPTIONS = [1, 2, 3, 4, 5, 6, 0];

function getTargetWeekOffset(selection) {
  switch (selection) {
    case "next":
      return 1;
    case "next2":
      return 2;
    case "next3":
      return 3;
    case "next4":
      return 4;
    case "current":
    default:
      return 0;
  }
}

function getTargetWeekSelectionForDate(date) {
  const due = parseDate(date);
  if (!due) return "current";
  const weekStartMs = getCurrentWeekStart(due).getTime();
  const currentWeekStartMs = getCurrentWeekStart().getTime();
  const diffWeeks = Math.round((weekStartMs - currentWeekStartMs) / (7 * 24 * 60 * 60 * 1000));

  if (diffWeeks <= 0) return "current";
  if (diffWeeks >= 4) return "next4";
  return TASK_WEEK_OPTIONS[diffWeeks] || "current";
}

function getTaskWeekLabelKey(selection) {
  switch (selection) {
    case "next":
      return "task.nextWeek";
    case "next2":
      return "task.inTwoWeeks";
    case "next3":
      return "task.inThreeWeeks";
    case "next4":
      return "task.inFourWeeks";
    case "current":
    default:
      return "task.thisWeek";
  }
}

function getWeekAnchorDate(selection) {
  const start = getCurrentWeekStart();
  start.setDate(start.getDate() + (getTargetWeekOffset(selection) * 7));
  return start;
}

function getWeekdayOffsetFromMonday(dayIndex) {
  return dayIndex === 0 ? 6 : dayIndex - 1;
}

function getWeekdayLabel(dayIndex) {
  const base = getCurrentWeekStart();
  const dayDate = new Date(base);
  dayDate.setDate(base.getDate() + getWeekdayOffsetFromMonday(dayIndex));
  return new Intl.DateTimeFormat(appState.locale, { weekday: "short" }).format(dayDate);
}

function getScheduledDateForWeekday(targetWeek, dayIndex, startTime) {
  if (!startTime || typeof startTime !== "string") return null;
  const [hourRaw, minuteRaw] = startTime.split(":");
  const hour = Number(hourRaw);
  const minute = Number(minuteRaw);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;

  const dueDate = getWeekAnchorDate(targetWeek);
  dueDate.setDate(dueDate.getDate() + getWeekdayOffsetFromMonday(dayIndex));
  dueDate.setHours(hour, minute, 0, 0);
  return dueDate;
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
  if (!task || !isTaskConfirmed(task) || !weekStart) return false;
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
  if (task && TASK_WEEK_OPTIONS.includes(task.targetWeek)) {
    return task.targetWeek;
  }

  return getTargetWeekSelectionForDate(task && task.dueDate);
}

function isTaskInCurrentWeek(task) {
  return isTaskInWeek(task, new Date());
}

function isTaskInWeek(task, referenceDate = new Date()) {
  if (!task) return false;
  const due = parseDate(task.dueDate);
  if (!due) return false;

  const scheduleDate = task.weekly === true ? due : getTaskScheduledDate(task, due);
  if (!scheduleDate) return false;
  const dueWeekStart = getCurrentWeekStart(scheduleDate).getTime();
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

  const scheduledDate = getTaskScheduledDate(task, due);
  if (!scheduledDate || formatLocalDateKey(scheduledDate) !== formatLocalDateKey(date)) return null;

  const scheduledMinutes = getTaskScheduledMinutes(task, due);
  if (scheduledMinutes == null) return null;
  const occurrence = new Date(date);
  occurrence.setHours(Math.floor(scheduledMinutes / 60), scheduledMinutes % 60, 0, 0);
  return occurrence;
}

function isTaskScheduled(task) {
  if (isWebcalTask(task)) return true;
  if (getTaskScheduledMinutes(task) != null && typeof task?.scheduledTime === "string" && task.scheduledTime.trim()) {
    return true;
  }
  const due = parseDate(task && task.dueDate);
  if (!due) return false;
  return due.getHours() !== 0 || due.getMinutes() !== 0 || due.getSeconds() !== 0 || due.getMilliseconds() !== 0;
}

function canUpdateTaskCompletionStatus(task, referenceDate = null) {
  if (!task || task.isReadonly || !appState.currentUser) return false;
  const due = referenceDate instanceof Date ? referenceDate : parseDate(referenceDate || task.dueDate);
  if (!due) return false;
  return due.getTime() <= Date.now();
}

function canCurrentUserMarkTaskDone(task, referenceDate = null) {
  if (!canUpdateTaskCompletionStatus(task, referenceDate)) return false;
  if (hasRole(appState.currentUser, "parent")) return true;
  return hasRole(appState.currentUser, "child") && task.assignedTo === appState.currentUser.id;
}

function canCurrentUserConfirmTask(task, referenceDate = null) {
  if (!canUpdateTaskCompletionStatus(task, referenceDate)) return false;
  return hasRole(appState.currentUser, "parent");
}

function setTaskCompletionStatus(task, status) {
  if (!task) return;
  const normalized = normalizeTaskCompletionStatus(status, "open");
  task.completionStatus = normalized;
  task.done = normalized === "confirmed";
}

function cycleTaskCompletionStatus(task, referenceDate = null) {
  if (!task) return false;
  const current = getTaskCompletionStatus(task);

  if (current === "open") {
    if (!canCurrentUserMarkTaskDone(task, referenceDate)) return false;
    setTaskCompletionStatus(task, hasRole(appState.currentUser, "parent") ? "confirmed" : "child_done");
    setLastAction(hasRole(appState.currentUser, "parent") ? "action.taskConfirmed" : "action.taskDoneByChild");
    return true;
  }

  if (current === "child_done") {
    if (canCurrentUserConfirmTask(task, referenceDate)) {
      setTaskCompletionStatus(task, "confirmed");
      setLastAction("action.taskConfirmed");
      return true;
    }
    if (hasRole(appState.currentUser, "child") && task.assignedTo === appState.currentUser.id && canCurrentUserMarkTaskDone(task, referenceDate)) {
      setTaskCompletionStatus(task, "open");
      setLastAction("action.taskReopened");
      return true;
    }
    return false;
  }

  if (current === "confirmed") {
    if (!canCurrentUserConfirmTask(task, referenceDate)) return false;
    setTaskCompletionStatus(task, "open");
    setLastAction("action.taskReopened");
    return true;
  }

  return false;
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

function getCalendarWeekNumber(date) {
  if (!date) return 0;
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  target.setDate(target.getDate() + 3 - ((target.getDay() + 6) % 7));
  const week1 = new Date(target.getFullYear(), 0, 4);
  week1.setHours(0, 0, 0, 0);
  return 1 + Math.round(((target.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

function formatCalendarWeek(date) {
  return `${t("stats.weekShort")} ${getCalendarWeekNumber(date)}`;
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

// --- Bonus CRUD + helpers -------------------------------------------------------

function getBonuses() {
  if (!Array.isArray(storage.bonuses)) storage.bonuses = [];
  return storage.bonuses;
}

function getBonusesForChild(childId) {
  return getBonuses().filter((b) => b.assignedTo === "all" || b.assignedTo === childId);
}

function getBonusRedemptions() {
  if (!Array.isArray(storage.bonusRedemptions)) storage.bonusRedemptions = [];
  return storage.bonusRedemptions;
}

function getBonusRedemptionsForChildWeek(childId, referenceDate = new Date()) {
  const weekKey = getWeekKey(referenceDate);
  return getBonusRedemptions().filter((entry) => entry.childId === childId && entry.weekKey === weekKey);
}

function getWeeklyRedeemedPoints(childId, referenceDate = new Date()) {
  return getBonusRedemptionsForChildWeek(childId, referenceDate)
    .reduce((sum, entry) => sum + normalizeTaskPoints(entry.pointsSpent, 0), 0);
}

function getWeeklyAvailableBonusPoints(childId, referenceDate = new Date()) {
  const confirmed = getWeeklyConfirmedPoints(childId, referenceDate);
  const redeemed = getWeeklyRedeemedPoints(childId, referenceDate);
  return Math.max(0, confirmed - redeemed);
}

function getBonusRedeemCountForChildWeek(childId, bonusId, referenceDate = new Date()) {
  return getBonusRedemptionsForChildWeek(childId, referenceDate)
    .filter((entry) => entry.bonusId === bonusId)
    .length;
}

function getBonusMaxPerWeek(bonus) {
  const parsed = parseInt(bonus?.maxPerWeek, 10);
  if (!Number.isFinite(parsed)) return 1;
  return Math.min(5, Math.max(1, parsed));
}

function redeemBonusForChild(bonus, childId, referenceDate = new Date()) {
  if (!bonus || !childId || !hasRole(appState.currentUser, "parent")) return false;
  const maxPerWeek = getBonusMaxPerWeek(bonus);
  const redeemedCount = getBonusRedeemCountForChildWeek(childId, bonus.id, referenceDate);
  if (redeemedCount >= maxPerWeek) return false;
  const available = getWeeklyAvailableBonusPoints(childId, referenceDate);
  if (available < bonus.pointsRequired) return false;
  getBonusRedemptions().push({
    id: makeId("redeem"),
    bonusId: bonus.id,
    childId,
    weekKey: getWeekKey(referenceDate),
    pointsSpent: normalizeTaskPoints(bonus.pointsRequired, 1),
    redeemedAt: nowISO(),
    labelSnapshot: bonus.label,
  });
  setLastAction("action.bonusRedeemed");
  writeStorage(storage);
  return true;
}

function releaseRedeemedBonus(entry) {
  if (!entry || !hasRole(appState.currentUser, "parent")) return false;
  const redemptions = getBonusRedemptions();
  const idxById = entry.id ? redemptions.findIndex((item) => item.id === entry.id) : -1;
  const idx = idxById >= 0
    ? idxById
    : redemptions.findIndex((item) => (
      item.bonusId === entry.bonusId
      && item.childId === entry.childId
      && item.weekKey === entry.weekKey
      && item.redeemedAt === entry.redeemedAt
    ));
  if (idx < 0) return false;
  redemptions.splice(idx, 1);
  setLastAction("action.bonusReleased");
  writeStorage(storage);
  return true;
}

function saveBonus(bonus) {
  if (!Array.isArray(storage.bonuses)) storage.bonuses = [];
  const idx = storage.bonuses.findIndex((b) => b.id === bonus.id);
  if (idx >= 0) {
    storage.bonuses[idx] = bonus;
  } else {
    storage.bonuses.push(bonus);
  }
  writeStorage(storage);
}

function deleteBonus(bonusId) {
  if (!Array.isArray(storage.bonuses)) return;
  storage.bonuses = storage.bonuses.filter((b) => b.id !== bonusId);
  writeStorage(storage);
}

// Returns confirmed points for a child in the week containing referenceDate.
function getWeeklyConfirmedPoints(childId, referenceDate = new Date()) {
  return storage.tasks
    .filter((task) => task.assignedTo === childId && isTaskConfirmed(task) && isTaskInWeek(task, referenceDate))
    .reduce((sum, task) => sum + getTaskPoints(task), 0);
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
    containerEl.setAttribute("data-tooltip", tooltipText);
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
    content.classList.add("dashboard-mode");
  }

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
  footer.innerHTML = `<span>${t("footer.lastAction", { action: getLastActionLabel() })}</span><span>${t("footer.screen", { size: getScreenSizeLabel() })}</span><span>${t("footer.version", { version: appState.buildVersion })}</span>`;
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
  const panel = createElement("section", { className: "dashboard-panel" });
  const dashboardScroll = createElement("div", { className: "dashboard-scroll" });

  const user = appState.currentUser;
  if (hasRole(user, "parent") || hasRole(user, "child")) {
    const parentMode = hasRole(user, "parent");
    const children = parentMode ? getChildUsers() : [user];
    const weekReferenceDate = parseDate(appState.calendarDate) || new Date();
    if (!appState.overviewCollapsed || typeof appState.overviewCollapsed !== "object") {
      appState.overviewCollapsed = {};
    }
    const getSectionStateKey = (childId, sectionKey) => `${childId}:${sectionKey}`;
    const isSectionCollapsed = (childId, sectionKey) => !!appState.overviewCollapsed[getSectionStateKey(childId, sectionKey)];
    const toggleSectionCollapsed = (childId, sectionKey) => {
      const stateKey = getSectionStateKey(childId, sectionKey);
      appState.overviewCollapsed[stateKey] = !appState.overviewCollapsed[stateKey];
      renderApp();
    };

    const overview = createElement("div", { className: "grid grid-2 overview-grid" });

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
      const collectedPoints = weeklyTasks
        .filter((task) => isTaskConfirmed(task))
        .reduce((sum, task) => sum + getTaskPoints(task), 0);
      const redeemedPoints = getWeeklyRedeemedPoints(child.id, weekReferenceDate);
      const availablePoints = getWeeklyAvailableBonusPoints(child.id, weekReferenceDate);

      const unscheduledTasks = weeklyTasks.filter((task) => !isTaskScheduledInWeek(task, weekReferenceDate));
      const scheduledWeeklyTasks = weeklyTasks.filter((task) => isTaskScheduledInWeek(task, weekReferenceDate));
      const openTasks = scheduledWeeklyTasks.filter((task) => getTaskCompletionStatus(task) === "open");
      const doneTasks = scheduledWeeklyTasks.filter((task) => isTaskChildDone(task));
      const confirmedTasks = scheduledWeeklyTasks.filter((task) => isTaskConfirmed(task));

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

      if (parentMode) {
        const addBonusBtn = createElement("button", {
          className: "button secondary overview-inline-button compact-on-small",
          html: `${icon("add")}<span class="button-label">${t("bonus.addBtn")}</span>`,
          attrs: { "aria-label": t("bonus.addBtn"), title: t("bonus.addBtn") },
        });
        addBonusBtn.addEventListener("click", () => buildBonusForm(null, { assignedTo: child.id }));
        badgeDiv.appendChild(addBonusBtn);
      }

      titleWrap.appendChild(heading);
      headerRow.appendChild(titleWrap);
      headerRow.appendChild(badgeDiv);

      childPanel.appendChild(headerRow);

      function createTaskSection(titleText, emptyText, sectionTasks, options = {}) {
        const sectionKey = options.sectionKey || "section";
        const collapsed = isSectionCollapsed(child.id, sectionKey);
        const section = createElement("div", { className: "overview-unscheduled-dropzone" });
        const sectionHeader = createElement("button", {
          className: "overview-section-title overview-section-toggle",
          attrs: { type: "button", "aria-expanded": String(!collapsed) },
        });
        sectionHeader.appendChild(createElement("span", { text: titleText }));
        sectionHeader.appendChild(createElement("span", { className: "overview-section-count", text: String(sectionTasks.length) }));
        sectionHeader.appendChild(createElement("span", { className: "overview-section-caret", text: collapsed ? "+" : "-" }));
        sectionHeader.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          toggleSectionCollapsed(child.id, sectionKey);
        });
        section.appendChild(sectionHeader);

        if (options.acceptDrop) {
          section.addEventListener("dragover", (event) => {
            event.preventDefault();
          });
          section.addEventListener("drop", (event) => handleDropToUnscheduled(event, child.id));
        }

        if (collapsed) {
          section.classList.add("collapsed");
          return section;
        }

        if (sectionTasks.length === 0) {
          section.appendChild(createElement("div", { className: "help", text: emptyText }));
          return section;
        }

        const list = createElement("div", { className: "overview-unscheduled-table" });
        sectionTasks.forEach((task) => {
          const item = createElement("div", { className: "overview-task-item" });
          const title = createElement("span", { className: "overview-task-title", text: task.title });
          const points = createElement("span", {
            className: "overview-task-points",
            text: `${getTaskPoints(task)} ${t("task.pointsShort")}`,
          });
          item.appendChild(title);
          item.appendChild(points);
          item.appendChild(makeTaskStatusCircleBtn(task, task.dueDate));

          const overviewTooltipParts = [task.title];
          if (task.description) overviewTooltipParts.push(task.description);
          overviewTooltipParts.push(`${t("task.durationShort")}: ${formatDurationMinutes(getTaskDurationMinutes(task))}`);
          overviewTooltipParts.push(`${t("task.points")}: ${getTaskPoints(task)}`);
          const infoBtn = createElement("button", {
            className: "overview-tooltip-btn",
            text: "?",
            attrs: {
              type: "button",
              "aria-label": t("task.details"),
              "data-tooltip": overviewTooltipParts.join("\n"),
            },
          });
          infoBtn.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
          });
          item.appendChild(infoBtn);

          if (options.draggable && !task.isReadonly && (parentMode || canCurrentUserScheduleTask(task))) {
            item.setAttribute("draggable", "true");
            item.addEventListener("dragstart", (event) => {
              event.dataTransfer.setData("text/plain", task.id);
            });
          }

          const actions = createElement("div", { className: "overview-unscheduled-actions" });
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
          list.appendChild(item);
        });

        section.appendChild(list);
        return section;
      }

      childPanel.appendChild(createTaskSection(t("dashboard.unscheduledTasks"), t("dashboard.noUnscheduled"), unscheduledTasks, {
        acceptDrop: true,
        draggable: true,
        sectionKey: "unscheduled",
      }));
      childPanel.appendChild(createTaskSection(t("dashboard.openTasks"), t("dashboard.noOpen"), openTasks, { sectionKey: "open" }));
      childPanel.appendChild(createTaskSection(t("dashboard.doneTasks"), t("dashboard.noDone"), doneTasks, { sectionKey: "done" }));
      childPanel.appendChild(createTaskSection(t("dashboard.confirmedTasks"), t("dashboard.noConfirmed"), confirmedTasks, { sectionKey: "confirmed" }));

      // Bonus section
      const bonusCollapsed = isSectionCollapsed(child.id, "bonuses");
      const bonusSection = createElement("div", { className: "overview-unscheduled-dropzone bonus-section" });
      const childBonuses = getBonusesForChild(child.id);
      const bonusHeaderRow = createElement("div", { className: "overview-section-header" });
      const bonusHeader = createElement("button", {
        className: "overview-section-title overview-section-toggle",
        attrs: { type: "button", "aria-expanded": String(!bonusCollapsed) },
      });
      bonusHeader.appendChild(createElement("span", { text: t("dashboard.bonusTitle") }));
      bonusHeader.appendChild(createElement("span", {
        className: "overview-child-points overview-child-points-inline",
        text: t("dashboard.weekPointsSummary", {
          collected: String(collectedPoints),
          redeemed: String(redeemedPoints),
          available: String(availablePoints),
        }),
      }));
      bonusHeader.appendChild(createElement("span", { className: "overview-section-count", text: String(childBonuses.length) }));
      bonusHeader.appendChild(createElement("span", { className: "overview-section-caret", text: bonusCollapsed ? "+" : "-" }));
      bonusHeader.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleSectionCollapsed(child.id, "bonuses");
      });
      bonusHeaderRow.appendChild(bonusHeader);
      bonusSection.appendChild(bonusHeaderRow);

      if (!bonusCollapsed) {
        if (childBonuses.length === 0) {
          bonusSection.appendChild(createElement("div", { className: "help", text: t("dashboard.noBonus") }));
        } else {
          const bonusList = createElement("div", { className: "bonus-list" });
          childBonuses.forEach((bonus) => {
            const currentPts = getWeeklyAvailableBonusPoints(child.id, weekReferenceDate);
            const redeemedEntries = getBonusRedemptionsForChildWeek(child.id, weekReferenceDate)
              .filter((entry) => entry.bonusId === bonus.id)
              .sort((a, b) => {
                const aTime = parseDate(a.redeemedAt);
                const bTime = parseDate(b.redeemedAt);
                return (aTime ? aTime.getTime() : 0) - (bTime ? bTime.getTime() : 0);
              });
            const redeemedCount = redeemedEntries.length;
            const maxPerWeek = getBonusMaxPerWeek(bonus);
            const achieved = currentPts >= bonus.pointsRequired;
            const canRedeemThisWeek = redeemedCount < maxPerWeek;
            redeemedEntries.forEach((redeemedEntry) => {
              const redeemedRow = createElement("div", { className: "bonus-row bonus-redeemed" });
              const redeemedLabel = createElement("span", {
                className: "bonus-label",
                text: redeemedEntry.labelSnapshot || bonus.label,
              });
              const redeemedProgressWrap = createElement("div", { className: "bonus-progress-wrap" });
              const redeemedProgress = createElement("div", { className: "bonus-progress-bar" });
              redeemedProgress.style.width = "100%";
              redeemedProgressWrap.appendChild(redeemedProgress);
              const redeemedStatus = createElement("span", { className: "bonus-pts-label", text: t("bonus.redeemed") });
              const redeemedMeta = createElement("div", { className: "bonus-meta" });
              redeemedMeta.appendChild(createElement("span", {
                className: "bonus-pts-label",
                text: t("dashboard.bonusProgress", {
                  current: String(redeemedEntry.pointsSpent || bonus.pointsRequired),
                  required: String(bonus.pointsRequired),
                }),
              }));
              redeemedRow.appendChild(redeemedLabel);
              redeemedRow.appendChild(redeemedProgressWrap);
              redeemedRow.appendChild(redeemedStatus);
              redeemedRow.appendChild(redeemedMeta);
              if (parentMode) {
                const releaseBtn = createElement("button", {
                  className: "button secondary overview-inline-button compact-on-small",
                  html: `${icon("cancel")}<span class="button-label">${t("bonus.release")}</span>`,
                  attrs: { "aria-label": t("bonus.release"), title: t("bonus.release") },
                });
                releaseBtn.addEventListener("click", (event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  if (!confirm(t("bonus.releaseConfirm"))) return;
                  if (!releaseRedeemedBonus(redeemedEntry)) return;
                  renderApp();
                });
                redeemedRow.appendChild(releaseBtn);
              }
              bonusList.appendChild(redeemedRow);
            });

            if (!canRedeemThisWeek) {
              return;
            }

            const row = createElement("div", { className: `bonus-row${achieved ? " bonus-achieved" : ""}` });
            const labelEl = createElement("span", { className: "bonus-label", text: bonus.label });
            const progressWrap = createElement("div", { className: "bonus-progress-wrap" });
            const progressBar = createElement("div", { className: "bonus-progress-bar" });
            const fill = Math.min(1, currentPts / bonus.pointsRequired);
            progressBar.style.width = `${Math.round(fill * 100)}%`;
            progressWrap.appendChild(progressBar);

            const ptsLabel = createElement("span", {
              className: "bonus-pts-label",
              text: achieved
                ? t("dashboard.bonusAchieved")
                : t("dashboard.bonusProgress", { current: String(currentPts), required: String(bonus.pointsRequired) }),
            });
            const bonusMeta = createElement("div", { className: "bonus-meta" });
            bonusMeta.appendChild(createElement("span", {
              className: "bonus-pts-label",
              text: t("bonus.available", { points: String(currentPts) }),
            }));
            bonusMeta.appendChild(createElement("span", {
              className: "bonus-pts-label",
              text: t("bonus.redeemedThisWeek", { count: String(redeemedCount) }),
            }));

            row.appendChild(labelEl);
            row.appendChild(progressWrap);
            row.appendChild(ptsLabel);
            row.appendChild(bonusMeta);

            if (parentMode) {
              if (achieved && canRedeemThisWeek) {
                const redeemBtn = createElement("button", {
                  className: "button primary overview-inline-button compact-on-small",
                  html: `${icon("save")}<span class="button-label">${t("bonus.redeem")}</span>`,
                  attrs: { "aria-label": t("bonus.redeem"), title: t("bonus.redeem") },
                });
                redeemBtn.addEventListener("click", (event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  if (!redeemBonusForChild(bonus, child.id, weekReferenceDate)) return;
                  renderApp();
                });
                row.appendChild(redeemBtn);
              }
              const editBtn = createElement("button", {
                className: "button secondary overview-inline-button compact-on-small",
                html: icon("edit"),
                attrs: { "aria-label": t("task.edit"), title: t("task.edit") },
              });
              editBtn.addEventListener("click", () => buildBonusForm(bonus));
              row.appendChild(editBtn);
            }

            bonusList.appendChild(row);
          });
          bonusSection.appendChild(bonusList);
        }

      } else {
        bonusSection.classList.add("collapsed");
      }
      childPanel.appendChild(bonusSection);

      overview.appendChild(childPanel);
    });

    const overviewPanel = createElement("section", { className: "panel dashboard-overview-panel" });
    overviewPanel.appendChild(createElement("h2", { text: t("dashboard.title") }));
    overviewPanel.appendChild(overview);
    dashboardScroll.appendChild(overviewPanel);

    const weekPanel = renderParentWeekCalendar(parseDate(appState.calendarDate) || new Date(), {
      assigneeIds: parentMode ? null : [user.id],
      interactive: true,
    });
    weekPanel.classList.add("dashboard-calendar-panel");
    dashboardScroll.appendChild(weekPanel);
  }

  panel.appendChild(dashboardScroll);
  container.appendChild(panel);
}

function renderTaskCard(task, showActions = true) {
  const card = createElement("div", { className: "task" });
  const assignee = getUserById(task.assignedTo);
  const assigneeColor = getUserColor(assignee);
  card.style.borderColor = hexToRgba(assigneeColor, 0.35);
  card.style.background = hexToRgba(assigneeColor, 0.1);

  const tooltipParts = [task.title];
  if (task.description) {
    tooltipParts.push(task.description);
  }
  tooltipParts.push(`${t("task.durationShort")}: ${formatDurationMinutes(getTaskDurationMinutes(task))}`);
  tooltipParts.push(`${t("task.points")}: ${getTaskPoints(task)}`);
  card.setAttribute("data-tooltip", tooltipParts.join("\n"));

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
    : `${t("task.targetWeek")}: ${t(getTaskWeekLabelKey(getTaskWeekSelection(task)))}`;
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
  badges.appendChild(createElement("span", { className: "badge", text: `${getTaskPoints(task)} ${t("task.pointsShort")}` }));
  if (isTaskChildDone(task)) badges.appendChild(createElement("span", { className: "badge", text: t("task.doneByChild") }));
  if (isTaskConfirmed(task)) badges.appendChild(createElement("span", { className: "badge", text: t("task.confirmed") }));
  if (task.isReadonly) {
    badges.appendChild(createElement("span", { className: "badge", text: t("task.readonly") }));
  }

  card.appendChild(titleRow);
  card.appendChild(meta);

  if (canCurrentUserMarkTaskDone(task) || canCurrentUserConfirmTask(task)) {
    const statusActionLabel = isTaskChildDone(task) && hasRole(appState.currentUser, "parent")
      ? t("task.confirmFinal")
      : isTaskConfirmed(task) && hasRole(appState.currentUser, "parent")
        ? t("task.open")
        : t("task.markDone");
    const statusBtn = createElement("button", {
      className: "button secondary compact-on-small",
      text: statusActionLabel,
    });
    statusBtn.addEventListener("click", () => {
      if (!cycleTaskCompletionStatus(task)) return;
      saveTask(task);
      renderApp();
    });
    card.appendChild(statusBtn);
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
    <option value="next2">${t("task.inTwoWeeks")}</option>
    <option value="next3">${t("task.inThreeWeeks")}</option>
    <option value="next4">${t("task.inFourWeeks")}</option>
  `;
  weekLabel.appendChild(weekSelect);

  const assigneeLabel = createElement("label");
  assigneeLabel.innerHTML = `<span>${t("task.assignedTo")}</span>`;
  const assigneeSelect = createElement("select", { className: "select", attrs: { name: "assignedTo" } });
  if (!childMode && !existingTask) {
    assigneeSelect.appendChild(createElement("option", { text: t("task.allChildren"), attrs: { value: "all" } }));
  }
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

  const pointsLabel = createElement("label");
  pointsLabel.innerHTML = `<span>${t("task.points")}</span>`;
  const pointsInput = createElement("input", {
    className: "input",
    attrs: { type: "number", name: "points", min: "1", step: "1" },
  });
  pointsInput.value = "1";
  pointsLabel.appendChild(pointsInput);

  const countLabel = createElement("label");
  countLabel.innerHTML = `<span>${t("task.count")}</span>`;
  const countInput = createElement("input", {
    className: "input",
    attrs: { type: "number", name: "count", min: "1", max: "7", step: "1" },
  });
  countInput.value = "1";
  countLabel.appendChild(countInput);

  const weeklyLabel = createElement("label");
  weeklyLabel.innerHTML = `<span>${t("task.weekly")}</span>`;
  const weeklyInput = createElement("input", {
    className: "input-checkbox",
    attrs: { type: "checkbox", name: "weekly" },
  });
  weeklyInput.checked = false;
  weeklyLabel.appendChild(weeklyInput);

  const scheduleDaysLabel = createElement("label");
  scheduleDaysLabel.innerHTML = `<span>${t("task.scheduleDays")}</span>`;
  const weekdayWrap = createElement("div", {
    attrs: {
      style: "display:grid;grid-template-columns:repeat(auto-fit,minmax(84px,1fr));gap:0.5rem;",
    },
  });
  const weekdayCheckboxes = [];
  TASK_WEEKDAY_OPTIONS.forEach((dayIndex) => {
    const dayLabel = createElement("label", {
      attrs: {
        style: "display:flex;align-items:center;gap:0.35rem;margin:0;",
      },
    });
    const dayInput = createElement("input", {
      className: "input-checkbox",
      attrs: { type: "checkbox", value: String(dayIndex) },
    });
    const dayText = createElement("span", { text: getWeekdayLabel(dayIndex) });
    dayLabel.appendChild(dayInput);
    dayLabel.appendChild(dayText);
    weekdayWrap.appendChild(dayLabel);
    weekdayCheckboxes.push(dayInput);
  });
  scheduleDaysLabel.appendChild(weekdayWrap);

  const startTimeLabel = createElement("label");
  startTimeLabel.innerHTML = `<span>${t("task.startTime")}</span>`;
  const startTimeInput = createElement("select", { className: "select", attrs: { name: "startTime" } });
  const emptyOption = createElement("option", { text: "—", attrs: { value: "" } });
  startTimeInput.appendChild(emptyOption);
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      const hour2 = String(hour).padStart(2, "0");
      const min2 = String(minute).padStart(2, "0");
      const timeStr = `${hour2}:${min2}`;
      const opt = createElement("option", { text: timeStr, attrs: { value: timeStr } });
      startTimeInput.appendChild(opt);
    }
  }
  startTimeLabel.appendChild(startTimeInput);

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
  form.appendChild(pointsLabel);
  if (!existingTask) {
    form.appendChild(countLabel);
  }
  form.appendChild(weeklyLabel);
  form.appendChild(scheduleDaysLabel);
  form.appendChild(startTimeLabel);
  form.appendChild(doneLabel);
  form.appendChild(error);
  form.appendChild(actions);

  if (existingTask) {
    titleInput.value = existingTask.title;
    descInput.value = existingTask.description;
    weekSelect.value = getTaskWeekSelection(existingTask);
    assigneeSelect.value = existingTask.assignedTo;
    durationInput.value = String(getTaskDurationMinutes(existingTask));
    pointsInput.value = String(getTaskPoints(existingTask));
    weeklyInput.checked = existingTask.weekly === true;
    doneInput.checked = isTaskConfirmed(existingTask);
    const existingDue = parseDate(existingTask.dueDate);
    if (existingDue && isTaskScheduled(existingTask)) {
      const weekday = existingDue.getDay();
      const matchingDay = weekdayCheckboxes.find((checkbox) => Number(checkbox.value) === weekday);
      if (matchingDay) matchingDay.checked = true;
      startTimeInput.value = `${String(existingDue.getHours()).padStart(2, "0")}:${String(existingDue.getMinutes()).padStart(2, "0")}`;
    }
  } else {
    if (defaults && defaults.assignedTo) {
      assigneeSelect.value = defaults.assignedTo;
    }
  }

  if (childMode) {
    assigneeSelect.value = appState.currentUser.id;
    assigneeSelect.disabled = true;
    doneInput.checked = false;
    doneInput.disabled = true;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const assignedTo = childMode ? appState.currentUser.id : assigneeSelect.value;
    const targetWeek = weekSelect.value;
    const durationMinutes = normalizeTaskDurationMinutes(durationInput.value, 30);
    const points = normalizeTaskPoints(pointsInput.value, 1);
    const taskCount = existingTask ? 1 : Math.min(7, Math.max(1, parseInt(countInput.value, 10) || 1));
    const weekly = weeklyInput.checked;
    const done = doneInput.checked;
    const selectedDays = weekdayCheckboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => Number(checkbox.value));
    const startTime = startTimeInput.value;
    const hasScheduledDays = selectedDays.length > 0;
    const hasStartTime = !!startTime;

    if ((hasScheduledDays && !hasStartTime) || (!hasScheduledDays && hasStartTime)) {
      error.textContent = t("task.schedulePairError");
      return;
    }

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

    const scheduledDates = hasScheduledDays
      ? selectedDays
        .map((dayIndex) => getScheduledDateForWeekday(targetWeek, dayIndex, startTime))
        .filter((date) => !!date)
      : [];
    const normalizedScheduledDates = existingTask ? scheduledDates.slice(0, 1) : scheduledDates;

    const weeklyAssignments = (existingTask && existingTask.weeklyAssignments && typeof existingTask.weeklyAssignments === "object")
      ? { ...existingTask.weeklyAssignments }
      : {};

    const weeklyAnchor = getCurrentWeekStart(dueDate);
    weeklyAnchor.setHours(0, 0, 0, 0);

    const getDueDateIso = (scheduledDate = null, baseDueDate = dueAnchor) => {
      if (weekly) return weeklyAnchor.toISOString();
      if (scheduledDate) return scheduledDate.toISOString();
      return baseDueDate.toISOString();
    };

    const getScheduledMeta = (scheduledDate = null, baseDueDate = dueAnchor) => {
      if (weekly) {
        return {
          scheduledDateKey: undefined,
          scheduledTime: undefined,
        };
      }

      const resolved = scheduledDate || baseDueDate;
      if (!resolved) {
        return {
          scheduledDateKey: undefined,
          scheduledTime: undefined,
        };
      }

      return {
        scheduledDateKey: formatLocalDateKey(resolved),
        scheduledTime: `${String(resolved.getHours()).padStart(2, "0")}:${String(resolved.getMinutes()).padStart(2, "0")}`,
      };
    };

    const getWeeklyAssignments = (scheduledDate = null, baseAssignments = weeklyAssignments) => {
      if (!weekly) return undefined;
      const nextAssignments = { ...baseAssignments };
      if (scheduledDate) {
        nextAssignments[getWeekKey(scheduledDate)] = scheduledDate.toISOString();
      }
      return nextAssignments;
    };

    const taskPayload = {
      title,
      description: descInput.value.trim(),
      dueDate: getDueDateIso(),
      ...getScheduledMeta(),
      durationMinutes,
      points,
      targetWeek,
      weekly,
      weeklyAssignments: getWeeklyAssignments(),
      completionStatus: done ? "confirmed" : "open",
      done,
      type: "regular",
      isReadonly: false,
    };

    const task = existingTask
      ? {
          ...existingTask,
          title,
          description: descInput.value.trim(),
          dueDate: getDueDateIso(normalizedScheduledDates[0] || null, dueDate),
          ...getScheduledMeta(normalizedScheduledDates[0] || null, dueDate),
          durationMinutes,
          points,
          targetWeek,
          assignedTo,
          weekly,
          weeklyAssignments: getWeeklyAssignments(normalizedScheduledDates[0] || null),
          completionStatus: done ? "confirmed" : "open",
          done,
        }
      : {
          id: makeId("task"),
          title,
          description: descInput.value.trim(),
          assignedTo,
          createdBy: appState.currentUser.id,
          dueDate: getDueDateIso(),
          ...getScheduledMeta(),
          durationMinutes,
          points,
          targetWeek,
          weekly,
          weeklyAssignments: getWeeklyAssignments(),
          completionStatus: done ? "confirmed" : "open",
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

    if (!existingTask && !childMode && assignedTo === "all") {
      const schedulingTargets = normalizedScheduledDates.length > 0 ? normalizedScheduledDates : [null];
      getChildUsers().forEach((child) => {
        schedulingTargets.forEach((scheduledDate) => {
          for (let i = 0; i < taskCount; i += 1) {
            saveTask({
              ...taskPayload,
              id: makeId("task"),
              assignedTo: child.id,
              createdBy: appState.currentUser.id,
              dueDate: getDueDateIso(scheduledDate),
              ...getScheduledMeta(scheduledDate),
              weeklyAssignments: getWeeklyAssignments(scheduledDate, {}),
            });
          }
        });
      });
    } else if (!existingTask && normalizedScheduledDates.length > 1) {
      normalizedScheduledDates.forEach((scheduledDate) => {
        for (let i = 0; i < taskCount; i += 1) {
          saveTask({
            ...taskPayload,
            id: makeId("task"),
            assignedTo,
            createdBy: appState.currentUser.id,
            dueDate: getDueDateIso(scheduledDate),
            ...getScheduledMeta(scheduledDate),
            weeklyAssignments: getWeeklyAssignments(scheduledDate, {}),
          });
        }
      });
    } else if (!existingTask && taskCount > 1) {
      for (let i = 0; i < taskCount; i += 1) {
        saveTask({
          ...task,
          id: makeId("task"),
        });
      }
    } else {
      saveTask(task);
    }
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

function buildBonusForm(existingBonus = null, defaults = {}) {
  if (!hasRole(appState.currentUser, "parent")) return;

  const existingOverlay = document.querySelector(".bonus-editor-overlay");
  if (existingOverlay) existingOverlay.remove();

  const overlay = createElement("div", { className: "task-editor-overlay bonus-editor-overlay settings-overlay" });
  const panel = createElement("section", { className: "task-editor-dialog settings-overlay-dialog card settings-card" });

  panel.appendChild(createElement("h3", {
    text: existingBonus ? t("bonus.editTitle") : t("bonus.createTitle"),
  }));

  const form = createElement("form", { className: "form" });

  const labelInputLabel = createElement("label");
  labelInputLabel.appendChild(createElement("span", { text: t("bonus.label") }));
  const labelInput = createElement("input", {
    className: "input",
    attrs: { id: "bonus-label-input", type: "text", value: existingBonus ? existingBonus.label : "", placeholder: t("bonus.label") },
  });
  labelInputLabel.appendChild(labelInput);
  form.appendChild(labelInputLabel);

  const ptsInputLabel = createElement("label");
  ptsInputLabel.appendChild(createElement("span", { text: t("bonus.points") }));
  const ptsInput = createElement("input", {
    className: "input",
    attrs: { id: "bonus-pts-input", type: "number", min: "1", step: "1", value: existingBonus ? String(existingBonus.pointsRequired) : "10" },
  });
  ptsInputLabel.appendChild(ptsInput);
  form.appendChild(ptsInputLabel);

  const maxPerWeekLabel = createElement("label");
  maxPerWeekLabel.appendChild(createElement("span", { text: t("bonus.maxPerWeek") }));
  const maxPerWeekInput = createElement("input", {
    className: "input",
    attrs: { id: "bonus-maxperweek-input", type: "number", min: "1", max: "5", step: "1", value: existingBonus ? String(existingBonus.maxPerWeek ?? 1) : "1" },
  });
  maxPerWeekLabel.appendChild(maxPerWeekInput);
  form.appendChild(maxPerWeekLabel);

  const assignLabel = createElement("label");
  assignLabel.appendChild(createElement("span", { text: t("bonus.assignedTo") }));
  const assignSelect = createElement("select", { className: "select", attrs: { id: "bonus-assignee-input" } });
  const defaultAssignedTo = existingBonus
    ? existingBonus.assignedTo
    : (defaults.assignedTo || "all");
  const allOpt = createElement("option", { text: t("bonus.allChildren"), attrs: { value: "all" } });
  assignSelect.appendChild(allOpt);
  getChildUsers().forEach((child) => {
    const opt = createElement("option", { text: child.name, attrs: { value: child.id } });
    if (defaultAssignedTo === child.id) opt.selected = true;
    assignSelect.appendChild(opt);
  });
  if (defaultAssignedTo === "all") allOpt.selected = true;
  assignLabel.appendChild(assignSelect);
  form.appendChild(assignLabel);

  const errorEl = createElement("div", { className: "error-message" });
  errorEl.style.display = "none";
  form.appendChild(errorEl);

  const btnRow = createElement("div", { style: "display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:0.5rem;" });
  const saveBtn = createElement("button", { className: "button primary", text: t("bonus.save"), attrs: { type: "submit" } });
  const cancelBtn = createElement("button", { className: "button secondary", text: t("bonus.cancel"), attrs: { type: "button" } });
  cancelBtn.addEventListener("click", () => overlay.remove());
  btnRow.appendChild(saveBtn);
  btnRow.appendChild(cancelBtn);

  if (existingBonus) {
    const delBtn = createElement("button", { className: "button danger", text: t("bonus.delete"), attrs: { type: "button" } });
    delBtn.addEventListener("click", () => {
      if (!confirm(t("bonus.deleteConfirm"))) return;
      deleteBonus(existingBonus.id);
      overlay.remove();
      renderApp();
    });
    btnRow.appendChild(delBtn);
  }
  form.appendChild(btnRow);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const label = labelInput.value.trim();
    const pts = parseInt(ptsInput.value, 10);
    const maxPW = Math.min(5, Math.max(1, parseInt(maxPerWeekInput.value, 10) || 1));
    if (!label || !Number.isFinite(pts) || pts < 1) {
      errorEl.textContent = t("bonus.saveError");
      errorEl.style.display = "";
      return;
    }
    const bonus = {
      id: existingBonus ? existingBonus.id : makeId("bonus"),
      label,
      pointsRequired: pts,
      maxPerWeek: maxPW,
      assignedTo: assignSelect.value,
      createdAt: existingBonus ? existingBonus.createdAt : new Date().toISOString(),
    };
    saveBonus(bonus);
    overlay.remove();
    renderApp();
  });

  panel.appendChild(form);
  overlay.appendChild(panel);
  overlay.addEventListener("click", (event) => { if (event.target === overlay) overlay.remove(); });
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
  // Monday-based week: Sunday belongs to the previous week.
  const diff = day === 0 ? -6 : 1 - day;
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
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day || Number.isNaN(hour) || Number.isNaN(min)) return;
  const newDate = new Date(year, month - 1, day, hour, min, 0, 0);

  if (task.weekly === true) {
    setWeeklyAssignmentDate(task, newDate);
  } else {
    task.dueDate = newDate.toISOString();
    task.scheduledDateKey = date;
    task.scheduledTime = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
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
    task.targetWeek = getTargetWeekSelectionForDate(unscheduledDate);
    task.dueDate = unscheduledDate.toISOString();
    task.scheduledDateKey = undefined;
    task.scheduledTime = undefined;
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
  const visibleRangeMinutes = 6 * 60;
  const totalSlots = (24 * 60) / slotMinutes;
  let currentTimeTop = null;
  const scrollWrap = createElement("div", { className: "overview-week-scroll" });
  const visibleHeight = Math.round((visibleRangeMinutes / slotMinutes) * slotHeight) + headerHeight;
  scrollWrap.style.height = `${visibleHeight}px`;
  scrollWrap.style.minHeight = `${visibleHeight}px`;
  scrollWrap.style.maxHeight = `${visibleHeight}px`;
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
    lane.style.position = "relative";
    lane.style.height = `${totalSlots * slotHeight}px`;

    for (let slot = 0; slot < totalSlots; slot++) {
      const totalMinutes = slot * slotMinutes;
      const hour = Math.floor(totalMinutes / 60);
      const minute = totalMinutes % 60;
      const slotEl = createElement("div", { className: "overview-grid-slot" });
      slotEl.setAttribute("data-date", formatLocalDateKey(date));
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
        const maxTop = Math.max(0, (totalSlots * slotHeight) - cardHeight);
        return {
          task: occurrence.task,
          due,
          top: Math.max(0, Math.min(maxTop, top)),
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
      taskEl.style.position = "absolute";
      taskEl.setAttribute("data-date", formatLocalDateKey(due));
      taskEl.setAttribute("data-time", `${String(due.getHours()).padStart(2, "0")}:${String(due.getMinutes()).padStart(2, "0")}`);
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
      taskEl.appendChild(makeTaskStatusCircleBtn(entry.task, due));

      if (entry.task.isReadonly) {
        taskEl.appendChild(createReadonlyLock());
      } else if (canSchedule) {
        taskEl.addEventListener("dragstart", (event) => {
          event.dataTransfer.setData("text/plain", entry.task.id);
        });
          taskEl.addEventListener("dragover", (event) => event.preventDefault());
          taskEl.addEventListener("drop", handleDrop);
        attachWeeklyTaskResize(entry.task, taskEl, slotMinutes, slotHeight);
      }

      const assigneeName = assignee ? assignee.name : t("task.unassigned");
      const calendarTooltipParts = [entry.task.title];
      if (entry.task.description) {
        calendarTooltipParts.push(entry.task.description);
      }
      calendarTooltipParts.push(`${formatTime24(due)}`);
      calendarTooltipParts.push(`${t("task.durationShort")}: ${formatDurationMinutes(getTaskDurationMinutes(entry.task))}`);
      calendarTooltipParts.push(`${t("task.points")}: ${getTaskPoints(entry.task)}`);
      calendarTooltipParts.push(`${assigneeName}`);
      const calendarTooltipText = calendarTooltipParts.join("\n");
      setTooltipIfTruncated(taskEl, text, calendarTooltipText);

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
  const minutesToScrollTop = (minutes) => {
    const clampedMinutes = Math.max(0, Math.min((24 * 60) - visibleRangeMinutes, minutes));
    return (clampedMinutes / slotMinutes) * slotHeight;
  };
  const scrollTopToMinutes = (scrollTop) => {
    const adjusted = Math.max(0, scrollTop);
    const minutes = Math.round(adjusted / slotHeight) * slotMinutes;
    return Math.max(0, Math.min((24 * 60) - visibleRangeMinutes, minutes));
  };

  const maxScrollTop = Math.max(0, ((24 * 60) - visibleRangeMinutes) / slotMinutes * slotHeight);
  const now = new Date();
  const nowMinutes = (now.getHours() * 60) + now.getMinutes();
  const dynamicDefaultStart = Math.max(0, Math.min((24 * 60) - visibleRangeMinutes, nowMinutes - (3 * 60)));
  const preferredStart = Number.isFinite(appState.calendarScrollMinutes) ? appState.calendarScrollMinutes : dynamicDefaultStart;
  const preferredScrollTop = minutesToScrollTop(preferredStart);
  const clampedScrollTop = Math.max(0, Math.min(maxScrollTop, preferredScrollTop));
  requestAnimationFrame(() => {
    scrollWrap.scrollTop = clampedScrollTop;
  });
  scrollWrap.addEventListener("scroll", () => {
    appState.calendarScrollMinutes = scrollTopToMinutes(scrollWrap.scrollTop);
  });

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
  const panel = createElement("section", { className: "panel statistics-panel" });
  const parentMode = hasRole(appState.currentUser, "parent");
  const now = new Date();
  const range = appState.statisticsRange || "3m";
  const children = parentMode ? getChildUsers() : [appState.currentUser];
  const selectedChildId = parentMode ? (appState.statisticsChildId || "all") : appState.currentUser.id;
  const activeChildren = selectedChildId === "all"
    ? children
    : children.filter((child) => child.id === selectedChildId);

  const headerRow = createElement("div", { className: "statistics-header-row" });
  headerRow.appendChild(createElement("h2", { text: t("stats.title") }));
  const headerMeta = createElement("div", { className: "statistics-header-meta" });
  headerMeta.appendChild(createElement("span", {
    className: "statistics-header-pill",
    text: `${t("stats.currentDate")}: ${formatDate(now, { day: "2-digit", month: "2-digit", year: "numeric" })}`,
  }));
  headerMeta.appendChild(createElement("span", {
    className: "statistics-header-pill",
    text: `${t("stats.currentWeek")}: ${formatCalendarWeek(now)}`,
  }));
  headerRow.appendChild(headerMeta);
  panel.appendChild(headerRow);

  const rangeBar = createElement("div", { className: "statistics-range" });
  const rangeOptions = [
    { key: "1m", label: t("stats.rangeMonth") },
    { key: "3m", label: t("stats.rangeThreeMonths") },
    { key: "1y", label: t("stats.rangeYear") },
  ];

  rangeOptions.forEach((option) => {
    const btn = createElement("button", {
      className: `button secondary statistics-filter-button ${range === option.key ? "active" : ""}`,
      text: option.label,
    });
    btn.addEventListener("click", () => {
      appState.statisticsRange = option.key;
      renderApp();
    });
    rangeBar.appendChild(btn);
  });
  panel.appendChild(rangeBar);

  if (parentMode) {
    const childFilterBar = createElement("div", { className: "statistics-child-filter" });
    childFilterBar.appendChild(createElement("span", { className: "help", text: `${t("stats.childFilter")}:` }));
    const childOptions = [
      { id: "all", name: t("stats.allChildren") },
      ...children.map((child) => ({ id: child.id, name: child.name })),
    ];

    childOptions.forEach((option) => {
      const btn = createElement("button", {
        className: `button secondary statistics-filter-button ${selectedChildId === option.id ? "active" : ""}`,
        text: option.name,
      });
      btn.addEventListener("click", () => {
        appState.statisticsChildId = option.id;
        renderApp();
      });
      childFilterBar.appendChild(btn);
    });
    panel.appendChild(childFilterBar);
  }

  const start = getStatisticsRangeStart(range);
  const weekStarts = getWeekStartsInRange(start, now);
  const weekData = weekStarts.map((weekStart) => {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    const perChild = {};
    children.forEach((child) => {
      perChild[child.id] = {
        totalTasks: 0,
        confirmedTasks: 0,
        totalPoints: 0,
        confirmedPoints: 0,
        bonusesAchieved: [],
        bonusesRedeemed: 0,
      };
    });

    storage.tasks.forEach((task) => {
      const slot = perChild[task.assignedTo];
      if (!slot) return;
      
      // Use isTaskInWeek (not isTaskInWeekForStats) to include unscheduled tasks
      if (isTaskInWeek(task, weekStart)) {
        const points = getTaskPoints(task);
        slot.totalTasks += 1;
        slot.totalPoints += points;
        
        // Only confirmed counts toward confirmed
        if (isTaskConfirmed(task)) {
          slot.confirmedTasks += 1;
          slot.confirmedPoints += points;
        }
      }
    });

    children.forEach((child) => {
      const slot = perChild[child.id];
      if (!slot) return;
      const weekRedemptions = getBonusRedemptionsForChildWeek(child.id, weekStart);
      const childBonuses = getBonusesForChild(child.id).filter((bonus) => {
        const createdAt = parseDate(bonus.createdAt);
        if (!createdAt) return true;
        return createdAt.getTime() <= weekEnd.getTime();
      });
      slot.bonusesAchieved = childBonuses.filter((bonus) => slot.confirmedPoints >= bonus.pointsRequired);
      slot.bonusesRedeemed = weekRedemptions.length;
    });

    const aggregate = activeChildren.reduce((acc, child) => {
      const slot = perChild[child.id];
      if (!slot) return acc;
      acc.totalTasks += slot.totalTasks;
      acc.confirmedTasks += slot.confirmedTasks;
      acc.totalPoints += slot.totalPoints;
      acc.confirmedPoints += slot.confirmedPoints;
      return acc;
    }, {
      totalTasks: 0,
      confirmedTasks: 0,
      totalPoints: 0,
      confirmedPoints: 0,
    });

    return { weekStart, weekEnd, perChild, aggregate };
  });

  const hasData = weekData.some((week) => week.aggregate.totalTasks > 0) && activeChildren.length > 0;
  if (!hasData) {
    panel.appendChild(createElement("div", { className: "help", text: t("stats.noData") }));
    container.appendChild(panel);
    return;
  }

  function createWeeklyBarChart({ title, yLabel, valueKey, confirmedKey, totalKey }) {
    const showPerChild = selectedChildId === "all" && activeChildren.length > 1;
    const maxValue = showPerChild
      ? Math.max(1, ...weekData.flatMap((week) => activeChildren.map((child) => week.perChild[child.id][totalKey])))
      : Math.max(1, ...weekData.map((week) => week.aggregate[totalKey]));
    
    const chartSection = createElement("section", { className: "statistics-section" });
    chartSection.appendChild(createElement("h3", { className: "statistics-section-title", text: title }));

    const chartShell = createElement("div", { className: "statistics-chart-shell" });
    const axisWrap = createElement("div", { className: "statistics-axis-wrap" });
    axisWrap.appendChild(createElement("div", { className: "statistics-axis-title", text: yLabel }));
    const yAxis = createElement("div", { className: "statistics-y-axis" });
    const axisValues = [];
    const step = maxValue <= 5 ? 1 : Math.max(1, Math.ceil(maxValue / 5));
    for (let value = 0; value <= maxValue; value += step) {
      axisValues.push(value);
    }
    if (axisValues[axisValues.length - 1] !== maxValue) {
      axisValues.push(maxValue);
    }

    axisValues.forEach((value) => {
      const ratio = maxValue > 0 ? value / maxValue : 0;
      const tick = createElement("div", { className: "statistics-y-tick" });
      tick.style.bottom = `${Math.round(ratio * 150)}px`;
      tick.appendChild(createElement("span", { className: "statistics-y-label", text: String(value) }));
      yAxis.appendChild(tick);
    });
    axisWrap.appendChild(yAxis);

    const chart = createElement("div", { className: "statistics-chart" });
    weekData.forEach((week) => {
      const weekCol = createElement("div", { className: "statistics-week" });
      const bars = createElement("div", { className: "statistics-bars" });
      axisValues.forEach((value) => {
        const ratio = maxValue > 0 ? value / maxValue : 0;
        const gridLine = createElement("div", { className: "statistics-grid-line" });
        gridLine.style.bottom = `${Math.round(ratio * 150)}px`;
        bars.appendChild(gridLine);
      });

      if (showPerChild) {
        activeChildren.forEach((child) => {
          const childData = week.perChild[child.id];
          const totalValue = childData[totalKey];
          const confirmedValue = childData[confirmedKey];
          const totalHeight = (totalValue / maxValue) * 150;
          const confirmedHeight = (confirmedValue / maxValue) * 150;
          const barWrap = createElement("div", { className: "statistics-bar-wrap statistics-bar-wrap-child" });
          barWrap.setAttribute(
            "data-tooltip",
            `${child.name} | ${formatCalendarWeek(week.weekStart)} | ${formatDayMonth(week.weekStart)} - ${formatDayMonth(week.weekEnd)} | ${t("stats.total")}: ${totalValue} | ${t("stats.done")}: ${confirmedValue}`
          );
          const stack = createElement("div", { className: "statistics-bar-stack" });
          const totalBar = createElement("div", { className: "statistics-bar statistics-bar-total" });
          totalBar.style.height = `${totalValue > 0 ? Math.max(2, totalHeight) : 0}px`;
          totalBar.style.background = hexToRgba(getUserColor(child), 0.28);
          totalBar.style.borderColor = hexToRgba(getUserColor(child), 0.55);
          const confirmedBar = createElement("div", { className: "statistics-bar statistics-bar-done-secondary" });
          confirmedBar.style.height = `${confirmedValue > 0 ? Math.max(2, confirmedHeight) : 0}px`;
          confirmedBar.style.background = hexToRgba(getUserColor(child), 0.9);
          confirmedBar.style.borderColor = hexToRgba(getUserColor(child), 0.96);
          stack.appendChild(totalBar);
          stack.appendChild(confirmedBar);
          barWrap.appendChild(stack);
          bars.appendChild(barWrap);
        });
      } else {
        const singleChild = activeChildren[0];
        const childColor = singleChild ? getUserColor(singleChild) : null;
        const totalValue = week.aggregate[totalKey];
        const confirmedValue = week.aggregate[confirmedKey];
        const totalHeight = (totalValue / maxValue) * 150;
        const confirmedHeight = (confirmedValue / maxValue) * 150;
        const barWrap = createElement("div", { className: "statistics-bar-wrap statistics-bar-wrap-single" });
        barWrap.setAttribute(
          "data-tooltip",
          `${singleChild ? singleChild.name : ""} | ${formatCalendarWeek(week.weekStart)} | ${formatDayMonth(week.weekStart)} - ${formatDayMonth(week.weekEnd)} | ${t("stats.total")}: ${week.aggregate[totalKey]} | ${t("stats.done")}: ${week.aggregate[confirmedKey]}`
        );
        const stack = createElement("div", { className: "statistics-bar-stack" });
        const totalBar = createElement("div", { className: "statistics-bar statistics-bar-total" });
        totalBar.style.height = `${totalValue > 0 ? Math.max(2, totalHeight) : 0}px`;
        if (childColor) {
          totalBar.style.background = hexToRgba(childColor, 0.28);
          totalBar.style.borderColor = hexToRgba(childColor, 0.55);
        } else {
          totalBar.style.background = hexToRgba("#2c3e50", 0.28);
          totalBar.style.borderColor = hexToRgba("#2c3e50", 0.55);
        }
        const confirmedBar = createElement("div", { className: "statistics-bar statistics-bar-done-secondary" });
        confirmedBar.style.height = `${confirmedValue > 0 ? Math.max(2, confirmedHeight) : 0}px`;
        if (childColor) {
          confirmedBar.style.background = hexToRgba(childColor, 0.9);
          confirmedBar.style.borderColor = hexToRgba(childColor, 0.96);
        } else {
          confirmedBar.style.background = hexToRgba("#2c3e50", 0.9);
          confirmedBar.style.borderColor = hexToRgba("#2c3e50", 0.96);
        }
        stack.appendChild(totalBar);
        stack.appendChild(confirmedBar);
        barWrap.appendChild(stack);
        bars.appendChild(barWrap);
      }

      weekCol.appendChild(bars);
      weekCol.appendChild(createElement("div", { className: "statistics-week-label", text: formatCalendarWeek(week.weekStart) }));
      weekCol.appendChild(createElement("div", { className: "statistics-week-label secondary", text: formatDayMonth(week.weekStart) }));
      chart.appendChild(weekCol);
    });

    chartShell.appendChild(axisWrap);
    chartShell.appendChild(chart);
    chartSection.appendChild(chartShell);
    return chartSection;
  }

  panel.appendChild(createWeeklyBarChart({
    title: t("stats.tasksChartTitle"),
    yLabel: t("stats.total"),
    valueKey: "totalTasks",
    confirmedKey: "confirmedTasks",
    totalKey: "totalTasks",
  }));

  panel.appendChild(createWeeklyBarChart({
    title: t("stats.pointsChartTitle"),
    yLabel: t("stats.pointsChartTitle"),
    valueKey: "totalPoints",
    confirmedKey: "confirmedPoints",
    totalKey: "totalPoints",
  }));

  const bonusSection = createElement("section", { className: "statistics-section" });
  bonusSection.appendChild(createElement("h3", { className: "statistics-section-title", text: t("stats.bonusTableTitle") }));
  bonusSection.appendChild(createElement("div", {
    className: "statistics-bonus-period",
    text: `${t("stats.period")}: ${formatDayMonth(start)} - ${formatDayMonth(now)}`,
  }));
  const bonusTable = createElement("div", { className: "statistics-bonus-table" });
  const bonusGridColumns = ["minmax(64px, 0.7fr)"];
  activeChildren.forEach(() => {
    bonusGridColumns.push("minmax(0, 0.9fr)", "minmax(0, 2.3fr)", "minmax(0, 0.8fr)");
  });
  bonusTable.style.setProperty("--statistics-bonus-columns", bonusGridColumns.join(" "));

  const bonusHeader = createElement("div", { className: "statistics-bonus-row statistics-bonus-header" });
  bonusHeader.appendChild(createElement("span", { text: t("stats.currentWeek") }));
  activeChildren.forEach(() => {
    bonusHeader.appendChild(createElement("span", { text: t("stats.child") }));
    bonusHeader.appendChild(createElement("span", { text: t("stats.achievedBonus") }));
    bonusHeader.appendChild(createElement("span", { text: t("stats.redeemedBonus") }));
  });
  bonusTable.appendChild(bonusHeader);

  weekData.forEach((week) => {
    const row = createElement("div", { className: "statistics-bonus-row" });
    row.appendChild(createElement("span", { className: "statistics-bonus-kw", text: formatCalendarWeek(week.weekStart) }));

    activeChildren.forEach((child) => {
      const slot = week.perChild[child.id];
      if (!slot) return;
      const childColor = getUserColor(child);
      const achievedText = slot.bonusesAchieved.length > 0
        ? slot.bonusesAchieved.map((bonus) => `${bonus.label} (${bonus.pointsRequired})`).join(", ")
        : t("stats.noBonusAchieved");
      const childCell = createElement("span", { className: "statistics-bonus-cell statistics-bonus-cell-child", text: child.name });
      childCell.style.background = hexToRgba(childColor, 0.2);
      childCell.style.borderColor = hexToRgba(childColor, 0.45);

      const achievedCell = createElement("span", { className: "statistics-bonus-cell", text: achievedText });
      achievedCell.style.background = hexToRgba(childColor, 0.13);
      achievedCell.style.borderColor = hexToRgba(childColor, 0.38);

      const redeemedCell = createElement("span", { className: "statistics-bonus-cell", text: String(slot.bonusesRedeemed) });
      redeemedCell.style.background = hexToRgba(childColor, 0.2);
      redeemedCell.style.borderColor = hexToRgba(childColor, 0.45);

      row.appendChild(childCell);
      row.appendChild(achievedCell);
      row.appendChild(redeemedCell);
    });
    bonusTable.appendChild(row);
  });
  bonusSection.appendChild(bonusTable);
  panel.appendChild(bonusSection);

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
  buildVersion: "0.0000.0000",
  currentTab: "dashboard",
  statisticsRange: "3m",
  statisticsChildId: "all",
  calendarDate: new Date().toISOString(),
  calendarScrollMinutes: null,
  overviewCollapsed: {},
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
  const appMeta = await readAppMeta();
  if (appMeta && typeof appMeta.buildVersion === "string" && appMeta.buildVersion) {
    appState.buildVersion = appMeta.buildVersion;
  }

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
