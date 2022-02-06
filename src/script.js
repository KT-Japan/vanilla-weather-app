function formateDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10){
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];
}
function displayForecast(response){
    let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");
let forecastHTML = `<div class="row">`;

forecast.forEach(function (forecastDay, index) {
    if (index < 6){
    
    forecastHTML = forecastHTML + 
    `
    <div class="col-2">
        <div class = "weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <span class = "forecast-icons"><img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt ="W" width ="40"/></span>
       <div class = "weather-forecast-temp"> ${Math.round(forecastDay.temp.day)}°C
       </div>
    </div>
    
    `;
}
});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
    console.log(coordinates);
    let apiKey = "7e5b42f15f07c7e23193e5065b6e4cf9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
    
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city"); 
    let conditionsElement = document.querySelector("#conditions");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celciusTemperature = Math.round(response.data.main.temp);

    temperatureElement.innerHTML = (celciusTemperature);
    cityElement.innerHTML = response.data.name;
    conditionsElement.innerHTML = response.data.weather[0].main;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formateDate(response.data.dt * 1000);
    iconElement.setAttribute("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute(
        "alt",
        response.data.weather[0].description);

    getForecast(response.data.coord);
}

function search(city) {
    let apiKey = "7e5b42f15f07c7e23193e5065b6e4cf9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
axios.get(apiUrl).then(displayTemperature);

}

function dataSubmit(event) {
    event.preventDefault();
    let searchBarElement = document.querySelector("#searchBar");
    search(searchBarElement.value);
    
}

function showFahrenheit(event){
    event.preventDefault();
    let fahrenheitTemperature = (celciusTemperature * 9 / 5) + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
}

function showCelcius(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = celciusTemperature;
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
}

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", dataSubmit);

let fahrenheitLink = document.querySelector("#fahrenLink");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celciusLink = document.querySelector("#celciusLink");
celciusLink.addEventListener("click", showCelcius);

search("Tokyo");
