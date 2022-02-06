// js for WeatherMan rev 2022-02-06
// Open Weather API key; global variables
var url = "https://api.openweathermap.org/data/2.5/weather?q=&APPID=76d9b9b69f8abf37f5df04749953bfe4";
var key = "76d9b9b69f8abf37f5df04749953bfe4";
var searchHistoryId = 0;
var cityName = [[0]="Toronto", "CA"];

api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
/* a couple of inline fetches to check api operability -- these work (although data not yet sorted and sent to page)
"https://api.openweathermap.org/data/2.5/weather?q=Ottawa&appid=76d9b9b69f8abf37f5df04749953bfe4";
"https://api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=76d9b9b69f8abf37f5df04749953bfe4";
*/
/*alternative fetch structure here */
/* fetch api data for lon and lat */

fetch (url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var lon = data.coord.lon;
    var lat = data.coord.lat;
  })

  // fetch API data for 5-day forecast //
  fetch ("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon" + lon&appid=76d9b9b69f8abf37f5df04749953bfe4;
// function to get weather data for current search -- this url format not working
function getData(cityName) {
 var url = "https://api.openweathermap.org/data/2.5/weather?q=London,UK&units=metric&appid=76d9b9b69f8abf37f5df04749953bfe4";
 fetch(url).then(function(response) {
   if (response.ok) {
    response.json().then(function(data) {d
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