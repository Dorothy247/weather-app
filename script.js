document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    
    fetchWeatherData('London');
    
    searchBtn.addEventListener('click', function() {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeatherData(city);
        }
    });
    
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeatherData(city);
            }
        }
    });
});

function fetchWeatherData(city) {
    const apiKey = 'a298426875380d10eb5b024b34c1787c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            updateWeatherUI(data);
        })
        .catch(error => {
            alert(error.message);
            console.error('Error fetching weather data:', error);
        });
}

function updateWeatherUI(data) {
    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('condition').textContent = data.weather[0].description;
    
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);
    
    const weatherIcon = document.getElementById('icon').querySelector('i');
    const weatherMain = data.weather[0].main.toLowerCase();
    
    if (weatherMain.includes('cloud')) {
        weatherIcon.className = 'fas fa-cloud';
    } else if (weatherMain.includes('rain')) {
        weatherIcon.className = 'fas fa-cloud-rain';
    } else if (weatherMain.includes('snow')) {
        weatherIcon.className = 'fas fa-snowflake';
    } else if (weatherMain.includes('thunder')) {
        weatherIcon.className = 'fas fa-bolt';
    } else if (weatherMain.includes('clear')) {
        weatherIcon.className = 'fas fa-sun';
    } else if (weatherMain.includes('mist') || weatherMain.includes('fog')) {
        weatherIcon.className = 'fas fa-smog';
    } else {
        weatherIcon.className = 'fas fa-cloud-sun';
    }
    
    document.getElementById('wind').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('clouds').textContent = `${data.clouds.all}%`;
}