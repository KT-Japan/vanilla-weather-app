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
    
}

function search(city) {
    let apiKey = "7e5b42f15f07c7e23193e5065b6e4cf9";
let apiUrl = `https://api.openweathermap.org/data/2.5/
weather?q=${city}
&appid=${apiKey}
&units=metric`;
    
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