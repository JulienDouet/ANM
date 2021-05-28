import { useState } from "react";
import { SettingsModal } from "./Modals/SettingsModal";
import { LoadMapModal } from "./Modals/LoadMapModal";

export const Modals = (props) => {
    const {
        settingsModal,
        loadMapModal,
        mapArrayState,
        isStoredMapState,
        mapSettingsDataState,
        mapNameState,
        storedMapState
    } = props;
    const [mapName, setMapName] = mapNameState;
    const [savedMaps, setSavedMaps] = useState([]);
    const [mapArray, setMapArray] = mapArrayState;
    const [isStoredMap, setIsStoredMap] = isStoredMapState;

    return (
        <>
            <LoadMapModal
                show={loadMapModal}
                mapArrayState={[mapArray, setMapArray]}
                isStoredMapState={isStoredMapState}
                mapNameState={[mapName, setMapName]}
                savedMapsState={[savedMaps, setSavedMaps]}
                storedMapState={storedMapState}
                mapSettingsDataState={mapSettingsDataState}
            />
            <SettingsModal
                mapSettingsDataState={mapSettingsDataState}
                show={settingsModal}
                setMapArray={setMapArray}
                mapNameState={[mapName, setMapName]}
                savedMapsState={[savedMaps, setSavedMaps]}
                setIsStoredMap={setIsStoredMap}
            />
        </>
    );
};
