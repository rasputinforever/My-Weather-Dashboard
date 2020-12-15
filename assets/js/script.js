// Begin Load Page //

//main grid structure established here: Header, Main, Button Area, City Info Area, Five-Day-Forecast Area
$('body').append(`
<header></header>
<main class="pure-g">
<aside id="city-buttons" class="pure-u-1-5"></aside>
<section class="pure-u-3-5">
    <article id="city-data"></article>
    <article id="five-day"></article>
</section>
</main>
`)

//header
$('header').attr('class', 'pure-menu pure-menu-horizontal')
$('header').append(`<nav class="weather-header">My Weather Dashboard</nav>`)

// left section needs "search city" area and all previously loaded cities as buttons
$('#city-buttons').append(`
<p class="weather-header">City Search...</p>
<input id="city-name" placeholder="City, State / Zip Code"/>
<button id="new-city-button" class="pure-button pure-button-primary">Search</button>
`)
//this error will be shown if there's an error during API load
$('#city-buttons').append(`
<p id="search-error">City Not Found! Try Again!</p>
`)
$('#search-error').hide();
//search city onclick
$('#new-city-button').on('click', preAPI);
//city buttons will be appended here ON LOAD
loadSavedCities();

// End Load Page //

//New City Button Function
function newCitySubmit () {
    newCityName = $('#city-name').val();
    duplicateCheck = false;
    var citiesToSave = [];

    
    
    //creates array of all city buttons
    $('.loaded-city-button').each(function(){        
        citiesToSave.push($(this).text());        
        //dupe check
        if ($(this).text() === newCityName) {
            duplicateCheck = true;
        }
    });
    console.log(citiesToSave);
    //prevent duplicate buttons!
    if (!duplicateCheck) {            
        $('#city-buttons').append(`<button class="button-xlarge button-secondary pure-button loaded-city-button">${newCityName}</button>`)
        citiesToSave.push(newCityName);
    }

    
    localStorage.setItem('favoriteLocations', JSON.stringify(citiesToSave))

    //remove all event clickers before adding them to everything, including new button
    $('.loaded-city-button').off();
    $('.loaded-city-button').on('click', preAPI);

}

//loads from local storage all previous cities
function loadSavedCities () {
    savedCities = [];
    savedCities = JSON.parse(localStorage.getItem('favoriteLocations'));    
    //skip if null
    if (savedCities != null) {
        savedCities.forEach(function(city) {
            $('#city-buttons').append(`<button class="button-xlarge button-secondary pure-button loaded-city-button">${city}</button>`)
        });
    }
    $('.loaded-city-button').off();
    $('.loaded-city-button').on('click', preAPI);
}


// load city buttons
    //load local history
    //kill all buttons class = city button
    //add each button from load in reverse order
        //default city = special formatting button


