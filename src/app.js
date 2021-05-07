const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

var bodyParser = require("body-parser");
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/carte", (req, res) => {
    var latitude = [
        req.body.lat_radio,
        req.body.lat_deg,
        req.body.lat_min,
        req.body.lat_sec
    ];
    var longitude = [
        req.body.lon_radio,
        req.body.lon_deg,
        req.body.lon_min,
        req.body.lon_sec
    ];
    var zoom = req.body.zoom;
    var taille = req.body.taille;

    var deg_decim = dms_to_dd(latitude, longitude);
    var num = deg_to_num(zoom, deg_decim[0], deg_decim[1]);

    var tab_images = tableau_images(num, taille);
    res.render("carte", { tableau_images: tab_images, taille: taille });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

function deg_to_num(zoom, lat_deg, lon_deg) {
    var lat_rad = degrees_to_radians(lat_deg);

    var n = Math.pow(2.0, zoom);

    var xtile = parseInt(((lon_deg + 180.0) / 360.0) * n);
    var ytile = parseInt(
        ((1.0 - Math.asinh(Math.tan(lat_rad)) / Math.PI) / 2.0) * n
    );

    return [zoom, xtile, ytile];
}

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

function dms_to_dd(latitude, longitude) {
    // traitement latitude
    var ent = (latitude[2] * 60 + parseInt(latitude[3])) / 3600;
    latitude_dd = parseInt(latitude[1]) + ent;

    if (latitude[0] == "S") {
        latitude_dd = -latitude_dd;
    }

    // traitement longitude

    longitude_dd =
        parseInt(longitude[1]) +
        (longitude[2] * 60 + parseInt(longitude[3])) / 3600;

    if (longitude[0] == "O") {
        longitude_dd = -longitude_dd;
    }

    return [latitude_dd, longitude_dd];
}

function tableau_images(num, taille) {
    var tab_images = new Array(30);
    for (i = 0; i < 30; i++) {
        tab_images[i] = new Array(30);
    }

    var fin = 0;
    var debut = 0;
    var ajout = 0;

    if (taille % 2 != 0) {
        fin = (taille / 2) >> 0;
        debut = -fin;
        ajout = fin;
    } else {
        fin = (taille / 2) >> 0;
        debut = -(fin - 1);
        ajout = Math.abs(debut);
    }

    for (var i = debut; i <= fin; i++) {
        for (var j = debut; j <= fin; j++) {
            tab_images[i + ajout][j + ajout] = [num[0], num[1] + i, num[2] + j];
        }
    }
    return tab_images;
}
