// visual crossing KEY
// i didn't use .env to use my project in github pages
// require("dotenv").config();
// const visual_crossing_API = process.env.VISUAL_CROSSING_API_KEY

const visual_crossing_API = "7VSN5GSKUJ65VN9YUGYJQ2JJP"

// get city weather function
async function getWeather(city) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${visual_crossing_API}`)
        const cityWeather = await response.json()
        return cityWeather
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
}

// get current weather function
async function getCurrentWeather(city) {
    const data = await getWeather(city)
    return data.currentConditions
}

// get city timezone
async function getCurrentTime(city) {
    const data = await getWeather(city)
    return data.timezone
}

export { getCurrentWeather, getCurrentTime }