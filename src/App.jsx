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
        let html = document.documentElement;
        const ele = document.getElementById("dragMap");
        const mouseDownHandler = (e) => {
            x = e.clientX;
            y = e.clientY;
            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
            ele.style.cursor = "grabbing";
            ele.style.userSelect = "none";
        };

        const mouseMoveHandler = (e) => {
            if (ele.offsetLeft > 0) {
                ele.style.left = "0px";
                return;
            }
            if (ele.offsetTop > 0) {
                ele.style.top = "0px";
                return;
            }
            if (html.scrollHeight == html.clientHeight) {
                ele.style.top = `${ele.offsetTop + 1}px`;
                return;
            }
            if (html.scrollWidth == html.clientWidth) {
                ele.style.left = `${ele.offsetLeft + 1}px`;
                return;
            }

            const dx = e.clientX - x;
            const dy = e.clientY - y;
            ele.style.top = `${ele.offsetTop + dy * 0.3}px`;
            ele.style.left = `${ele.offsetLeft + dx * 0.3}px`;
            x = e.clientX;
            y = e.clientY;
        };

        const mouseUpHandler = () => {
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
