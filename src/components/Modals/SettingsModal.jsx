import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { isBetween } from "../../helpers/helpers";
import { generateMapArray } from "../../helpers/GenerateMap";

export const SettingsModal = (props) => {
    const {
        show,
        setMapArray,
        mapNameState,
        savedMapsState,
        mapSettingsDataState,
        setIsStoredMap
    } = props;
    const [mapSettingsData, setMapSettingsData] = mapSettingsDataState;
    const [savedMaps, setSavedMaps] = savedMapsState;
    const [showSettings, setShowSettings] = show;
    const [mapName, setMapName] = mapNameState;

    // Latitude
    const [latDeg, setLatDeg] = useState("47");
    const [latMin, setLatMin] = useState("25");
    const [latSec, setLatSec] = useState("0");
    const [latRad, setLatRad] = useState("N");

    // Longitude
    const [lonDeg, setLonDeg] = useState("2");
    const [lonMin, setLonMin] = useState("50");
    const [lonSec, setLonSec] = useState("0");
    const [lonRad, setLonRad] = useState("O");

    // Distance Longitude
    const [lonDistDeg, setLonDistDeg] = useState("0");
    const [lonDistMin, setLonDistMin] = useState("15");

    // Distance Latitude
    const [latDistDeg, setLatDistDeg] = useState("0");
    const [latDistMin, setLatDistMin] = useState("15");

    // Footer
    const [mapZoom, setMapZoom] = useState("13");

    const handleCloseSettings = () => setShowSettings(false);
    const applySettings = () => {
        if (!savedMaps.find((savedMap) => savedMap.data.name === mapName)) {
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
                longitudeDistance: {
                    deg: lonDistDeg,
                    min: lonDistMin
                },
                latitudeDistance: {
                    deg: latDistDeg,
                    min: latDistMin
                },
                zoom: parseInt(mapZoom)
            });
            setIsStoredMap(false);
            setMapSettingsData({
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
                longitudeDistance: {
                    deg: lonDistDeg,
                    min: lonDistMin
                },
                latitudeDistance: {
                    deg: latDistDeg,
                    min: latDistMin
                },
                zoom: parseInt(mapZoom),
                name: mapName
            });
            setMapArray(mapArray);
            setSavedMaps([
                ...savedMaps,
                {
                    data: {
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
                        longitudeDistance: {
                            deg: lonDistDeg,
                            min: lonDistMin
                        },
                        latitudeDistance: {
                            deg: latDistDeg,
                            min: latDistMin
                        },
                        zoom: parseInt(mapZoom),
                        name: mapName
                    },
                    tiles: mapArray
                }
            ]);
            setShowSettings(false);
        } else {
            alert("Une carte possédant ce nom existe déjà");
        }
    };

    return (
        <Modal show={showSettings} onHide={handleCloseSettings} size="lg">
            <Modal.Header>
                <Modal.Title>Gestion des coordonnées</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row g-3 align-items-end" noValidate>
                    <div className="col">
                        <label className="form-label" htmlFor="mapName">
                            Nom de la carte :
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="mapName"
                            value={mapName}
                            onChange={(e) => setMapName(e.target.value)}
                        />
                    </div>
                </div>

                <hr className="my-4" />

                <div className="row">
                    <label>Coordonnées Latitude : </label>
                </div>
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
                                onChange={(e) =>
                                    isBetween(e.target.value, -90, 90) &&
                                    setLatDeg(e.target.value)
                                }
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
                                onChange={(e) =>
                                    isBetween(e.target.value, 0, 60) &&
                                    setLatMin(e.target.value)
                                }
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
                                onChange={(e) =>
                                    isBetween(e.target.value, 0, 60) &&
                                    setLatSec(e.target.value)
                                }
                            />
                            <span className="input-group-text">
                                <b>"</b>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm-2">
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

                <div className="row">
                    <label>Coordonnées Longitude :</label>
                </div>
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
                                onChange={(e) =>
                                    isBetween(e.target.value, -180, 180) &&
                                    setLonDeg(e.target.value)
                                }
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
                                onChange={(e) =>
                                    isBetween(e.target.value, 0, 60) &&
                                    setLonMin(e.target.value)
                                }
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
                                onChange={(e) =>
                                    isBetween(e.target.value, 0, 60) &&
                                    setLonSec(e.target.value)
                                }
                            />
                            <span className="input-group-text">
                                <b>"</b>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div
                            className="btn-group"
                            name="latitude"
                            role="group"
                            aria-label="Basic radio toggle button group"
                        >
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
                        </div>
                    </div>
                </div>

                <hr className="my-4" />

                <div className="row">
                    <label>Rayon Latitude : </label>
                </div>
                <div className="row g-3 align-items-end" noValidate>
                    <div className="col-sm">
                        <label className="form-label" htmlFor="latDistDeg">
                            Degré
                        </label>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="number"
                                id="latDistDeg"
                                value={latDistDeg}
                                onChange={(e) =>
                                    isBetween(e.target.value, -45, 45) &&
                                    setLatDistDeg(e.target.value)
                                }
                            />
                            <span className="input-group-text">
                                <b>°</b>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm">
                        <label className="form-label" htmlFor="latDistMin">
                            Minutes
                        </label>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="number"
                                id="latDistMin"
                                value={latDistMin}
                                onChange={(e) =>
                                    isBetween(e.target.value, 0, 60) &&
                                    setLatDistMin(e.target.value)
                                }
                            />
                            <span className="input-group-text">
                                <b>'</b>
                            </span>
                        </div>
                    </div>
                </div>

                <hr className="my-4" />

                <div className="row">
                    <label>Rayon Longitude : </label>
                </div>
                <div className="row g-3 align-items-end" noValidate>
                    <div className="col-sm">
                        <label className="form-label" htmlFor="lonDistDeg">
                            Degré
                        </label>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="number"
                                id="lonDistDeg"
                                value={lonDistDeg}
                                onChange={(e) =>
                                    isBetween(e.target.value, -90, 90) &&
                                    setLonDistDeg(e.target.value)
                                }
                            />
                            <span className="input-group-text">
                                <b>°</b>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm">
                        <label className="form-label" htmlFor="lonDistMin">
                            Minutes
                        </label>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="number"
                                id="lonDistMin"
                                value={lonDistMin}
                                onChange={(e) =>
                                    isBetween(e.target.value, 0, 60) &&
                                    setLonDistMin(e.target.value)
                                }
                            />
                            <span className="input-group-text">
                                <b>'</b>
                            </span>
                        </div>
                    </div>
                </div>

                <hr className="my-4" />

                <div className="row">
                    <div className="col">
                        <label className="form-label" htmlFor="mapZoom">
                            Échelle :
                        </label>
                        <select
                            className="form-control"
                            id="mapZoom"
                            value={mapZoom}
                            onChange={(e) => setMapZoom(e.target.value)}
                        >
                            <option value="10">1:500 000</option>
                            <option value="11">1:250 000</option>
                            <option value="12">1:150 000</option>
                            <option value="13">1:70 000</option>
                            <option value="14">1:35 000</option>
                            <option value="15">1:15 000</option>
                            <option value="16">1:8 000</option>
                            <option value="17">1:4 000</option>
                            <option value="18">1:2 000</option>
                        </select>
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
