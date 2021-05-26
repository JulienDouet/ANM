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
    /*validateCoordinates.click(() => {
        var titre_carte = $("#titre_carte").val();
        var zoom_carte = $("#zoom").val();
        var size_carte = $("#size").val();

        var data_file = "cartes/" + titre_carte + "/informations.txt";
        var content_file = "zoom=" + zoom_carte + ":size=" + size_carte;
        console.log(data_file);
        shelljs.mkdir("-p", "cartes/" + titre_carte + "/openstreetmap");
        shelljs.mkdir("-p", "cartes/" + titre_carte + "/openseamap");

        fs.writeFile(data_file, content_file, (err) => {
            if (err) throw err;

            console.log("The file was succesfully saved!");
        });

        const mapData = gatherFormParams();
        const formattedMapData = formatMapData(mapData);
        renderMap(formattedMapData, titre_carte);
    });*/

    /*chargeCard.click(() => {});

    const handleValidate = () => {
        const cardName = $("input[name='saveCarte']").val();
        const dataFilePath = "cartes/" + cardName + "/informations.txt";

        fs.readFile(dataFilePath, "utf8", function (err, data) {
            if (err) {
                return console.log(err);
            }

            let dataFile = data;

            const zoomCarte = dataFile.split(":")[0].split("=")[1];
            const sizeCarte = dataFile.split(":")[1].split("=")[1];

            for (let i = 0; i < sizeCarte; i++) {
                map.append("<tr>");

                for (let j = 0; j < sizeCarte; j++) {
                    map.append(
                        "<td style ='background-image: url(" +
                            DIRNAME +
                            "/cartes/" +
                            cardName +
                            "/openstreetmap/" +
                            j +
                            "_" +
                            i +
                            ".png);'>" +
                            "<img  src='" +
                            DIRNAME +
                            "/cartes/" +
                            cardName +
                            "/openseamap/" +
                            j +
                            "_" +
                            i +
                            ".png'></td>"
                    );
                }
            }
        });
    };*/

    const [currentlySelectedMapName, setCurrentlySelectedMapName] =
        useState("");

    useEffect(() => {
        setCurrentlySelectedMapName(savedMaps[0]);
    }, [savedMaps]);
    console.log(currentlySelectedMapName);

    const handleValidate = () => {
        /*console.log(savedMaps);
        console.log(mapName);
*/
        // Créer mapArray à partir des directory
        console.log(currentlySelectedMapName);
        setStoredMapName(currentlySelectedMapName);

        const dataFilePath =
            "cartes/" + currentlySelectedMapName + "/informations.txt";

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
            setMapArray(newMapArray);
            setIsStoredMap(true);
            /*
            const zoomCarte = dataFile.split(":")[0].split("=")[1];
            const sizeCarte = dataFile.split(":")[1].split("=")[1];

            for (let i = 0; i < sizeCarte; i++) {
                map.append("<tr>");

                for (let j = 0; j < sizeCarte; j++) {
                    map.append(
                        "<td style ='background-image: ./cartes/" +
                            cardName +
                            "/openstreetmap/" +
                            j +
                            "_" +
                            i +
                            ".png);'>" +
                            "<img  src='" +
                            DIRNAME +
                            "/cartes/" +
                            cardName +
                            "/openseamap/" +
                            j +
                            "_" +
                            i +
                            ".png'></td>"
                    );
                }
            }*/
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
                                    <option>{currMapName}</option>
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
                    onClick={handleValidate}
                >
                    Valider Carte
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
