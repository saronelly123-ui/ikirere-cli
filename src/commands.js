const { readJSON, writeJSON, saveHistory } = require('./storage');
const { saveHistory } = require('./storage');
const { getCoordinates } = require('./geocoding');
const { getWeather } = require('./weather');

// Display weather information for a city
async function weatherCommand(city) {
  try {
    console.log(`\nGetting weather for ${city}...\n`);

    // Find city coordinates
    const location = await getCoordinates(city);

    // Fetch current weather
    const weather = await getWeather(
      location.latitude,
      location.longitude
    );
    // Save this weather search
await saveHistory({
  city: location.name,
  country: location.country,
  temperature: weather.temperature_2m,
  date: new Date().toISOString()

});
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

    // Display results
    console.log('================================');
    console.log(` WEATHER IN ${location.name.toUpperCase()}`);
    console.log(` Country: ${location.country}`);
    console.log('================================');
    console.log(` Temperature: ${weather.temperature_2m} °C`);
    console.log(` Feels like: ${weather.apparent_temperature} °C`);
    console.log(` Humidity: ${weather.relative_humidity_2m}%`);
    console.log(` Wind speed: ${weather.wind_speed_10m} km/h`);
    console.log('================================');

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}


module.exports = {
  weatherCommand,
  addFavorite,
  listFavorites,
  removeFavorite
};
