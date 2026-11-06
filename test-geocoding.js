const { getCoordinates } = require('./src/geocoding');
const { getWeather } = require('./src/weather');

async function test() {
  try {
    // Step 1: Find the city's coordinates
    const location = await getCoordinates('Kigali');

    // Step 2: Get weather using those coordinates
    const weather = await getWeather(
      location.latitude,
      location.longitude
    );

    console.log('\nWeather in', location.name, location.country);
    console.log('Temperature:', weather.temperature_2m, '°C');
    console.log('Feels like:', weather.apparent_temperature, '°C');
    console.log('Humidity:', weather.relative_humidity_2m, '%');
    console.log('Wind speed:', weather.wind_speed_10m, 'km/h');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();