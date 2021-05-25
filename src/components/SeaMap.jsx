import "./SeaMap.css";
import React, { useRef } from "react";
<<<<<<< HEAD
import ScrollContainer from "react-indiana-drag-scroll";
import { convertToDecimalDegre } from "../helpers/GenerateMap";
import { deg_to_dms } from "../helpers/GenerateMap";

=======
>>>>>>> 0a0355573983742a38f79b7ea602a0f235fcdc2f

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
const drawLine = (tableRef, canvasGraticuleRef, mapSettingsData) => {
    const context = canvasGraticuleRef.current.getContext("2d");
    const canvasGraticule = canvasGraticuleRef.current;

    const latitude = mapSettingsData.latitude;
    const longitude = mapSettingsData.longitude;

    const latitudeDistance = mapSettingsData.latitudeDistance;
    const longitudeDistance = mapSettingsData.longitudeDistance;

    const zoom = mapSettingsData.zoom;

    const longitudeString = longitude.deg + '° ' + longitude.min + '\' ' + longitude.sec + '" ' + longitude.orientation ;


    const {decimalDegreLatitude, decimalDegreLongitude, decimalDegreLatitudeDistance, decimalDegreLongitudeDistance} =  convertToDecimalDegre(latitude, longitude,latitudeDistance, longitudeDistance);


    const diffDegLongitude = decimalDegreLongitude - decimalDegreLongitudeDistance;
    const diffDegLatitude = decimalDegreLatitude + decimalDegreLatitudeDistance;


    canvasGraticule.height = tableRef.current.offsetHeight;
    canvasGraticule.width = tableRef.current.offsetWidth;

    const size =
        canvasGraticule.height > canvasGraticule.width
            ? canvasGraticule.width
            : canvasGraticule.height;
    console.log(tableRef.current.offsetHeight);
    console.log(tableRef.current.offsetWidth);
    console.log(size);
    var height = tableRef.current.offsetHeight;
    var width = tableRef.current.offsetWidth;
  /*  context.moveTo(size / 2, 0);
    context.lineTo(size / 2, 1536);
    context.stroke();
    context.font = "15px Arial";
    */
  //  context.fillText(longitudeString, size / 2, 20);

    var longitudeDegDepart = diffDegLongitude;
    for (var i = 0; i < width; i += width / 2 / 6) {
        context.moveTo(i, 0);
        context.lineTo(i, height);
        context.stroke();
        context.font = "15px Arial";
        context.fillText(deg_to_dms(longitudeDegDepart,true),i, 20);
        longitudeDegDepart += (decimalDegreLongitudeDistance/6);
    }

   var latitudeDegDepart = diffDegLatitude;
   for (var i = 0; i < height; i += height / 2 / 6 ) {
      context.moveTo(0, i);
      context.lineTo(width, i);
      context.stroke();
      context.font = "15px Arial";
      context.fillText(deg_to_dms(latitudeDegDepart,false),10, i);
      latitudeDegDepart -= (decimalDegreLatitudeDistance/6);
     }
};

export const SeaMap = (props) => {
    const { mapArray, mapSettingsData, canvasGraticuleRef } = props;

    //Ref
    const tableRef = useRef(null);

    return (
<<<<<<< HEAD
        <div className="pt-5">
=======
        <>
>>>>>>> 0a0355573983742a38f79b7ea602a0f235fcdc2f
            <canvas
                ref={canvasGraticuleRef}
                className="canvas-style-gaticule mt-5"
            ></canvas>
            <table
                id="map"
                ref={tableRef}
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
                                        >
                                            <img
                                                alt=""
                                                onLoad={() => {
                                                    if (
                                                        cellIndex ==
                                                            row.length - 1 &&
                                                        rowIndex ==
                                                            mapArray.length - 1
                                                    )
                                                        drawLine(
                                                            tableRef,
                                                            canvasGraticuleRef,
                                                            mapSettingsData
                                                        );
                                                }}
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
