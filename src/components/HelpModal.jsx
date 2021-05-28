import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLifeRing,
    faMapMarkedAlt,
    faPencilRuler,
    faSave
} from "@fortawesome/free-solid-svg-icons";

export const HelpModal = (props) => {
    const { showState } = props;
    const [showHelp, setShowHelp] = showState;

    const handleClose = () => setShowHelp(false);

    return (
        <Modal show={showHelp} onHide={handleClose} size="lg" centered>
            <Modal.Header>
                <Modal.Title>Aide</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    La barre de navigation contient 4 boutons
                    <br />
                    <hr />
                    <div className="row">
                        <div className="col-md-1">
                            <Button variant="primary">
                                <FontAwesomeIcon
                                    icon={faMapMarkedAlt}
                                    size="lg"
                                />
                            </Button>
                        </div>
                        <div className="col-md-11">
                            &nbsp; Bouton qui permet l'affichage de la fenêtre
                            de gestion de coordonnées, afin de charger l'endroit
                            du globe que l'on veut, avec une échelle et une
                            taille bien précise
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-1">
                            <Button variant="primary">
                                <FontAwesomeIcon icon={faSave} size="lg" />
                            </Button>
                        </div>
                        <div className="col-md-11">
                            &nbsp; Bouton qui affiche la fenêtre de chargement
                            de cartes prédéfinies, qui permet de charger toutes
                            les cartes déjà initialisées (principalement utile
                            en mode hors ligne ou bien pour charger aisément une
                            carte récurrente)
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-2">
                            <Button variant="primary">
                                <FontAwesomeIcon icon={faLifeRing} size="lg" />
                                &nbsp;OFF
                            </Button>
                        </div>
                        <div className="col-md-10">
                            &nbsp; Bouton qui affiche si oui(ON) ou non(OFF) le
                            mode de repérage d'amer est activé. Lorsque ce
                            dernier l'est, cliquer sur la carte puis remplir le
                            formulaire associé va permettre de repérer un amer.
                            Lorsque 3 amers seront relevés, un point central
                            ainsi que ses coordonnées seront affichées sur
                            l'interface, au centre du triangle formé par
                            l'intersection des droites issues des relevages
                            d'amers
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-2">
                            <Button variant="primary">
                                <FontAwesomeIcon
                                    icon={faPencilRuler}
                                    size="lg"
                                />
                                &nbsp;OFF
                            </Button>
                        </div>
                        <div className="col-md-10">
                            &nbsp; Bouton qui affiche si oui(ON) ou non(OFF) le
                            mode de traçage de route est activé. Lorsque ce
                            dernier l'est, il est possible de cliquer sur la
                            carte, pour spécifier le point de départ de la
                            route. Une fois cela fait, une fenêtre va apparaître
                            et il faudra spécifier certaines variables liées à
                            la navigation. Une fois le formulaire de la fenêre
                            validé, cela va tracer différents types de routes,
                            notamment le courant, la route surface, le cap vrai
                            ainsi que le cap Compas
                        </div>
                    </div>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fermer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
