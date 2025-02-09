// use https://overpass-turbo.eu/ wizard to download the data
// use https://leaflet-extras.github.io/leaflet-providers/preview/ to choose a tile

File Structure

project-folder/
├── index.html
├── app.js
├── export.geojson
├── favcafes.geojson
├── images/
    ├── cafe-icon.png
    ├── favcafe-icon.png


// remember to Your GeoJSON file contains a mix of Point geometries (individual locations like cafes) 
// and a Polygon geometry (e.g., a building with a cafe). To display both types correctly on your Leaflet map, 
// you'll need to handle each geometry type properly. Check how app.js handles loading and displaying 
// the GeoJSON file: go to app.js and check the following functions: 

// Function to style the GeoJSON layers
// Function to handle each feature (popup and more)
// Apply styling for polygons, see pointToLayer function
// Add popups

// fixing_ CORS (Cross-Origin Resource Sharing) policy_problem

// Initialize the http://localhost:8000/ due to not accessing the file directory

conda activate leaflet

python -m http.server 8000

path: (leaflet) <path to your file>

in the browser go to: http://localhost:8000/index.html

// If the custom defined icons - the ones you upload yourself- are not appearing on the map even if you refresh

If your browser has cached an older version of the code or image, force a cache refresh by pressing Ctrl + F5 or clearing your browser cache

// Add a Slider for Opacity Control

// Add a legend

// Trigger map resize when the window resizes (see app.js and index.html)

