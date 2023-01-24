import { Container, Card, InputGroup, Form, Button, ButtonGroup } from 'react-bootstrap';

function inputDoubleSA(name, first, second) {
    return(
        <InputGroup style = {{width: "100%"}}>
            <InputGroup.Text style = {{width: "152px"}}>{name}</InputGroup.Text>
            <Form.Control 
                placeholder = "0.0"
                type = "number"
            />
            <Button className = "btn btn-success">
                {first}
            </Button>
            <Button className = "btn">
                {second}
            </Button>
        </InputGroup>
    );
}

function inputDouble(name, first, second) {
    return(
        <InputGroup style = {{width: "100%"}}>
            <InputGroup.Text>{name}</InputGroup.Text>
            <Form.Control 
                placeholder = "0.0"
                type = "number"
            />
            <Button className = "btn btn-success">
                {first}
            </Button>
            <Button className = "btn">
                {second}
            </Button>
        </InputGroup>
    );
}

function inputRun(name) {
    return(
        <InputGroup style = {{width: "100%"}}>
            <InputGroup.Text style = {{width: "80px"}}>{name}</InputGroup.Text>
            <Form.Control 
                placeholder = "0.0"
                type = "number"
            />
            <Button className = "btn btn-success">
                Run
            </Button>
        </InputGroup>
    );
}

function inputGoSA(name) {
    return(
        <InputGroup style = {{width: "100%"}}>
            <InputGroup.Text style = {{width: "152px"}}>{name}</InputGroup.Text>
            <Form.Control 
                placeholder = "0.0"
                type = "number"
            />
            <Button className = "btn btn-success">
                Go
            </Button>
        </InputGroup>
    );
}

function inputGo(name) {
    return(
        <InputGroup style = {{width: "100%"}}>
            <InputGroup.Text style = {{width: "137px"}}>{name}</InputGroup.Text>
            <Form.Control 
                placeholder = "0.0"
                type = "number"
            />
            <Button className = "btn btn-success">
                Go
            </Button>
        </InputGroup>
    );
}

function servosActuator() {
    return(
        <Card style = {{margin: "10px"}}>
        <h5 className="card-header text-center">
            Servos and Actuator
        </h5>
        <div className = "card-body">
            <div className = "d-grid gap-3">
                {inputGoSA("Cup Servo 1")}
                {inputGoSA("Cup Servo 2")}
                {inputGoSA("Cup Servo 3")}
                {inputGoSA("Capping Servo")}
                {inputGoSA("Microscope Servo")}
                {inputDoubleSA("Actuator", "Extend", "Retract")}
            </div>
        </div>
    </Card>
    );
}

function fansPumps() {
    return(
        <Card style = {{margin: "10px"}}>
            <h5 className="card-header text-center">
                Fans and Pumps
            </h5>
            <div className = "card-body">
                <div className = "d-grid gap-3">
                    {inputRun("Fan 1")}
                    {inputRun("Fan 2")}
                    {inputRun("Fan 3")}
                    {inputDouble("Pump 1", "Dispense", "Suction")}
                    {inputDouble("Pump 2", "Dispense", "Suction")}
                    <ButtonGroup style = {{width: "100%"}}>
                        <Button>
                            Purge Pumps
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </Card>
    );
}

function carousel() {
    return(
        <Card style = {{margin: "10px"}}>
            <h5 className="card-header text-center">
                Carousel
            </h5>
            <div className = "card-body">
                <div className = "d-grid gap-3">
                    <InputGroup style = {{width: "100%"}}>
                        <InputGroup.Text style = {{width: "137px"}}>Position</InputGroup.Text>
                        <Form.Control 
                            placeholder = "0.0"
                        />
                    </InputGroup>
                    {inputGo("Absolute Target")}
                    {inputGo("Relative Target")}
                    <InputGroup style = {{width: "100%"}}>
                        <InputGroup.Text style = {{width: "137px"}}>Auto Relative</InputGroup.Text>
                        <select className = "custom-select" style = {{width: "70px"}}>
                            <option value="-1">From...</option>
                            <option value="separator1">Separator 1</option>
                            <option value="separator2">Separator 2</option>
                            <option value="separator3">Separator 3</option>
                            <option value="dosing1">Dosing 1</option>
                            <option value="dosing2">Dosing 2</option>
                            <option value="capping">Capping</option>
                            <option value="observation">Observation</option>
                        </select>
                        <select className = "custom-select" style = {{width: "70px"}}>
                            <option value="-1">To...</option>
                            <option value="separator1">Separator 1</option>
                            <option value="separator2">Separator 2</option>
                            <option value="separator3">Separator 3</option>
                            <option value="dosing1">Dosing 1</option>
                            <option value="dosing2">Dosing 2</option>
                            <option value="capping">Capping</option>
                            <option value="observation">Observation</option>
                        </select>
                        <Button className="btn btn-success">
                            Go
                        </Button>
                    </InputGroup>
                    <ButtonGroup style = {{width: "100%"}}>
                        <Button className="btn btn-danger" style = {{width: "50%"}}>
                            Previous Cuvette
                        </Button>
                        <Button style = {{width: "50%"}}>
                            Next Cuvette
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </Card>
    );
}

function BiosensorControl() {
    return (
        <Container className="p-4">
            <div className = "card-deck" style={{display: "flex"}}>
                {carousel()}
                {fansPumps()}
                {servosActuator()}
            </div>
        </Container>
    );
}

export default BiosensorControl;
