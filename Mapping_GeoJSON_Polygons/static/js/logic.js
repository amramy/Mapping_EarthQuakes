// Add console.log to check to see if our code is working.
console.log("working");

// Set the center to San Francisco with zoom 10 
//let map = L.map('mapid').setView([37.6214, -122.3790], 10);

// Create the map object with center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);


// ADD GeoJSON data.
//NOTE! coordinates reverse order 
//= 1st parameter as X (Longitude)2nd Y(Latitude)



// ADD GeoJSON Data URL !!! LOOK BELOW UNDER TITLElAYER()

// ADD GeoJSON data (objects) to map throgh GeoJSON layer
// L.geoJSON(variableName).addTo(mapName);

// ADD pointToLayer ()function + data to popup marker
// Grabbing our GeoJSON data.


// L.geoJSON(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//       console.log(feature);
//       return L.marker(latlng)
//     // add .bindPopup() using html dot notation to traverse through JSON Object
//       .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>");
//     }
//   }).addTo(map);


// // USE onEachFeature to grab GeoJSON data
// // with .bindPopup and addTo(map)
// L.geoJson(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//         console.log(layer);
//         layer.bindPopup("<h2> Airport Code: " + feature.properties.id + "</h2> <hr> <h3>" + feature.properties.name + "</h3>");
//     }
// }).addTo(map);

// // We create the tile layer that will be the background of our map.
// // add a tileLayer... read tile usage policy @ leafletjs.com
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// Accessing the airport GeoJSON URL that is the file in GitHub
//let airportData = "https://raw.githubusercontent.com/amramy/Mapping_EarthQuakes/main/majorAirports.json";

let torontoHoods = "https://raw.githubusercontent.com/amramy/Mapping_EarthQuakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

// create a style for the lines
// let myStyle = {
//     color: "blue",
//     weight:1
// }

// Grabbing our GeoJSON Data 
d3.json(torontoHoods).then(function(data) {
    console.log(data);
    // Create a GeoJSON layer with the retrived data. 
    L.geoJSON(data, {
        color: "purple",  
        weight: 1, 
        fillColor: "aqua",
        // style: myStyle,
        onEachFeature: function(feature, layer) {
            console.log(layer);
            layer.bindPopup("<h2> Area Name: " + feature.properties.AREA_NAME + "</h2>");
        }
    }).addTo(map);
});

// Change view to -street-v11
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery ?? <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 14,
    id: 'mapbox/streets-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Then we add our streets tile layer to the map.
//streets.addTo(map);


// Create the dark view map option
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery ?? <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 14,
    id: 'mapbox/satellite-streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
    Streets : streets, 
    Satellite_Streets: satelliteStreets
}

// USE the alternative to setView so we can modify each attribute using {} notation
let map = L.map("mapid", {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map. 
L.control.layers(baseMaps).addTo(map);





