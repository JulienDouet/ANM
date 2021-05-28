import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

export const LoadMapModal = (props) => {
    const {
        show,
        mapArrayState,
        savedMapsState,
        storedMapState,
        mapSettingsDataState
    } = props;
    const [mapArray, setMapArray] = mapArrayState;
    const [showLoadMap, setShowLoadMap] = show;
    const [savedMaps, setSavedMaps] = savedMapsState;
    const [mapSettingsData, setMapSettingsData] = mapSettingsDataState;
    const [currentlySelectedMapName, setCurrentlySelectedMapName] =
        useState("");
    const handleCloseLoadMap = () => setShowLoadMap(false);

    const handleValidate = () => {
        if (currentlySelectedMapName) {
            const ele = document.getElementById("dragMap");
            ele.style.left = "0px";
            ele.style.top = "0px";
            const selectedMap = savedMaps.find(
                (map) => map.data.name === currentlySelectedMapName
            );
            if (selectedMap) {
                setMapArray(selectedMap.tiles);
                setMapSettingsData(selectedMap.data);
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
