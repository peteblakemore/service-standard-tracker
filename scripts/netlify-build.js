const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

const { generateAssetsSync } = require('govuk-prototype-kit/lib/build');

const projectRoot = process.cwd();
const tmpPublicDir = path.join(projectRoot, '.tmp', 'public');
const publishDir = path.join(projectRoot, 'public');

try {
  generateAssetsSync();
} catch (error) {
  console.error('Asset generation failed', error);
  process.exit(1);
}

if (!fs.existsSync(tmpPublicDir)) {
  console.error('Expected .tmp/public assets not found');
  process.exit(1);
}

fse.ensureDirSync(publishDir);

// Clear existing publish dir except .keep
fse.readdirSync(publishDir).forEach((entry) => {
  if (entry !== '.keep') {
    fse.removeSync(path.join(publishDir, entry));
  }
});

fse.copySync(tmpPublicDir, publishDir, { overwrite: true });
console.log('Assets copied to public/');
