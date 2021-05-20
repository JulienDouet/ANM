export const generateMapArray = (data) => {
    const { latitude, longitude, latitudeDistance, longitudeDistance, zoom, size } = data;

    console.log(data);

    const { decimalDegreLatitude, decimalDegreLongitude, decimalDegreLatitudeDistance, decimalDegreLongitudeDistance } =
        convertToDecimalDegre(latitude, longitude,latitudeDistance, longitudeDistance);


    console.log(decimalDegreLatitude);
    console.log(decimalDegreLongitude);
    console.log(decimalDegreLatitudeDistance);
    console.log(decimalDegreLongitudeDistance);

    const centerTileCoords = getCenterTile(
        zoom,
        decimalDegreLatitude,
        decimalDegreLongitude,
        decimalDegreLatitudeDistance,
        decimalDegreLongitudeDistance
    );
    console.log(centerTileCoords);

    const beginLastCoords = getBeginLastTile(
        zoom,
        decimalDegreLatitude,
        decimalDegreLongitude,
        decimalDegreLatitudeDistance,
        decimalDegreLongitudeDistance
    );
    console.log(beginLastCoords);
    return generateTileArray(centerTileCoords, beginLastCoords, zoom, size);
};

/**
 * Fonction permettant de convertir des degrés en numéro de la Tile centrale pour préparer
 * les appels à l'API OpenStreetMap et OpenSeaMap
 * @param {Le zoom que l'on veut appliquer à la carte} zoom
 * @param {Le degré de latitude} degLatitude
 * @param {Le degré de longitude} degLongitude
 * @returns Un tableau avec les 2 paramètres nécessaires aux appels l'API OpenStreetMap et OpenSeaMap
 */
const getCenterTile = (zoom, degLatitude, degLongitude, degLatDist, degLongDist) => [
    parseInt(
        ((1.0 - Math.asinh(Math.tan(degLatitude * (Math.PI / 180))) / Math.PI) /
            2.0) *
            2.0 ** zoom
    ),
    parseInt(((degLongitude + 180.0) / 360.0) * 2.0 ** zoom),
    parseInt(
        ((1.0 - Math.asinh(Math.tan(degLatDist * (Math.PI / 180))) / Math.PI) /
            2.0) *
            2.0 ** zoom
    ),
    parseInt(((degLongDist + 180.0) / 360.0) * 2.0 ** zoom)

];

const getBeginLastTile = (zoom, degLatitude, degLongitude, degLatDist, degLongDist) => {

  const beginLatDegree = degLatitude - degLatDist;
  const beginLongDegree = degLongitude - degLongDist;

  const lastLatDegree = degLatitude + degLatDist;
  const lastLongDegree = degLongitude + degLongDist;



  const beginLatTile = parseInt(
          ((1.0 - Math.asinh(Math.tan(beginLatDegree * (Math.PI / 180))) / Math.PI) /
              2.0) *
              2.0 ** zoom
      );

  const beginLongTile = parseInt(((beginLongDegree + 180.0) / 360.0) * 2.0 ** zoom);


  const lastLatTile = parseInt(
          ((1.0 - Math.asinh(Math.tan(lastLatDegree * (Math.PI / 180))) / Math.PI) /
              2.0) *
              2.0 ** zoom
      );

  const lastLongTile = parseInt(((lastLongDegree + 180.0) / 360.0) * 2.0 ** zoom);

return [beginLatTile, beginLongTile, lastLatTile, lastLongTile];
};


/**
 * Fonction permettant de convertir des DMS (Degré, Minutes, Secondes) en DD (Degré Decimaux)
 * @param {La latitude à convertir en DD} latitude
 * @param {La longitude à convertir en DD} longitude
 * @returns Les coordonnées DMS converties en DD
 */
const convertToDecimalDegre = (latitude, longitude, latitudeDistance, longitudeDistance) => {
    const decimalDegreLatitude =
        parseInt(latitude.deg) +
        (latitude.min * 60 + parseInt(latitude.sec)) / 3600;
    const decimalDegreLongitude =
        parseInt(longitude.deg) +
        (longitude.min * 60 + parseInt(longitude.sec)) / 3600;

    const decimalDegreLatitudeDistance =
        parseInt(latitudeDistance.deg) +
        (latitudeDistance.min * 60)/3600;

    const decimalDegreLongitudeDistance =
        parseInt(longitudeDistance.deg) +
        (longitudeDistance.min * 60)/3600;


    return {
        decimalDegreLatitude:
            latitude.orientation === "S"
                ? -decimalDegreLatitude
                : decimalDegreLatitude,
        decimalDegreLongitude:
            longitude.orientation === "O"
                ? -decimalDegreLongitude
                : decimalDegreLongitude,
        decimalDegreLatitudeDistance,
        decimalDegreLongitudeDistance

    };
};

/**
 * Créé le tableau contenant les coordonnées de toutes les tiles
 * @param {Les coordonnées de la taille centrale} centerTileCoords
 * @param {Le zoom de la carte} zoom
 * @param {La taille de la carte} size
 * @returns
 */
const generateTileArray = (centerTileCoords, beginLastCoords, zoom, size) => {



    const beginLatTile = beginLastCoords[0];
    const beginLongTile = beginLastCoords[1];

    const lastLatTile = beginLastCoords[2];
    const lastLongTile = beginLastCoords[3];

    const sizeLatitude = beginLatTile - lastLatTile ;
    const sizeLongitude = lastLongTile - beginLongTile ;

    const tileArray = [...Array(sizeLatitude + 1)].map(() => Array(sizeLongitude + 1));

    const latitudeDistance = (sizeLatitude / 2) >> 0;
    const longitudeDistance = (sizeLongitude / 2) >> 0;


    console.log(beginLatTile+ ' ' + beginLongTile);
    console.log(lastLatTile+ ' ' + lastLongTile);

    /*
    const end = (size / 2) >> 0;
    const start = size % 2 !== 0 ? -end : -(end - 1);
    const add = size % 2 !== 0 ? end : Math.abs(start);
    */
    for (let i = beginLongTile; i <= lastLongTile; ++i){
        for (let j = lastLatTile; j <= beginLatTile; ++j){
          console.log((j - lastLatTile) + ' ' + (i - beginLongTile));
            tileArray[j - lastLatTile][i - beginLongTile] = [
                zoom,
                 i,
                 j
            ];
          }
        }
    return tileArray;
};
