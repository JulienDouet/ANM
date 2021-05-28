import "./Route.css";
import React, { useRef, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {getDistanceFromLatLonInMiles} from "../helpers/GenerateMap.js"
import { deg_to_dms_array } from "../helpers/GenerateMap";
import { deg_to_dms } from "../helpers/GenerateMap";

import { convertToDecimalDegre } from "../helpers/GenerateMap";
var arrayPoints = [] ;
var nbrPoints = 0 ;

var arrayDefLigne = ['Route Fond', 'Courant', 'Route Surface', 'Cap Vrai', 'Cap Compas']

var distanceMilesRf = 0;
var degreeRf = 0;
var distancePixelsRf = 0;
var distancePixelsReference = 0;
var distanceMilesReference = 0;
export const Route = (props) => {

  const { mapArray, route ,mapSettingsData } = props;


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);


  // Courant
  const [distanceParcourirVal, setDistanceParcourirVal] = useState("0");
  const [capVal, setCapVal] = useState("0");
  const [angleVal, setAngleVal] = useState("0");
  const [noeudVal, setNoeudVal] = useState("0");
  const [vitesseFondVal, setVitesseFondVal] = useState("0");
  const [deriveVal, setDeriveVal] = useState("0");
  const [declinaisonVal, setDeclinaisonVal] = useState("0");
  const [deviationVal, setDeviationVal] = useState("0");
  const [routeArray, setRouteArray] = useState([]);

  const drawPoint = (x, y, color, tmpTrajet) => {
      const context = routeCanvasRef.current.getContext("2d");
      context.fillStyle = color || "black";
      context.beginPath();
      context.arc(x, y, 5, 0, 2 * Math.PI, true);
      context.fill();
      context.fillText('Temps de trajet (en minutes) : '+Math.round(tmpTrajet),x+5,y+5);
      context.stroke();
  };

  const pixelsToDegDecimal = (x,y,xtab,ytab) => {

    //const xtab = mapArray[0].length*256;
    //const ytab = mapArray.length*256;

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

    const xCent = xtab/2;
    const yCent = ytab/2;

    const x2 = decimalDegreLongitude+decimalDegreLongitudeDistance;
    const x1 = decimalDegreLongitude-decimalDegreLongitudeDistance;

    const y2 = decimalDegreLatitude-decimalDegreLatitudeDistance;
    const y1 = decimalDegreLatitude+decimalDegreLongitudeDistance;
    const resX = ((x/xtab)*(x2-x1) + x1);
    const resY = ((y/ytab)*(y2-y1) + y1);


    console.log(deg_to_dms(resX,true), ' ', deg_to_dms(resY,false));
    return [resX,resY];

  };


  const routeCanvasRef = useRef(null);

  useEffect(() => {
      if (mapArray.length) {
          const routeCanvas = routeCanvasRef.current;

          routeCanvas.height = mapArray.length * 256;
          routeCanvas.width = mapArray[0].length * 256;
      }
  }, [mapArray]);

  const setRoute = (event) => {
      const rect = routeCanvasRef.current.getBoundingClientRect();
      const context = routeCanvasRef.current.getContext("2d");
      context.font='15px Serif';
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;

      arrayPoints.push([x,y]);
      const xtab = mapArray[0].length*256;
      const ytab =  mapArray.length*256;
      drawPoint(x,y,'yellow',0);

      let l1degDec = pixelsToDegDecimal(x,y,xtab,ytab);
      let l2degDec = pixelsToDegDecimal(x+1,y+1,xtab,ytab);

      let long1 = l1degDec[0];
      let lat1 = l1degDec[1];

      let long2 = l2degDec[0];
      let lat2 = l2degDec[1];

      distancePixelsReference = distanceTwoPoints(x,y,x+1,y+1);
      distanceMilesReference =getDistanceFromLatLonInMiles(lat1,long1,lat2,long1);
      console.log(distancePixelsReference);
      console.log(distanceMilesReference);
      let arrayCoordMilesReference = calcLineAngle(x,y,distanceMilesReference,90);
      let xref = arrayCoordMilesReference[0];
      let yref = arrayCoordMilesReference[1];

      //let arrayP = [(distanceParcourirVal*xref)/distanceMilesReference,(distanceParcourirVal*yref)/distanceMilesReference]

      //let arrayP = drawLineAngle(x,y,distanceMilesRf+distanceParcourirVal,degreDestVal,context,'blue',1);
      //arrayPoints.push([arrayP[0],arrayP[1]]);





      setShow(true);





  };

  const calcLineAngle = (x,y,long,angle) => {

    let x2 = x+long * Math.cos((Math.PI * (angle-90)) / 180) ;
    let y2 = y+long * Math.sin((Math.PI * (angle-90)) / 180);

    return [x2,y2];

  };
  const drawLineAngle = (x,y,long,angle,longMiles,context,couleur,epaisseurTrait, def) => {
    context.beginPath();
    context.strokeStyle = couleur;
    context.lineWidth = epaisseurTrait;

    context.moveTo(x,y);
    let x2 = x+long * Math.cos((Math.PI * (angle-90)) / 180) ;
    let y2 = y+long * Math.sin((Math.PI * (angle-90)) / 180);
    context.lineTo(x2,y2);
    context.stroke();
    context.fillStyle = couleur;
    let milieu = milieuTwoPoints(x,y,x2,y2);
    context.fillText(def+' - '+'Angle (en Degré) : '+roundDecimal(angle,1)+ ' \n Distance (en Miles) : '+roundDecimal(longMiles,2),milieu[0],milieu[1]);


    return [x2,y2];

  };

  const distanceTwoPoints = (x1,y1,x2,y2) => {
    return Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));

  }
  const drawLine = (x1,y1,x2,y2, context,couleur, angle, long, def) => {
    context.beginPath();
    context.strokeStyle = couleur;
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
    context.fillStyle = couleur;
    let milieu = milieuTwoPoints(x1,y1,x2,y2);

    context.fillText(def+' - '+'Angle (en Degré) : '+roundDecimal(angle,1)+ ' \n Distance (en Miles) : '+roundDecimal(long,2),milieu[0],milieu[1]);
  }

  const milieuTwoPoints = (x1,y1,x2,y2) => {
    return [(x1+x2)/2, (y1+y2)/2];
  }

  function roundDecimal(nombre, precision){
    var precision = precision || 2;
    var tmp = Math.pow(10, precision);
    return Math.round( nombre*tmp )/tmp;
 }
  //const context = routeCanvasRef.current.getContext("2d");
  const handleOnSubmit = (event) => {
    const context = routeCanvasRef.current.getContext("2d");

    let x1 = arrayPoints[0][0];
    let y1 = arrayPoints[0][1];


    distancePixelsRf = (distancePixelsReference * distanceParcourirVal) / distanceMilesReference;
    distanceMilesRf = distanceParcourirVal;

    let arrayP2 = drawLineAngle(x1,y1,distancePixelsRf,capVal,distanceMilesRf,context,'blue',1,arrayDefLigne[0]);
    let x2 = arrayP2[0];
    let y2 = arrayP2[1];
    let noeudCourant = (noeudVal*distancePixelsRf)/distanceMilesRf;
    let arrayCoord = drawLineAngle(x1,y1,noeudCourant,angleVal,noeudCourant,context,'red',1,arrayDefLigne[1]);

    let x3 = arrayCoord[0];
    let y3 = arrayCoord[1];

    let degreeRS = (Math.atan2(y2 - y3, x2 - x3) * 180 / Math.PI)+90;
    let distanceRSPixels = distanceTwoPoints(x3,y3,x2,y2);
    let distanceRSMiles = (distanceRSPixels*distanceMilesRf)/distancePixelsRf;
    console.log(distanceRSMiles);
    drawLine(x3,y3,x2,y2,context,'green',degreeRS,distanceRSMiles,arrayDefLigne[2]);

    console.log('Distance RS (en Miles): '+distanceRSMiles)
    console.log('Angle RS (en Degrés): '+degreeRS);

    let degreeCapVrai = degreeRS - deriveVal;
    console.log('Angle Cap Vrai (en Degrés): '+degreeCapVrai);
    console.log('Distance Cap Vrai (en Miles): '+distanceRSMiles)
    drawLineAngle(x3,y3,distanceRSPixels,degreeCapVrai,distanceRSMiles,context,'brown',1,arrayDefLigne[3]);

    let degreeCapCompas = degreeCapVrai - declinaisonVal - deviationVal;
    let arrayCoordCapCompas = drawLineAngle(x3,y3,distanceRSPixels,degreeCapCompas,distanceRSMiles,context,'purple',5,arrayDefLigne[4]);
    let x4 = arrayCoordCapCompas[0];
    let y4 = arrayCoordCapCompas[1];

    console.log('Angle Cap Compas (en Degrés): '+degreeCapCompas);
    console.log('Distance Cap Compas (en Miles): '+distanceRSMiles);

    let dureeTrajet = (distanceRSMiles * 60) / vitesseFondVal;
    console.log('Durée du trajet (en minutes) : ' + dureeTrajet);
    drawPoint(x4,y4,'purple',dureeTrajet);

    arrayPoints = [];
    handleClose();

  };
  return (
    <>
    <div id="idRoute">
    <canvas
        id="canvas"
        ref={routeCanvasRef}
        className="canvas-style mt-5"
        onClick={(e) => !!route && setRoute(e)}
    ></canvas>


    <Modal show={show} onHide={handleClose} size="sm" centered>
        <Modal.Header>
            <Modal.Title>Tracer route</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="distanceParcourir">Distance à parcourir</Form.Label>
          <Form.Control
              className="mb-2 mr-sm-2"
              id="distanceParcourir"
              value={distanceParcourirVal}
              onChange={(e) => setDistanceParcourirVal(e.target.value)}
              type="number"
              placeholder="DistanceParcourir"
          />
        <Form.Label htmlFor="cap">Cap</Form.Label>
          <Form.Control
              className="mb-2 mr-sm-2"
              id="cap"
              value={capVal}
              onChange={(e) => setCapVal(e.target.value)}
              type="number"
              placeholder="Cap"
          />
          <Form.Label htmlFor="vitesseFond">Vitesse de Fond</Form.Label>
          <Form.Control
              className="mb-2 mr-sm-2"
              id="vitesseFond"
              value={vitesseFondVal}
              onChange={(e) => setVitesseFondVal(e.target.value)}
              type="number"
              placeholder="VitesseFond"
          />
            <Form.Label htmlFor="angle">Angle</Form.Label>
            <Form.Control
                className="mb-2 mr-sm-2"
                id="angle"
                value={angleVal}
                onChange={(e) => setAngleVal(e.target.value)}
                type="number"
                placeholder="Angle"
            />
          <Form.Label htmlFor="noeud">Noeud</Form.Label>
            <Form.Control
                className="mb-2 mr-sm-2"
                id="noeud"
                value={noeudVal}
                onChange={(e) => setNoeudVal(e.target.value)}
                type="number"
                placeholder="Noeud"
            />
          <Form.Label htmlFor="derive">Dérive</Form.Label>
            <Form.Control
                className="mb-2 mr-sm-2"
                id="derive"
                value={deriveVal}
                onChange={(e) => setDeriveVal(e.target.value)}
                type="number"
                placeholder="Dérive"
            />
          <Form.Label htmlFor="declinaison">Déclinaison</Form.Label>
            <Form.Control
                className="mb-2 mr-sm-2"
                id="declinaison"
                value={declinaisonVal}
                onChange={(e) => setDeclinaisonVal(e.target.value)}
                type="number"
                placeholder="Déclinaison"
            />
          <Form.Label htmlFor="deviation">Déviation</Form.Label>
            <Form.Control
                className="mb-2 mr-sm-2"
                id="deviation"
                value={deviationVal}
                onChange={(e) => setDeviationVal(e.target.value)}
                type="number"
                placeholder="Déviation"
            />


        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Annuler
            </Button>
            <Button variant="primary" onClick={handleOnSubmit}>
                Valider le marquage
            </Button>
        </Modal.Footer>
    </Modal>

  </div>
    </>

  )
}
