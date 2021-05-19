import { Canvas } from "./components/Canvas";
import { Map } from "./components/Map";
import { TopBar } from "./components/TopBar";
import { Modals } from "./components/Modals";
import { useState } from "react";

export const App = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [showLoadMap, setShowLoadMap] = useState(false);
    const [mapArray, setMapArray] = useState([]);

    return (
        <>
            <TopBar
                setShowSettings={setShowSettings}
                setShowLoadMap={setShowLoadMap}
            />
            <Modals
                settingsModal={[showSettings, setShowSettings]}
                loadMapModal={[showLoadMap, setShowLoadMap]}
                setMapArray={setMapArray}
            />
            <Map mapArray={mapArray} />
        </>
    );
};
