const apiKey = '037627fe4e5aaa6a42ca8c9eec4139c4'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city');
        return;
    }

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod !== '200') {
        alert('Error fetching weather data');
        return;
    }

    document.getElementById('location').textContent = `${data.city.name}`;
    updateCurrentWeather(data);
    updateForecast(data);
}

function updateCurrentWeather(data) {
    const currentWeather = data.list[0];
    const weatherIcon = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;
    const weatherHTML = `
        <h3>Now: ${currentWeather.main.temp}°C</h3>
        <img src="${weatherIcon}" alt="${currentWeather.weather[0].description}">
        <p>${currentWeather.weather[0].description}</p>
    `;
    document.getElementById('current-weather').innerHTML = weatherHTML;
}

function updateForecast(data) {
    let forecastHTML = '';
    for (let i = 0; i < data.list.length; i += 8) { // Every 8th item is approximately daily forecast
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
        const weatherIcon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        forecastHTML += `
            <div class="forecast-item">
                <span>${date}</span>
                <img src="${weatherIcon}" alt="${forecast.weather[0].description}">
                <span>${forecast.main.temp_min}°C - ${forecast.main.temp_max}°C</span>
                <span>${forecast.weather[0].description}</span>
            </div>
        `;
    }
    document.getElementById('forecast').innerHTML = forecastHTML;
}