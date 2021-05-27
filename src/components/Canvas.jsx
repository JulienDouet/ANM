import "./Canvas.css";
import React, { useRef, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import image from "../regle-cras.png";
import { degToRadian } from "../helpers/helpers";
import { convertToDecimalDegre } from "../helpers/GenerateMap";
import { deg_to_dms } from "../helpers/GenerateMap";
// Valeur pour prendre le nord en référence comme 0°
const DEFAULT_ANGLE = 90;
const CALIBRAGE_ZERO_ROUGE = -0.0845;
const CALIBRAGE_ZERO_NOIR = -0.9155;
var nbrTrait = 0;
var tabPoints = [];

class Point {
           constructor(x, y) {
               this._x = x;
               this._y = y;
           }

           get x() { return this._x; }
           get y() { return this._y; }

           getCoef(pt2) {
               return (pt2.y - this._y) / (pt2.x - this._x);
           }

           getMedian(pt1, pt2) {
               let x = (pt1.x + pt2.x) / 2;
               let y = (pt1.y + pt2.y) / 2;

               return new Line(this, new Point(x, y));
           }
       }

       class Line {
           constructor(pt1, pt2) {
               this._coef = pt1.getCoef(pt2);
               this._origin = pt1.y - (this._coef * pt1.x);
           }

           get coef() { return this._coef; }
           get origin() { return this._origin; }

           getValue(x) {
               return this._coef * x + this._origin;
           }

           getIntersection(line) {
               let x = Math.abs((line.origin - this._origin) / (line.coef - this._coef));
               let y = this._coef * x + this._origin;
               return new Point(x, y);
           }
       }

export const Canvas = (props) => {
    const { mapArray, amer ,mapSettingsData } = props;
        //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    // Angle et Longueur
    const [angleVal, setAngleVal] = useState("0");
    const [longueurVal, setLongueurVal] = useState("200");

    // Déviation et Déclinaison
    const [deviation, setDeviation] = useState("0");
    const [declinaison, setDeclinaison] = useState("0");

    // Donnée pour tracer le trait
    const [drawLineData, setDrawLineData] = useState({
        x1: 0,
        y1: 0,
        r: 0,
        angle: 0 - DEFAULT_ANGLE
    });

    const amerCanvasRef = useRef(null);
    useEffect(() => {
        if (mapArray.length) {
            const amerCanvas = amerCanvasRef.current;

            amerCanvas.height = mapArray.length * 256;
            amerCanvas.width = mapArray[0].length * 256;
        }
    }, [mapArray]);

    // Récupérer coordonnées clique
    /**
     *
     */
    const drawLine = () => {
        const context = amerCanvasRef.current.getContext("2d");
        context.lineWidth = 5;
        context.moveTo(drawLineData.x1, drawLineData.y1);
        tabPoints.push(new Point(drawLineData.x1,drawLineData.y1));

        context.lineTo(
            drawLineData.x1 +
                drawLineData.r * Math.cos((Math.PI * drawLineData.angle) / 180),
            drawLineData.y1 +
                drawLineData.r * Math.sin((Math.PI * drawLineData.angle) / 180)
        );
        tabPoints.push(new Point(drawLineData.x1 +drawLineData.r * Math.cos((Math.PI * drawLineData.angle) / 180),drawLineData.y1 +
            drawLineData.r * Math.sin((Math.PI * drawLineData.angle) / 180)));

        context.stroke();
    };

    const drawPoint = (x, y, color) => {
        const context = amerCanvasRef.current.getContext("2d");
        context.fillStyle = color || "black";
        context.beginPath();
        context.arc(x, y, 5, 0, 2 * Math.PI, true);
        context.fill();
    };

    /**
     *
     */
    // Règle de cras
    // Pour obtenir le milieu de la règle : -(regle.width / 2)
    // Pour obtenir le point 0 du rapporteur (rouge) : CALIBRAGE_ZERO_ROUGE * regle.height
    // Pour obtenir le point 0 du rapporteur (noir) : CALIBRAGE_ZERO_NOIR * regle.height
    const drawAndPlaceCRA = () => {
        // var regle = document.createElement('img');
        var regle = new Image();
        regle.src = image;
        regle.alt = "alt text";

        const context = amerCanvasRef.current.getContext("2d");

        regle.onload = function () {
            context.save();
            context.translate(drawLineData.x1, drawLineData.y1);
            context.rotate(degToRadian(angleVal - DEFAULT_ANGLE));

            if (angleVal >= 180) {
                context.drawImage(regle, -(regle.width / 2), 0);
            } else {
                context.drawImage(regle, -(regle.width / 2), 0);

            }

            context.restore();
        };

        const x1 = drawLineData.x1;
        const y1 = drawLineData.y1 - CALIBRAGE_ZERO_NOIR* regle.height;
        //clearCRA(x1,y1);
        context.clearRect(0,0,amerCanvasRef.current.width,amerCanvasRef.current.height);

      /*  context.moveTo(0,y1);
        context.lineTo(mapArray[0].length*256,y1);

        */context.stroke();
        nbrTrait ++;

        if (nbrTrait >= 3 ){

            trouverMilieu();
        }
    };


  const trouverMilieu = () => {

    let pt1 = tabPoints[0];
    let pt2 = tabPoints[1];

    let pt3 = tabPoints[2];
    let pt4 = tabPoints[3];

    let pt5 = tabPoints[4];
    let pt6 = tabPoints[5];

    let line1 = new Line(pt1, pt2);
    let line2 = new Line(pt3, pt4);
    let line3 = new Line(pt5, pt6);
    // get intersection
    let pt_intersection1 = line1.getIntersection(line2);
    let pt_intersection2 = line1.getIntersection(line3);
    let pt_intersection3 = line2.getIntersection(line3);

    let line_median1 = pt_intersection1.getMedian(pt_intersection2, pt_intersection3);
    let line_median2 = pt_intersection2.getMedian(pt_intersection1, pt_intersection3);
    let line_median3 = pt_intersection3.getMedian(pt_intersection1, pt_intersection2);


    // middle
   let middle1 = line_median1.getIntersection(line_median2);
   console.log(`middle : x=${middle1.x}, y=${middle1.y}`);
   let middle2 = line_median1.getIntersection(line_median3);
   let middle3 = line_median2.getIntersection(line_median3);

   drawPoint(middle1.x,middle1.y,'red');

   const xtab = mapArray[0].length*256;
   const ytab =  mapArray.length*256;

   console.log(temp(middle1.x,middle1.y,xtab,ytab));
  };

    /**
     *
     * @param {L'évènement} event
     */
    const setCoordinates = (event) => {
        setShow(true);
        const rect = amerCanvasRef.current.getBoundingClientRect();
        setDrawLineData({
            ...drawLineData,
            x1: event.clientX - rect.left,
            y1: event.clientY - rect.top,
            r: longueurVal
        });
        //temp(event,rect);
    };
    const temp = (x,y,xtab,ytab) => {

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



      return deg_to_dms(resX,true)+ '   '+deg_to_dms(resY,false);

    };
    useEffect(() => {
      if(amerCanvasRef){



        amerCanvasRef.current.addEventListener('mousemove', e => {
            if (mapArray.length > 1 && (e.clientX % 2 === 0 || e.clientY % 2 === 0)){
              const rect = amerCanvasRef.current.getBoundingClientRect();

              const xtab = mapArray[0].length*256;
              const ytab =  mapArray.length*256;
              const x = parseInt(Math.abs(e.clientX - rect.left));
              const y = parseInt(Math.abs(e.clientY - rect.top));
              var label = document.getElementById('coordTest');
              label.innerHTML = temp(x,y,xtab,ytab);

            }

        });
    }
    });


    useEffect(() => {
        setDrawLineData({
            ...drawLineData,
            angle:
                parseInt(angleVal, 10) +
                parseInt(deviation, 10) +
                parseInt(declinaison, 10) -
                DEFAULT_ANGLE
        });
    }, [angleVal]);

    useEffect(() => {
        setDrawLineData({ ...drawLineData, r: longueurVal });
    }, [longueurVal]);

    const handleOnSubmit = (event) => {
        drawLine();
        drawAndPlaceCRA();
        handleClose();
    };




    return (
        <>
            <canvas
                id="canvas"
                ref={amerCanvasRef}
                className="canvas-style mt-5"
                onClick={(e) => !!amer && setCoordinates(e)}
            ></canvas>

            <Modal show={show} onHide={handleClose} size="sm" centered>
                <Modal.Header>
                    <Modal.Title>Relever l'amer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="angle">Angle</Form.Label>
                    <Form.Control
                        className="mb-2 mr-sm-2"
                        id="angle"
                        value={angleVal}
                        onChange={(e) => setAngleVal(e.target.value)}
                        type="number"
                        placeholder="Angle"
                    />
                    <Form.Label htmlFor="longueur">Longueur</Form.Label>
                    <Form.Control
                        className="mb-2 mr-sm-2"
                        id="longueur"
                        value={longueurVal}
                        onChange={(e) => setLongueurVal(e.target.value)}
                        type="number"
                        placeholder="Longueur"
                    />
                    <Form.Label htmlFor="declinaison">
                        Déclinaison (D)
                    </Form.Label>
                    <Form.Control
                        className="mb-2 mr-sm-2"
                        id="declinaison"
                        value={declinaison}
                        onChange={(e) => setDeclinaison(e.target.value)}
                        type="number"
                        placeholder="Déclinaison"
                    />
                    <Form.Label htmlFor="deviation">Déviation (d)</Form.Label>
                    <Form.Control
                        className="mb-2 mr-sm-2"
                        id="deviation"
                        value={deviation}
                        onChange={(e) => setDeviation(e.target.value)}
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
        </>
    );
};
