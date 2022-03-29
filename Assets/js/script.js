// js for WeatherMan rev 2022-02-06  revised 2022-03-03...  2022-03-29
// Open Weather API url & key; global variables
var url = "https://api.openweathermap.org";
var key = "76d9b9b69f8abf37f5df04749953bfe4";
 // var cityName = [[0]="Toronto", "CA"] as placeholder;
// ref DOM elements
var searchHistory = document.getElementById("history");
var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");
var todayEl = document.getElementById("today");

// search history and local storage
function initSearchHistory() {
  var previousCity = localStorage.getItem("search-history");
  if (previousCity) {
    searchHistoryId = JSON.parse(previousCity);
  }
  renderSearchHistory();
}

function appendToHistory () {
  if (searchHistoryId.indexOf(search) !== -1) {
    return;
  }
  searchHistoryId.push(search); 
  localStorage.setItem("search-history", JSON.stringify(searchHistoryId));
}
 
function renderSearchHistory() {
  searchHistory.innerHTML = "";
  for (let index = searchHistoryId.length -1; index >= 0; index--) {
 //   const element = array[index];
    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("aria-control", "today forecast");
    btn.classList.add("history-btn", "btn-history");
    btn.setAttribute("data-search", searchHistoryId[i]);
    btn.textContent = searchHistoryId[i];
    searchHistory.append(btn);
  }
}

// fetchCoords for new search of coordinates and current weather
function fetchCoords(search) {
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

  // renders current weather to DOM elements
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
 // special case for uvi and variable button colours
  uviEl.textContent = "uvIndex: ";
  uviBadge.classList.add ("btn", "btn-sm")
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
// renders 5-day forescast cards
function renderForecastCard (forecast, timezone) {
  var unixts = forecast.dt; 
  var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon.png}`;
  //descriptions to write to html
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
// renders 5-day Forecast to DOM elements by date and timezone adjustment
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
// main fetch weather function by lat & lon and location name
function fetchWeather (location) {
  var { lat, lon } = location;
  var city = location.name;
  var apiUrl = `${url}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${key}`;
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

// enters input values on search form and retrieves search history items
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
  if (!e.target.matches(".btn-history")) {
    return;
  }
  var btn = e.target;
  var search = btn.getAttributes("data-search");
    fetchCoord(search);
}

// event Listeners
searchForm.addEventListener("submit", searchFormSubmit);
searchHistory.addEventListener("click", searchHistoryClick);

