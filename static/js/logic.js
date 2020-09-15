// Creating layers for map
// Adding tile layer
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 4,
  minZoom: 4,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups
// var layers = {
//   CONSUMPTION = new L.LayerGroup(),
//   PRODUCTION = new L.LayerGroup(),
//   EMISSIONS = new L.LayerGroup()
// };

// Define a map object
var myMap = L.map("map", {
  center: [40, -95],
  zoom: 2
  // layers: [
  //   layers.CONSUMPTION,
  //   layers.PRODUCTION,
  //   layers.EMISSIONS]
});

lightmap.addTo(myMap);

// Create an overlay object
// var overlays = {
//   "Production": layers.PRODUCTION,
//   "Consumption": layers.CONSUMPTION,
//   "Emissions": layers.EMISSIONS
// };

// Pass our map layers into our layer control
// Add the layer control to the map
// L.control.layers(null, overlays, {
//   collapsed: false
// });

// var info = L.control({
//   position: "bottomright"
// });

// // When the layer control is added, insert a div with the class of "legend"
// info.onAdd = function() {
//   var div = L.DomUtil.create("div", "legend");
//   return div;
// };
// // Add the info legend to the map
// info.addTo(myMap);

var url = "data/states.geojson";

var geojson;

d3.json(url, function(err, data) {
  console.log(data);
  if(err) console.log("error fetching data");

  function statedata(){
    console.log("Inside - On click method")
    var currenturl=window.location.href;
    console.log(currenturl)
    var newurl=currenturl+"statedata.html"
    window.location.href = newurl;
  }
// d3.json("http://localhost:5000/api", function(data) {

  geojson = L.choropleth(data, {
        // Define what property in the features to use
        valueProperty: "CENSUSAREA",

        // Set color scale
        scale: ["#ffffb2", "#b10026"],
    
        // Number of breaks in step range
        steps: 10,
    
        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: {
          // Border color
          color: "#fff",
          weight: 1,
          fillOpacity: 0.8
        },

        // Binding a pop-up to each layer
        onEachFeature: function(feature, layer) {
        layer.bindTooltip(feature.properties.NAME)        
        }
  }).addTo(myMap);

  myMap.on('click', statedata);

});