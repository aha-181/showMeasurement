var mapOsm;

function initmap() {
    // set up the OpenStreetMap map
    mapOsm = new L.Map('mapOsm');

    // create the tile layer with correct attribution
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 20, attribution: osmAttrib});

    // start the map in Switzerland
    mapOsm.setView(new L.LatLng(47.3, 8.55),9);
    mapOsm.addLayer(osm);
}

initmap();