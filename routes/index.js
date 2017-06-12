var express = require('express');
var router = express.Router();
var measurementData = require('../logic/measurementData');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/measurement', function(req, res) {
    measurementData.getData(req.query.Id, function (result) {
      res.status(200).json(result);
  });
});


module.exports = router;
