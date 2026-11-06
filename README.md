
# 🌦️ Ikirere Weather CLI

Ikirere Weather CLI is a command-line weather application built with Node.js. It allows users to check current weather information for different cities, manage favourite cities, view search history, and customize application settings.

## Features

- Check current weather for any city.
- Display temperature in Celsius or Fahrenheit.
- Show humidity, feels-like temperature, and wind speed.
- Add, list, and remove favourite cities.
- Save and view weather search history.
- Change the default city.
- Customize temperature units.
- Display system information.
- Store application data in JSON files.
- Use environment variables for configuration.
- Handle errors with friendly messages.

## Technologies Used

- Node.js
- JavaScript
- Axios
- dotenv
- Open-Meteo Weather API
- Open-Meteo Geocoding API
- Node.js built-in modules:
  - `fs/promises`
  - `path`
  - `os`
  - `util`
  - `process`

## Project Structure

```text
ikirere-cli/
│
├── bin/
│   └── ikirere.js
│
├── src/
│   ├── commands.js
│   ├── geocoding.js
│   ├── storage.js
│   ├── weather.js
│   └── utils.js
│
├── data/
│   ├── favorites.json
│   ├── history.json
│   └── settings.json
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/saronelly123-ui/ikirere-cli.git
```

### 2. Open the project folder

```bash
cd ikirere-cli
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root folder and add:

```env
WEATHER_DEFAULT_CITY=Kigali
WEATHER_UNITS=celsius
WEATHER_TIMEOUT=10000
```

### 5. Link the CLI globally

```bash
npm link
```

## Usage

### Check weather

```bash
ikirere weather Kigali
```

You can replace Kigali with another city.

### Manage favourite cities

Add a favourite city:

```bash
ikirere favorite add Kigali
```

List favourite cities:

```bash
ikirere favorite list
```

Remove a favourite city:

```bash
ikirere favorite remove Kigali
```

### View weather history

```bash
ikirere history
```

### Manage settings

Display current settings:

```bash
ikirere settings show
```

Change the default city:

```bash
ikirere settings city Musanze
```

Change temperature to Fahrenheit:

```bash
ikirere settings units fahrenheit
```

Change temperature to Celsius:

```bash
ikirere settings units celsius
```

### Display system information

```bash
ikirere system
```

### Help and version

```bash
ikirere --help
ikirere --version
```

## Data Storage

The application uses JSON files to store information locally.

- `favorites.json` stores favourite cities.
- `history.json` stores previous weather searches.
- `settings.json` stores the default city and temperature unit.

This allows information to remain available between application runs.

## Error Handling

The application handles common errors, including:

- City not found.
- Network connection problems.
- Request timeouts.
- Invalid temperature units.
- Unknown commands.

Friendly error messages help users understand and solve problems.

## Testing

Run the test command:

```bash
npm test
```

## Weather API

This application uses Open-Meteo APIs:

- Geocoding API: https://geocoding-api.open-meteo.com/
- Weather Forecast API: https://api.open-meteo.com/

No API key is required for the Open-Meteo endpoints used by this project.

## Author

**Saro Nelly**

GitHub: [saronelly123-ui](https://github.com/saronelly123-ui)

## License

This project is licensed under the ISC License.
