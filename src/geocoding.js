
const axios = require('axios');

// Search for a city using its name
async function getCoordinates(city) {
  try {
    const response = await axios.get(
      'https://geocoding-api.open-meteo.com/v1/search',
      {
        params: {
          name: city,
          count: 1,
          language: 'en',
          format: 'json'
        },
        timeout: 10000
      }
    );

    // Get the first matching city
    const results = response.data.results;

    if (!results || results.length === 0) {
      throw new Error(`City "${city}" was not found.`);
    }

    const location = results[0];

    return {
      name: location.name,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude
    };

  } catch (error) {
    if (error.response) {
      throw new Error('Unable to search for the city. Please try again.');
    }

    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.');
    }

    throw error;
  }
}

module.exports = { getCoordinates };

