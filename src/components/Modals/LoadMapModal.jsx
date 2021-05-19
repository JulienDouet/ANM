import { Modal, Button } from "bootstrap";
import { useEffect, useState } from "react";
const fs = require("fs");
const request = require("request");
const shelljs = require("shelljs");

/**
 * TODO :
 * Quand on valide une coordonnées, cela rajoute à savedMaps, le nom de la carte,
 * on a un useEffect qui watch mapArray, et qui save le mapArray dans les dossiers
 * Faire la lecture quand on clique sur une map
 *
 */

// TODO à changer
const DIRNAME = "/home/etudiant/Documents/ANM/";
const FOLDER = DIRNAME + "cartes";

export const LoadMapModal = (props) => {
    const { show } = props;
    const [showLoadMap, setShowLoadMap] = show;
    const handleCloseLoadMap = () => setShowLoadMap(false);
    const [savedMaps, setSavedMaps] = useState([]);

    const download = (uri, filename, callback) => {
        request.head(uri, function (err, res, body) {
            request(uri)
                .pipe(fs.createWriteStream(filename))
                .on("close", callback);
        });
    };

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
        fs.readdir(FOLDER, (_, fileList) => {
            fileList.forEach((file) => {
                setSavedMaps([...savedMaps, file]);
            });
        });
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

    return (
        <Modal show={showLoadMap} onHide={handleCloseLoadMap} size="lg">
            <Modal.Header>
                <Modal.Title>Charger une carte</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {savedMaps.map((mapName) => {
                    return <span>{mapName}</span>;
                })}
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