//API Function
function preAPI() {
    let cityName = '';
    //basic city data
    if ($(this).attr('class') === 'button-xlarge button-secondary pure-button loaded-city-button') {
        cityName = $(this).text();
    } else {
        cityName = $(this).prev().val();
    };
    let elName = $(this).text();
    queryAPI(cityName, elName);

    // detailed city information
    function queryAPI (cityName, elName) {
        let errCheck = false;
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=3f2c8c7cb5bd8bc4f513f0917931a35c`
        $.ajax({
            url: queryURL,
            method: "GET",            
            success: function(){
                $('#search-error').hide();
                if (elName === 'Search') {
                    newCitySubmit();
                }
            },
            error: function(){
                $('#search-error').show();
                errCheck = true;
            }
       }).then(function(response){       
            if (!errCheck) {
            $('#city-data').empty();
            $('#city-data').append(`
            <div class="pure-menu custom-restricted-width">
                <span id="query-city-name" class="weather-header pure-menu-heading"></span>
                <ul class="pure-menu-list">
                    <li class="pure-menu-item">
                        <p id="current-temp"></p>
                    </li>
                    <li class="pure-menu-item">
                        <p id="feels-like"></p>
                    </li>
                    <li class="pure-menu-item">
                        <p id="humidity"></p>
                    </li>
                    <li class="pure-menu-item">
                        <p id="wind-speed"></p>
                    </li>
                    <li class="pure-menu-item">
                        <p id="clouds"></p>
                    </li>
                </ul>
            </div>
            `);

            //City Weather Information Inserted into Elements Here      
            $("#query-city-name").text(response.name + " Weather Report");
            $("#current-temp").text("Current Tempurature: " + response.main.temp + "  \u00B0F");        
            $("#feels-like").text("Feels Like: " + response.main.feels_like + "  \u00B0F");
            $("#humidity").text("Humidity: " + response.main.humidity + "%");        

            $("#wind-speed").text("Wind Speed: " + response.wind.speed + " mph, " + response.wind.deg + "\u00B0");        
            $("#clouds").text("Cloud Coverage: " + response.clouds.all + "%");
        
            //queries based on long/lat go here!
            
            fiveDayURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&units=imperial&exclude=hourly,minutely&appid=3f2c8c7cb5bd8bc4f513f0917931a35c`
            $.ajax({
            url: fiveDayURL,
            method: "GET"
            }).then(function(forecast) {
                // sub section, for 5-day forecast
                $('#city-data').append(`
                    <div class="pure-menu custom-restricted-width">
                        <ul class="pure-menu-list">
                            <li class="weather-header pure-menu-heading">UV Index: <span id="uv-index"></span></li>
                        </ul>
                    </div>
                `);
                const uviIndex = [
                    {
                        index: 2,
                        label: 'Low'
                    },
                    {
                        index: 5,
                        label: 'Moderate'
                    },
                    {
                        index: 7,
                        label: 'High'
                    },
                    {
                        index: 10,
                        label: 'Very High'
                    },
                    {
                        index: 11,
                        label: 'Extreme'
                    }
                ];
               
                let uviLabel = uviIndex[0].label;
                uviIndex.forEach(function(uvi){
                    if (forecast.current.uvi > uvi.index) {
                        uviLabel = uvi.label
                    }
                })

                $('#uv-index').append(forecast.current.uvi + ", Risk Index: " + uviLabel)

                

                $('#five-day').empty();

                $('#five-day').append(`
                <p class="weather-header">Five-Day Forecast</p>
                <div id="days-list" class="pure-g">
                </div>
                `)
                
                //create each day-card => with general info about them and icons
                for (i = 0; i < 5; i++) {   
                    $('#days-list').append(`<div class="pure-u-1-5 day-forecast"><ul class="pure-menu-list">
                    <li class="pure-menu-item">
                        <img src="https://openweathermap.org/img/wn/${forecast.daily[i].weather[0].icon}.png">
                    </li>
                    <li class="pure-menu-item">
                        <p>Tempurature: ${forecast.daily[i].temp.day} \u00B0F</p>
                    </li>
                    <li class="pure-menu-item">
                        <p>Night Temp: ${forecast.daily[i].temp.night} \u00B0F</p>
                    </li>
                    <li class="pure-menu-item">
                        <p>${forecast.daily[i].weather[0].description}</p>
                    </li>
                    <li class="pure-menu-item">
                        <p>Clouds: ${forecast.daily[i].clouds}%</p>
                    </li>
                    </ul></div>`);
                }
            });

            //background image query?
            bgImageUrl = `https://pixabay.com/api/?key=19527879-11b24e10aa7a260d8c2bad18b&q=${response.weather[0].description}&image_type=photo`
            $.ajax({
            url: bgImageUrl,
            method: "GET"
            }).then(function(bgImageRSP) {
            
                $('body').css('background-image', "url(" + bgImageRSP.hits[0].largeImageURL + ")")

            });

            }
       });       
    }
}


