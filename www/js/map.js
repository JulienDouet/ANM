$(() => {
    const map = $("#map");
    const validateCoordinates = $("#validateCoordinates");
    const cancelCoordinates = $("#cancelCoordinates");

    // tooltip initializer
    $("body").tooltip({ selector: "[data-toggle=tooltip]" });

    /// utils ///

    /**
     * Fonction permettant de convertir des degrés en numéro de Tile 
     * (celle du centre de la carte en l'occurrence) pour préparer 
     * les appels à l'API OpenStreetMap et OpenSeaMap
     * @param {Le zoom que l'on veut appliquer à la carte} zoom 
     * @param {Le degré de latitude} degLatitude 
     * @param {Le degré de longitude} degLongitude 
     * @returns Un tableau avec les 2 paramètres nécessaires aux appels 
     * de l'API OpenStreetMap et OpenSeaMap
     */
    const getCenterTile = (zoom, degLatitude, degLongitude) => [
        parseInt(((degLongitude + 180.0) / 360.0) * 2.0 ** zoom),
        parseInt(
            ((1.0 -
                Math.asinh(Math.tan(degLatitude * (Math.PI / 180))) / Math.PI) /
                2.0) *
                2.0 ** zoom
        )
    ];

    /**
     * Fonction permettant de convertir des DMS (Degré, Minutes, Secondes) en DD (Degré Decimaux)
     * @param {La latitude à convertir en DD} latitude 
     * @param {La longitude à convertir en DD} longitude 
     * @returns Les coordonnées DMS converties en DD
     */
    const convertToDecimalDegre = (latitude, longitude) => {
        const decimalDegreLatitude =
            parseInt(latitude.deg) +
            (latitude.min * 60 + parseInt(latitude.sec)) / 3600;
        const decimalDegreLongitude =
            parseInt(longitude.deg) +
            (longitude.min * 60 + parseInt(longitude.sec)) / 3600;

        return {
            decimalDegreLatitude:
                latitude.orientation === "S"
                    ? -decimalDegreLatitude
                    : decimalDegreLatitude,
            decimalDegreLongitude:
                longitude.orientation === "O"
                    ? -decimalDegreLongitude
                    : decimalDegreLongitude
        };
    };

    /// core functions ///

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
            zoom: parseInt($("#zoom")[0].value),
            size: parseInt($("#size")[0].value)
        };
    };

    /**
     * Fonction permettant de générer les numéros des tiles composant 
     * la map à construire
     * @param {Les coordonnées de la taille centrale} centerTileCoords 
     * @param {Le zoom de la carte} zoom 
     * @param {La taille de la carte} size 
     * @returns 
     */
    const generateTileArray = (centerTileCoords, zoom, size) => {
        const tileArray = [...Array(size)].map(() => Array(size));

        const end = (size / 2) >> 0;
        const start = size % 2 !== 0 ? -end : -(end - 1);
        const add = size % 2 !== 0 ? end : Math.abs(start);

        for (let i = start; i <= end; ++i)
            for (let j = start; j <= end; ++j)
                tileArray[j + add][i + add] = [
                    zoom,
                    centerTileCoords[0] + i,
                    centerTileCoords[1] + j
                ];

        return tileArray;
    };


    /**
     * 
     * @param {Les données du formulaire} data 
     * @returns 
     */
    const formatMapData = (data) => {
        const { latitude, longitude, zoom, size } = data;

        const {
            decimalDegreLatitude,
            decimalDegreLongitude
        } = convertToDecimalDegre(latitude, longitude);

        const centerTileCoords = getCenterTile(
            zoom,
            decimalDegreLatitude,
            decimalDegreLongitude
        );

        return generateTileArray(centerTileCoords, zoom, size);
    };

    const resetMap = () => map.html("");

    /**
     * Fonction permettant d'afficher la carte 
     * @param {Les valeurs Tiles de chaque image à afficher} mapData 
     */
    const renderMap = (mapData) => {
        resetMap();
        mapData.forEach((row) => {
            map.append("<tr>");
            row.forEach((cell) => {
                map.append(
                    "<td style ='background-image: url(https://a.tile.openstreetmap.fr/osmfr/" +
                        cell[0] +
                        "/" +
                        cell[1] +
                        "/" +
                        cell[2] +
                        ".png);'>" +
                        "<img  src='https://tiles.openseamap.org/seamark/" +
                        cell[0] +
                        "/" +
                        cell[1] +
                        "/" +
                        cell[2] +
                        ".png'>" +
                        "</td>"
                );
            });
            map.append("</tr>");
        });
    };

    const closeCoordinatesModal = () => {
        $(".coordinatesModal").modal("toggle");
    };

    const closeAmerModal = () => {};

    // event handlers

    /**
     * Ecouteur sur le bouton valider qui appelle la fonction d'affichage de la carte
     */
    validateCoordinates.click(() => {
        const mapData = gatherFormParams();
        const formattedMapData = formatMapData(mapData);
        closeCoordinatesModal();
        renderMap(formattedMapData);
    });

    cancelCoordinates.click(() => {
        closeCoordinatesModal();
    });
});
