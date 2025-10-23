const inputBox = document.getElementById('user-input')
const searchBtn = document.querySelector('.search-btn')
const temperature = document.querySelector('.temperature')
const weatherName = document.querySelector('.weather-name')
const humidity_perc = document.getElementById('humidity')
const windSpped = document.getElementById('wind-speed')
const weatherImg = document.getElementById('weather-img')
const locationNotFound = document.querySelector('.location-not-found')
const weatherBody = document.querySelector('.weather-body')

async function checkWeather(city){
    const api_key = '792fe861aa8ad160b164bac37385d942'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    const weather_data = await fetch(`${url}`).then(response => response.json())

    if(weather_data.cod === `404`){
        locationNotFound.style.display = 'flex'
        weatherBody.style.display = 'none'
        return
    }
    weatherBody.style.display = 'flex'
    locationNotFound.style.display = 'none'
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.14)}°C`
    weatherName.innerHTML = `${weather_data.weather[0].description}`
    humidity_perc.innerHTML = `${weather_data.main.humidity}%`
    windSpped.innerHTML = `${weather_data.wind.speed}km/hr`

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weatherImg.src = './assets/cloud.png'
            break
        case 'Clear':
            weatherImg.src = './assets/clear.png'
            break
        case 'Rain':
            weatherImg.src = './assets/rain.png'
            break
        case 'Mist':
            weatherImg.src = './assets/mist.png'
            break
        case 'Snow':
            weatherImg.src = './assets/snow.png'
            break
    }
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value)
})