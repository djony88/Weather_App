// variable declaration

var city="";
var searchCity = $("#searchCity");
var searcButton = $("#serachButton");
var currentCity = $("#currentCity");
var clearButton = $("#clearHistory");
var currentTemp = $("#temperature");
var currentSpeed = $("#windSpeed");
var currentHumidity = $("#humidity");
var currentUvindex = $("#uvIndex");
var srchCity=[];

// open weather API key
var APIkey = "f2e60cb0b34680eabdf19a9dec1b7967";

function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);
    }
}

// Ajax function
function currentWeather(city){
    // API url
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIkey;
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){

        console.log(response);
    })

}
// Checks input if it exist in local storage history
function find(c){
    for (var i=0; i<srchCity.length; i++){
        if(c.toUpperCase()===srchCity[i]){
            return -1;
        }
    }

    return -1;
}