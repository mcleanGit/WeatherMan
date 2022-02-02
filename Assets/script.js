// js for WeatherMan
// Open Weather API key; global variables
var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",ca&units=metric&APPID=" + key;
var key = "76d9b9b69f8abf37f5df04749953bfe4";
var searchHistoryId = 0;
var cityName = ["Toronto", "CA"];


// a couple of inline fetches to check api operability -- these work (although data not yet sorted and sent to page)
"https://api.openweathermap.org/data/2.5/weather?q=Ottawa&appid=76d9b9b69f8abf37f5df04749953bfe4";
"https://api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=76d9b9b69f8abf37f5df04749953bfe4";

// function to get weather data for current search -- the url format does not work
function getData(cityName) {
 var url = "https://api.openweathermap.org/data/2.5/weather?q=" cityName[0] + "," + cityName[1] + "&units=metric&APPID=" + key;
 fetch(url).then(function(response) {
   if (response.ok) {
    response.json().then(function(data) {
     showCityData(data);
// may be part of a subsequent fetch
      cityName = city;
      console.log(data);
      showWeatherData(data);
      forecastData(data);
      updateSearchHistory(); 
// does not retrieve UVI data, separate fetch needed
    });
    } else {
   alert("Error: " + response.statusText);
    }
   });   
 }