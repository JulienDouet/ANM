import "./Canvas.css"
import React, { useRef, useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export const Canvas = () => {

    // const displayCanvas = () => {

    //     var ctx = canvas.getContext("2d");
    //     ctx.moveTo(0, 0);
    //     ctx.lineTo(200, 100);
    //     ctx.stroke();
    //     canvas.height = table.offsetHeight;
    //     canvas.width = table.offsetWidth;
    //     canvas.style.visibility = "visible";
    // }

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [angleVal, setAngleVal] = useState("0");
    const [longueurVal, setLongueurVal] = useState("900");

    const [drawLineData, setDrawLineData] = useState({ x1: 0, y1: 0, r: 0, angle: 0 })

    //Canvas
    const canvasRef = useRef(null);
    const regu = -90;

    // Récupérer coordonnées clique
    const drawLine = () => {
        const context = canvasRef.current.getContext('2d')
        context.moveTo(drawLineData.x1, drawLineData.y1);
        context.lineTo(drawLineData.x1 + drawLineData.r * Math.cos(Math.PI * drawLineData.angle / 180), drawLineData.y1 + drawLineData.r * Math.sin(Math.PI * drawLineData.angle / 180));
        context.stroke();
    }

    useEffect(() => {
        drawLine();
    }, [])

    const setCoordinates = (event) => {
        setShow(true);
        const rect = canvasRef.current.getBoundingClientRect();
        setDrawLineData({ x1: event.clientX - rect.left, y1: event.clientY - rect.top, r: longueurVal, angle: angleVal - regu })
    }

    const handleSubmit = (event) => {
        console.log('Le nom a été soumis : ' + drawLineData.angle);
        drawLine(event);
        event.preventDefault();
    }

    return (
        <div className="py-5">
            <canvas id="canvas" ref={canvasRef} height="900" width="1500" className="canvas-style" onClick={(e) => setCoordinates(e)}></canvas>
            <Modal show={show} onSubmit={handleSubmit} onHide={handleClose} size="sm" centered>
                <Modal.Header closeButton>
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
                    <Button type="submit" variant="primary" onClick={handleClose}>
                        Valider le marquage
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
};
