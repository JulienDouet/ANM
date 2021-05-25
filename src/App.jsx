import { Canvas } from "./components/Canvas";
import { SeaMap } from "./components/SeaMap";
import { TopBar } from "./components/TopBar";
import { Modals } from "./components/Modals";
import { useState, useRef, useEffect } from "react";
import "./App.css";

export const App = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [showLoadMap, setShowLoadMap] = useState(false);
    const [mapArray, setMapArray] = useState([]);
    const [isStoredMap, setIsStoredMap] = useState(false);
    const [mapSettingsData, setMapSettingsData] = useState({});

    const amerCanvasRef = useRef(null);
    const resizeAmerCanvas = (tableRef) => {
        const amerCanvas = amerCanvasRef.current;

        amerCanvas.height = tableRef.current.offsetHeight;
        amerCanvas.width = tableRef.current.offsetWidth;
    };

    useEffect(() => {
        let x = 0;
        let y = 0;
        const ele = document.getElementById("dragMap");
        const mouseDownHandler = function (e) {
            // Get the current mouse position
            x = e.clientX;
            y = e.clientY;

            // Attach the listeners to `document`
            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
            ele.style.cursor = "grabbing";
            ele.style.userSelect = "none";
        };

        const mouseMoveHandler = function (e) {
            // How far the mouse has been moved
            const dx = e.clientX - x;
            const dy = e.clientY - y;

            // Set the position of element
            ele.style.top = `${ele.offsetTop + dy}px`;
            ele.style.left = `${ele.offsetLeft + dx}px`;

            // Reassign the position of mouse
            x = e.clientX;
            y = e.clientY;
        };

        const mouseUpHandler = function () {
            // Remove the handlers of `mousemove` and `mouseup`
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
            ele.style.cursor = "grab";
            ele.style.removeProperty("user-select");
        };

        ele.addEventListener("mousedown", mouseDownHandler);
    });

    return (
        <>
            <TopBar
                setShowSettings={setShowSettings}
                setShowLoadMap={setShowLoadMap}
            />
            <Modals
                settingsModal={[showSettings, setShowSettings]}
                loadMapModal={[showLoadMap, setShowLoadMap]}
                isStoredMapState={[isStoredMap, setIsStoredMap]}
                mapArrayState={[mapArray, setMapArray]}
                setMapSettingsData={setMapSettingsData}
            />
            <div id="dragMap" className="draggable">
                <SeaMap
                    mapArray={mapArray}
                    isStoredMap={isStoredMap}
                    mapSettingsData={mapSettingsData}
                    resizeAmerCanvas={resizeAmerCanvas}
                />
                <Canvas amerCanvasRef={amerCanvasRef} />
            </div>
        </>
    );
};
