const form = document.getElementById("weather_form");
const weatherInfo = document.getElementById("weatherInfo");
const historyList = document.getElementById("historyList");
const logs = document.getElementById("logs");
const cityInput = document.getElementById("city");

function log(message) {
    logs.textContent += message + "\n";
}

function resetLogs() {
    logs.textContent = "";
}

async function fetchWeather(cityName) {

    resetLogs(); // 🔥 Reset logs every search

    log("1️⃣ Sync Start");
    log("2️⃣ Sync End");
    log("[ASYNC] Start fetching");

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=195f92a4c09e7551dc56d61b65e51210&units=metric`
        );

        log("3️⃣Promise then (Microtask)");

        if (!response.ok) {
            throw new Error("City not found!");
        }

        const data = await response.json();

        log("[ASYNC] Data received");

        setTimeout(() => {
            log("4️⃣setTimeout (Macrotask)");
            log("[ASYNC] Data received");
        }, 0);

        displayWeather(data);

    } catch (error) {
        weatherInfo.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

function displayWeather(data) {

    weatherInfo.innerHTML = `
        <h3>Weather Info</h3>

        <div class="weather-row">
            <span>City</span>
            <span>${data.name}, ${data.sys.country}</span>
        </div>

        <div class="weather-row">
            <span>Temperature</span>
            <span>${data.main.temp} °C</span>
        </div>

        <div class="weather-row">
            <span>Weather</span>
            <span>${data.weather[0].main}</span>
        </div>

        <div class="weather-row">
            <span>Humidity</span>
            <span>${data.main.humidity}%</span>
        </div>

        <div class="weather-row">
            <span>Wind</span>
            <span>${data.wind.speed} m/s</span>
        </div>
    `;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cityName = cityInput.value.trim();
    if (!cityName) return;

    await fetchWeather(cityName);
    saveToLocalStorage(cityName);
});

/* Session Storage */

function saveToLocalStorage(cityName) {
    let history = JSON.parse(sessionStorage.getItem("weatherHistory")) || [];

    if (!history.includes(cityName)) {
        history.push(cityName);
        sessionStorage.setItem("weatherHistory", JSON.stringify(history));
    }

    loadHistory();
}

function loadHistory() {
    historyList.innerHTML = "";
    let history = JSON.parse(sessionStorage.getItem("weatherHistory")) || [];

    history.forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;

        li.addEventListener("click", async () => {
            await fetchWeather(city);
        });

        historyList.appendChild(li);
    });
}