import { Canvas } from "./components/Canvas";
import { SeaMap } from "./components/SeaMap";
import { TopBar } from "./components/TopBar";
import { Modals } from "./components/Modals";
import { useState } from "react";

export const App = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [showLoadMap, setShowLoadMap] = useState(false);
    const [mapArray, setMapArray] = useState([]);
    const [isStoredMap, setIsStoredMap] = useState(false);

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
            />
            <SeaMap mapArray={mapArray} isStoredMap={isStoredMap} />
            <Canvas />
        </>
    );
};
