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


// Create Style data for each earthquake raidus eaqual to magnitude
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1, 
        fillColor: getColor(feature.properties.mag),
        color: "#000000", 
        radius: getRadius(feature.properties.mag),
        stroke: true, 
        weight: 0.5
    };
}

// set different colors depending on magnitude of earthQuake
function getColor(magnitude) {
    if (magnitude > 5) {
        return "#ea2c2c";
    }
    if (magnitude > 4) {
        return "#ea822c";
    }
    if (magnitude > 3) {
        return "#ee9c00";
    }
    if (magnitude > 2) {
        return "#eecc00";
    }
    if (magnitude > 1) {
        return "#d4ee00";
    }
    return "#98ee00";
}

// Creat Funtion to determin radius based on magnitude 
// mag of 0 with be plotted with radius 1, 
// mag >0 with be multiplied by 4
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude *4;
}

// Retrive the earthQuake GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    // Create a GeoJSON layer with retrived data
    L.geoJSON(data, {
        
        //turn each feature into a cirleMarker on the map

        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        }, 
        // Set the style to variable styleInfo
        style: styleInfo,
        // Create popup with mag and location name for each cirleMarker
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br> Location: " + feature.properties.place);
        }
    // addTo overlay earthquakes 
    }).addTo(earthquakes);

    //Then add earthquakes to our map
    earthquakes.addTo(map);
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

//Create overlay layer that lay ontop the base map holding our info
let earthquakes = new L.layerGroup();

// define an object that contains the overlays
// This overlay will be visible all the time
let overlays = {
    Earthquakes: earthquakes
};

// USE the alternative to setView so we can modify each attribute using {} notation
let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map. 
L.control.layers(baseMaps, overlays).addTo(map);