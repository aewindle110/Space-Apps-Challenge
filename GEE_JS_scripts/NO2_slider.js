////////Make Intro Panel////////
var panel = ui.Panel();
panel.style().set('width', '300px');

var intro = ui.Panel([
  ui.Label({
    value: 'NO\u2082 concentrations during COVID-19 pandemic',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
]);
panel.add(intro);

/////////Add descriptions/////////////
var InstructionsDesc = ui.Label('Instructions:');
  InstructionsDesc.style().set({
  fontSize: '17px',
  fontWeight: 'bold',
  padding: '0px 0px'
});
panel.add(InstructionsDesc);

var mapInstruct1 = ui.Label('- Select a month of averaged NO\u2082 data from the dropdown menus to visualize NO\u2082 concentrations on the map.');
  mapInstruct1.style().set({
  fontSize: '14px',
  padding: '0px 5px'
});
panel.add(mapInstruct1);

var mapInstruct2 = ui.Label('- Slide the map to see NO\u2082 concentration differences between 2019 (left) and 2020 (right).');
  mapInstruct2.style().set({
  fontSize: '14px',
  padding: '0px 5px'
});
panel.add(mapInstruct2);

var mapInstruct3 = ui.Label('- Zoom and pan around to observe NO\u2082 concentrations around the world.');
  mapInstruct3.style().set({
  fontSize: '14px',
  padding: '0px 5px'
});
panel.add(mapInstruct3);

var mapInstruct4 = ui.Label('*Note: Layers may take some time to load. Try zooming into an area on the map to speed up imagery rendering.');
  mapInstruct4.style().set({
  fontSize: '10px',
  padding: '0px 5px'
});
panel.add(mapInstruct4);

///select a location dropdown/////
/////////Add Extent dropdown option////////
var mapDesc = ui.Label('Select location to zoom to:');
  mapDesc.style().set({
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '0px 5px'
});
panel.add(mapDesc);


var places = {
  NYC: [-73.994, 40.709],
  China: [114.45, 34.62],
  Italy: [9.59, 45.22]
};

var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    leftMap.setCenter(places[key][0], places[key][1]);
  }
});

// Set a place holder.
select.setPlaceholder('Choose a location...');

panel.add(select);


///////Add colorbar to panel///////
// Create colorbar title
var legendTitle = ui.Label({
value: 'NO\u2082 (umol/m\u00B2) tropospheric vertical column',
style: {
fontWeight: 'bold',
fontSize: '14px',
margin: '0 0 4px 0',
padding: '4px 8px'
}
});

// Add the title to the panel
panel.add(legendTitle);

function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x20',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}

