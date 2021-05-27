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
        setMapSettingsData,
        mapNameState,
        storedMapState
    } = props;
    const [mapName, setMapName] = mapNameState;
    const [savedMaps, setSavedMaps] = useState([]);
    const [mapArray, setMapArray] = mapArrayState;
    const [hasLoadedMapDir, setHasLoadedMapDir] = useState(false);

    // Charge toutes les cartes enregistrées dans le disque
    useEffect(() => {
        if (!hasLoadedMapDir) {
            const loadStoredMaps = async () => {
                const localMapArray = [];
                await fs.readdir("cartes/", (_, fileList) => {
                    console.log({ fileList });
                    if (fileList.length) {
                        fileList.forEach((file) => {
                            localMapArray.push(file);
                        });
                    }
                });
                console.log({ localMapArray });
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
