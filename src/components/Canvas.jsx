import "./Canvas.css";
import React, { useRef, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import image from "../regle-cras.png";
import { degToRadian } from "../helpers/helpers";
import { convertToDecimalDegre } from "../helpers/GenerateMap";
import { degToDms } from "../helpers/GenerateMap";

// Valeur pour prendre le nord en référence comme 0°
const DEFAULT_ANGLE = 90;

const CALIBRAGE_ZERO_ROUGE = -0.0845;
const CALIBRAGE_ZERO_NOIR = -0.9155;

var tabLignes = [];
var tabPositions = [];
var tabAngles = [];

const tabColor = [
    "red",
    "green",
    "blue",
    "yellow",
    "brown",
    "black",
    "orange",
    "purple",
    "cyan",
    "magenta",
    "pink"
];
var color = tabColor[0];
var compteurColor = 0;

class Point {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }

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
        this._origin = pt1.y - this._coef * pt1.x;
        this._pt1 = pt1;
        this._pt2 = pt2;
    }
    get coef() {
        return this._coef;
    }
    get origin() {
        return this._origin;
    }
    get pt1() {
        return this._pt1;
    }
    get pt2() {
        return this._pt2;
    }

    getValue(x) {
        return this._coef * x + this._origin;
    }

    getIntersection(line) {
        let x = Math.abs(
            (line.origin - this._origin) / (line.coef - this._coef)
        );
        let y = this._coef * x + this._origin;
        return new Point(x, y);
    }
}

