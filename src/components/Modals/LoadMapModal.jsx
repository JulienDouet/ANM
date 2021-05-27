import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
const fs = window.require("fs");
const request = require("request");

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
    const [currentlySelectedMapName, setCurrentlySelectedMapName] = useState(
        savedMaps ? savedMaps[0] : ""
    );
    const handleCloseLoadMap = () => setShowLoadMap(false);

    // To call when mapArray changes
    const download = (uri, filename) => {
        request.head(uri, () => {
            request(uri).pipe(fs.createWriteStream(filename));
        });
    };

    useEffect(() => {
        if (!isStoredMap) {
            mapArray.map((row, rowIndex) => {
                row.map((cell, cellIndex) => {
                    download(
                        `https://a.tile.openstreetmap.fr/osmfr/${cell[0]}/${cell[1]}/${cell[2]}.png`,
                        "cartes/" +
                            mapName +
                            "/openstreetmap/" +
                            rowIndex +
                            "_" +
                            cellIndex +
                            ".png"
                    );
                    download(
                        `https://tiles.openseamap.org/seamark/${cell[0]}/${cell[1]}/${cell[2]}.png`,
                        "cartes/" +
                            mapName +
                            "/openseamap/" +
                            rowIndex +
                            "_" +
                            cellIndex +
                            ".png"
                    );
                });
            });
        }
    }, [mapArray]);

    useEffect(() => {
        const saveCurrentMap = async () => {
            if (mapArray.length) {
                var data_file = "cartes/" + mapName + "/informations.txt";
                var content_file =
                    "zoom=" +
                    mapArray[0][0][0] +
                    ";latSize=" +
                    mapArray.length +
                    ";lonSize=" +
                    mapArray[0].length +
                    ";mapSettingsData=" +
                    JSON.stringify(mapSettingsData);
                await fs.mkdir("cartes/" + mapName, () => {});
                await fs.mkdir(
                    "cartes/" + mapName + "/openstreetmap",
                    () => {}
                );
                await fs.mkdir("cartes/" + mapName + "/openseamap", () => {});
                await fs.writeFile(data_file, content_file, () => {});
            }
        };
        saveCurrentMap();
    }, [savedMaps]);

    useEffect(() => {
        setCurrentlySelectedMapName(savedMaps[0]);
    }, [savedMaps]);

    const handleValidate = () => {
        if (currentlySelectedMapName) {
            setStoredMapName(currentlySelectedMapName);

            const dataFilePath =
                "cartes/" + currentlySelectedMapName + "/informations.txt";

            fs.readFile(dataFilePath, "utf8", function (err, data) {
                if (err) {
                    return;
                }

                let latSize = data.split(";")[1].split("=")[1];
                let lonSize = data.split(";")[2].split("=")[1];

                setMapSettingsData(
                    JSON.parse(data.split(";")[3].split("=")[1])
                );
                const newMapArray = [];
                for (let i = 0; i <= latSize - 1; ++i) {
                    newMapArray[i] = [];
                    for (let j = 0; j <= lonSize - 1; ++j) {
                        newMapArray[i][j] = [i, j];
                    }
                }
                setIsStoredMap(true);
                setMapArray(newMapArray);
            });

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
                                savedMaps.map((currMapName) => (
                                    <option value={currMapName}>
                                        {currMapName}
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
