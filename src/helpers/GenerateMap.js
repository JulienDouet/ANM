export const generateMapArray = (data) => {
    const { latitude, longitude, zoom, size } = data;

    const { decimalDegreLatitude, decimalDegreLongitude } =
        convertToDecimalDegre(latitude, longitude);

    const centerTileCoords = getCenterTile(
        zoom,
        decimalDegreLatitude,
        decimalDegreLongitude
    );

    return generateTileArray(centerTileCoords, zoom, size);
};

/**
 * Fonction permettant de convertir des degrés en numéro de la Tile centrale pour préparer
 * les appels à l'API OpenStreetMap et OpenSeaMap
 * @param {Le zoom que l'on veut appliquer à la carte} zoom
 * @param {Le degré de latitude} degLatitude
 * @param {Le degré de longitude} degLongitude
 * @returns Un tableau avec les 2 paramètres nécessaires aux appels l'API OpenStreetMap et OpenSeaMap
 */
const getCenterTile = (zoom, degLatitude, degLongitude) => [
    parseInt(((degLongitude + 180.0) / 360.0) * 2.0 ** zoom),
    parseInt(
        ((1.0 - Math.asinh(Math.tan(degLatitude * (Math.PI / 180))) / Math.PI) /
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

/**
 * Créé le tableau contenant les coordonnées de toutes les tiles
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
