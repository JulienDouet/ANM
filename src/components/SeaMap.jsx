import "./SeaMap.css";
import React, { useRef, useEffect } from 'react'

// Récupérer coordonnées clique
const drawLine = (tableRef, canvasGraticuleRef) => {
    const context = canvasGraticuleRef.current.getContext('2d');
    const canvasGraticule = canvasGraticuleRef.current;

    canvasGraticule.height = tableRef.current.offsetHeight;
    canvasGraticule.width = tableRef.current.offsetWidth;
    console.log(tableRef.current.offsetHeight);
    console.log(document.getElementById("map").offsetHeight);

    for (var i = 0; i < canvasGraticule.width; i += 150) {
        context.moveTo(i, 0);
        context.lineTo(i, canvasGraticule.height);
        context.stroke();
    }
}

export const SeaMap = (props) => {
    const { mapArray } = props;

    //Ref
    const canvasGraticuleRef = useRef(null);
    const tableRef = useRef(null);



    const log = () => { console.log(tableRef.current.offsetHeight); }

    useEffect(() => {
        drawLine(tableRef, canvasGraticuleRef);
    });

    return (
        <div>
            <canvas ref={canvasGraticuleRef} className="canvas-style-gaticule mt-5"></canvas>
            <table id="map" ref={tableRef} cellSpacing="0" cellPadding="0" style={{ border: "none" }}>
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
            <button onClick={log}>Oui</button>
        </div >
    );
};