function makeLegend(low, mid, high, palette) {
  var labelPanel = ui.Panel(
      [
        ui.Label(low, {margin: '4px 8px'}),
        ui.Label(mid, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(high, {margin: '4px 8px'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(palette), labelPanel])
}

var palettes = require('users/gena/packages:palettes');
var palette = palettes.colorbrewer.BrBG[11].reverse();
var colorbar = makeLegend(30, 150, 300, palette)
panel.add(colorbar);




/////////Add description/////////////
var mapDesc2 = ui.Label('Data are monthly averaged high resolution imagery of tropospheric vertical column density of NO\u2082 collected by the TROPOspheric Monitoring Instrument (Tropomi) onboard the European Space Agency Sentinel-5P satellite.');
  mapDesc2.style().set({
  fontSize: '12px',
  padding: '0px 0px'
});
panel.add(mapDesc2);

/////////Add description/////////////
var mapDesc3 = ui.Label('Nitrogen dioxide (NO\u2082) enters the atmosphere from anthropogenic activities (e.g. fossil fuel combustion, emissions) and natural processes (e.g. wildlfires, lightning, microbiological processes).');
  mapDesc3.style().set({
  fontSize: '12px',
  padding: '0px 0px'
});
panel.add(mapDesc3);

/////////Add description/////////////
var authorDesc = ui.Label('Application author: Anna Windle, University of MD Center for Environmental Science');
  authorDesc.style().set({
  fontSize: '10px',
  padding: '0px 0px'
});
panel.add(authorDesc);


// Make left and right maps.
var leftMap = ui.Map();
var rightMap = ui.Map();

// Make predefined data layers that can be selected.
var palettes = require('users/gena/packages:palettes');
var palette = palettes.colorbrewer.BrBG[11].reverse();

var NO2_band_viz = {
  min: 30,
  max: 300,
  palette: palette,
  opacity: 0.8
};

// Function That applies scaling factor
function scale(image) {
  return  image.multiply(1000000)
}

//2019
var NO2_Jan_2019 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2019-01-01', '2019-01-31')
  .map(scale)
  .mean()
  .visualize(NO2_band_viz)
  
  
var NO2_Feb_2019 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2019-02-01', '2019-02-28')
  .map(scale)
  .mean()
  .visualize(NO2_band_viz);
  
var NO2_Mar_2019 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2019-03-01', '2019-03-29')
  .map(scale)
  .mean()
  .visualize(NO2_band_viz);
  
var NO2_Apr_2019 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2019-04-01', '2019-04-30')
  .map(scale)
  .mean()
  .visualize(NO2_band_viz);

var NO2_May_2019 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2019-05-01', '2019-05-31')  
  .map(scale)
  .mean()
  .visualize(NO2_band_viz);
  
//2020
var NO2_Jan_2020 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2020-01-01', '2020-01-31')
  .map(scale)
  .mean()
  .visualize(NO2_band_viz);
  
var NO2_Feb_2020 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2020-02-01', '2020-02-29')
  .map(scale)
  .mean()
  .visualize(NO2_band_viz);
  
var NO2_Mar_2020 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2020-03-01', '2020-03-31')
  .map(scale)
  .mean()
  .visualize(NO2_band_viz);
  
var NO2_Apr_2020 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2020-04-01', '2020-04-30')
  .map(scale)
  .mean()
  .visualize(NO2_band_viz);
  
var NO2_May_2020 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2020-05-01', '2020-05-31')
  .map(scale)
  .mean()
  .visualize(NO2_band_viz);

// Add default layers to maps.
leftMap.addLayer(NO2_Mar_2019);
rightMap.addLayer(NO2_Mar_2020);

//add shapefiles
var styling = {color: 'grey', fillColor: '00000000',  width: 1};
leftMap.addLayer(states.style(styling));
rightMap.addLayer(states.style(styling));

var styling = {color: 'grey', fillColor: '00000000', width: 1};
leftMap.addLayer(countries.style(styling));
rightMap.addLayer(countries.style(styling));


// Link the maps
var linkedMaps = ui.Map.Linker([leftMap, rightMap]);

// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linkedMaps.get(0),
  secondPanel: linkedMaps.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});

// Make a list of image layers to select from.
var layers_2019 = ['January 2019', 'February 2019', 'March 2019', 'April 2019', 'May 2019'];  

var layers_2020 = ['January 2020', 'February 2020', 'March 2020', 'April 2020', 'May 2020'];  


// Make a function that will retrieve a layer based on selection.
function getLayer(selection) {
  var layer = NO2_Jan_2019;
  if(selection == 'February 2019') {
    layer = NO2_Feb_2019;
  } else if(selection == 'March 2019') {
    layer = NO2_Mar_2019;
  } else if(selection == 'April 2019') {
    layer = NO2_Apr_2019;
  } else if(selection == 'May 2019') {
    layer = NO2_May_2019;
  }
  return layer;
}

// Make a function that will retrieve a layer based on selection.
function getLayer2(selection) {
  var layer = NO2_Jan_2020;
  if(selection == 'February 2020') {
    layer = NO2_Feb_2020;
  } else if(selection == 'March 2020') {
    layer = NO2_Mar_2020;
  } else if(selection == 'April 2020') {
    layer = NO2_Apr_2020;
  } else if(selection == 'May 2020') {
    layer = NO2_May_2020;
  }  
  return layer;
}

// Make a callback function for when a selection is made for left map.
function selectLeftOnChange(selection) {
  leftMap.layers().set(0, getLayer(selection));
}

// Make a callback function for when a selection is made for right map.
function selectRightOnChange(selection) {
  rightMap.layers().set(0, getLayer2(selection));
}

// Define selection buttons for left and right map layers.
var selectLeft = ui.Select(layers_2019, 'March 2019', 'March 2019', selectLeftOnChange, false, {position: 'middle-left'});
var selectRight = ui.Select(layers_2020, 'March 2020', 'March 2020', selectRightOnChange, false, {position: 'middle-right'});




// Clear the root, add the splitPanel, and buttons.
ui.root.clear();
ui.root.add(splitPanel);
leftMap.add(selectLeft);
rightMap.add(selectRight);
leftMap.setCenter(-73.994, 40.709, 6);

//Add panel to the ui.root
ui.root.insert(0, panel);