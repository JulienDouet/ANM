import "./SeaMap.css";
import React, { useRef } from "react";
import { convertToDecimalDegre } from "../helpers/GenerateMap";
import { deg_to_dms } from "../helpers/GenerateMap";

// Grille
const drawLine = (tableRef, canvasGraticuleRef, mapSettingsData, mapArray) => {
    const context = canvasGraticuleRef.current.getContext("2d");
    const canvasGraticule = canvasGraticuleRef.current;

    const latitude = mapSettingsData.latitude;
    const longitude = mapSettingsData.longitude;

    const latitudeDistance = mapSettingsData.latitudeDistance;
    const longitudeDistance = mapSettingsData.longitudeDistance;

    const zoom = mapSettingsData.zoom;

    const longitudeString =
        longitude.deg +
        "° " +
        longitude.min +
        "' " +
        longitude.sec +
        '" ' +
        longitude.orientation;

    const {
        decimalDegreLatitude,
        decimalDegreLongitude,
        decimalDegreLatitudeDistance,
        decimalDegreLongitudeDistance
    } = convertToDecimalDegre(
        latitude,
        longitude,
        latitudeDistance,
        longitudeDistance
    );

    const diffDegLongitude =
        decimalDegreLongitude - decimalDegreLongitudeDistance;
    const diffDegLatitude = decimalDegreLatitude + decimalDegreLatitudeDistance;

    canvasGraticule.height = mapArray.length * 256;
    canvasGraticule.width = mapArray[0].length * 256;

    var height = mapArray.length * 256;
    var width = mapArray[0].length * 256;

    var longitudeDegDepart = diffDegLongitude;
    for (var i = 0; i < width; i += width / 2 / 6) {
        context.moveTo(i, 0);
        context.lineTo(i, height);
        context.stroke();
        context.font = "15px Arial";
        context.fillText(deg_to_dms(longitudeDegDepart, true), i, 20);
        longitudeDegDepart += decimalDegreLongitudeDistance / 6;
    }

    var latitudeDegDepart = diffDegLatitude;
    for (var i = 0; i < height; i += height / 2 / 6) {
        context.moveTo(0, i);
        context.lineTo(width, i);
        context.stroke();
        context.font = "15px Arial";
        context.fillText(deg_to_dms(latitudeDegDepart, false), 10, i);
        latitudeDegDepart -= decimalDegreLatitudeDistance / 6;
    }
};

export const SeaMap = (props) => {
    const { mapArray, mapSettingsData, isStoredMap, storedMapName } = props;

    //Ref
    const tableRef = useRef(null);
    const canvasGraticuleRef = useRef(null);

    return (
        <div>
            <table
                id="map"
                ref={tableRef}
                className="mt-5"
                cellSpacing="0"
                cellPadding="0"
                style={{ border: "none" }}
            >
                <tbody>
                    {mapArray.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => {
                                    if (
                                        cellIndex === row.length - 1 &&
                                        rowIndex === mapArray.length - 1
                                    ) {
                                        drawLine(
                                            tableRef,
                                            canvasGraticuleRef,
                                            mapSettingsData,
                                            mapArray
                                        );
                                    }
                                    return (
                                        <td
                                            className="mapArrayCell"
                                            key={cellIndex}
                                        >
                                            <img
                                                alt=""
                                                src={
                                                    isStoredMap
                                                        ? `../../../cartes/${storedMapName}/openstreetmap/${cell[0]}_${cell[1]}.png`
                                                        : `https://a.tile.openstreetmap.fr/osmfr/${cell[0]}/${cell[1]}/${cell[2]}.png`
                                                }
                                            />
                                            <img
                                                alt=""
                                                className="overlayed"
                                                src={
                                                    isStoredMap
                                                        ? `../../../cartes/${storedMapName}/openseamap/${cell[0]}_${cell[1]}.png`
                                                        : `https://tiles.openseamap.org/seamark/${cell[0]}/${cell[1]}/${cell[2]}.png`
                                                }
                                            />
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <canvas
                ref={canvasGraticuleRef}
                className="canvas-style-gaticule mt-5"
            ></canvas>
        </div>
    );
};
