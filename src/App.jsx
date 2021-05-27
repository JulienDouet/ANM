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
    const [isStoredMap, setIsStoredMap] = useState(true);
    const [mapSettingsData, setMapSettingsData] = useState({});
    const [mapName, setMapName] = useState("Baie de Quiberon");
    const [storedMapName, setStoredMapName] = useState("");
    const [amer, setAmer] = useState(false);
    const [hasScrollListener, setHasScrollListener] = useState(false);

    useEffect(() => {
        const ele = document.getElementById("dragMap");
        if (!hasScrollListener && !amer) {
            let x = 0;
            let y = 0;
            let html = document.documentElement;
            const mouseDownHandler = (e) => {
                x = e.clientX;
                y = e.clientY;
                document.addEventListener("mousemove", mouseMoveHandler);
                document.addEventListener("mouseup", mouseUpHandler);
                if (!amer) {
                    ele.style.cursor = "grabbing";
                }
                ele.style.userSelect = "none";
            };

            const mouseMoveHandler = (e) => {
                if (!amer) {
                    let dx = e.clientX - x;
                    let dy = e.clientY - y;
                    if (
                        (ele.offsetLeft > 0 && dx > 0) ||
                        (html.scrollWidth === html.clientWidth && dx < 0)
                    ) {
                        dx = 0;
                    }
                    if (
                        (ele.offsetTop > 0 && dy > 0) ||
                        (html.scrollHeight === html.clientHeight && dy < 0)
                    ) {
                        dy = 0;
                    }

                    ele.style.top = `${ele.offsetTop + dy}px`;
                    ele.style.left = `${ele.offsetLeft + dx}px`;
                    x = e.clientX;
                    y = e.clientY;
                }
            };

            const mouseUpHandler = () => {
                document.removeEventListener("mousemove", mouseMoveHandler);
                document.removeEventListener("mouseup", mouseUpHandler);
                if (!amer) {
                    ele.style.cursor = "grab";
                }
                ele.style.removeProperty("user-select");
            };
            setHasScrollListener(true);
            if (!amer) {
                ele.addEventListener("mousedown", mouseDownHandler);
            }
        }
    });

    return (
        <>
            <TopBar
                setShowSettings={setShowSettings}
                setShowLoadMap={setShowLoadMap}
                amerState={[amer, setAmer]}
            />
            <Modals
                settingsModal={[showSettings, setShowSettings]}
                loadMapModal={[showLoadMap, setShowLoadMap]}
                isStoredMapState={[isStoredMap, setIsStoredMap]}
                mapArrayState={[mapArray, setMapArray]}
                mapSettingsDataState={[mapSettingsData, setMapSettingsData]}
                mapNameState={[mapName, setMapName]}
                storedMapState={[storedMapName, setStoredMapName]}
            />
            <div id="dragMap" className={!!amer ? "amerPointer" : "draggable"}>
                <SeaMap
                    mapArray={mapArray}
                    isStoredMap={isStoredMap}
                    mapSettingsData={mapSettingsData}
                    storedMapName={storedMapName}
                />
                <Canvas
                    amer={amer}
                    mapArray={mapArray}
                    mapSettingsData={mapSettingsData}
                />
            </div>
        </>
    );
};
