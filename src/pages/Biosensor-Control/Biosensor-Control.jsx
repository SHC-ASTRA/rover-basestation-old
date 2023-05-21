import React, { createRef, useCallback } from 'react';
import { Container, Card, InputGroup, Form, Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { useState, useEffect, useRef } from 'react';
import { rosNode, send_cmd } from '../../utilities/ROS/ROS';
import RosContextProvider from '../../utilities/ROS/RosContext';


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
    const [servos, setCupServos] = useState([useRef(), useRef(), useRef(), useRef(), useRef(),useRef(), useRef(), useRef(),useRef()])
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
                    {inputGo("Cup Servo 4", servos[5], "152px")}
                    {inputGo("Cup Servo 5", servos[6], "152px")}
                    {inputGo("Cup Servo 6", servos[7], "152px")}
                    {inputGo("Capping Servo", servos[3], "152px")}
                    {inputGo("Microscope Servo", servos[4], "152px")}
                    {inputGo("Dip Station Servo", servos[8], "152px")}
                    {inputDouble("Actuator", "Extend", "Retract", actuatorVal, "152px")}
                </div>
            </Card.Body>
        </Card>
    );
}

function fansPumps() {
    const [fans, setTargets] = useState([useRef(), useRef(), useRef(),useRef(), useRef(), useRef()])
    const [pumps, setPumps] = useState([useRef(), useRef(), useRef( )])

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
                    {inputRun("Fan 4", fans[3], "80px")}
                    {inputRun("Fan 5", fans[4], "80px")}
                    {inputRun("Fan 6", fans[5], "80px")}
                    {inputDouble("Pump 1", "Dispense", "Suction", pumps[0], "80px")}
                    {inputDouble("Pump 2", "Dispense", "Suction", pumps[1], "80px")}
                    {inputDouble("Pump 3", "Dispense", "Suction", pumps[2], "80px")}

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

    const autoRelButtonClick = () => {
        var from = document.getElementById("autoFrom")
        var fromText = from.options[from.selectedIndex].text
        var to = document.getElementById("autoTo")
        var toText = to.options[to.selectedIndex].text

        console.log("Targetting relatively from " + fromText + " to " + toText + "...")
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
                        <Form.Select id = "autoFrom">
                            <option value = "From">From</option>
                            <option value = "Separator 1">Separator 1</option>
                            <option value = "Separator 1">Separator 2</option>
                            <option value = "Separator 1">Separator 3</option>
                            <option value = "Dosing 1">Dosing 1</option>
                            <option value = "Dosing 2">Dosing 2</option>
                            <option value = "Capping">Capping</option>
                            <option value = "Observation">Observation</option>
                        </Form.Select>
                        <Form.Select id = "autoTo">
                            <option value = "To">To</option>
                            <option value = "Separator 1">Separator 1</option>
                            <option value = "Separator 1">Separator 2</option>
                            <option value = "Separator 1">Separator 3</option>
                            <option value = "Dosing 1">Dosing 1</option>
                            <option value = "Dosing 2">Dosing 2</option>
                            <option value = "Capping">Capping</option>
                            <option value = "Observation">Observation</option>
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
function rosFeed() {
    
    const updateFeed = (message) => {
        var log = new Date().toTimeString().split(' ')[0];
        ROSFeed.val('[' + time + '] ' + log + ROSFeed.val());
    };

    rosNode.bio_sub.subscribe(updateFeed);
    return(
        <Card style = {{width: "100%"}}>
            <Card.Header className='h5'>Rover Feed</Card.Header>
            <Card.Body>
                <InputGroup.Text id = "ROSFeed" className = "feed">
                </InputGroup.Text>
            </Card.Body>
        </Card>
    );
}


function serialCmdHandler(){
    const cmd = createRef();
    
    const send_btn_click = useCallback(()=>{
        if(cmd.current){
            console.log(cmd.current.value);
            send_cmd(cmd.current.value);
        }
    });


    return(
        <Card style={{width:"100%"}}>
            <Card.Header className='h5'>Command</Card.Header>
            <Card.Body>
                <Form.Control name="Command" type="text" ref ={cmd} />
                <ButtonGroup>
                    <Button onClick={send_btn_click}>Send</Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    );
}

function BiosensorControl() {
    return (
        <Container className="p-4">
            <RosContextProvider>
            <div className = "card-deck">
                {carousel()}
                {fansPumps()}
                {servosActuator()}
                
            </div>
            <div className='card-deck'>
                {serialCmdHandler()}
                {rosFeed()}
            </div>
            </RosContextProvider>
        </Container>
    );
}

export default BiosensorControl;
