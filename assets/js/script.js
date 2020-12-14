//Create Header "My Weather Dashboard"

//Left Section: Search Bar
    //Search Bar, Input + Submit buttons
        //if Input returns 404 on API then ALERT, do not create new button
        //if INput returns an actual city, load info to "MAIN" and "5-DAY Planner"
        //New Button, appended in reverse (just below search). Store that city in local storage, that will be what is loaded on default - last-in, first-out
            //each button has onclick to load that data, however, do not store as default

//MAIN
    //Basic data about current weather
    //basic weather list output here
    //UV Index API output here    
    //some way to delete a button
        //BONUS: option to "make default". Keep button order, just save that button's search to local storage

//5-Day
    //5-cards displaying 5-day forecast API results
        //weather API has icons: use those!

//Button Clicked: API Queries
    //use button attribute (class, id, or value depending on the query. The button shoudl store what the query needs to work)
    //trigger each API discreetly, allow each to fill in data as responses come in
    //Current Weather (based on local storage)
    //Output to MAIN and 5-DAY
    
//Local Storage Load
    //IF local-storage is null, skip
    //load all buttons
    //button === defualt, run API on that button

//Save Local Storage
    //delete local storage if it exists, we are replacing it with the current state of buttons
    //Save all buttons values as an array to local storage    
    //one button will be called "Default", make sure to note that

//Bonus: Mark as Default
    //given the current loaded city, remove the "default" ID from current button, apply it to the currently loaded ID
    //save to local storage

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
$('header').append(`<nav class="pure-menu-heading pure-menu-link">My Weather Dashboard</nav>`)

// left section needs "search city" area and all previously loaded cities as buttons
$('#city-buttons').append(`
<p>City Manager</p>
<input id="city-name" placeholder="City, State OR Zip Code"/>
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

//selected city detail layout, pick five details to go here
$('#city-data').append(`
<div class="pure-menu custom-restricted-width">
    <span id="query-city-name" class="pure-menu-heading"></span>
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
        <li class="pure-menu-heading">UV Index:</li>
    </ul>
</div>
`)


// sub section, for 5-day forecast
$('#five-day').append(`
<p>Five-Day Forecast</p>
<div id="days-list" class="pure-g">
</div>
`)



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

    //prevent duplicate buttons!
    if (!duplicateCheck) {            
        $('#city-buttons').append(`<button class="button-xlarge button-secondary pure-button loaded-city-button">${newCityName}</button>`)
    }
    localStorage.setItem('localHistory', JSON.stringify(citiesToSave))

    //remove all event clickers before adding them to everything, including new button
    $('.loaded-city-button').off();
    $('.loaded-city-button').on('click', preAPI);

}

//loads from local storage all previous cities
function loadSavedCities () {
    savedCities = [];
    savedCities = JSON.parse(localStorage.getItem('localHistory'));    
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
    
    queryAPI(cityName);

    // detailed city information
    function queryAPI (cityName) {
        var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=3f2c8c7cb5bd8bc4f513f0917931a35c`
        $.ajax({
            url: queryURL,
            method: "GET",            
            success: function(){
                $('#search-error').hide();
                newCitySubmit();                
            },
            error: function(){
                $('#search-error').show();
            }
       }).then(function(response){       
            
            //City Weather Information Inserted into Elements Here      
            $("#query-city-name").text(response.name + " Weather Report");
            $("#current-temp").text("Current Tempurature: " + response.main.temp + "  \u00B0F");        
            $("#feels-like").text("Feels Like: " + response.main.feels_like + "  \u00B0F");
            $("#humidity").text("Humidity: " + response.main.humidity + "%");        
                //wind direction conversion
                const windArr = [{label: "North",degree: 0},{label: "North-East",degree: 45},{label: "East",degree: 90},{label: "South-East",degree: 135},{label: "Sout",degree: 180},{label: "South-West",degree: 225},{label: "West",degree: 270},{label: "North-West",degree: 315}];            
                let windDir = (windArr[(Math.round((response.wind.deg / 360) * 10))].label)
            $("#wind-speed").text("Wind Speed: " + response.wind.speed + " mph " + windDir + ", " + response.wind.deg + " degrees");        
            $("#clouds").text("Cloud Coverage: " + response.clouds.all + "%");
        
            //queries based on long/lat go here!

            fiveDayURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&units=imperial&exclude=hourly,minutely&appid=3f2c8c7cb5bd8bc4f513f0917931a35c`
            $.ajax({
            url: fiveDayURL,
            method: "GET"
            }).then(function(forecast) {
                    
                $('#days-list').empty();
                //create each day-card => with general info about them and icons
                for (i = 0; i < 5; i++) {   
                    $('#days-list').append(`<div class="pure-u-1-5 day-forecast"><ul class="pure-menu-list">
                    <li class="pure-menu-item">
                        <img src="http://openweathermap.org/img/wn/${forecast.daily[i].weather[0].icon}.png">
                    </li>
                    <li class="pure-menu-item">
                        <p>${forecast.daily[i].temp.day}</p>
                    </li>
                    <li class="pure-menu-item">
                        <p>${forecast.daily[i].temp.night}</p>
                    </li>
                    <li class="pure-menu-item">
                        <p>${forecast.daily[i].weather[0].description}</p>
                    </li>
                    <li class="pure-menu-item">
                        <p>${forecast.daily[i].clouds}</p>
                    </li>
                    </ul></div>`);
                }
            });
       });       
    }
}


