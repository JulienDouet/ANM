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

// TODO à changer
const DIRNAME = "./";
const FOLDER = DIRNAME + "cartes";

export const LoadMapModal = (props) => {
    const { show, mapArrayState, mapNameState, savedMapsState } = props;
    const [mapName, setMapName] = mapNameState;
    const [mapArray, setMapArray] = mapArrayState;
    const [showLoadMap, setShowLoadMap] = show;
    const [savedMaps, setSavedMaps] = savedMapsState;
    const handleCloseLoadMap = () => setShowLoadMap(false);

    // To call when mapArray changes
    const download = (uri, filename, callback) => {
        /*request.head(uri, () => {
            request(uri)
                .pipe(fs.createWriteStream(filename))
                .on("close", callback);
        });*/
    };

    const done = () => console.log("terminado");

    /*useEffect(() => {
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
    }, [mapArray]);*/

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

    // Charge toutes les cartes enregistrées dans le disque
    useEffect(() => {
        console.log(fs);
        /*fs.readdir(FOLDER, (_, fileList) => {
            fileList.forEach((file) => {
                setSavedMaps([...savedMaps, file]);
            });
        });*/
    });

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

    const handleValidate = () => {
        console.log(savedMaps);
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
                        <Form.Control disabled={!savedMaps.length} as="select">
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
                <Button variant="success" onClick={handleValidate}>
                    Valider Carte
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
