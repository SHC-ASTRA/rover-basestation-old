import { Container, Card, InputGroup, Form, Button, ButtonGroup, Dropdown } from 'react-bootstrap';

function inputDoubleSA(name, first, second) {
    return(
        <InputGroup>
            <InputGroup.Text style = {{width: "152px"}}>{name}</InputGroup.Text>
            <Form.Control 
                placeholder = "0.0"
                type = "number"
            />
            <Button className = "btn-success">
                {first}
            </Button>
            <Button className = "btn-danger">
                {second}
            </Button>
        </InputGroup>
    );
}

function inputDouble(name, first, second) {
    return(
        <InputGroup>
            <InputGroup.Text>{name}</InputGroup.Text>
            <Form.Control 
                placeholder = "0.0"
                type = "number"
            />
            <Button className = "btn-success">
                {first}
            </Button>
            <Button className = "btn-danger">
                {second}
            </Button>
        </InputGroup>
    );
}

function inputRun(name) {
    return(
        <InputGroup>
            <InputGroup.Text style = {{width: "80px"}}>{name}</InputGroup.Text>
            <Form.Control 
                placeholder = "0.0"
                type = "number"
            />
            <Button className = "btn-success">
                Run
            </Button>
        </InputGroup>
    );
}

function inputGoSA(name) {
    return(
        <InputGroup>
            <InputGroup.Text style = {{width: "152px"}}>{name}</InputGroup.Text>
            <Form.Control 
                placeholder = "0.0"
                type = "number"
            />
            <Button className = "btn-success">
                Go
            </Button>
        </InputGroup>
    );
}

function inputGo(name) {
    return(
        <InputGroup>
            <InputGroup.Text style = {{width: "137px"}}>{name}</InputGroup.Text>
            <Form.Control 
                placeholder = "0.0"
                type = "number"
            />
            <Button className = "btn-success">
                Go
            </Button>
        </InputGroup>
    );
}

function servosActuator() {
    return(
        <Card>
            <Card.Header className = "h5">
                Servos and Actuator
            </Card.Header>
            <Card.Body>
                <div className = "d-grid">
                    {inputGoSA("Cup Servo 1")}
                    {inputGoSA("Cup Servo 2")}
                    {inputGoSA("Cup Servo 3")}
                    {inputGoSA("Capping Servo")}
                    {inputGoSA("Microscope Servo")}
                    {inputDoubleSA("Actuator", "Extend", "Retract")}
                </div>
            </Card.Body>
        </Card>
    );
}

function fansPumps() {
    return(
        <Card>
            <Card.Header className = "h5">
                Fans and Pumps
            </Card.Header>
            <Card.Body>
                <div className = "d-grid">
                    {inputRun("Fan 1")}
                    {inputRun("Fan 2")}
                    {inputRun("Fan 3")}
                    {inputDouble("Pump 1", "Dispense", "Suction")}
                    {inputDouble("Pump 2", "Dispense", "Suction")}
                    <ButtonGroup>
                        <Button>
                            Purge Pumps
                        </Button>
                    </ButtonGroup>
                </div>
            </Card.Body>
        </Card>
    );
}

function carousel() {
    return(
        <Card>
            <Card.Header className = "h5">
                Carousel
            </Card.Header>
            <Card.Body>
                <div className = "d-grid">
                    <InputGroup>
                        <InputGroup.Text style = {{width: "137px"}}>Position</InputGroup.Text>
                        <Form.Control 
                            placeholder = "0.0"
                        />
                    </InputGroup>
                    {inputGo("Absolute Target")}
                    {inputGo("Relative Target")}
                    <InputGroup>
                        <InputGroup.Text style = {{width: "137px"}}>Auto Relative</InputGroup.Text>
                        <Dropdown>
                            <Dropdown.Toggle variant = "warning">
                                From
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Separator 1</Dropdown.Item>
                                <Dropdown.Item>Separator 2</Dropdown.Item>
                                <Dropdown.Item>Separator 3</Dropdown.Item>
                                <Dropdown.Item>Dosing 1</Dropdown.Item>
                                <Dropdown.Item>Dosing 2</Dropdown.Item>
                                <Dropdown.Item>Capping</Dropdown.Item>
                                <Dropdown.Item>Observation</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant = "warning">
                                To
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Separator 1</Dropdown.Item>
                                <Dropdown.Item>Separator 2</Dropdown.Item>
                                <Dropdown.Item>Separator 3</Dropdown.Item>
                                <Dropdown.Item>Dosing 1</Dropdown.Item>
                                <Dropdown.Item>Dosing 2</Dropdown.Item>
                                <Dropdown.Item>Capping</Dropdown.Item>
                                <Dropdown.Item>Observation</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button className="btn-success">
                            Go
                        </Button>
                    </InputGroup>
                    <ButtonGroup>
                        <Button className="btn-info">
                            Previous Cuvette
                        </Button>
                        <Button>
                            Next Cuvette
                        </Button>
                    </ButtonGroup>
                </div>
            </Card.Body>
        </Card>
    );
}

function BiosensorControl() {
    return (
        <Container className="p-4">
            <div className = "card-deck">
                {carousel()}
                {fansPumps()}
                {servosActuator()}
            </div>
        </Container>
    );
}

export default BiosensorControl;
