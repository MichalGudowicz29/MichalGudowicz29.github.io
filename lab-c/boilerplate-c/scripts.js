const API_KEY = "4fab6421cd3e5380c43ce82959456644";

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

    drawWeather() {
    }

    createWeatherBlock() {
    }
}

const weatherApp = new WeatherApp();
