import { Container, InputGroup, Form, Button, Card, Dropdown} from 'react-bootstrap';
import React, { createRef, useEffect, useState } from 'react';
import './Rover-Control.css';
import ros from '../../utilities/ROS/ROS';
import RoverMap from './roverMap';
import RosContextProvider from '../../utilities/ROS/RosContext';
import { rosNode } from '../../utilities/ROS/ROS';
import useController from '../../utilities/userController';
//We gonna need a couple things 


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

function CreateOption(num){
    return(
        <option value={num}>Controller {num+1}</option>
    );
}

function controlPanel() {
    const [motorPowerDisp,setMotorPowerDisp] = useState(50);
    const [metrics, setMetrics] = useState([0.0, 0.0, 0.0])
    const [controllers, setControllers ]= useState(navigator.getGamepads());
    const [enabled, setEnabled] = useState(false);
    const [selIndex, setSelIndex] = useState(0);
    const [leftInput, setLeftInput] = useState(0);
    const [rightInput, setRightInput] = useState(0);

    const publishControllerData = (left,right) =>{
        console.log(left,right);
        //Change this to include check for the dead area
        rosNode.fr_motor_pub.publish(right);
        rosNode.br_motor_pub.publish(right);
        rosNode.fl_motor_pub.publish(left);
        rosNode.bl_motor_pub.publish(left);
    }
    rosNode.battery_sub.subscribe((msg)=>{setMetrics([msg.batteryVoltage,metrics.slice(1)])});
    rosNode.gps_sub.subscribe((msg)=>{setMetrics([metrics[0],msg.ground_speed,metrics.slice(2)])});
    useEffect(()=>{
    
      window.addEventListener("gamepadconnected",(e)=>{
        setControllers(navigator.getGamepads());
        console.log("added controller");
      });
      window.addEventListener("gamepaddisconnected",(e)=>{
        setControllers(navigator.getGamepads());
        console.log("removed controller");
        setEnabled(false);
      });
      if(enabled){
        const interval = setInterval(()=>{
            const controller = navigator.getGamepads()[selIndex];
            setLeftInput(controller.axes[1]);//Change these to fit the actual controller
            setRightInput(controller.axes[0]);//Instead of setting we can just publish these values
            publishControllerData(-1*controller.axes[1],-1* controller.axes[3]);
            
        },50);
      }
    },[enabled,motorPowerDisp,])
    const enableButtonClick = () => {
        var controller = document.getElementById("controllerSelected")
        var controllerText = controller.options[controller.selectedIndex].text
        setEnabled(true);
        setSelIndex(controller.selectedIndex);
        console.log(controller.selectedIndex);
        console.log("Enabling controller: " + controllerText);
    };

    return(
        <Card>
            <Card.Header className = "h5">
                Control Panel
            </Card.Header>
            <Card.Body>
                <div className = "d-grid">
                    <img src = "./RoverTop.png" style={{height:"200px", width:"200px"}}/>
                    <InputGroup>
                    <Form.Range style={{width:'75%'}} onChange={(val)=>{setMotorPowerDisp(val.target.value)}}></Form.Range>
                    <InputGroup.Text  style={{width:"20%", height:"80%"}} >{motorPowerDisp}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Controller</InputGroup.Text>
                        <Form.Select id = "controllerSelected">
                        {controllers?.map((val,idx)=>{
                            if(val!= null){
                                return(
                                <option value={idx}>Controller {idx+1}</option>
                                );
                            }
                            })}
                        </Form.Select>
                        <Button 
                            onClick = {enableButtonClick}
                            className = "btn-success"
                        >
                            Enable
                        </Button>
                        
                    </InputGroup>
                    {controlMetric("Voltage:", "V", metrics[0])}
                    {/*controlMetric("Range:", "?", metrics[2])*/}
                    {controlMetric("Speed:", "?", metrics[1])}
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
                <RoverMap />
            </Card.Body>
        </Card>
    );
}


function orientationSlider(name,val) {
    return(
        <InputGroup>
            <InputGroup.Text style = {{width: "61px"}}>{name}</InputGroup.Text>
            <Form.Control
                type = "number"
                value={val}
            />
        </InputGroup>
    );
}

function orientation() {
    const [roll, setRoll] = useState(0);
    const [pitch, setPitch] = useState(0);
    rosNode.imu_sub.subscribe((data)=>{
        or = data["linear_acceleration"];
        accX = or["x"];
        accY = or["y"];
        accZ = or["z"];

        setPitch(180 * Math.atan (accX/Math.sqrt(accY*accY + accZ*accZ))/Math.PI);
        setRoll (180 * Math.atan2(accY, accZ)/Math.PI);
    });
    return(
        <Card style = {{width: "25%"}}>
            <Card.Header className = "h5">
                Orientation
            </Card.Header>
            <Card.Body>
                <div className = "d-grid" >
                    <div className='circle'>
                    <img src = {"./RoverBack.png"} style = {{width: "100px", height:"50px",transform:`rotate(${roll}deg)`}} />{/*The rotate only works with loercase tilde :|*/}
                    </div>
                    {orientationSlider("Roll",roll)}
                    <div className='circle'>
                    <img src = {"./roverSide.png"} style={{width: "100px", height:"100px",transform:`rotate(${pitch}deg)`}}/>
                    </div>
                    {orientationSlider("Pitch",pitch)}
                </div>
            </Card.Body>
        </Card>
    );
}

function RoverControl() {
    return (
        <Container className = "p-4">
            <RosContextProvider>
            <div className = "card-deck">
                {orientation()}
                {map()}
                {controlPanel()}
            </div>
            </RosContextProvider>
        </Container>
    );
}

export default RoverControl;