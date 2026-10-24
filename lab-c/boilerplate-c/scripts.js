const API_KEY = "7ded80d91f2b280ec979100cc8bbba94";

class WeatherApp {
    constructor() {
    }

    async getWeather(city, country) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;

        if (country) {
            url += `,${country}`;
        }

        url += `&appid=${API_KEY}`;

        const response = await fetch(url);
        return response.json();
    }

    getForecast() {
    }

    drawWeather(forecast) {
        const weatherBlock = document.querySelector("#weather-block");
        weatherBlock.innerHTML = "";

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
}

const weatherApp = new WeatherApp();