export const Canvas = (props) => {
    const { mapArray, amer, mapSettingsData } = props;
    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    // Angle et Longueur
    const [angleVal, setAngleVal] = useState("0");
    const [longueurVal, setLongueurVal] = useState("2000");

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

    useEffect(() => {
        tabLignes = [];
        tabPositions = [];
        color = tabColor[0];
        compteurColor = 0;
        const context = amerCanvasRef.current.getContext("2d");
        context.clearRect(
            0,
            0,
            amerCanvasRef.current.width,
            amerCanvasRef.current.height
        );
    }, [mapSettingsData]);

    /**
     *
     */
    const drawLine = (ligne, color) => {
        const context = amerCanvasRef.current.getContext("2d");

        context.beginPath();

        context.strokeStyle = color;
        context.lineWidth = 5;
        context.moveTo(ligne.pt1.x, ligne.pt1.y);
        context.lineTo(ligne.pt2.x, ligne.pt2.y);

        context.stroke();
    };

    const drawAngle = (angle, x, y, color) => {
        const context = amerCanvasRef.current.getContext("2d");
        context.fillStyle = color;
        context.font = "20px serif";
        context.fillText(angle + "°", x, y);
    };

    const drawPoint = (x, y) => {
        const context = amerCanvasRef.current.getContext("2d");

        context.beginPath();

        context.fillStyle = "red";
        context.strokeStyle = "red";
        context.arc(x, y, 5, 0, 2 * Math.PI, true);
        context.fill();

        context.stroke();
    };

    const drawPosition = (position) => {
        for (var i = 0; i < tabPositions.length; i++) {
            const xtab = mapArray[0].length * 256;
            const ytab = mapArray.length * 256;
            var position = tabPositions[i];
            // Dessiner point intersection + Label avec coordonnées
            drawPoint(position.x, position.y);
            const context = amerCanvasRef.current.getContext("2d");
            context.beginPath();
            context.strokeStyle = "#000000";
            context.rect(position.x, position.y, 180, 25);
            context.fillStyle = "#000000";
            context.fill();
            context.fillStyle = "#FFFFFF";
            context.fillText(
                temp(position.x, position.y, xtab, ytab),
                position.x + 10,
                position.y + 20
            );
            context.stroke();
        }
    };

    const drawLinesFromArray = () => {
        for (var i = 0; i < tabLignes.length; i++) {
            if (i % 3 === 0 && i > 0) {
                compteurColor++;
            }
            color = getColor(compteurColor);
            drawLine(tabLignes[i], color);
            drawAngle(
                tabAngles[i],
                tabLignes[i].pt1.x,
                tabLignes[i].pt1.y,
                color
            );
        }
    };

    const redrawCanvas = () => {
        if (tabLignes.length > 1) {
            const context = amerCanvasRef.current.getContext("2d");
            context.clearRect(
                0,
                0,
                amerCanvasRef.current.width,
                amerCanvasRef.current.height
            );
            drawLinesFromArray();
        }
        if (tabLignes.length >= 3) {
            drawPosition();
        }
    };

    /**
     *
     */
    // Règle de cras
    // Pour obtenir le milieu de la règle : -(regle.width / 2)
    // Pour obtenir le point 0 du rapporteur (rouge) : CALIBRAGE_ZERO_ROUGE * regle.height
    // Pour obtenir le point 0 du rapporteur (noir) : CALIBRAGE_ZERO_NOIR * regle.height
    const drawAndPlaceCRA = () => {
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

            //Tracer un trait au milieu du rapporteur
            // var ligneMilieuRapporteur = new Line(new Point(0, drawLineData.y1), new Point(mapArray[0].length, drawLineData.y1));
            // drawLine(ligneMilieuRapporteur, "orange");

            if (tabLignes.length % 3 == 0) {
                let line1 = tabLignes[tabLignes.length - 3];
                let line2 = tabLignes[tabLignes.length - 2];
                let line3 = tabLignes[tabLignes.length - 1];

                trouverMilieu(line1, line2, line3);
            }
        };
    };

    const getColor = (compteur) => {
        return tabColor[compteur % tabColor.length];
    };

    const trouverMilieu = (line1, line2, line3) => {
        // get intersection
        let pt_intersection1 = line1.getIntersection(line2);
        let pt_intersection2 = line1.getIntersection(line3);
        let pt_intersection3 = line2.getIntersection(line3);

        let line_median1 = pt_intersection1.getMedian(
            pt_intersection2,
            pt_intersection3
        );
        let line_median2 = pt_intersection2.getMedian(
            pt_intersection1,
            pt_intersection3
        );

        // middle
        let middle1 = line_median1.getIntersection(line_median2);
        tabPositions.push(middle1);
        drawPosition();
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
    };

    const temp = (x, y, xtab, ytab) => {
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

        const xCent = xtab / 2;
        const yCent = ytab / 2;

        const x2 = decimalDegreLongitude + decimalDegreLongitudeDistance;
        const x1 = decimalDegreLongitude - decimalDegreLongitudeDistance;

        const y2 = decimalDegreLatitude - decimalDegreLatitudeDistance;
        const y1 = decimalDegreLatitude + decimalDegreLongitudeDistance;
        const resX = (x / xtab) * (x2 - x1) + x1;
        const resY = (y / ytab) * (y2 - y1) + y1;

        return degToDms(resY, false) + "\xa0 \xa0" + degToDms(resX, true);
    };

    useEffect(() => {
        if (amerCanvasRef) {
            amerCanvasRef.current.addEventListener("mousemove", (e) => {
                if (
                    mapArray.length > 1 &&
                    (e.clientX % 2 === 0 || e.clientY % 2 === 0)
                ) {
                    const rect = amerCanvasRef.current.getBoundingClientRect();

                    const xtab = mapArray[0].length * 256;
                    const ytab = mapArray.length * 256;
                    const x = parseInt(Math.abs(e.clientX - rect.left));
                    const y = parseInt(Math.abs(e.clientY - rect.top));
                    var label = document.getElementById("coordTest");
                    label.innerHTML = "&nbsp;" + temp(x, y, xtab, ytab);
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
        compteurColor = 0;
        var p1X = drawLineData.x1;
        var p1Y = drawLineData.y1;
        var p2X =
            drawLineData.x1 +
            drawLineData.r *
                Math.cos((Math.PI * (drawLineData.angle + 180)) / 180);
        var p2Y =
            drawLineData.y1 +
            drawLineData.r *
                Math.sin((Math.PI * (drawLineData.angle + 180)) / 180);
        var ligne = new Line(new Point(p1X, p1Y), new Point(p2X, p2Y));
        tabLignes.push(ligne);
        tabAngles.push(angleVal);
        drawLine(ligne, color);
        drawAngle(angleVal, p1X, p1Y, color);
        redrawCanvas();
        drawAndPlaceCRA();
        handleClose();
    };

    return (
        <>
            <div id="idCanvas">
                <canvas
                    id="canvasAmers"
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
                        <Form.Label htmlFor="deviation">
                            Déviation (d)
                        </Form.Label>
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
            </div>
        </>
    );
};
