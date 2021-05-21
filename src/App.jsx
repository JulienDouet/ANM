import { Canvas } from './components/Canvas';
import { Map } from "./components/Map";
import { TopBar } from "./components/TopBar";
import { Modals } from "./components/Modals";
import { useState } from "react";
import ScrollContainer from 'react-indiana-drag-scroll'

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
            <ScrollContainer className="scroll-container" style={{ height: "2200px" }} vertical={true} horizontal={true}>
                <Map mapArray={mapArray} />
                <Canvas />
            </ScrollContainer>
        </>
    );
};
