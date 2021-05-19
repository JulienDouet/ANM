import { useState } from "React";
import { LoadMapModal, SettingsModal } from "./Modals";

export const Modals = (props) => {
    const { settingsModal, loadMapModal, setMapArray } = props;
    const [mapName, setMapName] = useState("");

    return (
        <>
            <LoadMapModal show={loadMapModal} setMapArray={setMapArray} />
            <SettingsModal show={settingsModal} setMapArray={setMapArray} />
        </>
    );
};
