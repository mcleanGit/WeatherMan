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