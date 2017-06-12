window.onload = function () {
    document.getElementById('submitButton').addEventListener('click', onSubmit);
};


function onSubmit(event) {

    event.preventDefault();

    var baseUrl = '/measurement?Id=';
    var id = document.getElementById('measurementIdInput').value;
    var url = baseUrl + id;

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {

        if (this.readyState === 4) {

            if(this.status === 200) {

                var serverResponse = JSON.parse(this.response);
                document.getElementById('taggingResult').innerHTML = insertJSON(serverResponse.tagging);
                setMapMarkers(serverResponse.positions);
            }
            else {
                console.error('Error happened during request');
            }
        }
    };

    request.open("GET", url);
    request.send();
}


function insertJSON(json) {
    var jsonString = JSON.stringify(json, null, 4);
    return syntaxHighlight(jsonString);
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}



var markers = new L.FeatureGroup();

function setMapMarkers(positions) {

    markers.clearLayers();

    var latitude = null;
    var longitude = null;

    // loop over every point in the result and set point on map and data in table
    for (var i = 0; i < positions.length; i++) {
        latitude = positions[i].Latitude;
        longitude = positions[i].Longitude;
        var horizontalAccuracy = positions[i].HorizontalAccuracy;

        if (latitude !== null && longitude !== null) {
            var marker = L.marker([latitude, longitude]);
            markers.addLayer(marker);
        }

        if (latitude !== null && longitude !== null && horizontalAccuracy !== null) {
            // add radius of horizontal accuracy to the osm map
            var circle = L.circle([latitude, longitude], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.1,
                radius: horizontalAccuracy
            });
            markers.addLayer(circle);
        }
    }

    if (latitude !== null && longitude !== null) {
        // zoom in on last point on the osm map
        mapOsm.setView(new L.LatLng(latitude, longitude), 17);
    }

    mapOsm.addLayer(markers);
}