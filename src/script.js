function displayTemperature(response){
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city"); 
    let conditionsElement = document.querySelector("#conditions");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    conditionsElement.innerHTML = response.data.weather[0].main;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey ="7e5b42f15f07c7e23193e5065b6e4cf9";
let apiUrl =`https://api.openweathermap.org/data/2.5/
weather?q=London
&appid=${apiKey}
&units=metric`;
axios.get(apiUrl).then(displayTemperature);