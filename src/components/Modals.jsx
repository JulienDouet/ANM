import { useState } from "react";
import { SettingsModal } from "./Modals/SettingsModal";
import { LoadMapModal } from "./Modals/LoadMapModal";

export const Modals = (props) => {
    const {
        settingsModal,
        loadMapModal,
        mapArrayState,
        isStoredMapState,
        setMapSettingsData
    } = props;
    const [mapName, setMapName] = useState("");
    const [savedMaps, setSavedMaps] = useState([]);
    const [mapArray, setMapArray] = mapArrayState;
    return (
        <>
            <LoadMapModal
                show={loadMapModal}
                mapArrayState={[mapArray, setMapArray]}
                isStoredMapState={isStoredMapState}
                mapNameState={[mapName, setMapName]}
                savedMapsState={[savedMaps, setSavedMaps]}
            />
            <SettingsModal
                setMapSettingsData={setMapSettingsData}
                show={settingsModal}
                setMapArray={setMapArray}
                mapNameState={[mapName, setMapName]}
                savedMapsState={[savedMaps, setSavedMaps]}
            />
        </>
    );
};
