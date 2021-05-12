$(() => {
    const map = $("#map");
    const validateCoordinates = $("#validateCoordinates");

    // tooltip initializer
    $("body").tooltip({ selector: "[data-toggle=tooltip]" });

    // utils
    /**
     * Fonction permettant de convertir des degrés en numéro Tile pour préparer 
     * les appels à l'API l'API OpenStreetMap et OpenSeaMap
     * @param {Le zoom que l'on veut appliquer à la carte} zoom 
     * @param {Le degré de latitude} lat_deg 
     * @param {Le degré de longitude} lon_deg 
     * @returns Un tableau avec les 3 paramètres nécessaires aux appels l'API OpenStreetMap et OpenSeaMap
     */
    function convertDegToNum(zoom, lat_deg, lon_deg) {
        var lat_rad = convertDegToRad(lat_deg);

        var n = Math.pow(2.0, zoom);

        var xtile = parseInt(((lon_deg + 180.0) / 360.0) * n);
        var ytile = parseInt(
            ((1.0 - Math.asinh(Math.tan(lat_rad)) / Math.PI) / 2.0) * n
        );

        return [zoom, xtile, ytile];
    }
    
    /**
     * Fonction permettant de convertir un degré en radians
     * @param {Le degré à convertir} degrees 
     * @returns Le radian correspondant au degré
     */
    function convertDegToRad(degrees) {
        var pi = Math.PI;
        return degrees * (pi / 180);
    }

    /**
     * Fonction permettant de convertir des DMS (Degré, Minutes, Secondes) en DD (Degré Decimaux)
     * @param {La latitude à convertir en DD} latitude 
     * @param {La longitude à convertir en DD} longitude 
     * @returns Les coordonnées DMS converties en DD
     */
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

    /**
     * Fonction permettant de récupérer toutes les valeurs des champs du formulaire
     * @returns Retourne un objet contenant toutes les valeurs du formulaire
     */
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

    /**
     * ??????
     * @param {Les coordonnées de la taille centrale} num 
     * @param {La taille de la carte} taille 
     * @returns 
     */
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

    /**
     * 
     * @param {Les données du formulaire} data 
     * @returns 
     */
    const formatMapData = (data) => {
        const { latitude, longitude, zoom, size } = data;

        var deg_decim = convertDMSToDD(latitude, longitude);
        var num = convertDegToNum(zoom, deg_decim[0], deg_decim[1]);

        return tableau_images(num, size);
    };

    /**
     * Fonction permettant d'afficher la carte 
     * @param {Les valeurs Tiles de chaque image à afficher} rowList 
     */
    const renderMap = (rowList) => {
        map.html("");
        rowList.forEach((row, j) => {
            map.append("<tr>");
            row.forEach((col, i) => {
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
            });
            map.append("</tr>");
        });
    };

    /**
     * Ecouteur sur le bouton valider qui appelle la fonction d'affichage de la carte
     */
    validateCoordinates.click(() => {
        const mapData = gatherFormParams();
        const formattedMapData = formatMapData(mapData);
        renderMap(formattedMapData);
    });
});