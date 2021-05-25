import "./SeaMap.css";
import React, { useRef } from "react";

// Récupérer coordonnées clique
/*const drawLine = (tableRef, canvasGraticuleRef, scrollContainerRef) => {
    const context = canvasGraticuleRef.current.getContext("2d");
    const canvasGraticule = canvasGraticuleRef.current;
    const scrollContainer = scrollContainerRef.current;

    canvasGraticule.height = tableRef.current.offsetHeight;
    canvasGraticule.width = tableRef.current.offsetWidth;
    scrollContainer.height = tableRef.current.offsetHeight;
    scrollContainer.width = tableRef.current.offsetWidth;

    for (var i = 0; i < canvasGraticule.width; i += 150) {
        context.moveTo(i, 0);
        context.lineTo(i, canvasGraticule.height);
        context.stroke();
    }
};*/

// Grille
const drawLine = (tableRef, canvasGraticuleRef) => {
    const context = canvasGraticuleRef.current.getContext("2d");
    const canvasGraticule = canvasGraticuleRef.current;

    canvasGraticule.height = tableRef.current.offsetHeight;
    canvasGraticule.width = tableRef.current.offsetWidth;

    const size =
        canvasGraticule.height > canvasGraticule.width
            ? canvasGraticule.width
            : canvasGraticule.height;

    context.moveTo(size / 2, 0);
    context.lineTo(size / 2, 1536);
    context.stroke();
    context.font = "15px Arial";
    context.fillText("43° 20' 00''", size / 2, 20);

    for (var i = 0; i < canvasGraticule.width; i += size / 2 / 5) {
        context.moveTo(i, 0);
        context.lineTo(i, canvasGraticule.height);
        context.stroke();
    }

    // for (var i = 0; i < canvasGraticule.height; i += 450) {
    //     context.moveTo(0, i);
    //     context.lineTo(canvasGraticule.width, i);
    //     context.stroke();
    // }
};

export const SeaMap = (props) => {
    const { mapArray, mapSettingsData, resizeAmerCanvas } = props;

    //Ref
    const tableRef = useRef(null);
    const canvasGraticuleRef = useRef(null);

    return (
        <>
            <canvas
                ref={canvasGraticuleRef}
                className="canvas-style-gaticule mt-5"
            ></canvas>
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
                                    return (
                                        <td
                                            key={cellIndex}
                                            style={{
                                                backgroundImage: `url(https://a.tile.openstreetmap.fr/osmfr/${cell[0]}/${cell[1]}/${cell[2]}.png)`
                                            }}
                                            onLoad={() => {
                                                if (
                                                    cellIndex ==
                                                        row.length - 1 &&
                                                    rowIndex ==
                                                        mapArray.length - 1
                                                ) {
                                                    drawLine(
                                                        tableRef,
                                                        canvasGraticuleRef
                                                    );
                                                    resizeAmerCanvas(tableRef);
                                                }
                                            }}
                                        >
                                            <img
                                                alt=""
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
        </>
    );
};
