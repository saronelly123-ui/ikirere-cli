
const os = require('node:os');

const {
  readJSON,
  writeJSON,
  saveHistory
} = require('./storage');

const { getCoordinates } = require('./geocoding');
const { getWeather } = require('./weather');

// Get weather information for a city
async function weatherCommand(city) {
  try {
    const settings = await readJSON('settings.json', {
      units: process.env.WEATHER_UNITS || 'celsius',
      defaultCity: process.env.WEATHER_DEFAULT_CITY || 'Kigali'
    });

    const selectedCity = city || settings.defaultCity;
    const units = settings.units || 'celsius';
    const symbol = units === 'fahrenheit' ? '°F' : '°C';

    console.log(`\nGetting weather for ${selectedCity}...\n`);

    const location = await getCoordinates(selectedCity);

    const weather = await getWeather(
      location.latitude,
      location.longitude,
      units
    );

    await saveHistory({
      city: location.name,
      country: location.country,
      temperature: weather.temperature_2m,
      units,
      date: new Date().toISOString()
    });

    console.log('================================');
    console.log(` WEATHER IN ${location.name.toUpperCase()}`);
    console.log(` Country: ${location.country}`);
    console.log('================================');
    console.log(` Temperature: ${weather.temperature_2m} ${symbol}`);
    console.log(` Feels like: ${weather.apparent_temperature} ${symbol}`);
    console.log(` Humidity: ${weather.relative_humidity_2m}%`);
    console.log(` Wind speed: ${weather.wind_speed_10m} km/h`);
    console.log('================================');

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

// Add a city to favourites
async function addFavorite(city) {
  const favorites = await readJSON('favorites.json', []);

  const exists = favorites.some(
    (favorite) => favorite.toLowerCase() === city.toLowerCase()
  );

  if (exists) {
    console.log(`${city} is already in your favourites.`);
    return;
  }

  favorites.push(city);
  await writeJSON('favorites.json', favorites);

  console.log(`${city} has been added to your favourites!`);
}

// Display favourite cities
async function listFavorites() {
  const favorites = await readJSON('favorites.json', []);

  if (favorites.length === 0) {
    console.log('You have no favourite cities yet.');
    return;
  }

  console.log('\nYour Favourite Cities:');

  favorites.forEach((city, index) => {
    console.log(`${index + 1}. ${city}`);
  });
}

// Remove a city from favourites
async function removeFavorite(city) {
  const favorites = await readJSON('favorites.json', []);

  const updatedFavorites = favorites.filter(
    (favorite) => favorite.toLowerCase() !== city.toLowerCase()
  );

  if (updatedFavorites.length === favorites.length) {
    console.log(`${city} was not found in your favourites.`);
    return;
  }

  await writeJSON('favorites.json', updatedFavorites);

  console.log(`${city} has been removed from your favourites.`);
}

// Display weather search history
async function historyCommand() {
  const history = await readJSON('history.json', []);

  if (history.length === 0) {
    console.log('No weather search history found.');
    return;
  }

  console.log('\nWeather Search History:');

  history.forEach((entry, index) => {
    const symbol = entry.units === 'fahrenheit' ? '°F' : '°C';

    console.log(`\n${index + 1}. ${entry.city}, ${entry.country}`);
    console.log(`   Temperature: ${entry.temperature} ${symbol}`);
    console.log(`   Date: ${new Date(entry.date).toLocaleString()}`);
  });
}

// Display current settings
async function showSettings() {
  const settings = await readJSON('settings.json', {
    units: process.env.WEATHER_UNITS || 'celsius',
    defaultCity: process.env.WEATHER_DEFAULT_CITY || 'Kigali'
  });

  console.log('\nCurrent Settings:');
  console.log(`Default city: ${settings.defaultCity}`);
  console.log(`Temperature unit: ${settings.units}`);
}

// Change default city
async function setDefaultCity(city) {
  if (!city) {
    console.error('Please provide a city name.');
    process.exitCode = 1;
    return;
  }

  const settings = await readJSON('settings.json', {
    units: process.env.WEATHER_UNITS || 'celsius',
    defaultCity: process.env.WEATHER_DEFAULT_CITY || 'Kigali'
  });

  settings.defaultCity = city;

  await writeJSON('settings.json', settings);

  console.log(`Default city changed to ${city}.`);
}

// Change temperature unit
async function setTemperatureUnit(unit) {
  if (!['celsius', 'fahrenheit'].includes(unit)) {
    console.error('Use celsius or fahrenheit.');
    process.exitCode = 1;
    return;
  }

  const settings = await readJSON('settings.json', {
    units: process.env.WEATHER_UNITS || 'celsius',
    defaultCity: process.env.WEATHER_DEFAULT_CITY || 'Kigali'
  });

  settings.units = unit;

  await writeJSON('settings.json', settings);

  console.log(`Temperature unit changed to ${unit}.`);
}

// Display system information
function systemCommand() {
  console.log('\nSystem Information:');
  console.log('======================');
  console.log(`Operating System: ${os.platform()}`);
  console.log(`OS Version: ${os.release()}`);
  console.log(`Architecture: ${os.arch()}`);
  console.log(`Hostname: ${os.hostname()}`);
  console.log(`Home Directory: ${os.homedir()}`);
  console.log('======================');
}

// Export commands
module.exports = {
  weatherCommand,
  addFavorite,
  listFavorites,
  removeFavorite,
  historyCommand,
  showSettings,
  setDefaultCity,
  setTemperatureUnit,
  systemCommand
};
