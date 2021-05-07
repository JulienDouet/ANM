$(() => {
    const map = $("#map");
    const validateCoordinates = $("#validateCoordinates");

    // tooltip initializer
    $("body").tooltip({ selector: "[data-toggle=tooltip]" });

    // utils
    const getCenterTile = (zoom, degLatitude, degLongitude) => [
        parseInt(((degLongitude + 180.0) / 360.0) * 2.0 ** zoom),
        parseInt(
            ((1.0 -
                Math.asinh(Math.tan(degLatitude * (Math.PI / 180))) / Math.PI) /
                2.0) *
                2.0 ** zoom
        )
    ];

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

    const resetMap = () => map.html("");

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
            zoom: parseInt($("#zoom")[0].value),
            size: parseInt($("#size")[0].value)
        };
    };

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

    validateCoordinates.click(() => {
        const mapData = gatherFormParams();
        const formattedMapData = formatMapData(mapData);
        renderMap(formattedMapData);
    });
});
