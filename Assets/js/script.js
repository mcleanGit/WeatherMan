// js for WeatherMan rev 2022-02-06  revised 2022-03-03...
// unclear still what this is, how inquirer needed here
const { createPromptModule } = require("inquirer");

// Open Weather API url & key; global variables
var url = "https://api.openweathermap.org";
var key = "76d9b9b69f8abf37f5df04749953bfe4";
var searchHistoryId = [];
// var cityName = [[0]="Toalronto", "CA"];
// ref DOM elements
var searchHistory = document.getElementById("history");
var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");
var todayEl = document.getElementById("today");

// fetchCoord declared but not called TBD
function fetchCoord(search) {
  var apiUrl = `${url}/geo/1.0/direct?q=${search}&limit=5&appid=${key}`;
  fetch (apiUrl)
  .then (function (res) {
    return res.json();
    console.log(apiUrl);
  })
  .then (function (data) {
    if (!data[0]) {
      alert("location not found");  
    } else {
      appendToHistory(search);
      fetchWeather(data[0]);
      console.log(data);
    }
  })
  .catch (function (err) {
    console.error(err);
  });
}

function appendToHistory () {
// TODO ... 
}

function renderItems(city, data) {
  renderCurrentWeather(city, data.current, data.timezone);
  renderForecast(data.daily, data.timezone);
}

function renderCurrentWeather(city, weather, timezone) {
  var date = dayjs().tz(timezone).format("YYYY/MM/DD");
  var tempC = weather.temp;
  var windKph = weather.wind_speed;
  var humidity = weather.humidity;
  var uvi = weather.uvi;
  var weatherIcon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

  var card = document.createElement("div");
  var cardBody = document.createElement("div");
  var cardTitle = document.createElement("h5");
  var weatherIcon = document.createElement("img");
  var tempEl = document.createElement("p");
  var windEl = document.createElement("p");
  var humidityEl = document.createElement("p");
  var uviEl = document.createElement("p");
  var uviBadge = document.createElement("button");

  card.setAttribute("class", "card");
  cardBody.setAttribute("class", "card-body");
  card.append(cardBody);

  

  cardTitle.setAttribute("class", "card-title");
  tempEl.setAttribute("class", "card-text");
  windEl.setAttribute("class", "card-text");
  humidityEl.setAttribute("class", "card-text");

  cardTitle.textContent = `${city} (${date})`;
  weatherIcon.setAttribute("src", iconUrl);
  weatherIcon.setAttribute("alt", iconDescription);
  
  cardTitle.append (weatherIcon);
  tempEl.textContent = `Temp: ${tempC} °C`;
  windEl.textContent = `Wind: ${windKph} KPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;
  cardBody.append(cardTitle, tempEl, windEl, humidityEl);
  uviEl.textContent = "uvIndex: ";
  uviBadge.classList.add ("btn", "btn-sm");

  if (uvi < 3 ) {
    uviBadge.classList.add ("btn-success");  
  } else if (uvi < 7 ) {
    uviBadge.classList.add ("btn-warning");
  } else {
    uviBadge.classList.add ("btn-danger");
  }

  uviBadge.textContent = uvi;
  uviEl.append(uviBadge);
  cardBody.append(uviEl);

  todayEl.innerHTML='';
  todayEl.append(card);

}

function renderForecastCard (forecast, timezone) {
  var unixts = forecast.dt; 
  var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon.png}`;
  //description to add ?
  var tempC = forecast.temp.day;
  var windKph = forecast.wind_speed;
  var { humidity } = forecast;
  var col = document.createElement("div");
  var card = document.createElement("div");
  var cardBody = document.createElement("div");
  var cardTitle = document.createElement("h5");
  var weatherIcon = document.createElement("img");
  var tempEl = document.createElement("p");
  var windEl = document.createElement("p");
  var humidityEl = document.createElement("p");
  // var uviEl = document.createElement("p");
  // var uviBadge = document.createElement("button");
  
  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle, weatherIcon, tempEL, windEL, humidityEl);
  col.setAttribute("class", "col-md");
  col.classList.add("5-day-card");
  
  card.setAttribute("class", "card bg-primary h-100 text-white");
  cardBody.setAttribute("class", "card-body p-2");
  cardTitle.setAttribute("class", "card-title");
  tempEl.setAttribute("class", "card-text");
  windEl.setAttribute("class", "card-text");
  humidityEl.setAttribute("class", "card-text");

  cardTitle.textContent = dayjs.unix(unixts).tz(timezone).format("M/D/YYYY");
  weatherIcon.setAttribute("src", iconUrl);
  tempEl.textContent = `Temp: ${tempC} °C`;
  windEl.textContent = `Wind: ${windKph} KPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;
  forecastContainer.append(col);
}

function renderForecast (dailyForecast, timezone) {
  var startDt = dayjs().tz(timezone).add(1, "day").startOf("day").unix();
  var endDt = dayjs().tz(timezone).add(6, "day").startOf("day").unix();
  var headingCol = document.createElement("div");
  var heading = document.createElement("h4");
  headingCol.setAttribute("class", "col-12");
  heading.textContent = "5-day Forecast:";
  headingCol.append(heading);
  forecastContainer.innerHTML = '';
  forecastContainer.append(headingCol);
  
  for (let i = 0; i < dailyForecast.length; i++) {
    if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {
      renderForecastCard(dailyForecast[i], timezone);
    }    
  }
}

function fetchWeather (location) {
  var { lat, lon } = location;
  var city = location.name;
  var apiUrl = `${url}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${76d9b9b69f8abf37f5df04749953bfe4}`;
  fetch (apiUrl)
  .then (function (res) {
    return res.json();
    console.log(res);
  })
  .then (function (data) {
   renderItems(city, data);
   console.log(city, data);
  })
  .catch (function (err) {
    console.error(err);
  });
}

// create functions
function searchFormSubmit(e) {
  if (!searchInput.value) {
    return;
  }
  e.preventDefault();
  var search = searchInput.value.trim();
  fetchCoord (search);
  searchInput.value = '';
}

function searchHistoryClick(e) {
  // TODO
}

initSearchHistory();

// event Listeners
searchForm.addEventListener("submit", searchFormSubmit);
searchHistory.addEventListener("click", searchHistoryClick);






// old code trying to drive html from js
// create elements for main weather section //
// var col = document.createElement("div");


//forecastContainer.append(col);
/* top of function here ? */


//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
/* a couple of inline fetches to check api operability -- these work (although data not yet sorted and sent to page)
"https://api.openweathermap.org/data/2.5/weather?q=Ottawa&appid=76d9b9b69f8abf37f5df04749953bfe4";
"https://api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=76d9b9b69f8abf37f5df04749953bfe4";
*/
/*alternative fetch structure here */
/* fetch api data for lon and lat */

/*
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

