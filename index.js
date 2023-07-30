const apiKey = "3794141fe0cac15a9225a73d70d21ce8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//this gets the information within the search class and the input variable
const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")
async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".row").style.display = "none";
    }
    else{
        var data = await response.json();
        console.log(data);
        
        //this gets the class e.g., .city and replaces it will the "name" received from the api data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        //this gets the corresponding image from the images folder
        weatherIcon.src = "images/" + data.weather[0].icon + ".png";
        //changes the css upon the weather being entered in into block
        document.querySelector(".row").style.display = "block"
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        checkWeather(searchBox.value);
    }
})