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
    this.state = { angle: '', longueur: '' };

    //Canvas
    const canvasRef = useRef(null);
    const regu = -90;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Récupérer coordonnées clique
        const drawLine = (event) => {
            const rect = canvas.getBoundingClientRect();
            // Variables
            var x1 = event.clientX - rect.left;;
            var y1 = event.clientY - rect.top;
            var r = 900;
            var angle = 30 - 90;
            //Our first draw
            context.moveTo(x1, y1);
            context.lineTo(x1 + r * Math.cos(Math.PI * angle / 180), y1 + r * Math.sin(Math.PI * angle / 180));
            context.stroke();
        }

        canvas.addEventListener('mousedown', function (e) {
            setShow(true);
            // drawLine(e);
        })
    }, [])

    const handleSubmit = (event) => {
        alert('Le nom a été soumis : ' + this.state.angle);
        event.preventDefault();
    }


    return (
        <div className="py-5">
            <canvas id="canvas" ref={canvasRef} height="900" width="1500" className="canvas-style"></canvas>
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
                        value={this.state.angle}
                        type="number"
                        placeholder="Angle"
                    />
                    <Form.Label htmlFor="longueur">
                        Longueur
                    </Form.Label>
                    <Form.Control
                        className="mb-2 mr-sm-2"
                        id="longueur"
                        value={this.state.longueur}
                        type="number"
                        placeholder="Longueur"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annuler
                </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Valider le marquage
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
};
