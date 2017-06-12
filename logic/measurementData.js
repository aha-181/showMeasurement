var dbConnection = require('./dbConnection');
var request = require('request');


function getData(id, callback) {

    var statement = 'SELECT * FROM mobile_data_log WHERE MeasurementID = ?';

    dbConnection.singleQuery(statement, [id], function (err, result) {

        if(err) {
            console.error(err);
        }
        else {
            var postData = prepareRequestData(result);

            request.post(
                'http://localhost:3000/api/v5.1/tag',
                { json: postData },
                function (error, response) {

                    if (!error && response.statusCode === 200) {
                        callback({ positions: result, tagging: response.body });
                    }
                    else {
                        console.error(error);
                    }
                }
            );
        }
    });
}

function prepareRequestData(results) {

    var postData = { positions: []};

    for(var i = 0; i < 8; i++) {

        postData.positions[i] = {
            longitude: Number(results[i].Longitude),
            latitude: Number(results[i].Latitude),
            horizontalAccuracy: Number(results[i].HorizontalAccuracy),
            time: results[i].Date
        };
    }

    return postData;
}

module.exports = { "getData" : getData };