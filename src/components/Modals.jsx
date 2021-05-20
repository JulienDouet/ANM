import { useState } from "react";
import { SettingsModal } from "./Modals/SettingsModal";
import { LoadMapModal } from "./Modals/LoadMapModal";

export const Modals = (props) => {
    const { settingsModal, loadMapModal, setMapArray, isStoredMapState } =
        props;
    const [mapName, setMapName] = useState("");
    const [savedMaps, setSavedMaps] = useState([]);

    return (
        <>
            <LoadMapModal
                show={loadMapModal}
                setMapArray={setMapArray}
                isStoredMapState={isStoredMapState}
                mapName={mapName}
                savedMapsState={[savedMaps, setSavedMaps]}
            />
            <SettingsModal
                show={settingsModal}
                setMapArray={setMapArray}
                mapNameState={[mapName, setMapName]}
            />
        </>
    );
};
