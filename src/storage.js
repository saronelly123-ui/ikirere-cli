const fs = require('node:fs/promises');
const path = require('node:path');

// Find the data folder
const DATA_DIR = path.join(__dirname, '..', 'data');

// Read information from a JSON file
async function readJSON(filename, defaultValue) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const content = await fs.readFile(filePath, 'utf8');

    return JSON.parse(content);

  } catch (error) {
    if (error.code === 'ENOENT') {
      return defaultValue;
    }

    throw error;
  }
}

// Save information into a JSON file
async function writeJSON(filename, data) {
  const filePath = path.join(DATA_DIR, filename);

  await fs.writeFile(
    filePath,
    JSON.stringify(data, null, 2),
    'utf8'
  );
}

// Save weather search history
async function saveHistory(entry) {
  const history = await readJSON('history.json', []);

  history.unshift(entry);

  await writeJSON('history.json', history);
}

module.exports = {
  readJSON,
  writeJSON,
  saveHistory
};