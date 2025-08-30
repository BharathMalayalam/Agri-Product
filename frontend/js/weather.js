
async function getWeather() {
  const apiKey = "4fe6138e0855075260eb98f0c32c5e1d"; 
  const city=document.getElementById('city_name').value || 'Erode';
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  if (!res.ok) {
    console.error(`HTTP error! status: ${res.status}`);
    document.getElementById('weatherInfo').innerHTML = `Error fetching weather: ${res.statusText}`;
    return; 
  }
  const data = await res.json();
  const weatherText = `
    ${data.main.temp}°C <br>
  `;
  const weatherText1 = `
    Location:<strong><b> ${data.name}, ${data.sys.country}</b> </strong><br>
    Weather:${data.weather[0].main} - ${data.weather[0].description} <br>
    Wind Speed: ${data.wind.speed} m/s <br>
    Pressure: ${data.main.pressure} hPa <br> 
    Temperature Range: ${data.main.temp_min}°C - ${data.main.temp_max}°C <br>
    Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString
()} <br>
    Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()} <br>
  `;
  document.getElementById('weatherInfo').innerHTML = weatherText;
  document.getElementById('weatherDetails').innerHTML = weatherText1;
  recommendCrops(data.weather[0].main.toLowerCase());
}
function recommendCrops(weather) {
  const cropList = {
    clear: ['Groundnut', 'Maize', 'Cotton'],
    rain: ['Paddy', 'Sugarcane', 'Jute'],
    clouds: ['Soybean', 'Black Gram', 'Sesame'],
    thunderstorm: ['Avoid sowing today'],
    mist: ['Carrot', 'Beetroot', 'Spinach']
  };

  const crops = cropList[weather] || ['No specific guidance for this weather.'];
  const listEl = document.getElementById('cropSuggestions');
  listEl.innerHTML = '';

  crops.forEach(crop => {
    const li = document.createElement('li');
    li.textContent = crop;
    listEl.appendChild(li);
  });
}

getWeather();

