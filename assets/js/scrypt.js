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

// Checks input if it exist in local storage history
function find(c){
    for (var i=0; i<srchCity.length; i++){
        if(c.toUpperCase()===srchCity[i]){
            return -1;
        }
    }

    return -1;
}

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

        var weatherIcon= response.weather[0].icon;
        var iconURL="https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
        var date = new Date(response.dt*1000).toLocaleDateString();

        // parse response for city name and concating icon and date
        $(currentCity).html(response.name + "("+date+")" + "<img src="+iconURL+">");

        // current temp in Farenheits
        var tempFar = (response.main.temp - 273.15)* 1.80 + 32;
        $(currentTemp).html((tempFar).toFixed(2)+"&#8457");

        // wind speed in MPH
        var ws=response.wind.speed;
        var windsmph=(ws*2.237).toFixed(1);
        $(currentWSpeed).html(windsmph+"MPH");

        // current humidity
        $(currentHumidty).html(response.main.humidity+"%");

        // UV index
        UVIndex(response.coord.lon,response.coord.lat);
        forecast(response.id);
        if(response.cod==200){
            sCity=JSON.parse(localStorage.getItem("cityname"));
            console.log(sCity);
            if (sCity==null){
                sCity=[];
                sCity.push(city.toUpperCase()
                );
                localStorage.setItem("cityname",JSON.stringify(sCity));
                addToList(city);
            }
            else {
                if(find(city)>0){
                    sCity.push(city.toUpperCase());
                    localStorage.setItem("cityname",JSON.stringify(sCity));
                    addToList(city);
                }
            }
        }

    });

}

// UV index response
function UVIndex(ln,lt){
    // UV index API url
    var uviURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ APIkey+"&lat="+lt+"&lon="+ln;
    $.ajax({
        url:uviURL,
        method:"GET",
    }).then(function(response){
        $(currentUvindex).html(response.value);
    });
}


