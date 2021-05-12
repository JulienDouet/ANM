import { Button, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLifeRing,
    faMapMarkedAlt,
    faPencilRuler,
    faQuestion
} from "@fortawesome/free-solid-svg-icons";

const renderTooltip = (title) => <Tooltip id="button-tooltip">{title}</Tooltip>;

export const TopBar = () => {
    return (
        <Nav className="navbar fixed-top navbar-dark bg-dark">
            <div className="topbar-container">
                <a class="navbar-brand" href="#">
                    &nbsp;&nbsp;Assistance Navigation Maritime
                </a>
                <span data-toggle="modal" data-target=".coordinatesModal">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={renderTooltip("Gérer les coordonnées")}
                    >
                        <Button variant="primary">
                            <FontAwesomeIcon icon={faMapMarkedAlt} size="lg" />
                        </Button>
                    </OverlayTrigger>
                </span>
                <span data-toggle="modal" data-target=".amerModal">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={renderTooltip("Gérer les coordonnées")}
                    >
                        <Button variant="primary">
                            <FontAwesomeIcon icon={faLifeRing} size="lg" />
                        </Button>
                    </OverlayTrigger>
                </span>
                <span data-toggle="modal">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={renderTooltip("Gérer les coordonnées")}
                    >
                        <Button variant="primary">
                            <FontAwesomeIcon icon={faPencilRuler} size="lg" />
                        </Button>
                    </OverlayTrigger>
                </span>
                <span data-toggle="modal" data-target=".helpModal">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={renderTooltip("Gérer les coordonnées")}
                    >
                        <Button variant="primary">
                            <FontAwesomeIcon icon={faQuestion} size="lg" />
                        </Button>
                    </OverlayTrigger>
                </span>
            </div>
        </Nav>
    );
};
