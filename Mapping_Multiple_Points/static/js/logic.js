// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// 1. in the code: assign variable map to the object l.map()
    // and instantiate the object with the given string 'mapid'
// 2. mapid reference the id tag in <div> element on index.html file
// 3. the setView() set map with geographical center, first coord is latitude (40.7)
    // second is longitude (-94.5) 
    // Third set the zoom level of "4" on scale of 0-18

let map = L.map('mapid').setView([40.7, -94.5], 4);

// alternative to setView() is to modify each attribute in map object with {}
// example -Create the map object with a center and zoom level.
// USEFUL when adding tile layers or background images!!!

// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

// //add a single marker to the map
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// // change marker to a circle (circle area is measured in meaters)
// L.circle([34.0522, -118.2437], {
//     radius: 100
//  }).addTo(map);

//  // ALTERNATIVE circle with cirleMarker() function
//  L.circleMarker([34.0522, -118.2437]).addTo(map);

//  // ADD CIRCLE with COLOR
//  L.circleMarker([34.0522, -118.2437],{
//     radius: 300,
//     color: "black",
//     fillColor: '#ffffa1'
//  }).addTo(map);

// Retrive DATA from cities.js folder 
// notice data variable name is "cities"
let cityData = cities;


// itterate through the data to add Marker for each location, add to map

//for (let i = 0; i < cities.length; i++)

//OR 

cityData.forEach(function(city){
    console.log(city)
    //L.marker(city.location)  // change marker to circleMarker() representing population
    L.circleMarker(city.location, {
        radius: city.population/200000,
        color: "orange",
        weight: 4,
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map);
});
//in forEach() function assign city variable to each object of cities.js file
// retrive coordinates with "city" variable and "location" value
// add .bindPopup with HTML text calling dataset "city", value ".city", value ".state", value ".population"
// add comma seperator to population number using .toLocaleString() function 
//(!! OPPS RAdius is too large) divide the city.population value by "100,000"
// set color to orange, with lineWeight of 4
// add.To(map);


// add a tileLayer... read tile usage policy @ leafletjs.com
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



// // We create the tile layer that will be the background of our map.

// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY
// });
// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);




// Create similar tilelayer but replace with streets-v11 url
// add a tileLayer... read tile usage policy @ leafletjs.com

// We create the tile layer that will be the background of our map.

// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
// });

// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// // We create the DARK tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 14,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our 'dark tile layer to the map.
streets.addTo(map);

// https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/1/1/0?access_token=pk.eyJ1IjoiYW1yLWFteSIsImEiOiJjbGNwNTVmeDMxajV3M3BwOHE5OTg5eTlnIn0.uXvvt45BKNnFSbDK84Z3vA
// L.map('map')
//   .setView([38.8929, -77.0252], 14)
//   .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v12'));