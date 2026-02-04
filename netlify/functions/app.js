const path = require("path");
const fs = require("fs");
const os = require("os");
const serverless = require("serverless-http");
const Module = require("module");

process.env.NODE_ENV = "production";

const projectRoot = path.join(__dirname, "..", "..");
const nodeModulesPath = path.join(projectRoot, "node_modules");
const packageJsonSource = path.join(projectRoot, "package.json");
const packageJsonTarget = path.join(tmpProjectDir, "package.json");

// Make sure any code executing from /tmp can resolve dependencies.
process.env.NODE_PATH = nodeModulesPath;
Module._initPaths();
module.paths.push(nodeModulesPath);
const tmpProjectDir = path.join(os.tmpdir(), "kit-project");
const appSourceDir = path.join(projectRoot, "app");
const appTargetDir = path.join(tmpProjectDir, "app");

function ensureTmpProject() {
  if (!fs.existsSync(appTargetDir)) {
    fs.mkdirSync(appTargetDir, { recursive: true });
    fs.cpSync(appSourceDir, appTargetDir, { recursive: true });
  }

  if (!fs.existsSync(packageJsonTarget)) {
    fs.copyFileSync(packageJsonSource, packageJsonTarget);
  }
}

ensureTmpProject();
process.env.KIT_PROJECT_DIR = tmpProjectDir;

const { generateAssetsSync } = require("govuk-prototype-kit/lib/build");
try {
  generateAssetsSync();
} catch (error) {
  console.error("Failed to generate assets", error);
}

const app = require("govuk-prototype-kit/server");

module.exports.handler = serverless(app);
