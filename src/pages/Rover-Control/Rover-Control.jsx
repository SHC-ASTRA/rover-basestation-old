import { Container, InputGroup, Form, Button} from 'react-bootstrap';
import { ZoomIn } from 'react-bootstrap-icons';


function controlMetric(name) {
    return(
        <InputGroup>
            <InputGroup.Text style = {{width: "80px"}}>{name}</InputGroup.Text>
            <Form.Control readOnly>
            </Form.Control>
        </InputGroup>
    );
}

function controlPanel() {
    return(
        <div className = "card" style = {{width: "25%", margin: "10px"}}>
            <h5 className="card-header text-center">
                Control Panel
            </h5>
            <div className = "card-body">
                <div className = "d-grid gap-2">
                    <svg>
                        Top-down Diagram
                    </svg>
                    <InputGroup style = {{width: "100%"}}>
                        <select className = "custom-select">
                            <option value="-1">Choose a controller...</option>
                        </select>
                        <Button className="btn btn-success">
                            Enable
                        </Button>
                    </InputGroup>
                    {controlMetric("Voltage")}
                    {controlMetric("Range")}
                    {controlMetric("Speed")}
                </div>
            </div>
        </div>
    );
}

function map() {
    return(
        <div className = "card" style = {{width: "50%", margin: "10px"}}>
            <h5 className="card-header text-center">
                Map
            </h5>
            <div className = "card-body">
                <svg>
                    Map
                </svg>
            </div>
        </div>
    );
}

function orientationSlider(name) {
    return(
        <InputGroup>
            <InputGroup.Text>{name}</InputGroup.Text>
            <Form.Control
                type = "number"
            />
        </InputGroup>
    );
}

function orientation() {
    return(
        <div className = "card" style = {{width: "25%", margin: "10px"}}>
            <h5 className="card-header text-center">
                Orientation
            </h5>
            <div className = "card-body">
                <div className = "d-grid gap-5">
                    <svg>
                        Roll Diagram
                    </svg>
                    {orientationSlider("Roll")}
                    <svg>
                        Pitch Diagram
                    </svg>
                    {orientationSlider("Pitch")}
                </div>
            </div>
        </div>
    );
}

function RoverControl() {
    return (
        <Container className = "p-4">
            <div className = "card-deck" style={{display: "flex"}}>
                {orientation()}
                {map()}
                {controlPanel()}
            </div>
        </Container>
    );
}

export default RoverControl;
