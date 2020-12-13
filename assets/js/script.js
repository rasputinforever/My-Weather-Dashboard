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

// End Load Page //

//New City Button Function

//API Function