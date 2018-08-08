var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");
mongoose = require('mongoose');
request = require('request');
fs = require('fs');
underscore = require("underscore");
cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

var router = express.Router();
var hoteles = JSON.parse(fs.readFileSync('./models/data.json'));

router.get('/', function(req, res) {
    res.json(hoteles);
});

router.get('/byId', function(req, res) {
    var hotelId = req.query.id;
    var hotel = underscore.where(hoteles, { id: hotelId });
    res.send(hotel);
});

router.get('/byName', function(req, res) {
    var hotelName = req.query.name.toUpperCase();
    var hotelesPorNombre = underscore.filter(hoteles, function(hotel) { return hotel.name.toUpperCase().includes(hotelName) });
    res.send(hotelesPorNombre);
});

router.get('/byStars', function(req, res) {
    var hotelStars = req.query.stars;
    var hotelesPorEstrellas = underscore.where(hoteles, { stars: parseInt(hotelStars, 10) });
    res.send(hotelesPorEstrellas);
});

app.use(router);

app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});