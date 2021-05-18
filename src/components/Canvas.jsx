import "./Canvas.css"
import React, { useRef, useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const DEFAULT_ANGLE = 90;

export const Canvas = () => {

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [angleVal, setAngleVal] = useState("0");
    const [longueurVal, setLongueurVal] = useState("200");

    const [drawLineData, setDrawLineData] = useState({ x1: 0, y1: 0, r: 0, angle: 0 - DEFAULT_ANGLE })

    //Canvas
    const canvasRef = useRef(null);

    // Récupérer coordonnées clique
    const drawLine = () => {
        const context = canvasRef.current.getContext('2d')
        context.moveTo(drawLineData.x1, drawLineData.y1);
        context.lineTo(drawLineData.x1 + drawLineData.r * Math.cos(Math.PI * drawLineData.angle / 180), drawLineData.y1 + drawLineData.r * Math.sin(Math.PI * drawLineData.angle / 180));
        context.stroke();
    }

    const setCoordinates = (event) => {
        setShow(true);
        const rect = canvasRef.current.getBoundingClientRect();
        setDrawLineData({ ...drawLineData,  x1: event.clientX - rect.left, y1: event.clientY - rect.top, r: longueurVal });

    }

    useEffect(() => {
        setDrawLineData({ ...drawLineData, angle: angleVal - DEFAULT_ANGLE });
    }, [angleVal]);

    useEffect(() => {
        setDrawLineData({ ...drawLineData, r: longueurVal });
    }, [longueurVal]);

    const handleOnSubmit = (event) => {
        drawLine();
        handleClose();
    }

    return (
        <>
            <canvas id="canvas" ref={canvasRef} height="900" width="1500" className="canvas-style mt-5" onClick={(e) => setCoordinates(e)}></canvas>
            <Modal show={show} onHide={handleClose} size="sm" centered>
                <Modal.Header>
                    <Modal.Title>Relever l'amer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="angle">
                        Angle
                    </Form.Label>
                    <Form.Control
                        className="mb-2 mr-sm-2"
                        id="angle"
                        value={angleVal}
                        onChange={(e) => setAngleVal(e.target.value)}
                        type="number"
                        placeholder="Angle"
                    />
                    <Form.Label htmlFor="angle">
                        Déclinaison
                    </Form.Label>
                    <Form.Control
                        className="mb-2 mr-sm-2"
                        id="angle"
                        value={angleVal}
                        onChange={(e) => setAngleVal(e.target.value)}
                        type="number"
                        placeholder="Angle"
                    />
                    <Form.Label htmlFor="angle">
                        Déviation
                    </Form.Label>
                    <Form.Control
                        className="mb-2 mr-sm-2"
                        id="angle"
                        value={angleVal}
                        onChange={(e) => setAngleVal(e.target.value)}
                        type="number"
                        placeholder="Angle"
                    />
                    <Form.Label htmlFor="longueur">
                        Longueur
                    </Form.Label>
                    <Form.Control
                        className="mb-2 mr-sm-2"
                        id="longueur"
                        value={longueurVal}
                        onChange={(e) => setLongueurVal(e.target.value)}
                        type="number"
                        placeholder="Longueur"
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
