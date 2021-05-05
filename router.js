/* Appel de tous nos outils */
const express = require('express');
const expressApp = express();
const http = require('http').Server(expressApp);
const path = require('path');
const ejsLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');

/* Middlewares */
expressApp.use(bodyParser.urlencoded({
    extended: true
}));
expressApp.use(bodyParser.json());
expressApp.use(express.json());       // to support JSON-encoded bodies
expressApp.use(express.urlencoded()); // to support URL-encoded bodies

/* Initialisation des variables */
const router = {
    isStarted: false
};

function start(callback) {
    if (router.isStarted === false) {
        init(function () {
            loadRoutes(function () {
                /* Lance le serveur web sur le port 3000 */
                http.listen(3000, function () {
                    console.log('Application is running on port 3000');
                    router.isStarted = true;
                    if (typeof callback != 'undefined') {
                        callback();
                    }
                });
            });
        });
    } else {
        console.log("Application already started");
        if (typeof callback != 'undefined') {
            callback();
        }
    }
}

function init(callback) {
    /* On s'assure que le serveur n'est vraiment pas démarré */
    router.isStarted = false;
    /* Ajout de express-ejs-layouts */
    expressApp.use(ejsLayout);
    /* J'utilise ici EJS comme moteur de template */
    expressApp.set('view engine', 'ejs');
    /* assets sera le répertoire où se trouverons nos fichiers côté client */
    expressApp.use(express.static(path.join(__dirname, 'assets')));
    /* views est défini comme notre dossier de vues par défaut */
    expressApp.set('views', path.join(__dirname, '/views/'));
    if (typeof callback != 'undefined') {
        callback();
    }
}

/* ROUTES */
function loadRoutes(callback) {
    expressApp.get('/', function (req, res) {
        res.render('homepage/index');
    });

    expressApp.post('/carte', (req, res) => {
        console.log(req);
        var latitude = [req.body.lat_radio,req.body.lat_deg,req.body.lat_min,req.body.lat_sec];
        var longitude = [req.body.lon_radio,req.body.lon_deg,req.body.lon_min,req.body.lon_sec];
        var zoom = req.body.zoom;
        var taille = req.body.taille;
      
        var deg_decim = dms_to_dd(latitude,longitude);
        var num = deg_to_num(zoom,deg_decim[0],deg_decim[1]);
      
        var tab_images = tableau_images(num,taille);
        res.render('carte/carte', {tableau_images:tab_images,taille:taille});
    });

    if (typeof callback != 'undefined') {
        callback();
    }
}

/* FONCTIONS */
/**
 * 
 * @param {Le zoom que l'on souhaite appliquer sur la carte} zoom 
 * @param {La latitude de la position donnée} lat_deg 
 * @param {La longitude de la position donnée} lon_deg 
 */
function deg_to_num(zoom,lat_deg,lon_deg)
{
  var lat_rad = degrees_to_radians(lat_deg);

  var n = Math.pow(2.0, zoom);

  var xtile = parseInt((lon_deg + 180.0) / 360.0 * n);
  var ytile = parseInt((1.0 - Math.asinh(Math.tan(lat_rad)) / Math.PI)/ 2.0 *n);

  return [zoom,xtile,ytile];
}

/**
 * 
 * @param {Le degré à convertir en radian} degrees 
 */
function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

/**
 * 
 * @param {La latitude DMS à convertir en latitude DD} latitude 
 * @param {La longitude DMS à convertir en longitude DD} longitude 
 */
function dms_to_dd(latitude, longitude)
{
  // traitement latitude
  var ent = (((latitude[2] * 60 + parseInt(latitude[3])))/3600);
  latitude_dd = parseInt(latitude[1]) + ent;

  if (latitude[0] == 'S'){
    latitude_dd = - latitude_dd;
  }

  // traitement longitude
  longitude_dd = parseInt(longitude[1]) + (((longitude[2] * 60 + parseInt(longitude[3])))/3600);

  if (longitude[0] == 'O') {
    longitude_dd = - longitude_dd;
  }

  return [latitude_dd, longitude_dd];
}

/**
 * 
 * @param {Le numéro de l'image} num 
 * @param {La taille de l'image} taille 
 */
function tableau_images(num,taille)
{
  var tab_images = new Array(30);
  for (i=0; i < 30; i++){
        tab_images[i] = new Array(30);
  }

  var fin = 0;
  var debut = 0;
  var ajout = 0

  if (taille%2!=0){

     fin = (taille / 2) >> 0;
     debut = -fin;
     ajout = fin;
  }
  else{

    fin = (taille / 2) >> 0;
    debut = -(fin -1);
    ajout = Math.abs(debut);
  }

  for(var i = debut; i<=fin; i++){

    for(var j = debut; j<=fin; j++){
      tab_images[i+ajout][j+ajout] = [num[0],num[1]+i,num[2]+j];

    }

  }
  return tab_images;

}

/* EXPORTS */
module.exports = {
    start: start
};