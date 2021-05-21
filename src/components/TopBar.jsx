import { Button, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLifeRing,
    faMapMarkedAlt,
    faPencilRuler,
    faQuestion,
    faSave
} from "@fortawesome/free-solid-svg-icons";
import "./TopBar.css";

const renderTooltip = (title) => <Tooltip id="button-tooltip">{title}</Tooltip>;

export const TopBar = (props) => {
    const { setShowSettings, setShowLoadMap } = props;

    const handleShowSettings = () => setShowSettings(true);
    const handleShowLoadMap = () => setShowLoadMap(true);

    return (
        <Navbar sticky="top" className="navbar-dark" bg="dark">
            <div className="topbar-container">
                <a className="navbar-brand" href="#">
                    &nbsp;&nbsp;Assistance Navigation Maritime
                </a>
                <OverlayTrigger
                    placement="bottom"
                    overlay={renderTooltip("Gérer les coordonnées")}
                >
                    <Button variant="primary" onClick={handleShowSettings}>
                        <FontAwesomeIcon icon={faMapMarkedAlt} size="lg" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    overlay={renderTooltip("Charger une carte")}
                >
                    <Button
                        variant="primary"
                        className="spacedButton"
                        onClick={handleShowLoadMap}
                    >
                        <FontAwesomeIcon icon={faSave} size="lg" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    overlay={renderTooltip("Placer un amer")}
                >
                    <Button variant="primary" className="spacedButton">
                        <FontAwesomeIcon icon={faLifeRing} size="lg" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    overlay={renderTooltip("Tracer une route")}
                >
                    <Button variant="primary" className="spacedButton">
                        <FontAwesomeIcon icon={faPencilRuler} size="lg" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    overlay={renderTooltip("Aide")}
                >
                    <Button variant="primary" className="spacedButton">
                        <FontAwesomeIcon icon={faQuestion} size="lg" />
                    </Button>
                </OverlayTrigger>
            </div>
        </Navbar>
    );
};
