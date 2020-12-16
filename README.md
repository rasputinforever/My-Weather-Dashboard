# My Weather Dashboard

## Introduction

* URL: [My Weather Dashbaord](https://rasputinforever.github.io/My-Weather-Dashboard/)

This application is a simple weather and weather forcast provider that allows the user to search a city by name or zipcode, then displays the current weather and a five-day forecast. The searched cities are then saved for next time the user visits the app.

## How it Works and Tools Used

This tool provides a simple search bar that the user engages with. When searching, if the API call is successful, that search is saved to local storage and the desired data provided to the user. Basic data is provided on the first API call, but subsequent, nested calls are used to provide more granular information about that search, as well as some bonus materials that help the visualization of the page.

### Server Side APIs:

___**[OpenWeather Map](https://openweathermap.org/)**___ provides concise weather information via their *Current Weather Data* query. The query requires a city name or zip and returns the current weather and longitude and latitude for that location. The long/lat values are then used, subsequently, on OpenWeather's *One Call* query which is where UV Index and the five day forecast information is provided.

___**[PixaBay](https://pixabay.com/)**___ provides open source images via their *Pixabay API*. Images queried can be filtered by size, which is here, which is great for background images. The query simply requires one or more key phrases which are sourced from the *Current Weather Data* query's returned "weather description", such as "misty" or "partly cloudly". The returned images are returned in an array, which the script selects from randomly.

### Local Storage: Web API
*Local Storage* is used to store, then recall the search history of the user. Searches that return an actual response, no errors, are saved as an array, then stringified using JSON. A user has the ability to remove all search history as well.

### JQuery: Element Creation and AJAX calling
*JQuery* is used for quick element injection, which is especially useful when dealing with a CDN and their required classes. When creating elements when the page is loaded, or after returning data from the AJAX calls, killing, then subsequently adding large chunks of elements in a single line can be easy to both create and manage when troubleshooting those class names.

### [Pure.css Library CDN](https://purecss.io/) Page Styling
Using Pure CSS was an interesting alternative to Bootstrap, which was used in previous applications. Pure provides a very simple, somewhat limited set of modules that provided clean layouts. It's two major benefits were its easy to use grid system and that grid system's very easy to use responsive elements. Whether or mobile or desktop, the grid behaves as desired. Then, any granular needs with CSS, as far as color palletes, margins, or other media-specific responses can be set more concisely in the style sheet.

## Image Gallery

* Overview: The application shows a concise list of information about the weather searched.

![Page Overview](Assets/images/overview.PNG)

* Dynamic Formatting: on Mobile, the page reads cleanly.

![Search Bar](Assets/images/overview_mobile.PNG)

* Search Bar: The search bar provides the user a text area for new searches, but also provides buttons for each previously searched location that each returns their respective current weather information when clicked.

![Search Bar](Assets/images/search_bar.PNG)

* Current Weather: The current weather and UV Index are provided. This information is listed.

![Current Weather](Assets/images/current_weather.PNG)

* Five Day Forecast: a simple grid of information is provided about the days to come.

![Five Day Forecast](Assets/images/five_day.PNG)

* Clear History: click to remove local storage and clear the search bar!

![Delete History](Assets/images/delete_history.PNG)

## Functions Pathways & Events

![Event Pathways](Assets/images/function_pathway.PNG)

## Desired Features 

* Day-Names
* Weather Wind Directional Names
* Default Background

## Credits

Erik Portillo, University of Oregon Coding Bootcamp, 2020