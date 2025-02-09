// Initialize the map
var map = L.map('map').setView([47.7998, 13.0453], 14); // Centered on Salzburg Altstadt

// Define the tile layer
var tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  opacity: 0.7 // Initial opacity
}).addTo(map);

// Define a custom cafe icon for regular cafes
const cafeIcon = L.icon({
  iconUrl: 'images/cafe-icon.png', // Path to your default cafe icon
  iconSize: [25, 25], // Size of the icon [width, height]
  iconAnchor: [16, 32], // Point of the icon which will correspond to the marker's location
  popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
});

// Define a custom icon for favorite cafes
const favCafeIcon = L.icon({
  iconUrl: 'images/favcafe-icon2.png', // Path to your favorite cafe icon
  iconSize: [26, 32], // Size of the icon [width, height]
  iconAnchor: [16, 32], // Point of the icon which will correspond to the marker's location
  popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
});

// Function to style polygons in GeoJSON
function styleFeature(feature) {
  if (feature.geometry.type === 'Polygon') {
    return {
      color: 'blue',
      weight: 2,
      fillOpacity: 0.5
    };
  }
  return {};
}

// Function to handle popups for features
function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.name) {
    layer.bindPopup(`<b>${feature.properties.name}</b>`);
  }
}

// Function to load GeoJSON using XHR
function loadGeoJSON(url, icon, styleFunction) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var data = xhr.response;
      L.geoJSON(data, {
        style: styleFunction, // Apply styling if polygons
        pointToLayer: function (feature, latlng) {
          // Use the provided icon for markers
          return L.marker(latlng, { icon: icon });
        },
        onEachFeature: onEachFeature // Add popups
      }).addTo(map);
    } else {
      console.error(`Error loading ${url}: ${xhr.status} ${xhr.statusText}`);
    }
  };

  xhr.onerror = function () {
    console.error(`Network error while loading ${url}`);
  };

  xhr.send();
}

// Load the all-fav.geojson file
loadGeoJSON('all-fav.geojson', cafeIcon, styleFeature);

// Load the favcafes.geojson file
loadGeoJSON('favcafes.geojson', favCafeIcon, null);

// Add a title and slider for opacity control
const sliderContainer = document.createElement('div');
sliderContainer.style.position = 'absolute';
sliderContainer.style.top = '10px';
sliderContainer.style.left = 'unset'; // Unset the left position
sliderContainer.style.right = '10px'; // Set the right position
sliderContainer.style.zIndex = '1000';
sliderContainer.style.background = 'white';
sliderContainer.style.padding = '10px';
sliderContainer.style.borderRadius = '5px';
sliderContainer.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';

// Add a title to the slider
const sliderTitle = document.createElement('div');
sliderTitle.innerText = 'Change the transparency of the base map';
sliderTitle.style.fontFamily = 'Palatino Linotype'; // Change font family
sliderTitle.style.fontSize = '10pt'; // Change font size
sliderTitle.style.backgroundColor = 'transparent'; // Explicitly set the background color to transparent
sliderTitle.style.marginBottom = '5px';
sliderTitle.style.fontSize = '14px';
sliderTitle.style.color = 'darkgray'; // Set font color to dark gray
sliderTitle.style.fontWeight = 'normal';
sliderContainer.appendChild(sliderTitle);

// Add the slider
const slider = document.createElement('input');
slider.type = 'range';
slider.min = '0';
slider.max = '1';
slider.step = '0.1';
slider.value = '0.7'; // Initial opacity value
slider.style.width = '100%';
sliderContainer.appendChild(slider);

// Add the container to the document
document.body.appendChild(sliderContainer);

// Listen to slider changes and update tile layer opacity
slider.addEventListener('input', function (e) {
  const opacity = parseFloat(e.target.value);
  tileLayer.setOpacity(opacity);
});

// Add a legend
function addLegend(map) {
  const x = L.control({ position: 'bottomright' });

  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'legend');
    div.style.background = 'white';
    div.style.padding = '10px';
    div.style.borderRadius = '5px';
    div.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    div.style.fontFamily = 'Palatino Linotype';
    div.style.color = 'darkgray';
    div.style.zIndex = '1000'; // Ensure it stays visible
    div.innerHTML = `
      <h4 style="margin: 0; font-size: 12pt; color: darkgray;">Legend</h4>
      <div style="display: flex; align-items: center; margin-top: 5px;">
        <img src="images/favcafe-icon.png" alt="Fav Cafe" style="width: 24px; height: 24px; margin-right: 8px;">
        <span style="font-size: 10pt;">Favorite Cafes</span>
      </div>
    `;
    return div;
  };

  legend.addTo(map);
}

// Add the legend to the map
addLegend(map);

// Trigger map resize when the window resizes
window.addEventListener('resize', function () {
  map.invalidateSize();
});


