const path = require('path');
const fs = require('fs');

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

fs.mkdirSync(publishDir, { recursive: true });

// Clear existing publish dir except .keep
fs.readdirSync(publishDir).forEach((entry) => {
  if (entry !== '.keep') {
    fs.rmSync(path.join(publishDir, entry), { recursive: true, force: true });
  }
});

fs.cpSync(tmpPublicDir, publishDir, { recursive: true });
console.log('Assets copied to public/');
