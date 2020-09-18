// Link to earthquake data
var queryUrl =
  "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=" +
  "2020-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

var queryUrl30Day =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson";

// Adding tile layer to the map
var streetmap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY,
  }
);

// Creating map object centered on Salt Lake City
var myMap = L.map("map", {
  center: [40.76, -111.89],
  zoom: 5,
  layers: [streetmap],
});

// get earthquake GeoJSON data
d3.json(queryUrl, function (quake_data) {
  // add to map to test marker location
  // L.geoJson(quake_data).addTo(myMap);

  // how much data?
  var quakes = quake_data.features.length;
  console.log(`Feature count: ${quakes}`);

  // loop through and build circles
  for (i = 0; i < quake_data.features.length; i++) {
    var coords = quake_data.features[i].geometry.coordinates;
    console.log(`lat-long = ${coords[1]}, ${coords[0]}`);
    console.log(quake_data.features[i].properties.mag * 5000);

    // create circles
    L.circle([coords[1], coords[0]], {
      fillOpacity: 0.75,
      color: "blue",
      fillColor: "pink",
      radius: quake_data.features[i].properties.mag * 50000,
    })
      .bindPopup("<h1>FOO</h1>")
      .addTo(myMap);
  }
});
