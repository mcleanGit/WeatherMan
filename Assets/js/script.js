// js for WeatherMan rev 2022-02-06
// Open Weather API key; global variables
var url = "https://api.openweathermap.org";
var key = "76d9b9b69f8abf37f5df04749953bfe4";
var searchHistoryId = [];
// var cityName = [[0]="Toronto", "CA"];
// ref DOM elements
var searchHistory = document.getElementById("history");
var searchForm = document.getElementById("search-form");

// create functions
function searchFormSubmit() {

}
function searchHistoryClick() {
  
}
// event Listeners
searchForm.addEventListener("submit", searchFormSubmit);
searchHistory.addEventListener("click", searchHistoryClick);







// create elements for main weather section //
var col = document.createElement("div");
var card = document.createElement("div");
var cardBody = document.createElement("div");
var cardTitle = document.createElement("h5");
var weatherIcon = document.createElement("img");
var tempEl = document.createElement("p");
var windEl = document.createElement("p");
var humidityEl = document.createElement("p");

col.append(card);
card.append(cardBody);
cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

col.setAttribute("class", "col-md");
col.classList.add("five-day-card");
card.setAttribute("class", "card bg-primary h-100 text-white");
cardBody.setAttribute("class", "card-body p-2");
cardTitle.setAttribute("class", "card-title");
tempEl.setAttribute("class", "card-text");
windEl.setAttribute("class", "card-text");
humidityEl.setAttribute("class", "card-text");

/* content */
cardTitle.textContent = dayjs.unix(unixts).tz(timezone).format("dddd, MMMM, Do, YYYY, HH:mm");
weatherIcon.setAttribute("src", iconUrl);
weatherIcon.setAttribute("alt", iconDescription);
tempEl.textContent = `Temp: ${tempC} °C`;
windEl.textContent = `Wind: ${windKph} KPH`;
humidityEl.textContent = `Humidity: ${humidity} %`;

forecastContainer.append(col);
/* top of function here ? */


https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
/* a couple of inline fetches to check api operability -- these work (although data not yet sorted and sent to page)
"https://api.openweathermap.org/data/2.5/weather?q=Ottawa&appid=76d9b9b69f8abf37f5df04749953bfe4";
"https://api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=76d9b9b69f8abf37f5df04749953bfe4";
*/
/*alternative fetch structure here */
/* fetch api data for lon and lat */

function fetchWeatherInfo() {

var url ="https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=76d9b9b69f8abf37f5df04749953bfe4";

fetch (url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var lon = data.coord.lon;
    var lat = data.coord.lat;
  })

  // fetch API data for 5-day forecast //
  fetch ("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=76d9b9b69f8abf37f5df04749953bfe4");
    .then(function (response) {
      return response.json()    
    })
    .then(function (data) {
      currentForecast(data);
      fiveDayForecast(data.daily);
    })

}

fetchWeatherInfo();

// draft version: not useful until data retrieval is fixed.
// scriptLS.js function to load saved data from localStorage.
function loadSearchHistory() {
  var size = JSON.parse(localStorage.getItem("size"));
  for (var i = 0; i < size; i++) {
   var key = "search" +i;
   var text = JSON.parse(localStorage.getItem(key));
   var historyBtn = $"<button>";
   historyBtn.addClass("col-12 my-2 btn btn-secondary");
   historyBtn.attr("id", key);
   historyBtn.text(text);
   $(".searchHistory").append(historyBtn);
   searchHistoryId++;
  }
 }
 
 loadSearchHistory();
 
 // update search history with new entry, using 8 entry max
 function updateSearchHistory() {
  var historyBtn = $("<button>");
  var text = $("#searchInfo").val();
  historyBtn.addClass("col-12 my-2 btn.secondary");
   if (searchHistoryId = 7) {
    $("#search0").remove();
    for (var i = 0; i < 8; i++) {
     $("#search" + (i+1)).attr("id", "search" +i);
     saveSearchHistory(idvalue, text);
    }
    searchHistoryId = 7;
 
    idvalue = "search" + searchHistoryId
    historyBtn.attr("id", idvalue);
    historyBtn.text(text);
    $(".searchHistory").append(historyBtn);
    searchHistoryId++;
    saveSearchHistory(idvalue, text);
   }
 }
 
 function saveSearchHistory(id, text) {
  localStorage.setItem(id, JSON.stringify(text));
  localStorage.setItem("size", JSON.stringify(searchHistoryId)); 
 }

