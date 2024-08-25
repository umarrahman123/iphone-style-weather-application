document.getElementById('cityInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWeatherData();
    }
  });
  document.getElementById('searchButton').addEventListener('click', function () {
    getWeatherData();
  })
  
  function getWeatherData() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
      alert('Please enter a city name.');
      return;
    }
  
    const apiKey = 'ade2268e2774804297cfe5deab77f1bd'; // Make sure this key is valid
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Data:', data); // Log data for debugging
  
            if (data.cod !== 200) {
                alert('City not found or other error occurred! Please enter a valid city name.');
                return;
            }
  
            // Display data
            document.getElementById('cityName').innerText = data.name;
            document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
            document.getElementById('feelsLike').innerText = `Feels Like: ${data.main.feels_like}°C`;
            document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;
            
            document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`; // Updated for humidity
            document.getElementById('wind').innerText = `Wind: ${data.wind.speed} m/s`; // Updated for wind speed
            document.getElementById('pressure').innerText = `Pressure: ${data.main.pressure} hPa`;
            document.getElementById('visibility').innerText = `Visibility: ${data.visibility / 1000} km`;
  
            // Update weather icon
            const weatherIcon = document.getElementById('icon').querySelector('i');
            const weatherMain = data.weather[0].main.toLowerCase();
  
            if (weatherMain.includes('cloud')) {
                weatherIcon.className = 'fas fa-cloud';
            } else if (weatherMain.includes('rain')) {
                weatherIcon.className = 'fas fa-cloud-showers-heavy';
            } else if (weatherMain.includes('clear')) {
                weatherIcon.className = 'fas fa-sun';
            } else if (weatherMain.includes('mist') || weatherMain.includes('fog')) {
                weatherIcon.className = 'fas fa-smog';
            } else if (weatherMain.includes('snow')) {
                weatherIcon.className = 'fas fa-snowflake';
            } else if (weatherMain.includes('storm')) {
                weatherIcon.className = 'fas fa-bolt';
            } else if (weatherMain.includes('night')) {
                weatherIcon.className = 'fas fa-moon';
            } else {
                weatherIcon.className = 'fas fa-cloud-sun';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data! Please try again.');
        });
  }
  
  fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=ade2268e2774804297cfe5deab77f1bd&units=metric')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  
  