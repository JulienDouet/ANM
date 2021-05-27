import { useState, useEffect } from "react";
import { SettingsModal } from "./Modals/SettingsModal";
import { LoadMapModal } from "./Modals/LoadMapModal";
const fs = window.require("fs");

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
    const [mapSettingsData, setMapSettingsData] = mapSettingsDataState;
    const [hasLoadedMapDir, setHasLoadedMapDir] = useState(false);

    // Charge toutes les cartes enregistrées dans le disque
    useEffect(() => {
        if (!hasLoadedMapDir) {
            const loadStoredMaps = async () => {
                const localMapArray = [];
                await fs.readdir("cartes/", (_, fileList) => {
                    if (fileList.length) {
                        fileList.forEach((file) => {
                            localMapArray.push(file);
                        });
                    }
                });
                setSavedMaps(localMapArray);
            };
            loadStoredMaps();
            setHasLoadedMapDir(true);
        }
    }, [hasLoadedMapDir]);
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
                setMapSettingsData={setMapSettingsData}
                show={settingsModal}
                setMapArray={setMapArray}
                mapNameState={[mapName, setMapName]}
                savedMapsState={[savedMaps, setSavedMaps]}
                setIsStoredMap={setIsStoredMap}
            />
        </>
    );
};
