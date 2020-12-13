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
<section id="city-buttons" class="pure-u-1-5"></section>
<section class="pure-u-4-5">
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
<form class="pure-form">
    <fieldset>
        <p>City Manager</p>
        <input type="city-name" placeholder="City-Name, ST"/>
        <button type="submit" class="pure-button pure-button-primary">Search</button>
    </fieldset>
</form>
`)

//selected city detail
$('#city-data').append(`
<div class="pure-menu custom-restricted-width">
<span class="pure-menu-heading">Your Chosen City's Weather Details</span>
<ul class="pure-menu-list">
    <li class="pure-menu-item">
        <p>Weather Detail</p>
    </li>
    <li class="pure-menu-item">
        <p>Weather Detail</p>
    </li>
    <li class="pure-menu-item">
        <p>Weather Detail</p>
    </li>
    <li class="pure-menu-item">
        <p>Weather Detail</p>
    </li>
    <li class="pure-menu-item">
        <p>Weather Detail</p>
    </li>
    <li class="pure-menu-heading">UV Index:</li>
</ul>
</div>`)
    //then all the city buttons from "local storage"

//main section, for city details

// sub section, for 5-day forecast

// End Load Page //

//New City Button Function

//API Function