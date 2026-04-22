const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn, spawnSync } = require("child_process");
const AdmZip = require("adm-zip");

const projectRoot = process.env.TIMI_UPDATE_PROJECT_ROOT || process.cwd();
const zipPath = process.env.TIMI_UPDATE_ZIP_PATH || "";
const currentPid = Number(process.env.TIMI_UPDATE_CURRENT_PID || 0);
const restartCommand = process.env.TIMI_UPDATE_RESTART_COMMAND || "";
const source = process.env.TIMI_UPDATE_SOURCE || "";
const targetVersion = process.env.TIMI_UPDATE_TARGET_VERSION || "";
const appVersion = process.env.TIMI_UPDATE_APP_VERSION || "";
const statusPath = process.env.TIMI_UPDATE_STATUS_PATH || path.join(projectRoot, "updater-status.json");
const preservePaths = (() => {
  try {
    const raw = JSON.parse(process.env.TIMI_UPDATE_PRESERVE_PATHS || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch (_error) {
    return [];
  }
})();

function writeStatus(patch) {
  let current = {
    status: "idle",
    message: "",
    error: "",
    source,
    currentVersion: appVersion,
    targetVersion,
    startedAt: null,
    finishedAt: null,
    lastCheckedAt: null,
    latestRelease: null,
  };

  try {
    if (fs.existsSync(statusPath)) {
      current = {
        ...current,
        ...JSON.parse(fs.readFileSync(statusPath, "utf8")),
      };
    }
  } catch (_error) {
    // Ignore status parsing issues and overwrite the file below.
  }

  const next = {
    ...current,
    ...patch,
    currentVersion: appVersion,
  };

  fs.writeFileSync(statusPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
}

function isPreserved(relativePath) {
  const normalized = relativePath.replace(/\\/g, "/").replace(/^\/+/, "");
  return preservePaths.some((entry) => normalized === entry || normalized.startsWith(`${entry}/`));
}

function resolveExtractedRoot(baseDir) {
  const directEntries = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter((entry) => entry.name !== "__MACOSX");

  if (directEntries.length === 1 && directEntries[0].isDirectory()) {
    return path.join(baseDir, directEntries[0].name);
  }

  return baseDir;
}

function copyDirectory(sourceDir, targetDir, relativeRoot = "") {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "__MACOSX" || entry.name === ".git" || entry.name === "node_modules") {
      continue;
    }

    const sourcePath = path.join(sourceDir, entry.name);
    const relativePath = relativeRoot ? `${relativeRoot}/${entry.name}` : entry.name;
    if (isPreserved(relativePath)) {
      continue;
    }

    const targetPath = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      try {
        fs.mkdirSync(targetPath, { recursive: true });
      } catch (error) {
        throw new Error(
          `Cannot create directory "${targetPath}": ${error.message}. ` +
          `Please ensure the application has write permissions to ${targetDir}`
        );
      }
      copyDirectory(sourcePath, targetPath, relativePath);
      continue;
    }

    try {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    } catch (error) {
      throw new Error(
        `Cannot create directory "${path.dirname(targetPath)}": ${error.message}. ` +
        `Please ensure the application has write permissions to ${targetDir}`
      );
    }

    try {
      fs.copyFileSync(sourcePath, targetPath);
    } catch (error) {
      throw new Error(
        `Cannot copy file "${relativePath}": ${error.message}. ` +
        `Please ensure the application has write permissions to ${targetDir}. ` +
        `The update requires write access to the application directory.`
      );
    }
  }
}

function runCommand(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    encoding: "utf8",
    stdio: "pipe",
    ...options,
  });

  if (result.status !== 0) {
    const stderr = result.stderr ? result.stderr.trim() : "";
    const stdout = result.stdout ? result.stdout.trim() : "";
    throw new Error(stderr || stdout || `${command} failed with exit code ${result.status || 1}`);
  }

  return result;
}

async function restartApplication() {
  if (restartCommand) {
    runCommand(restartCommand, [], { shell: true });
    return;
  }

  if (currentPid > 0) {
    try {
      process.kill(currentPid, "SIGTERM");
    } catch (_error) {
      // Ignore: process may already have exited.
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 1200));

  const env = { ...process.env };
  delete env.TIMI_UPDATE_PROJECT_ROOT;
  delete env.TIMI_UPDATE_ZIP_PATH;
  delete env.TIMI_UPDATE_CURRENT_PID;
  delete env.TIMI_UPDATE_RESTART_COMMAND;
  delete env.TIMI_UPDATE_PRESERVE_PATHS;
  delete env.TIMI_UPDATE_STATUS_PATH;
  delete env.TIMI_UPDATE_SOURCE;
  delete env.TIMI_UPDATE_TARGET_VERSION;
  delete env.TIMI_UPDATE_APP_VERSION;

  const child = spawn(process.execPath, [path.join(projectRoot, "server.js")], {
    cwd: projectRoot,
    detached: true,
    stdio: "ignore",
    env,
  });
  child.unref();
}

async function main() {
  if (!zipPath || !fs.existsSync(zipPath)) {
    throw new Error("Update ZIP package is missing.");
  }

  writeStatus({
    status: "running",
    message: "Extracting update package...",
    error: "",
    source,
    targetVersion,
    startedAt: new Date().toISOString(),
    finishedAt: null,
  });

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "timiplanner-apply-"));
  const extractDir = path.join(tempDir, "extract");
  fs.mkdirSync(extractDir, { recursive: true });

  const zip = new AdmZip(zipPath);
  zip.extractAllTo(extractDir, true);

  const sourceRoot = resolveExtractedRoot(extractDir);
  if (!fs.existsSync(path.join(sourceRoot, "package.json"))) {
    throw new Error("Uploaded archive does not look like a TiMiPlanner repository ZIP.");
  }

  writeStatus({
    status: "running",
    message: "Copying application files...",
    error: "",
  });
  copyDirectory(sourceRoot, projectRoot);

  writeStatus({
    status: "running",
    message: "Installing npm dependencies...",
    error: "",
  });
  runCommand("npm", ["install"]);

  writeStatus({
    status: "running",
    message: "Restarting application...",
    error: "",
  });
  await restartApplication();

  writeStatus({
    status: "completed",
    message: "Update installed successfully.",
    error: "",
    finishedAt: new Date().toISOString(),
  });
}

main().catch((error) => {
  writeStatus({
    status: "failed",
    message: "Update failed.",
    error: error && error.message ? error.message : "Unknown update error.",
    finishedAt: new Date().toISOString(),
  });
  process.exitCode = 1;
});