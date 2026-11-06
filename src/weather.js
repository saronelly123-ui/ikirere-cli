
const axios = require('axios');

// Get current weather using city coordinates
async function getWeather(latitude, longitude, units = 'celsius') {
  try {
    const response = await axios.get(
      'https://api.open-meteo.com/v1/forecast',
      {
        params: {
          latitude,
          longitude,
          current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m',
          temperature_unit: units,
          wind_speed_unit: 'kmh',
          timezone: 'auto'
        },
        timeout: Number(process.env.WEATHER_TIMEOUT) || 10000
      }
    );

    return response.data.current;

  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Weather request timed out. Please try again.');
    }

    if (error.response) {
      throw new Error('Unable to get weather information.');
    }

    throw new Error('Network error. Check your internet connection.');
  }
}

module.exports = { getWeather };
