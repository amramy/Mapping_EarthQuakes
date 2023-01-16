// Add console.log to check to see if our code is working.
console.log("working");

// Set the center to San Francisco with zoom 10 
let map = L.map('mapid').setView([37.6214, -122.3790], 10);

// ADD GeoJSON data.
//NOTE! coordinates reverse order 
//= 1st parameter as X (Longitude)2nd Y(Latitude)
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"14",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// ADD GeoJSON data (objects) to map throgh GeoJSON layer
// L.geoJSON(variableName).addTo(mapName);

//L.geoJSON(sanFranAirport).addTo(map);

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


// USE onEachFeature to grab GeoJSON data
// with .bindPopup and addTo(map)
L.geoJson(sanFranAirport, {
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup("<h2> Airport Code: " + feature.properties.id + "</h2> <hr> <h3>" + feature.properties.name + "</h3>");
    }
}).addTo(map);


// add a tileLayer... read tile usage policy @ leafletjs.com
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



// // We create the tile layer that will be the background of our map.

// Change view to satellite-street-v11
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 14,
    id: 'mapbox/streets-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our streets tile layer to the map.
streets.addTo(map);






