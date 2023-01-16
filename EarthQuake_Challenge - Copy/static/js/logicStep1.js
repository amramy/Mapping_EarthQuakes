// check the connection 
console.log("working");


// create a style for the lines
// let myStyle = {
//     color: "blue",
//     weight:1
// }


// let earthQuakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // create a style for the lines
// // let myStyle = {
// //     color: "blue",
// //     weight:1
// // }

// // Grabbing our GeoJSON Data 
// d3.json(earthQuakeData).then(function(data) {
//     console.log(data);
//     // Create a GeoJSON layer with the retrived data. 
//     L.geoJSON(data, {
//         color: "purple",  
//         weight: 1, 
//         fillColor: "aqua",
//         // style: myStyle,
//         onEachFeature: function(feature, layer) {
//             console.log(layer);
//             layer.bindPopup("<h2> Area Name: " + feature.properties.AREA_NAME + "</h2>");
//         }
//     }).addTo(map);
// });

// Retrive the earthQuake GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    // Create a GeoJSON layer with retrived data
    L.geoJSON(data).addTo(map);
});
// Create Street view map option
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 14,
    id: 'mapbox/streets-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create the satellite view map option
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 14,
    id: 'mapbox/satellite-streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
    "Streets" : streets, 
    "Satellite": satelliteStreets
}

// USE the alternative to setView so we can modify each attribute using {} notation
let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map. 
L.control.layers(baseMaps).addTo(map);

