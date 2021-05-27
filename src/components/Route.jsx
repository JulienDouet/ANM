import "./Route.css";
import React, { useRef, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const Route = (props) => {

  var nbrPoints = 0 ;
  var arrayPoints = [] ;
  const { mapArray, route ,mapSettingsData } = props;

  const drawPoint = (x, y, color) => {
      const context = routeCanvasRef.current.getContext("2d");
      context.fillStyle = color || "black";
      context.beginPath();
      context.arc(x, y, 5, 0, 2 * Math.PI, true);
      context.fill();
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

      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;

      drawPoint(x,y,'yellow');

      nbrPoints ++;
      arrayPoints.push([x,y]);
      if (nbrPoints === 2) {
        const context = routeCanvasRef.current.getContext("2d");

        let x1 = arrayPoints[0][0];
        let y1 = arrayPoints[0][1];
        let x2 = arrayPoints[1][0];
        let y2 = arrayPoints[1][1];

        context.moveTo(x1,y1);
        context.lineTo(x2,y2);
        context.stroke();
      }
  };

  //const context = routeCanvasRef.current.getContext("2d");

  return (
    <>
    <canvas
        id="canvas"
        ref={routeCanvasRef}
        className="canvas-style mt-5"
        onClick={(e) => !!route && setRoute(e)}
    ></canvas>

    </>
  )
}
