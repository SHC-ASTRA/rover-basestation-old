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
    const cmd_handler = useCallback((cmd)=>{
        console.log(cmd);
        send_cmd(cmd);
    })
    return(
        <Card>
            <Card.Header className = "h5">
                Carousel Position Reset
            </Card.Header>
            <Card.Body>
                <div className = "d-grid">
                    <Button onClick={()=>{cmd_handler('cr -143')}}>RM</Button>
                    <Button onClick={()=>{cmd_handler('cr -86.5')}}>RF</Button>
                    <Button onClick={()=>{cmd_handler('cr 84')}}>LB</Button>
                    <Button onClick={()=>{cmd_handler('cr 34.7')}}>LM</Button>
                    <Button onClick={()=>{cmd_handler('cr -26.5')}}>LF</Button>
                    <Button onClick={()=>{cmd_handler('cr 153.5')}}>RB</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

function fansPumps() {
    const cmd_handler = useCallback((cmd)=>{
        console.log(cmd);
        send_cmd(cmd);
    });
    return(
        <Card>
            <Card.Header className = "h5">
                Dip Station Test Strip Viewing Servo-Darker
            </Card.Header>
            <Card.Body>
                <div className = "d-grid">
                <Button onClick={()=>{cmd_handler('ds 0')}}>RM</Button>
                <Button onClick={()=>{cmd_handler('ds 90')}}>RF</Button>
                <Button onClick={()=>{cmd_handler('ds 200')}}>LB</Button>
                <Button onClick={()=>{cmd_handler('ds 240')}}>LM</Button>
                <Button onClick={()=>{cmd_handler('ds 270')}}>LF</Button>
                <Button onClick={()=>{cmd_handler('ds 140')}}>RB</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

function carousel() {
    const cmd_handler = useCallback((cmd)=>{
        console.log(cmd);
        send_cmd(cmd);
    });
    return(
        <Card>
            <Card.Header className = "h5">
            Dip Station Test Strip Viewing Servo - Lighter
            </Card.Header>
            <Card.Body>
                <div className = "d-grid">
                    
                    <Button onClick={()=>{cmd_handler('ds 140')}}>RM</Button>
                    <Button onClick={()=>{cmd_handler('ds 200')}}>RF</Button>
                    <Button onClick={()=>{cmd_handler('ds 120')}}>LB (Corner)</Button>
                    <Button onClick={()=>{cmd_handler('ds 160')}}>LM (Corner)</Button>
                    <Button onClick={()=>{cmd_handler('ds 210')}}>LF (Corner)</Button>
                    <Button onClick={()=>{cmd_handler('ds 230')}}>RB (Corner)</Button>
                </div>
            </Card.Body>
        </Card>
    );
}
function rosFeed() {
    const [feed, setFeed] = useState(null);
    const updateFeed = (message) => {
        let prevFeed = [...feed];
        var time = new Date().toTimeString().split(' ')[0];
        setFeed('[' + time + '] ' + message.data + '\n' +prevFeed);
    };
    
    rosNode.bio_sub.subscribe(updateFeed);
    
    
    return(
        <Card style = {{width: "100%"}}>
            <Card.Header className='h5'>Rover Feed</Card.Header>
            <Card.Body>
                <InputGroup.Text id = "ROSFeed" className = "feed">{feed}
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

    const handleKey = useCallback((e)=>{
        if(e.key==='Enter'){
            send_btn_click();
        }
    })

    return(
        <Card style={{width:"100%"}}>
            <Card.Header className='h5'>Command</Card.Header>
            <Card.Body>
                <Form.Control name="Command" type="text" ref ={cmd} onKeyPress={handleKey}/>
                
                <div className='d-grid'>
                <Button onClick={send_btn_click}>Send</Button>
                <Button  variant='danger' onClick={()=>{send_cmd("stop")}}>Stop</Button>    
                </div>
                
            
                
                
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
