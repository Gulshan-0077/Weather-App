document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");
  const errorDiv = document.getElementById("errorMsg");

  resultDiv.innerHTML = "";
  errorDiv.textContent = "";

  if (!city) {
    errorDiv.textContent = "Please enter a city name.";
    return;
  }

  const apiKey = "3e193f4d3ff24b90b4275520252704";
  const url =`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)} &q=London&aqi=yes`

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      errorDiv.textContent = data.error.message;
      return;
    }

    const { location, current } = data;
    resultDiv.innerHTML = `
      <h3>${location.name}, ${location.country}</h3>
      <p><strong>${current.condition.text}</strong></p>
      <p>🌡️ Temp: ${current.temp_c}°C</p>
      <p>💧 Humidity: ${current.humidity}%</p>
      <p>🌬️ Wind: ${current.wind_kph} kph</p>
      <img src="https:${current.condition.icon}" alt="weather icon" />
    `;
  } catch (error) {
    errorDiv.textContent = "Unable to fetch weather. Try again later.";
  }
}