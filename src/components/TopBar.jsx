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
    const {
        setShowSettings,
        setShowLoadMap,
        setShowHelp,
        amerState,
        routeState
    } = props;
    const [amer, setAmer] = amerState;

    const swap = function (nodeA, nodeB) {
        const parentA = nodeA.parentNode;
        const siblingA =
            nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

        // Move `nodeA` to before the `nodeB`
        nodeB.parentNode.insertBefore(nodeA, nodeB);

        // Move `nodeB` to before the sibling of `nodeA`
        parentA.insertBefore(nodeB, siblingA);
    };

    const [route, setRoute] = routeState;
    const handleShowSettings = () => setShowSettings(true);
    const handleShowLoadMap = () => setShowLoadMap(true);
    const handleShowHelp = () => setShowHelp(true);
    const handleAmerState = () => {
        var elemRoute = document.getElementById("idRoute");
        var elemCanvas = document.getElementById("idCanvas");
        setAmer(!amer);
        if (!amer && route) {
            setRoute(false);
            swap(elemCanvas, elemRoute);
        }
    };
    const handleRouteState = () => {
        var elemRoute = document.getElementById("idRoute");
        var elemCanvas = document.getElementById("idCanvas");
        setRoute(!route);
        if (amer && !route) {
            setAmer(false);
            swap(elemRoute, elemCanvas);
        }
    };

    return (
        <>
            <Navbar
                sticky="top"
                className="navbar-dark"
                style={{ position: "fixed", width: "100%" }}
                bg="dark"
            >
                <Navbar.Collapse id="basic-navbar-nav">
                    <a className="navbar-brand" href="#">
                        &nbsp;&nbsp;Assistance Navigation Maritime
                    </a>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={renderTooltip("Gérer les coordonnées")}
                    >
                        <Button
                            variant="primary"
                            disabled={!navigator.onLine}
                            onClick={navigator.onLine && handleShowSettings}
                        >
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
                        <Button
                            variant="primary"
                            className="spacedButton"
                            onClick={handleAmerState}
                        >
                            <FontAwesomeIcon icon={faLifeRing} size="lg" />
                            {!!amer ? " ON" : " OFF"}
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={renderTooltip("Tracer une route")}
                    >
                        <Button
                            variant="primary"
                            className="spacedButton"
                            onClick={handleRouteState}
                        >
                            <FontAwesomeIcon icon={faPencilRuler} size="lg" />
                            {!!route ? " ON" : " OFF"}
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={renderTooltip("Aide")}
                    >
                        <Button
                            variant="primary"
                            className="spacedButton"
                            onClick={handleShowHelp}
                        >
                            <FontAwesomeIcon icon={faQuestion} size="lg" />
                        </Button>
                    </OverlayTrigger>
                    &nbsp;
                    <label
                        className="ml-auto"
                        style={{ color: "white", fontWeight: "bold" }}
                        id="coordTest"
                    ></label>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};
