import { Button, Nav } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLifeRing, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'


export const TopBar = () => {
    return (
        <Nav className="navbar fixed-top navbar-light bg-light">
            <div className="topbar-container">
                <span data-toggle="modal" data-target=".coordinatesModal">
                    <Button
                        variant="primary"
                    >
                        <FontAwesomeIcon icon={faMapMarkedAlt} size="lg" />
                    </Button>
                </span>
                <span data-toggle="modal" data-target=".amerModal">
                    <Button
                        className="btn btn-info"
                        data-toggle="tooltip"
                        title="Placer un amer"
                    >
                        <i className="fas fa-life-ring fa-lg"></i>
                    </Button>
                </span>
                <span data-toggle="modal">
                    <Button
                        className="btn btn-info disabled pointer"
                        data-toggle="tooltip"
                        title="Tracer une route"
                    >
                        <i className="fas fa-pencil-ruler fa-lg"></i>
                    </Button>
                </span>
                <span data-toggle="modal" data-target=".helpModal">
                    <Button
                        className="btn btn-info"
                        data-toggle="tooltip"
                        title="Aide"
                    >
                        <i className="fas fa-question fa-lg"></i>
                    </Button>
                </span>
            </div>
        </Nav>
    )
}
