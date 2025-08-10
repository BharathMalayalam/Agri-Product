const apiKey = '8add6c323796cef8d2380a4fbcd10bf8';
const city = 'Erode';

async function getWeather() {
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
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const messages = document.getElementById('messages');

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMsg = userInput.value.trim();
  if (!userMsg) return;

  addMessage('You', userMsg, 'user');
  userInput.value = '';

  const reply = await getAIResponse(userMsg);
  addMessage('AgriBot', reply, 'bot');
});

function addMessage(sender, text, className) {
  const div = document.createElement('div');
  div.className = `message ${className}`;
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

