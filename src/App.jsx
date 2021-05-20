import { Canvas } from "./components/Canvas";
import { SeaMap } from "./components/SeaMap";
import { TopBar } from "./components/TopBar";
import { Modals } from "./components/Modals";
import { useState, useEffect } from "react";

export const App = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [mapArray, setMapArray] = useState([]);

    return (
        <>
            <TopBar setShowSettings={setShowSettings} />
            <Modals
                settingsModal={[showSettings, setShowSettings]}
                setMapArray={setMapArray}
            />
            <SeaMap mapArray={mapArray} />
            {/* <Canvas /> */}
        </>
    );
};
