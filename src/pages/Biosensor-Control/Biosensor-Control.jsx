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

    const sendCommand = (cmd) => {
        var request = new ROSLIB.ServiceRequest({
          command: cmd
        });
        cmdClient.callService(request);
    }

    const cupServoOneButtonClick = () => {
        var cupServo1 = document.getElementById("cupServo1")
        var pos = cupServo1.value

        console.log("Setting cup servo 1 to " + pos + "...")

        sendCommand("s1 " + pos);
    };

    const cupServoTwoButtonClick = () => {
        var cupServo2 = document.getElementById("cupServo2")
        var pos = cupServo2.value

        console.log("Setting cup servo 2 to " + pos + "...")

        sendCommand("s2 " + pos);
    };

    const cupServoThreeButtonClick = () => {
        var cupServo3 = document.getElementById("cupServo3")
        var pos = cupServo3.value

        console.log("Setting cup servo 3 to " + pos + "...")

        sendCommand("s3 " + pos);
    };

    const capServoButtonClick = () => {
        var capServo = document.getElementById("capServo")
        var pos = capServo.value

        console.log("Setting capping servo to " + pos + "...")

        sendCommand("s4 " + pos);
    };

    const micServoButtonClick = () => {
        var micServo = document.getElementById("micServo")
        var pos = micServo.value

        console.log("Setting microscope servo to " + pos + "...")

        sendCommand("s5 " + pos);
    };

    const actExtendButtonClick = () => {
        var actuator = document.getElementById("actuator")
        var runtime = actuator.value

        console.log("Extending for " + runtime + " seconds...")
        
        sendCommand("at " + runtime)
    }

    const actRetractButtonClick = () => {
        var actuator = document.getElementById("actuator")
        var runtime = actuator.value

        console.log("Retracting for " + runtime + " seconds...")
        
        sendCommand("at -" + runtime)
    }
    
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
                    <InputGroup>
                        <InputGroup.Text style = {{width: "152px"}}>Cup Servo 1</InputGroup.Text>
                        <Form.Control 
                            id = "cupServo1"
                            defaultValue = "0.0"
                            type = "number"
                        />
                        <Button 
                            className = "btn-success"
                            onClick = {cupServoOneButtonClick}
                        >
                            Go
                        </Button>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text style = {{width: "152px"}}>Cup Servo 2</InputGroup.Text>
                        <Form.Control 
                            id = "cupServo2"
                            defaultValue = "0.0"
                            type = "number"
                        />
                        <Button 
                            className = "btn-success"
                            onClick = {cupServoTwoButtonClick}
                        >
                            Go
                        </Button>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text style = {{width: "152px"}}>Cup Servo 3</InputGroup.Text>
                        <Form.Control 
                            id = "cupServo3"
                            defaultValue = "0.0"
                            type = "number"
                        />
                        <Button 
                            className = "btn-success"
                            onClick = {cupServoThreeButtonClick}
                        >
                            Go
                        </Button>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text style = {{width: "152px"}}>Capping Servo</InputGroup.Text>
                        <Form.Control 
                            id = "capServo"
                            defaultValue = "0.0"
                            type = "number"
                        />
                        <Button 
                            className = "btn-success"
                            onClick = {capServoButtonClick}
                        >
                            Go
                        </Button>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text style = {{width: "152px"}}>Microscope Servo</InputGroup.Text>
                        <Form.Control 
                            id = "micServo"
                            defaultValue = "0.0"
                            type = "number"
                        />
                        <Button 
                            className = "btn-success"
                            onClick = {micServoButtonClick}
                        >
                            Go
                        </Button>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text style = {{width: "152px"}}>Actuator</InputGroup.Text>
                        <Form.Control 
                            id = "actuator"
                            defaultValue = "0.0"
                            type = "number"
                        />
                        <Button 
                            className = "btn-success"
                            onClick = {actExtendButtonClick}
                        >
                            Extend
                        </Button>
                        <Button 
                            className = "btn-danger"
                            onClick = {actRetractButtonClick}
                        >
                            Retract
                        </Button>
                    </InputGroup>
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
    const sendCommand = (cmd) => {
        var request = new ROSLIB.ServiceRequest({
          command: cmd
        });
        cmdClient.callService(request);
    }

    const fanOneButtonClick = () => {
        var fanOne = document.getElementById("fan1")
        var fanOneVal = fanOne.value

        console.log("Setting Fan 1 runtime to " + fanOneVal + " seconds...")

        var runtime = fanOneVal
        sendCommand("f1 " + runtime)
    }

    const fanTwoButtonClick = () => {
        var fanTwo = document.getElementById("fan2")
        var fanTwoVal = fanTwo.value

        console.log("Setting Fan 2 runtime to " + fanTwoVal + " seconds...")

        var runtime = fanTwoVal
        sendCommand("f2 " + runtime)
    }

    const fanThreeButtonClick = () => {
        var fanThree = document.getElementById("fan3")
        var fanThreeVal = fanThree.value

        console.log("Setting Fan 3 runtime to " + fanThreeVal + " seconds...")

        var runtime = fanThreeVal
        sendCommand("f3 " + runtime)
    }

    const dispenseOneButtonClick = () => {
        var dispenseOne = document.getElementById("pump1")
        var dispenseOneVal = dispenseOne.value

        console.log("Dispensing for " + dispenseOneVal + " seconds...")
        
        var runtime = dispenseOneVal
        sendCommand("p1 " + runtime)
    }
    

    const suctionOneButtonClick = () => {
        var suctionOne = document.getElementById("pump1")
        var suctionOneVal = suctionOne.value

        console.log("Suctioning for " + suctionOneVal + " seconds...")

        var runtime = suctionOneVal
        sendCommand("p1 -" + runtime)
    };

    const dispenseTwoButtonClick = () => {
        var dispenseTwo = document.getElementById("pump2")
        var dispenseTwoVal = dispenseTwo.value

        console.log("Dispensing for " + dispenseTwoVal + " seconds...")
        
        var runtime = dispenseTwoVal
        sendCommand("p2 " + runtime)
    }

    const suctionTwoButtonClick = () => {
        var suctionTwo = document.getElementById("pump2")
        var suctionTwoVal = suctionTwo.value

        console.log("Suctioning for " + suctionTwoVal + " seconds...")

        var runtime = suctionTwoVal
        sendCommand("p2 -" + runtime)
    };

    const purgeButtonClick = () => {
        console.log("Purging pumps...")
        sendCommand("pp")
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
                    <InputGroup>
                        <InputGroup.Text style = {{width: "80px"}}>Fan 1</InputGroup.Text>
                        <Form.Control 
                            id = "fan1"
                            defaultValue = "0.0"
                            type = "number"
                        />
                        <Button 
                            className = "btn-success"
                            onClick = {fanOneButtonClick}
                        >
                            Run
                        </Button>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text style = {{width: "80px"}}>Fan 2</InputGroup.Text>
                        <Form.Control 
                            id = "fan2"
                            defaultValue = "0.0"
                            type = "number"
                        />
                        <Button 
                            className = "btn-success"
                            onClick = {fanTwoButtonClick}
                        >
                            Run
                        </Button>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text style = {{width: "80px"}}>Fan 3</InputGroup.Text>
                        <Form.Control 
                            id = "fan3"
                            defaultValue = "0.0"
                            type = "number"
                        />
                        <Button 
                            className = "btn-success"
                            onClick = {fanThreeButtonClick}
                        >
                            Run
                        </Button>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text style = {{width: "80px"}}>Pump 1</InputGroup.Text>
                        <Form.Control 
                            id = "pump1"
                            defaultValue = "0.0"
                            type = "number"
                        />
                        <Button 
                            className = "btn-success"
                            onClick = {dispenseOneButtonClick}
                        >
                            Dispense
                        </Button>
                        <Button 
                            className = "btn-danger"
                            onClick = {suctionOneButtonClick}
                        >
                            Suction
                        </Button>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text style = {{width: "80px"}}>Pump 2</InputGroup.Text>
                        <Form.Control 
                            id = "pump2"
                            defaultValue = "0.0"
                            type = "number"
                        />
                        <Button 
                            className = "btn-success"
                            onClick = {dispenseTwoButtonClick}
                        >
                            Dispense
                        </Button>
                        <Button 
                            className = "btn-danger"
                            onClick = {suctionTwoButtonClick}
                        >
                            Suction
                        </Button>
                    </InputGroup>
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
