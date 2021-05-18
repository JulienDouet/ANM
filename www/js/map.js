
var fs = require('fs'),
    request = require('request'),
    shelljs = require('shelljs');

$(() => {
    const map = $("#map");
    const validateCoordinates = $("#validateCoordinates");

    const chargeCard = $("#chargeCard");
    const validerCarte = $("#validerCarte");

    // tooltip initializer
    $("body").tooltip({ selector: "[data-toggle=tooltip]" });

    // utils
    function convertDegToNum(zoom, lat_deg, lon_deg) {
        var lat_rad = convertDegToRad(lat_deg);

        var n = Math.pow(2.0, zoom);

        var xtile = parseInt(((lon_deg + 180.0) / 360.0) * n);
        var ytile = parseInt(
            ((1.0 - Math.asinh(Math.tan(lat_rad)) / Math.PI) / 2.0) * n
        );

        return [zoom, xtile, ytile];
    }

    function convertDegToRad(degrees) {
        var pi = Math.PI;
        return degrees * (pi / 180);
    }
    const convertDMSToDD = (latitude, longitude) => {
        // traitement latitude
        latitude_dd =
            parseInt(latitude.deg) +
            (latitude.min * 60 + parseInt(latitude.sec)) / 3600;

        if (latitude.orientation == "S") {
            latitude_dd = -latitude_dd;
        }

        // traitement longitude

        longitude_dd =
            parseInt(longitude.deg) +
            (longitude.min * 60 + parseInt(longitude.sec)) / 3600;

        if (longitude.orientation == "O") {
            longitude_dd = -longitude_dd;
        }

        return [latitude_dd, longitude_dd];
    };

    // core functions
    const gatherFormParams = () => {
        const latRad = $("input[name='lat_radio']").toArray();
        const lonRad = $("input[name='lon_radio']").toArray();
        return {
            latitude: {
                orientation: latRad.find((radVal) => radVal.checked).value,
                deg: $("#lat_deg")[0].value,
                min: $("#lat_min")[0].value,
                sec: $("#lat_sec")[0].value
            },
            longitude: {
                orientation: lonRad.find((radVal) => radVal.checked).value,
                deg: $("#lon_deg")[0].value,
                min: $("#lon_min")[0].value,
                sec: $("#lon_sec")[0].value
            },
            zoom: $("#zoom")[0].value,
            size: $("#size")[0].value
        };
    };
    function tableau_images(num, taille) {
        var tab_images = new Array(taille);
        for (i = 0; i < taille; i++) {
            tab_images[i] = new Array(taille);
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
                tab_images[i + ajout][j + ajout] = [
                    num[0],
                    num[1] + i,
                    num[2] + j
                ];
            }
        }
        return tab_images;
    }

    const formatMapData = (data) => {
        const { latitude, longitude, zoom, size } = data;

        var deg_decim = convertDMSToDD(latitude, longitude);
        var num = convertDegToNum(zoom, deg_decim[0], deg_decim[1]);

        return tableau_images(num, size);
    };

    const renderMap = (rowList,titre_carte) => {
        map.html("");
        rowList.forEach((row, j) => {
            map.append("<tr>");
            row.forEach((col, i) => {
              var openstreetmap = 'https://a.tile.openstreetmap.fr/osmfr/'+rowList[i][j][0] + '/' + rowList[i][j][1] + '/' + rowList[i][j][2] + '.png';
              var openseamap = 'https://tiles.openseamap.org/seamark/'+rowList[i][j][0] + '/' + rowList[i][j][1] + '/' + rowList[i][j][2] + '.png';

                map.append(
                    "<td style ='background-image: url(https://a.tile.openstreetmap.fr/osmfr/" +
                        rowList[i][j][0] +
                        "/" +
                        rowList[i][j][1] +
                        "/" +
                        rowList[i][j][2] +
                        ".png);'>" +
                        "<img  src='https://tiles.openseamap.org/seamark/" +
                        rowList[i][j][0] +
                        "/" +
                        rowList[i][j][1] +
                        "/" +
                        rowList[i][j][2] +
                        ".png'>" +
                        "</td>"
                );

                download(openstreetmap, 'cartes/'+titre_carte+'/openstreetmap/'+i+'_'+j+'.png', function(){
                  //console.log('done');
                });

                download(openseamap, 'cartes/'+titre_carte+'/openseamap/'+i+'_'+j+'.png', function(){
                  //console.log('done');
                });
            });


            map.append("</tr>");
        });
    };
    var download = function(uri, filename, callback){
      request.head(uri, function(err, res, body){
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };

    validateCoordinates.click(() => {

      var titre_carte = $("#titre_carte").val();
      var zoom_carte = $("#zoom").val();
      var size_carte = $("#size").val();

      var data_file = "cartes/"+titre_carte+"/informations.txt";
      var content_file = "zoom="+zoom_carte+":size="+size_carte;
      console.log(data_file);
      shelljs.mkdir('-p','cartes/'+titre_carte+'/openstreetmap');
      shelljs.mkdir('-p','cartes/'+titre_carte+'/openseamap');

      fs.writeFile(data_file, content_file, (err) => {
          if (err) throw err;

          console.log("The file was succesfully saved!");
      });

        const mapData = gatherFormParams();
        const formattedMapData = formatMapData(mapData);
        renderMap(formattedMapData,titre_carte);


    });


    chargeCard.click(() => {

      let dirname = '/home/etudiant/Documents/ANM/';
      let folder = dirname+'cartes';
      let listCard = $("#listCard");


        fs.readdir(folder, (err, files) => {
          files.forEach(file => {
            listCard.append('<div><input type="radio" id="'+file+'" name="saveCarte" value="'+file+'"><label for="'+file+'">'+file+'</label></div>');
          });
        });

    });


    validerCarte.click(() => {
      let dirname = '/home/etudiant/Documents/ANM/';

      const cardName = $("input[name='saveCarte']").val();
      const dataFilePath = 'cartes/'+cardName+'/informations.txt';

      fs.readFile(dataFilePath, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }


        let dataFile = data;


        const zoomCarte = dataFile.split(':')[0].split('=')[1]
        const sizeCarte = dataFile.split(':')[1].split('=')[1]

        for(let i = 0; i<sizeCarte; i++){
          map.append("<tr>");

            for(let j = 0; j<sizeCarte; j++){


                map.append(
                    "<td style ='background-image: url(" + dirname + "/cartes/"+cardName+"/openstreetmap/" + j + "_" + i + ".png);'>"+
                    "<img  src='"+dirname+"/cartes/"+cardName+"/openseamap/"+j+"_"+i+".png'></td>"
                );

            }

        }

      });


    });
});
