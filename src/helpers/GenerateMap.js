import { degToRadian } from "./helpers.js";
export const generateMapArray = (data) => {
    const { latitude, longitude, latitudeDistance, longitudeDistance, zoom } = data;


    const { decimalDegreLatitude, decimalDegreLongitude, decimalDegreLatitudeDistance, decimalDegreLongitudeDistance } =
        convertToDecimalDegre(latitude, longitude,latitudeDistance, longitudeDistance);

    const beginLastCoords = getBeginLastTile(
        zoom,
        decimalDegreLatitude,
        decimalDegreLongitude,
        decimalDegreLatitudeDistance,
        decimalDegreLongitudeDistance
    );
    
    return generateTileArray(beginLastCoords, zoom);
};

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
export const convertToDecimalDegre = (latitude, longitude, latitudeDistance, longitudeDistance) => {
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
 * @param {Le zoom de la carte} zoom
 * @returns
 */
const generateTileArray = (beginLastCoords, zoom) => {



    const beginLatTile = beginLastCoords[0];
    const beginLongTile = beginLastCoords[1];

    const lastLatTile = beginLastCoords[2];
    const lastLongTile = beginLastCoords[3];

    const sizeLatitude = beginLatTile - lastLatTile ;
    const sizeLongitude = lastLongTile - beginLongTile ;

    const tileArray = [...Array(sizeLatitude + 1)].map(() => Array(sizeLongitude + 1));

    for (let i = beginLongTile; i <= lastLongTile; ++i){
        for (let j = lastLatTile; j <= beginLatTile; ++j){
            tileArray[j - lastLatTile][i - beginLongTile] = [
                zoom,
                 i,
                 j
            ];
          }
        }
    return tileArray;
};


export function degToDms (dd, isLng) {
  const dir = dd < 0
     ? isLng ? 'O' : 'S'
     : isLng ? 'E' : 'N';

   const absDd = Math.abs(dd);
   const deg = absDd | 0;
   const frac = absDd - deg;
   const min = (frac * 60) | 0;
   const sec =  Math.round((frac * 3600 - min * 60)* 100) / 100;
   return deg + "°" + min + "'" + sec + '"' + dir;
}

export function deg_to_dms_array (dd, isLng) {
  var dir = dd < 0
     ? isLng ? 'O' : 'S'
     : isLng ? 'E' : 'N';

   var absDd = Math.abs(dd);
   var deg = absDd | 0;
   var frac = absDd - deg;
   var min = (frac * 60) | 0;
   var sec = frac * 3600 - min * 60;
   // Round it to 2 decimal points.
   sec = Math.round(sec * 100) / 100;
   return [deg, min, sec, dir];
}


export function getDistanceFromLatLonInMiles(lat1,lon1,lat2,lon2) {
  /*var R = 6371; // Radius of the earth in km
  var dLat = degToRadian(lat2-lat1);  // deg2rad below
  var dLon = degToRadian(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(degToRadian(lat1)) * Math.cos(degToRadian(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
*/



  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c; // in metres
  return d * 0.000621371 // en miles;
}
