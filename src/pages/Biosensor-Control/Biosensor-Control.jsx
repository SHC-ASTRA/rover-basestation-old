import { Container, Card, InputGroup, Form, Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { useState, useEffect, useRef } from 'react'
import ros from '../../utilities/ROS/ROS'

var positions =
{
  "separator1": 1,
  "separator2": 2,
  "separator3": 3,
  "dosing1": 4,
  "dosing2": 5,
  "capping": 6,
  "observation": 6,
  "0": 0
}

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

function rosFeed() {
    const updateFeed = (message) => {
        var time = new Date().toTimeString().split(' ')[0];
        ROSFeed.val('[' + time + '] ' + message + '\n' + ROSFeed.val());
    };

    var bioStatusSub = new ROSLIB.Topic({
        ros: ros,
        name: '/bio/status',
        messageType: 'std_msgs/String'
    });
    bioStatusSub.subscribe(updateFeed)

    return(
        <Card style = {{width: "100%"}}>
            <Card.Header className = "h5">
                ROS Feed
            </Card.Header>
            <Card.Body>
                <InputGroup.Text id = "ROSFeed" className = "feed">
                </InputGroup.Text>
            </Card.Body>
        </Card>
    )
}

function servosActuator() {
    const [servos, setCupServos] = useState([useRef(), useRef(), useRef(), useRef(), useRef()])
    const [actuatorVal, setActuator] = useState(useRef())
    
    var cmdClient = new ROSLIB.Service({
        ros: ros,
        name: '/bio/bio_command',
        serviceType: '/bio_relay/BioCommand'
    });

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
    
    var cmdClient = new ROSLIB.Service({
        ros: ros,
        name: '/bio/bio_command',
        serviceType: '/bio_relay/BioCommand'
    });

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

    const sendCommand = (cmd) => {
        var request = new ROSLIB.ServiceRequest({
          command: cmd
        });
        cmdClient.callService(request);
    }

    const autoRelCmd = () => {
        var from = document.getElementById("autoFrom")
        var fromVal = from.options[from.selectedIndex].value
        fromVal = positions[fromVal]
        var to = document.getElementById("autoTo")
        var toVal = to.options[to.selectedIndex].value
        toVal = positions[toVal]

        if (fromVal != 0 && toVal != 0) {
            setPos(toVal - fromVal);
            sendCommand("cr " + pos);
        }
    }

    const autoRelButtonClick = () => {
        var from = document.getElementById("autoFrom")
        var fromText = from.options[from.selectedIndex].text
        var to = document.getElementById("autoTo")
        var toText = to.options[to.selectedIndex].text

        console.log("Targetting from " + fromText + " to " + toText + "...")

        autoRelCmd()
    };

    const absTargButtonClick = () => {
        var absTarg = document.getElementById("absTarget")
        var absTargVal = absTarg.value

        console.log("Absolute Target is " + absTargVal + "...")

        setPos(absTargVal)
        sendCommand("ca " + pos);
    };

    const relTargButtonClick = () => {
        var relTarg = document.getElementById("relTarget")
        var relTargVal = relTarg.value

        console.log("Relative Target is " + relTargVal + "...")

        setPos(relTargVal)
        sendCommand("cr " + pos);
    };

    const prevCuvButtonClick = () => {
        console.log("Going to previous cuvette...")
        sendCommand("cr -1")
    };

    const nextCuvButtonClick = () => {
        console.log("Going to next cuvette...")
        sendCommand("cr 1")
    };
    
    var cmdClient = new ROSLIB.Service({
        ros: ros,
        name: '/bio/bio_command',
        serviceType: '/bio_relay/BioCommand'
    });

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
                    <InputGroup>
                        <InputGroup.Text style = {{width: "137px"}}>Absolute Target</InputGroup.Text>
                        <Form.Control 
                            id = "absTarget"
                            defaultValue = "0.0"
                            type = "number"
                        />
                        <Button 
                            className = "btn-success"
                            onClick = {absTargButtonClick}
                        >
                            Go
                        </Button>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text style = {{width: "137px"}}>Relatively Target</InputGroup.Text>
                        <Form.Control 
                            id = "relTarget"
                            defaultValue = "0.0"
                            type = "number"
                        />
                        <Button 
                            className = "btn-success"
                            onClick = {relTargButtonClick}
                        >
                            Go
                        </Button>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text style = {{width: "137px"}}>Auto Relative</InputGroup.Text>
                        <Form.Select id = "autoFrom">
                            <option value = "0">From</option>
                            <option value = "separator1">Separator 1</option>
                            <option value = "separator2">Separator 2</option>
                            <option value = "separator3">Separator 3</option>
                            <option value = "dosing1">Dosing 1</option>
                            <option value = "dosing2">Dosing 2</option>
                            <option value = "capping">Capping</option>
                            <option value = "observation">Observation</option>
                        </Form.Select>
                        <Form.Select id = "autoTo">
                            <option value = "0">To</option>
                            <option value = "separator1">Separator 1</option>
                            <option value = "separator2">Separator 2</option>
                            <option value = "separator3">Separator 3</option>
                            <option value = "dosing1">Dosing 1</option>
                            <option value = "dosing2">Dosing 2</option>
                            <option value = "capping">Capping</option>
                            <option value = "observation">Observation</option>
                        </Form.Select>
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
            <div className = "card-deck">
                {rosFeed()}
            </div>
        </Container>
    );
}

export default BiosensorControl;
