import { Container, InputGroup, Form, Button, Card, Dropdown} from 'react-bootstrap';
import { ZoomIn } from 'react-bootstrap-icons';


function controlMetric(name) {
    return(
        <InputGroup>
            <InputGroup.Text style = {{width: "83px"}}>{name}</InputGroup.Text>
            <Form.Control readOnly>
            </Form.Control>
        </InputGroup>
    );
}

function controlPanel() {
    return(
        <Card>
            <Card.Header className = "h5">
                Control Panel
            </Card.Header>
            <Card.Body>
                <div className = "d-grid">
                    <svg>
                        Top-down Diagram
                    </svg>
                    <InputGroup>
                        <InputGroup.Text>Controller</InputGroup.Text>
                        <Dropdown>
                            <Dropdown.Toggle variant = "warning">
                                Choose
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>N/A</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button className = "btn-success">
                            Enable
                        </Button>
                    </InputGroup>
                    {controlMetric("Voltage:")}
                    {controlMetric("Range:")}
                    {controlMetric("Speed:")}
                </div>
            </Card.Body>
        </Card>
    );
}

function map() {
    return(
        <Card style = {{width: "50%"}}>
            <Card.Header className = "h5">
                Map
            </Card.Header>
            <Card.Body>
                <svg>
                    Map
                </svg>
            </Card.Body>
        </Card>
    );
}

function orientationSlider(name) {
    return(
        <InputGroup>
            <InputGroup.Text style = {{width: "61px"}}>{name}</InputGroup.Text>
            <Form.Control
                type = "number"
            />
        </InputGroup>
    );
}

function orientation() {
    return(
        <Card style = {{width: "25%"}}>
            <Card.Header className = "h5">
                Orientation
            </Card.Header>
            <Card.Body>
                <div className = "d-grid">
                    <svg>
                        Roll Diagram
                    </svg>
                    {orientationSlider("Roll")}
                    <svg>
                        Pitch Diagram
                    </svg>
                    {orientationSlider("Pitch")}
                </div>
            </Card.Body>
        </Card>
    );
}

function RoverControl() {
    return (
        <Container className = "p-4">
            <div className = "card-deck">
                {orientation()}
                {map()}
                {controlPanel()}
            </div>
        </Container>
    );
}

export default RoverControl;
