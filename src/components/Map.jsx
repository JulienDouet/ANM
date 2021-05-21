import "./Map.css";
import React, { useEffect, useRef } from 'react';

// Grille
const drawLine = (canvasGraticuleRef) => {
    const context = canvasGraticuleRef.current.getContext("2d");
    const canvasGraticule = canvasGraticuleRef.current;

    for (var i = 0; i < canvasGraticule.width; i += 450) {
        context.moveTo(i, 0);
        context.lineTo(i, canvasGraticule.height);
        context.stroke();
    }

    for (var i = 0; i < canvasGraticule.height; i += 450) {
        context.moveTo(0, i);
        context.lineTo(canvasGraticule.width, i);
        context.stroke();
    }
};

export const Map = (props) => {
    const { mapArray } = props;

    const canvasGraticuleRef = useRef(null);

    useEffect(() => {
        drawLine(canvasGraticuleRef);
    }, [])

    return (
        <div className="pt-5">
            <canvas
                ref={canvasGraticuleRef}
                className="canvas-style-gaticule mt-5"
                height="900"
                width="1500"
            ></canvas>
            <table cellSpacing="0" cellPadding="0" style={{ border: "none" }}>
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
                                        >
                                            <img
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
        </div>
    );
};
