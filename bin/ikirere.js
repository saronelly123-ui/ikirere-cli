#!/usr/bin/env node

const { parseArgs } = require('node:util');
const {
  weatherCommand,
  addFavorite,
  listFavorites,
  removeFavorite
} = require('../src/commands');

// Display help information
function showHelp() {
  console.log(`
Welcome to Ikirere Weather CLI!

Usage:
  ikirere <command> [options]

Commands:
  weather <city>     Get weather information

Options:
  -h, --help         Show help
  -v, --version      Show version

Examples:
  ikirere weather Kigali
  ikirere weather Musanze
  ikirere --help
  ikirere --version
  `);
}

// Main application
async function main() {
  try {
    const { values, positionals } = parseArgs({
      args: process.argv.slice(2),
      options: {
        help: {
          type: 'boolean',
          short: 'h'
        },
        version: {
          type: 'boolean',
          short: 'v'
        }
      },
      allowPositionals: true
    });

    if (values.help) {
      showHelp();
      return;
    }

    if (values.version) {
      console.log('Ikirere CLI version 1.0.0');
      return;
    }

    const [command, ...args] = positionals;

    if (command === 'weather') {
      const city = args.join(' ').trim();

      if (!city) {
        console.error('Error: Please provide a city name.');
        process.exitCode = 1;
        return;
      }

      await weatherCommand(city);
      return;
    }
    // Handle favourite commands
if (command === 'favorite') {
  const action = args[0];
  const city = args.slice(1).join(' ').trim();

  if (action === 'list') {
    await listFavorites();
    return;
  }

  if (action === 'add' || action === 'remove') {
    if (!city) {
      console.error('Error: Please provide a city name.');
      process.exitCode = 1;
      return;
    }

    if (action === 'add') {
      await addFavorite(city);
    } else {
      await removeFavorite(city);
    }

    return;
  }

  console.error('Error: Use add, list, or remove with favorite.');
  process.exitCode = 1;
  return;
}

    if (command) {
      console.error(`Error: Unknown command "${command}".`);
      console.log('Use "ikirere --help" to see available commands.');
      process.exitCode = 1;
      return;
    }

    showHelp();

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

main();