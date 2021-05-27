import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

export const LoadMapModal = (props) => {
    const {
        show,
        mapArrayState,
        mapNameState,
        savedMapsState,
        isStoredMapState,
        storedMapState,
        mapSettingsDataState
    } = props;
    const [isStoredMap, setIsStoredMap] = isStoredMapState;
    const [mapName, setMapName] = mapNameState;
    const [mapArray, setMapArray] = mapArrayState;
    const [showLoadMap, setShowLoadMap] = show;
    const [savedMaps, setSavedMaps] = savedMapsState;
    const [storedMapName, setStoredMapName] = storedMapState;
    const [mapSettingsData, setMapSettingsData] = mapSettingsDataState;
    const [currentlySelectedMapName, setCurrentlySelectedMapName] =
        useState("");
    const handleCloseLoadMap = () => setShowLoadMap(false);

    const handleValidate = () => {
        if (currentlySelectedMapName) {
            const selectedMapIndex = savedMaps.find(
                (map) => map.data.name === currentlySelectedMapName
            );
            if (selectedMapIndex) {
                setMapArray(savedMaps[selectedMapIndex].tiles);
                setMapSettingsData(savedMaps[selectedMapIndex].data);
            }
            handleCloseLoadMap();
        }
    };

    return (
        <Modal show={showLoadMap} onHide={handleCloseLoadMap} size="lg">
            <Modal.Header>
                <Modal.Title>Charger une carte</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            disabled={!savedMaps.length}
                            as="select"
                            value={currentlySelectedMapName}
                            onChange={(e) =>
                                setCurrentlySelectedMapName(e.target.value)
                            }
                        >
                            <option selected></option>
                            {savedMaps.length &&
                                savedMaps.map((currMap) => (
                                    <option value={currMap.data.name}>
                                        {currMap.data.name}
                                    </option>
                                ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleCloseLoadMap}>
                    Annuler
                </Button>
                <Button
                    variant="success"
                    disabled={!savedMaps.length || !currentlySelectedMapName}
                    onClick={handleValidate}
                >
                    Valider Carte
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
