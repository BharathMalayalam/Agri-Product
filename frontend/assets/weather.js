const apiKey = '8add6c323796cef8d2380a4fbcd10bf8';


async function getWeather() {
  const city=document.getElementById('city_name').value;
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  const data = await res.json();

  const weatherText = `
    Location: ${data.name} <br>
    Temperature: ${data.main.temp}°C <br>
    Weather: ${data.weather[0].main} - ${data.weather[0].description}
  `;
  document.getElementById('weatherInfo').innerHTML = weatherText;

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

