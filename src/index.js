import "./style.css"
// icons
import snow from "./img/LightSnow.svg"
import fog from "./img/fog.svg"
import windy from "./img/windy.svg"
import rain from "./img/ModerateRain.svg"
import partlyCloudyDay from "./img/partially-cloudy.svg"
import sunny from "./img/sunny.svg"
import cloudy from "./img/cloudy.svg"
// api 
import { getCurrentWeather, getCurrentTime } from "./weather.js"

// DOM
const time = document.querySelector(".time")
const icon = document.querySelector("#icon")
const degree = document.querySelector("#degree")
const description = document.querySelector("#overview-2")
const wind = document.querySelector("#wind")
const humidity = document.querySelector("#humidity")
const visibility = document.querySelector("#visibility")
const pressure = document.querySelector("#pressure")

// city select input
const select_input = document.querySelector("#city-input")

async function weather() {
    const weather = await getCurrentWeather(select_input.value)
    // changing values
    time.textContent = await getCurrentCityTime(select_input.value)
    // formule: (33.8°F − 32) × 5/9 = 1°C
    const celcius = (weather.temp - 32) * 5 / 9
    degree.textContent = parseInt(celcius, 10) + "°C"
    description.textContent = weather.conditions
    wind.textContent = weather.windspeed + " km/h"
    humidity.textContent = weather.humidity + " %"
    visibility.textContent = weather.visibility + " km"
    pressure.textContent = weather.pressure + " hPa"

    if (weather.snow > 0) {
        // snow 
        icon.src = snow
    } else if (weather.windspeed < 1) {
        // fog 
        icon.src = fog
    } else if (weather.windspeed > 30) {
        // wind 
        icon.src = windy
    } else if (weather.cloudcover > 90) {
        // cloudy 
        icon.src = cloudy
    } else if (weather.cloudcover > 20 && weather.cloudcover < 90) {
        // partly-cloudy-day
        icon.src = partlyCloudyDay
    } else if (weather.cloudcover < 20) {
        // sunny
        icon.src = sunny
    } else if (weather.precip > 0) {
        // rain
        icon.src = rain
    }

    console.log(weather)
}

// default weather
weather()

// select input, "change" event listener
select_input.addEventListener("change", weather)

// get the current city date
async function getCurrentCityTime(city) {
    const date = new Date();
    // getting the timezone from the promise
    const timeZone = await getCurrentTime(city)
    // format the timezone
    const formattedTimezone = new Intl.DateTimeFormat("en-US", {
        timeZone: `${timeZone}`,
        timeStyle: "short"
    }).format(date);

    return formattedTimezone;
}