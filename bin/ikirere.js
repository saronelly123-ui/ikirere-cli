


require('dotenv').config();

const { parseArgs } = require('node:util');

const {
  weatherCommand,
  addFavorite,
  listFavorites,
  removeFavorite,
  historyCommand,
  showSettings,
  setDefaultCity,
  setTemperatureUnit,
  systemCommand
} = require('../src/commands');

// Display help information
function showHelp() {
  console.log(`
Welcome to Ikirere Weather CLI!

Usage:
  ikirere <command> [options]

Commands:
  weather <city>             Get weather information
  favorite add <city>        Add a city to favourites
  favorite list              Show favourite cities
  favorite remove <city>     Remove a favourite city
  history                    Show weather search history
  settings show              Show current settings
  settings city <city>       Change default city
  settings units <unit>      Change temperature unit
  system                     Show system information

Options:
  -h, --help                 Show help
  -v, --version              Show version

Examples:
  ikirere weather Kigali
  ikirere favorite add Kigali
  ikirere favorite list
  ikirere favorite remove Kigali
  ikirere history
  ikirere settings show
  ikirere settings city Musanze
  ikirere settings units fahrenheit
  ikirere system
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

    // Handle help option
    if (values.help) {
      showHelp();
      return;
    }

    // Handle version option
    if (values.version) {
      console.log('Ikirere CLI version 1.0.0');
      return;
    }

    const [command, ...args] = positionals;

    // Weather command
    if (command === 'weather') {
      const city = args.join(' ').trim();
      await weatherCommand(city);
      return;
    }

    // Favourite commands
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

    // History command
    if (command === 'history') {
      await historyCommand();
      return;
    }

    // Settings commands
    if (command === 'settings') {
      const action = args[0];
      const value = args.slice(1).join(' ').trim();

      if (action === 'show') {
        await showSettings();
        return;
      }

      if (action === 'city') {
        await setDefaultCity(value);
        return;
      }

      if (action === 'units') {
        await setTemperatureUnit(value.toLowerCase());
        return;
      }

      console.error('Error: Use show, city, or units with settings.');
      process.exitCode = 1;
      return;
    }

    // System information command
    if (command === 'system') {
      systemCommand();
      return;
    }

    // Unknown command
    if (command) {
      console.error(`Error: Unknown command "${command}".`);
      console.log('Use "ikirere --help" to see available commands.');
      process.exitCode = 1;
      return;
    }

    // Show help if no command is provided
    showHelp();

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

main();
