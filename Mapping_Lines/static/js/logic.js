// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// 1. in the code: assign variable map to the object l.map()
    // and instantiate the object with the given string 'mapid'
// 2. mapid reference the id tag in <div> element on index.html file
// 3. the setView() set map with geographical center, first coord is latitude (40.7)
    // second is longitude (-94.5) 
    // Third set the zoom level of "4" on scale of 0-18

//let map = L.map('mapid').setView([40.7, -94.5], 4);

// Change the cordinates to somewhere between LAS and SFO airport with zoom of 7
//let map = L.map('mapid').setView([36.1733, -120.1794], 7);

// Change the center to San Francisco with zoom 5 
let map = L.map('mapid').setView([37.6214, -122.3790], 5);


// alternative to setView() is to modify each attribute in map object with {}
// example -Create the map object with a center and zoom level.
// USEFUL when adding tile layers or background images!!!

// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

// ADDING LINES: require coordinates for start/ end point as one-dimensional ARRAY with two elements! (lat & LONG)
// Assign the ARRAY to "line" variable

// let line = [
//     [33.9416, -118.4085],
//     [37.6214, -122.3790]
// ];
 
// ADD MORE POINT TO PREVIOUS LINE: 
let line = [
    [33.9416, -118.4085],
    [37.6214, -122.3790],
    [40.7899, -111.9791],
    [47.4502, -122.3088]
];
//CREATE PLOYLINE: using coordinates and color then addTo map
// L.polyline(line, {
//     color: "red"
// }).addTo(map);

// Change color to yellow
// L.polyline(line, {
//     color: "yellow"
// }).addTo(map);

//Make line blue with dashes, opacity 0.5, weight of 4 
L.polyline(line, {
    color: "blue",
    dashArray: '10,20',
    weight: 4,
    opacity: 0.5, 
    lineCap: 'square'
}).addTo(map);


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
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 14,
//     id: 'mapbox/dark-v10',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY
// });

// Change view to satellite-street-v11
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 14,
    id: 'mapbox/satellite-streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our streets (dark) tile layer to the map.
streets.addTo(map);

// https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/1/1/0?access_token=pk.eyJ1IjoiYW1yLWFteSIsImEiOiJjbGNwNTVmeDMxajV3M3BwOHE5OTg5eTlnIn0.uXvvt45BKNnFSbDK84Z3vA
// L.map('map')
//   .setView([38.8929, -77.0252], 14)
//   .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v12'));



// Features OBJECt
// {
//     type: "Feature",
//     properties: {
//     mag: 1.88,
//     place: "6km SE of Pahala, Hawaii",
//     time: 1573766377230,
//     type: "earthquake",
//     title: "M 1.9 - 6km SE of Pahala, Hawaii"
//     },
//     geometry: {
//     type: "Point",
//     coordinates: [
//     -155.4329987,
//     19.1634998
//     ]},
//   }

 
 
 // featureCollection Object 
//   {"type":"FeatureCollection","features":
// [
//   {
//     "type":"Feature","properties":{
// "airline":"AA","airline_id":"24","src":"LAX","dst":"ABQ","dst_id":"4019","stops":"0","equipment":"CRJ CR7"},"geometry":{
// "type":"LineString",
// "coordinates":[[-118.4079971,33.94250107],[-106.609001,35.040199]]}
// },
// {
// "type":"Feature","properties":{
// "airline":"AA","airline_id":"24","src":"LAX","src_id":"3484","dst":"ANC","dst_id":"3774","codeshare":"Y","stops":"0","equipment":"737"},"geometry":{
// "type":"LineString",
// "coordinates":[[-118.4079971,33.94250107],[-149.99600219726562,61.174400329589844]]}
//   },
// {
//   "type":"Feature","properties":{
// "airline":"AA","airline_id":"24","src":"LAX","src_id":"3484","dst":"AUS","dst_id":"3673","codeshare":"","stops":"0","equipment":"M83 738"},"geometry":{
// "type":"LineString",
// "coordinates":[[-118.4079971,33.94250107],[-97.6698989868164,30.194499969482422]]}
//   }
// ]
//}