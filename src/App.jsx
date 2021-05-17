import { Canvas } from './components/Canvas';
import { Map } from "./components/Map";
import { TopBar } from "./components/TopBar";
import { Modals } from "./components/Modals";
import { useState } from "react";

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
            <Map mapArray={mapArray} />
            <Canvas />
        </>
    );
};
