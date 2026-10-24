const API_KEY = "7ded80d91f2b280ec979100cc8bbba94";

class WeatherApp {
    constructor() {
    }

    getWeather(city, country) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;

        if (country) {
            url += `,${country}`;
        }

        url += `&appid=${API_KEY}`;

        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open("GET", url);
            request.send();

            request.onload = function () {
                if (request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(new Error("Nie udało się pobrać bieżącej pogody."));
                }
            };

            request.onerror = function () {
                reject(new Error("Błąd połączenia z API."));
            };
        });
    }

    async getForecast(city, country) {
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}`;

        if (country) {
            url += `,${country}`;
        }

        url += `&appid=${API_KEY}`;

        const response = await fetch(url);
        return response.json();
    }

    drawWeather(forecast) {
        const weatherBlock = document.querySelector("#weather-block");

        forecast.list.forEach((weather) => {
            this.createWeatherBlock(weather);
        });
    }

    createWeatherBlock(weather) {
        const block = document.createElement("div");
        block.classList.add("weather-card");

        const date = document.createElement("h2");
        date.textContent = weather.dt_txt;

        const temperature = document.createElement("p");
        temperature.textContent =
            `Temperatura: ${(weather.main.temp - 273.15).toFixed(1)}°C`;

        const description = document.createElement("p");
        description.textContent = weather.weather[0].description;

        block.append(date, temperature, description);
        document.querySelector("#weather-block").append(block);
    }

    drawCurrentWeather(weather) {
        const block = document.createElement("div");
        block.classList.add("weather-card");
        block.innerHTML = `
            <h2>Pogoda teraz: ${weather.name}</h2>
            <p>Temperatura: ${(weather.main.temp - 273.15).toFixed(1)}°C</p>
            <p>${weather.weather[0].description}</p>
        `;
        document.querySelector("#weather-block").prepend(block);
    }
}

const weatherApp = new WeatherApp();

document.querySelector("#weather-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const location = document.querySelector("#location").value.split(",");
    const city = location[0].trim();
    const country = location[1]?.trim();
    const weatherBlock = document.querySelector("#weather-block");

    weatherBlock.innerHTML = "";

    const currentWeather = await weatherApp.getWeather(city, country);
    const forecast = await weatherApp.getForecast(city, country);

    weatherApp.drawCurrentWeather(currentWeather);
    weatherApp.drawWeather(forecast);
});
