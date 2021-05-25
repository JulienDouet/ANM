import "./Canvas.css";
import React, { useRef, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import image from "../regle-cras.png";
import { degToRadian } from "../helpers/helpers";

// Valeur pour prendre le nord en référence comme 0°
const DEFAULT_ANGLE = 90;
const CALIBRAGE_ZERO_ROUGE = -0.0845;
const CALIBRAGE_ZERO_NOIR = -0.9155;

export const Canvas = (props) => {
    const { canvasGraticuleRef } = props;

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

    //Canvas
    const canvasRef = useRef(null);

    // Récupérer coordonnées clique
    /**
     *
     */
    const drawLine = () => {
        const context = canvasRef.current.getContext("2d");
        context.moveTo(drawLineData.x1, drawLineData.y1);
        context.lineTo(
            drawLineData.x1 +
                drawLineData.r * Math.cos((Math.PI * drawLineData.angle) / 180),
            drawLineData.y1 +
                drawLineData.r * Math.sin((Math.PI * drawLineData.angle) / 180)
        );
        context.stroke();
    };

    const drawPoint = (x, y, color) => {
        const context = canvasRef.current.getContext("2d");
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

        const context = canvasRef.current.getContext("2d");

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
    };

    /**
     *
     * @param {L'évènement} event
     */
    const setCoordinates = (event) => {
        setShow(true);
        console.log({ show });
        const rect = canvasRef.current.getBoundingClientRect();
        setDrawLineData({
            ...drawLineData,
            x1: event.clientX - rect.left,
            y1: event.clientY - rect.top,
            r: longueurVal
        });
    };

    useEffect(() => {
        const canvasGraticule = canvasGraticuleRef.current;
        const canvas = canvasRef.current;

        canvas.height = canvasGraticule.height;
        canvas.width = canvasGraticule.width;
        console.log(canvas);
    }, [canvasGraticuleRef]);

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
                ref={canvasRef}
                className="canvas-style mt-5"
                onClick={(e) => setCoordinates(e)}
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
