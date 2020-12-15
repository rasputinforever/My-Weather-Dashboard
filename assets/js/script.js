//todos
    //re-add the object/math to get a wind-directoinal phrase conversion from degrees (use the bg image as a template)
    //move the big icon over OR make it more transparent

//ambitious
    //get media triggers going, at the very leat get it working for mobile
    //includes bg image, check out pure css

//beyond ambitious
    //time-clock API to get a night/day tag for bg

// variables used later //
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

initialLoad();

// Begin Load Page //
function initialLoad() {
    $('body').empty();
    //main grid structure established here: Header, Main, Button Area, City Info Area, Five-Day-Forecast Area
    $('body').append(`
    
    <main class="pure-g">
    <header class="pure-u-1"></header>
    <aside id="city-buttons" class="pure-u-1 pure-u-md-1-5"></aside>
    <section class="pure-u-1 pure-u-md-3-5">
        <article id="city-data" class="pure-u-8-9"></article>
        <article id="five-day" class="pure-u-8-9"></article>
    </section>
    </main>
    `)

    //header
    $('header').attr('class', 'dashboard-header pure-u-1 pure-menu pure-menu-horizontal')
    $('header').append(`<nav class="weather-header">My Weather Dashboard</nav>`)
    $('header').append(`<button class="clear-history pure-button pure-button-primary">Clear History</button>`)
    $('.clear-history').on('click', deleteHistory);

    // left aside for city searches and search history
    $('#city-buttons').append(`
    <div class="pure-u-1"><p class="weather-header">City Search...</p></div>
    <input id="city-name" placeholder="City, State / Zip Code"/>
    <button id="new-city-button" class="pure-button pure-button-primary">Search</button>
    `)
    //this error will be shown if there's an error during API load
    $('#city-buttons').append(`<div class="pure-u-1"><p id="search-error">City Not Found! Try Again!</p><div class="pure-u-1">`)
    $('#search-error').hide();
    //search submit button onclick calls API
    $('#new-city-button').on('click', preAPI);
    //load local storage cities when page loads
    loadSavedCities();

    //hide the weather boxes until we do a search
    $('#city-data').show();
}

//New City Button Function: called when searching a city, will account for duplicates
function newCitySubmit () {
    newCityName = $('#city-name').val();
    duplicateCheck = false;
    var citiesToSave = [];    
    
    //creates array of all city buttons, pushes each button into the array then simultaneously checks if "active" search city is a duplicate
    $('.loaded-city-button').each(function(){        
        citiesToSave.push($(this).text());        
        //dupe check
        if ($(this).text() === newCityName) {
            duplicateCheck = true;
        }
    });
    //if it is a duplicate, don't put it into local storage and don't make a new button
    if (!duplicateCheck) {            
        $('#city-buttons').append(`<button class="button-xlarge button-secondary pure-button loaded-city-button">${newCityName}</button>`)
        citiesToSave.push(newCityName);
    }
    //save for next page load    
    localStorage.setItem('favoriteLocations', JSON.stringify(citiesToSave))

    //remove all event clickers before adding them to everything, including new button. This prevents duplicate onlicks
    $('.loaded-city-button').off();
    $('.loaded-city-button').on('click', preAPI);
}

//loads from local storage all previous cities, creates buttons for them
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

//function that deletes a city from history
function deleteHistory() {
    var citiesToSave = []; 
    localStorage.setItem('favoriteLocations', JSON.stringify(citiesToSave))
    initialLoad();
}

