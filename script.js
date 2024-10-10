// API key for accessing OpenWeatherMap API
const apiKey = '037627fe4e5aaa6a42ca8c9eec4139c4'; 

// Function to fetch weather data based on user input
async function getWeather() {
    // Get the city name from the input field
    const city = document.getElementById('city').value;

    // Alert the user if no city was entered
    if (!city) {
        alert('Please enter a city');
        return;
    }

    // Fetch the weather forecast data for the entered city
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
    
    // Parse the JSON response from the API
    const data = await response.json();

    // Check if the API returned a successful response (code 200 indicates success)
    if (data.cod !== '200') {
        alert('Error fetching weather data');
        return;
    }

    // Update the UI with the fetched location name
    document.getElementById('location').textContent = `${data.city.name}`;
    
    // Call functions to update the current weather and the 5-day forecast
    updateCurrentWeather(data);
    updateForecast(data);
}

// Function to display current weather information
function updateCurrentWeather(data) {
    // Get the current weather data from the first item in the list
    const currentWeather = data.list[0];
    
    // Build the URL for the weather icon
    const weatherIcon = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;

    // Generate the HTML to display current weather data
    const weatherHTML = `
        <h3>Now: ${currentWeather.main.temp}°C</h3>
        <img src="${weatherIcon}" alt="${currentWeather.weather[0].description}">
        <p>${currentWeather.weather[0].description}</p>
    `;

    // Insert the current weather HTML into the webpage
    document.getElementById('current-weather').innerHTML = weatherHTML;
}

// Function to display the 5-day weather forecast
function updateForecast(data) {
    let forecastHTML = '';

    // Iterate over the list and pick every 8th item (each day’s forecast)
    for (let i = 0; i < data.list.length; i += 8) { 
        const forecast = data.list[i];
        
        // Convert the Unix timestamp to a readable date format (e.g., "Mon, 12 Oct")
        const date = new Date(forecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
        
        // Build the URL for the forecast weather icon
        const weatherIcon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

        // Generate the HTML to display the forecast for each day
        forecastHTML += `
            <div class="forecast-item">
                <span>${date}</span>
                <img src="${weatherIcon}" alt="${forecast.weather[0].description}">
                <span>${forecast.main.temp_min}°C - ${forecast.main.temp_max}°C</span>
                <span>${forecast.weather[0].description}</span>
            </div>
        `;
    }

    // Insert the forecast HTML into the webpage
    document.getElementById('forecast').innerHTML = forecastHTML;
}
