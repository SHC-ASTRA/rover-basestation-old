import { Container, InputGroup, Form, Button, Card, Dropdown} from 'react-bootstrap';
import { useState } from 'react';
import { ZoomIn } from 'react-bootstrap-icons';


function controlMetric(name, unit, value) {
    return(
        <InputGroup>
            <InputGroup.Text style = {{width: "83px"}}>{name}</InputGroup.Text>
            <Form.Control 
                value = {value + " " + unit}
            readOnly>
            </Form.Control>
        </InputGroup>
    );
}

function controlPanel() {
    const [metrics, setMetrics] = useState([0.0, 0.0, 0.0])

    const enableButtonClick = () => {
        var controller = document.getElementById("controllerSelected")
        var controllerText = controller.options[controller.selectedIndex].text

        console.log("Enabling controller: " + controllerText)
    };

    return(
        <Card>
            <Card.Header className = "h5">
                Control Panel
            </Card.Header>
            <Card.Body>
                <div className = "d-grid">
                    <svg>
                        <rect height = "100%" width = "100%" style = {{fill: "rgb(0, 0, 0)"}}></rect>
                    </svg>
                    <InputGroup>
                        <InputGroup.Text>Controller</InputGroup.Text>
                        <Form.Select id = "controllerSelected">
                            <option value = "0">N/A</option>
                            <option value = "1">Example 1</option>
                        </Form.Select>
                        <Button 
                            onClick = {enableButtonClick}
                            className = "btn-success"
                        >
                            Enable
                        </Button>
                    </InputGroup>
                    {controlMetric("Voltage:", "V", metrics[0])}
                    {controlMetric("Range:", "?", metrics[1])}
                    {controlMetric("Speed:", "?", metrics[2])}
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
                    <rect height = "100%" width = "100%" style = {{fill: "rgb(0, 0, 0)"}}></rect>
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
                        <rect height = "100%" width = "100%" style = {{fill: "rgb(0, 0, 0)"}}></rect>
                    </svg>
                    {orientationSlider("Roll")}
                    <svg>
                        <rect height = "100%" width = "100%" style = {{fill: "rgb(0, 0, 0)"}}></rect>
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
