import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
const fs = window.require("fs");
console.log({ fs });
const request = require("request");
console.log({ request });
const shelljs = require("shelljs");
console.log({ shelljs });

/**
 * TODO :
 * Quand on valide une coordonnées, cela rajoute à savedMaps, le nom de la carte, & ça créé le dossier
 * Faire la lecture quand on clique sur une map
 */

export const LoadMapModal = (props) => {
    const {
        show,
        mapArrayState,
        mapNameState,
        savedMapsState,
        isStoredMapState,
        storedMapState
    } = props;
    const [isStoredMap, setIsStoredMap] = isStoredMapState;
    const [mapName, setMapName] = mapNameState;
    const [mapArray, setMapArray] = mapArrayState;
    const [showLoadMap, setShowLoadMap] = show;
    const [savedMaps, setSavedMaps] = savedMapsState;
    const [storedMapName, setStoredMapName] = storedMapState;
    const [currentlySelectedMapName, setCurrentlySelectedMapName] = useState(
        savedMaps ? savedMaps[0] : ""
    );
    const handleCloseLoadMap = () => setShowLoadMap(false);

    // To call when mapArray changes
    const download = (uri, filename, callback) => {
        request.head(uri, () => {
            request(uri)
                .pipe(fs.createWriteStream(filename))
                .on("close", callback);
        });
    };

    const done = () => console.log("terminado");

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
                            ".png",
                        done
                    );
                    download(
                        `https://tiles.openseamap.org/seamark/${cell[0]}/${cell[1]}/${cell[2]}.png`,
                        "cartes/" +
                            mapName +
                            "/openseamap/" +
                            rowIndex +
                            "_" +
                            cellIndex +
                            ".png",
                        done
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
                    ":latSize=" +
                    mapArray.length +
                    ":lonSize=" +
                    mapArray[0].length;
                await fs.mkdir("cartes/" + mapName, (err) => {
                    if (err) throw err;

                    console.log("The dir street was succesfully created!");
                });
                await fs.mkdir(
                    "cartes/" + mapName + "/openstreetmap",
                    (err) => {
                        if (err) throw err;

                        console.log("The dir street was succesfully created!");
                    }
                );
                await fs.mkdir("cartes/" + mapName + "/openseamap", (err) => {
                    if (err) throw err;

                    console.log("The dir sea was succesfully created!");
                });
                await fs.writeFile(data_file, content_file, (err) => {
                    if (err) throw err;

                    console.log("The file was succesfully saved!");
                });
            }
        };
        saveCurrentMap();
    }, [savedMaps]);

    useEffect(() => {
        setCurrentlySelectedMapName(savedMaps[0]);
    }, [savedMaps]);

    console.log(currentlySelectedMapName);
    const handleValidate = (selectedMapName) => {
        console.log(selectedMapName);
        setStoredMapName(selectedMapName);

        const dataFilePath = "cartes/" + selectedMapName + "/informations.txt";

        fs.readFile(dataFilePath, "utf8", function (err, data) {
            if (err) {
                return console.log(err);
            }

            let zoom = data.split(":")[0].split("=")[1];
            let latSize = data.split(":")[1].split("=")[1];
            let lonSize = data.split(":")[2].split("=")[1];

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
                            {!savedMaps.length ? (
                                <option>Pas de carte sauvegardée</option>
                            ) : (
                                savedMaps.map((currMapName) => (
                                    <option value={currMapName}>
                                        {currMapName}
                                    </option>
                                ))
                            )}
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
                    disabled={!savedMaps.length}
                    onClick={() => handleValidate(currentlySelectedMapName)}
                >
                    Valider Carte
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
