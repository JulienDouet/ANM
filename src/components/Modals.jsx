import { useState } from "React";
import { LoadMapModal, SettingsModal } from "./Modals";

export const Modals = (props) => {
    const { settingsModal, loadMapModal, setMapArray, isStoredMapState } =
        props;
    const [mapName, setMapName] = useState("");

    return (
        <>
            <LoadMapModal
                show={loadMapModal}
                setMapArray={setMapArray}
                isStoredMapState={isStoredMapState}
                mapName={mapName}
            />
            <SettingsModal
                show={settingsModal}
                setMapArray={setMapArray}
                mapNameState={[mapName, setMapName]}
            />
        </>
    );
};
