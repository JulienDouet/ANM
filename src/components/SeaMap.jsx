import "./SeaMap.css";
import React, { useRef } from "react";
import { convertToDecimalDegre } from "../helpers/GenerateMap";

// Grille
const drawLine = (tableRef, canvasGraticuleRef, mapSettingsData, mapArray) => {
    const context = canvasGraticuleRef.current.getContext("2d");
    const canvasGraticule = canvasGraticuleRef.current;

    const latitude = mapSettingsData.latitude;
    const longitude = mapSettingsData.longitude;

    const latitudeDistance = mapSettingsData.latitudeDistance;
    const longitudeDistance = mapSettingsData.longitudeDistance;
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

    canvasGraticule.height = mapArray.length * 256;
    canvasGraticule.width = mapArray[0].length * 256;

    var height = mapArray.length * 256;
    var width = mapArray[0].length * 256;

    context.setLineDash([15, 5]);

    var coordCentX = width / 2;
    var coordCentY = height / 2;

    var coordEstX = width;

    var coordOuestX = 0;

    var coordNordY = 0;

    var coordSudY = height;

    for (
        var i = coordCentX;
        i <= coordEstX;
        i += (coordEstX - coordCentX) / 6
    ) {
        context.moveTo(i, 0);
        context.lineTo(i, height);
        context.stroke();
    }

    for (
        var i = coordOuestX;
        i <= coordCentX;
        i += (coordEstX - coordCentX) / 6
    ) {
        context.moveTo(i, 0);
        context.lineTo(i, height);
        context.stroke();
    }
    for (
        var i = coordCentY;
        i <= coordSudY;
        i += (coordSudY - coordCentY) / 6
    ) {
        context.moveTo(0, i);
        context.lineTo(width, i);
        context.stroke();
    }

    for (
        var i = coordNordY;
        i <= coordCentY;
        i += (coordSudY - coordCentY) / 6
    ) {
        context.moveTo(0, i);
        context.lineTo(width, i);
        context.stroke();
    }
};

export const SeaMap = (props) => {
    const { mapArray, mapSettingsData } = props;

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
                                                src={`https://a.tile.openstreetmap.fr/osmfr/${cell[0]}/${cell[1]}/${cell[2]}.png`}
                                            />
                                            <img
                                                alt=""
                                                className="overlayed"
                                                src={`https://tiles.openseamap.org/seamark/${cell[0]}/${cell[1]}/${cell[2]}.png`}
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
