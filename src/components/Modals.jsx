import { useState,useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { isBetween } from "../helpers/helpers";
import { generateMapArray } from "../helpers/GenerateMap";

export const Modals = (props) => {
    const { settingsModal, setMapArray } = props;
    const [showSettings, setShowSettings] = settingsModal;

    const a = useRef(null);
    console.log(a.current);

    // Latitude
    const [latDeg, setLatDeg] = useState("0");
    const [latMin, setLatMin] = useState("0");
    const [latSec, setLatSec] = useState("0");
    const [latRad, setLatRad] = useState("N");

    // Longitude
    const [lonDeg, setLonDeg] = useState("0");
    const [lonMin, setLonMin] = useState("0");
    const [lonSec, setLonSec] = useState("0");
    const [lonRad, setLonRad] = useState("O");

    // Footer
    const [mapZoom, setMapZoom] = useState("10");
    const [mapSize, setMapSize] = useState("6");

    const handleCloseSettings = () => setShowSettings(false);
    const applySettings = () => {
        const mapArray = generateMapArray({
            latitude: {
                deg: latDeg,
                min: latMin,
                sec: latSec,
                orientation: latRad
            },
            longitude: {
                deg: lonDeg,
                min: lonMin,
                sec: lonSec,
                orientation: lonRad
            },
            zoom: parseInt(mapZoom),
            size: parseInt(mapSize)
        });
        setMapArray(mapArray);
        setShowSettings(false);
    };

    return (
        <Modal show={showSettings} onHide={handleCloseSettings} size="lg">
            <Modal.Header>
                <Modal.Title>Gestion des coordonnées</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row g-3 align-items-end" noValidate>
                    <div className="col-sm">
                        <label className="form-label" htmlFor="latDeg">
                            Degré
                        </label>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="number"
                                id="latDeg"
                                value={latDeg}
                                onChange={(e) => isBetween(e.target.value, -90, 90) && setLatDeg(e.target.value)}
                            />
                            <span className="input-group-text">
                                <b>°</b>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm">
                        <label className="form-label" htmlFor="latMin">
                            Minutes
                        </label>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="number"
                                id="latMin"
                                value={latMin}
                                onChange={(e) => isBetween(e.target.value, 0, 60) && setLatMin(e.target.value)}
                            />
                            <span className="input-group-text">
                                <b>'</b>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm">
                        <label className="form-label" htmlFor="latSec">
                            Secondes
                        </label>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="number"
                                id="latSec"
                                value={latSec}
                                onChange={(e) => isBetween(e.target.value, 0, 60) && setLatSec(e.target.value)}
                            />
                            <span className="input-group-text">
                                <b>"</b>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <label className="form-label" htmlFor="latitude">
                            Latitude
                        </label>
                        <div
                            name="latitude"
                            className="btn-group"
                            role="group"
                            aria-label="Basic radio toggle button group"
                        >
                            <input
                                className="btn-check"
                                type="radio"
                                id="latRadioN"
                                value="N"
                                autoComplete="off"
                                checked={latRad === "N"}
                                onChange={(e) => setLatRad(e.target.value)}
                            />
                            <label
                                className="btn btn-outline-primary"
                                htmlFor="latRadioN"
                            >
                                Nord
                            </label>

                            <input
                                className="btn-check"
                                type="radio"
                                id="latRadioS"
                                value="S"
                                autoComplete="off"
                                checked={latRad === "S"}
                                onChange={(e) => setLatRad(e.target.value)}
                            />
                            <label
                                className="btn btn-outline-primary"
                                htmlFor="latRadioS"
                            >
                                Sud
                            </label>
                        </div>
                    </div>
                </div>

                <hr className="my-4" />

                <div className="row g-3 align-items-end" noValidate>
                    <div className="col-sm">
                        <label className="form-label" htmlFor="lonDeg">
                            Degré
                        </label>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="number"
                                id="lonDeg"
                                value={lonDeg}
                                onChange={(e) => isBetween(e.target.value, -180, 180) && setLonDeg(e.target.value)}
                            />
                            <span className="input-group-text">
                                <b>°</b>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm">
                        <label className="form-label" htmlFor="lonMin">
                            Minutes
                        </label>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="number"
                                id="lonMin"
                                value={lonMin}
                                onChange={(e) => isBetween(e.target.value, 0, 60) && setLonMin(e.target.value)}
                            />
                            <span className="input-group-text">
                                <b>'</b>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm">
                        <label className="form-label" htmlFor="lonSec">
                            Secondes
                        </label>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="number"
                                id="lonSec"
                                value={lonSec}
                                onChange={(e) => isBetween(e.target.value, 0, 60) && setLonSec(e.target.value)}
                            />
                            <span className="input-group-text">
                                <b>"</b>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <label className="form-label" htmlFor="latitude">
                            Longitude
                        </label>
                        <div
                            className="btn-group"
                            name="latitude"
                            role="group"
                            aria-label="Basic radio toggle button group"
                        >
                            <input
                                className="btn-check"
                                type="radio"
                                id="lonRadioO"
                                value="O"
                                autoComplete="off"
                                checked={lonRad === "O"}
                                onChange={(e) => setLonRad(e.target.value)}
                            />
                            <label
                                className="btn btn-outline-primary"
                                htmlFor="lonRadioO"
                            >
                                Ouest
                            </label>

                            <input
                                className="btn-check"
                                type="radio"
                                id="lonRadioE"
                                value="E"
                                autoComplete="off"
                                checked={lonRad === "E"}
                                onChange={(e) => setLonRad(e.target.value)}
                            />
                            <label
                                className="btn btn-outline-primary"
                                htmlFor="lonRadioE"
                            >
                                Est
                            </label>
                        </div>
                    </div>
                </div>

                <hr className="my-4" />

                <div className="row">
                    <div className="col">
                        <label className="form-label" htmlFor="mapZoom">
                            Zoom :
                        </label>
                        <input
                            className="form-control"
                            type="number"
                            id="mapZoom"
                            value={mapZoom}
                            onChange={(e) => isBetween(e.target.value, 6, 18) && setMapZoom(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="mapSize">
                            Taille de la carte :
                        </label>
                        <input
                            className="form-control"
                            min="2"
                            type="number"
                            value={mapSize}
                            onChange={(e) => isBetween(e.target.value, 2, 20) && setMapSize(e.target.value)}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleCloseSettings}>
                    Annuler
                </Button>
                <Button variant="success" onClick={applySettings}>
                    Valider
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