//uppercase function
function capFirst(string) {    
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


//API Function: ALL APIs called, one at a time, but hinge on the "base" API being successful. IF it fails, error-handler will prevent the remaining actions. This does not prevent subsequent errors occuring, but, prevents a good chunk of possible problems, especially mis-spelled city names or the like.
function preAPI() {
    let cityName = '';
    //this checks if what is clicked was a previous-load button or the "search" button. The city name will be located on the button or in thenearby text box
    if ($(this).attr('class') === 'button-xlarge button-secondary pure-button loaded-city-button') {
        cityName = $(this).text();
    } else {
        cityName = $(this).prev().val();
    };
    let elName = $(this).text();

    //pushing the city name and which element we clicked. ONLY a click from "search" should trigger a new city to be logged into local storage
    queryAPI(cityName, elName);

    // detailed city information
    function queryAPI (cityName, elName) {
        let errCheck = false;
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=3f2c8c7cb5bd8bc4f513f0917931a35c`
        $.ajax({
            url: queryURL,
            method: "GET",            
            success: function(){
                //removes the error message if it was shown
                $('#search-error').hide();
                //only calls if this was a searched city. If a duplicate is called, it will be handled in that function. NO ERROR buttons!
                if (elName === 'Search') {
                    newCitySubmit();
                }
            },
            error: function(){
                //show the error and flag the "then" function to NOT continue.
                $('#search-error').show();
                errCheck = true;
            }
       }).then(function(response){    
           // if error, just stop here. errors still do this with this AJAX call format
            if (!errCheck) {
            $('#city-data').empty();
            //the main body of information with pure css classes.
            $('#city-data').append(`
            <div class="pure-menu custom-restricted-width pure-u-1">
                <span class="weather-header">${response.name} Weather Report</span>
                <ul class="pure-menu-list pure-u-1">
                    <li class="pure-menu-item">
                        <p>${capFirst(response.weather[0].description)}</p>
                    </li>
                    <li class="pure-menu-item pure-u-1">
                        <p>Current Tempurature: ${response.main.temp}\u00B0 F</p>
                    </li>
                    <li class="pure-menu-item pure-u-1">
                        <p>Feels Like: ${response.main.feels_like}\u00B0 F</p>
                    </li>                    
                    <li class="pure-menu-item pure-u-1">
                        <p>Humidity: ${response.main.humidity}%</p>
                    </li>
                    <li class="pure-menu-item pure-u-1">
                        <p>Wind Speed: ${response.wind.speed} mph, ${response.wind.deg}\u00B0</p>
                    </li>
                    <li class="pure-menu-item pure-u-1">
                        <p>Cloud Coverage: ${response.clouds.all} %</p>
                    </li>
                </ul>
            </div>
            <img id="main-icon" src="https://openweathermap.org/img/wn/${response.weather[0].icon}.png">
            `);
            $('#city-data').show();
        
            //queries based on long/lat go here!            
            fiveDayURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&units=imperial&exclude=hourly,minutely&appid=3f2c8c7cb5bd8bc4f513f0917931a35c`
            $.ajax({
            url: fiveDayURL,
            method: "GET"
            }).then(function(forecast) {

                //get practical label for UVI result
                let uviLabel = uviIndex[0].label;
                uviIndex.forEach(function(uvi){
                    if (forecast.current.uvi > uvi.index) {
                        uviLabel = uvi.label
                    }
                })

                //UVI report
                $('#city-data').append(`
                <div class="pure-menu pure-u-1-2 custom-restricted-width">
                    <p="weather-header">UV Index: <span class="uv-index">${forecast.current.uvi}, Risk Index: ${uviLabel}</span></p>
                </div>
                `);

                //five day forecast
                $('#five-day').empty();
                $('#five-day').append(`
                    <p class="pure-u-1 weather-header">Five-Day Forecast</p>
                    <div id="days-list" class="pure-g"></div>
                `)
                
                //create each day-card => with general info about them and icons
                for (i = 0; i < 5; i++) {   
                    $('#days-list').append(`
                    <div class=" pure-u-lg-1-5 pure-u-1 day-forecast"><ul class="pure-menu-list">
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
                            <p>${capFirst(forecast.daily[i].weather[0].description)}</p>
                        </li>
                        <li class="pure-menu-item">
                            <p>Clouds: ${forecast.daily[i].clouds}%</p>
                        </li>
                    </ul></div>
                    `);
                }
            });

            //Background image query? Background image query!
            bgImageUrl = `https://pixabay.com/api/?key=19527879-11b24e10aa7a260d8c2bad18b&q=${response.weather[0].description}&image_type=photo`
            $.ajax({
            url: bgImageUrl,
            method: "GET"
            }).then(function(bgImageRSP) {   
                $('body').css('background-image', "url(" + bgImageRSP.hits[Math.floor(bgImageRSP.hits.length * Math.random())].largeImageURL + ")");
            });

            }
       });       
    }
}


