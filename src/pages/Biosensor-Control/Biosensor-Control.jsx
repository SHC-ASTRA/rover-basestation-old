import { Container, Card, InputGroup, Form, Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { useState, useEffect, useRef } from 'react'

function inputDouble(name, first, second, doubleRef, textWidth) {
    const doubleRefAgain = useRef()

    const firstButtonClick = () => {
        if (first == "Dispense") {
            console.log(first.slice(0, -1) + "ing " + doubleRefAgain.current.value + " units...")
        } else {
            console.log(first + "ing " + doubleRefAgain.current.value + " units...")
        }
    };

    const secondButtonClick = () => {
        console.log(second + "ing " + doubleRefAgain.current.value + " units...")
    };

    return(
        <InputGroup>
            <InputGroup.Text style = {{width: textWidth}}>{name}</InputGroup.Text>
            <Form.Control 
                ref = {doubleRefAgain} //Can't put orignal ref here because it says it's a string and complains
                defaultValue = "0.0"
                type = "number"
            />
            <Button 
                className = "btn-success"
                onClick = {firstButtonClick}
            >
                {first}
            </Button>
            <Button 
                className = "btn-danger"
                onClick = {secondButtonClick}
            >
                {second}
            </Button>
        </InputGroup>
    );
}

function inputRun(name, runRef, textWidth) {
    const runRefAgain = useRef();

    const runButtonClick = () => {
        console.log("Setting " + name + " to " + runRefAgain.current.value + "...")
    }

    return(
        <InputGroup>
            <InputGroup.Text style = {{width: textWidth}}>{name}</InputGroup.Text>
            <Form.Control 
                ref = {runRefAgain} //Can't put orignal ref here because it says it's a string and complains
                defaultValue = "0.0"
                type = "number"
            />
            <Button 
                className = "btn-success"
                onClick = {runButtonClick}
            >
                Run
            </Button>
        </InputGroup>
    );
}

function inputGo(name, goRef, textWidth) {
    const goRefAgain = useRef();

    const goButtonClick = () => {
        console.log("Setting " + name + " to " + goRefAgain.current.value + "...")
    };

    return(
        <InputGroup>
            <InputGroup.Text style = {{width: textWidth}}>{name}</InputGroup.Text>
            <Form.Control 
                ref = {goRefAgain} //Can't put orignal ref here because it says it's a string and complains
                defaultValue = "0.0"
                type = "number"
            />
            <Button 
                className = "btn-success"
                onClick = {goButtonClick}
            >
                Go
            </Button>
        </InputGroup>
    );
}

function servosActuator() {
    const [servos, setCupServos] = useState([useRef(), useRef(), useRef(), useRef(), useRef()])
    const [actuatorVal, setActuator] = useState(useRef())

    return(
        <Card>
            <Card.Header className = "h5">
                Servos and Actuator
            </Card.Header>
            <Card.Body>
                <div className = "d-grid">
                    {inputGo("Cup Servo 1", servos[0], "152px")}
                    {inputGo("Cup Servo 2", servos[1], "152px")}
                    {inputGo("Cup Servo 3", servos[2], "152px")}
                    {inputGo("Capping Servo", servos[3], "152px")}
                    {inputGo("Microscope Servo", servos[4], "152px")}
                    {inputDouble("Actuator", "Extend", "Retract", actuatorVal, "152px")}
                </div>
            </Card.Body>
        </Card>
    );
}

function fansPumps() {
    const [fans, setTargets] = useState([useRef(), useRef(), useRef()])
    const [pumps, setPumps] = useState([useRef(), useRef()])

    const purgeButtonClick = () => {
        console.log("Purging pumps...")
    };

    return(
        <Card>
            <Card.Header className = "h5">
                Fans and Pumps
            </Card.Header>
            <Card.Body>
                <div className = "d-grid">
                    {inputRun("Fan 1", fans[0], "80px")}
                    {inputRun("Fan 2", fans[1], "80px")}
                    {inputRun("Fan 3", fans[2], "80px")}
                    {inputDouble("Pump 1", "Dispense", "Suction", pumps[0], "80px")}
                    {inputDouble("Pump 2", "Dispense", "Suction", pumps[1], "80px")}
                    <ButtonGroup>
                        <Button 
                            onClick = {purgeButtonClick}
                        >
                            Purge Pumps
                        </Button>
                    </ButtonGroup>
                </div>
            </Card.Body>
        </Card>
    );
}

function carousel() {
    const [pos, setPos] = useState(0.0)
    const [targets, setTargets] = useState([useRef(), useRef()])
    const [autoRel, setAutoRel] = useState(["From", "To"])
    const [autoRelAbrv, setAutoRelAbrv] = useState(["From", "To"])

    function fromOptionClick(index, name) {
        if (index == 0) {
            setAutoRel([name, autoRel[1]])
            switch(name) {
                case "Separator 1":
                    setAutoRelAbrv(["S...1", autoRelAbrv[1]])
                    break
                case "Separator 2":
                    setAutoRelAbrv(["S...2", autoRelAbrv[1]])
                    break
                case "Separator 3":
                    setAutoRelAbrv(["S...3", autoRelAbrv[1]])
                    break
                case "Dosing 1":
                    setAutoRelAbrv(["D...1", autoRelAbrv[1]])
                    break
                case "Dosing 2":
                    setAutoRelAbrv(["D...2", autoRelAbrv[1]])
                    break
                case "Capping":
                    setAutoRelAbrv(["Ca...", autoRelAbrv[1]])
                    break
                case "Observation":
                    setAutoRelAbrv(["Ob...", autoRelAbrv[1]])
                    break
                default:
                    break
            }
        } else if (index == 1) {
            setAutoRel([autoRel[0], name])
            switch(name) {
                case "Separator 1":
                    setAutoRelAbrv([autoRelAbrv[0], "S...1"])
                    break
                case "Separator 2":
                    setAutoRelAbrv([autoRelAbrv[0], "S...2"])
                    break
                case "Separator 3":
                    setAutoRelAbrv([autoRelAbrv[0], "S...3"])
                    break
                case "Dosing 1":
                    setAutoRelAbrv([autoRelAbrv[0], "D...1"])
                    break
                case "Dosing 2":
                    setAutoRelAbrv([autoRelAbrv[0], "D...2"])
                    break
                case "Capping":
                    setAutoRelAbrv([autoRelAbrv[0], "Ca..."])
                    break
                case "Observation":
                    setAutoRelAbrv([autoRelAbrv[0], "Ob..."])
                    break
                default:
                    break
            }
        }
    };

    const autoRelButtonClick = () => {
        console.log("Going from " + autoRel[0] + " to " + autoRel[1] + "...")
    };

    const prevCuvButtonClick = () => {
        console.log("Going to previous cuvette...")
    };

    const nextCuvButtonClick = () => {
        console.log("Going to next cuvette...")
    };

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
                            value = {pos}
                        readOnly/>
                    </InputGroup>
                    {inputGo("Absolute Target", targets[0], "137px")}
                    {inputGo("Relative Target", targets[1], "137px")}
                    <InputGroup>
                        <InputGroup.Text style = {{width: "137px"}}>Auto Relative</InputGroup.Text>
                        <Dropdown>
                            <Dropdown.Toggle variant = "warning">
                                {autoRelAbrv[0]}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick = {() => fromOptionClick(0, "Separator 1")}
                                >Separator 1</Dropdown.Item>
                                <Dropdown.Item
                                    onClick = {() => fromOptionClick(0, "Separator 2")}
                                >Separator 2</Dropdown.Item>
                                <Dropdown.Item
                                    onClick = {() => fromOptionClick(0, "Separator 3")}
                                >Separator 3</Dropdown.Item>
                                <Dropdown.Item
                                    onClick = {() => fromOptionClick(0, "Dosing 1")}
                                >Dosing 1</Dropdown.Item>
                                <Dropdown.Item
                                    onClick = {() => fromOptionClick(0, "Dosing 2")}
                                >Dosing 2</Dropdown.Item>
                                <Dropdown.Item
                                    onClick = {() => fromOptionClick(0, "Capping")}
                                >Capping</Dropdown.Item>
                                <Dropdown.Item
                                    onClick = {() => fromOptionClick(0, "Observation")}
                                >Observation</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant = "warning">
                                {autoRelAbrv[1]}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick = {() => fromOptionClick(1, "Separator 1")}
                                >Separator 1</Dropdown.Item>
                                <Dropdown.Item
                                    onClick = {() => fromOptionClick(1, "Separator 2")}
                                >Separator 2</Dropdown.Item>
                                <Dropdown.Item
                                    onClick = {() => fromOptionClick(1, "Separator 3")}
                                >Separator 3</Dropdown.Item>
                                <Dropdown.Item
                                    onClick = {() => fromOptionClick(1, "Dosing 1")}
                                >Dosing 1</Dropdown.Item>
                                <Dropdown.Item
                                    onClick = {() => fromOptionClick(1, "Dosing 2")}
                                >Dosing 2</Dropdown.Item>
                                <Dropdown.Item
                                    onClick = {() => fromOptionClick(1, "Capping")}
                                >Capping</Dropdown.Item>
                                <Dropdown.Item
                                    onClick = {() => fromOptionClick(1, "Observation")}
                                >Observation</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button 
                            className="btn-success"
                            onClick = {autoRelButtonClick}
                        >
                            Go
                        </Button>
                    </InputGroup>
                    <ButtonGroup>
                        <Button 
                            className="btn-info"
                            onClick = {prevCuvButtonClick}
                        >
                            Previous Cuvette
                        </Button>
                        <Button
                            onClick = {nextCuvButtonClick}
                        >
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
