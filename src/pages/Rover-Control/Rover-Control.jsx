import { Container, InputGroup, Form, Button, Card, Dropdown} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { ZoomIn } from 'react-bootstrap-icons';
import { MapContainer,TileLayer,useMap,Marker,Popup, ScaleControl } from 'react-leaflet';
import L from "leaflet";
import './Rover-Control.css';
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
                    <img src = "./RoverTop.png" style={{height:"200px", width:"200px"}}/>
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

function createRoverIcon(_iconSize){
    //Creates the icon since png isn't compatible with leaflet
    return L.icon({
        iconUrl: "./RoverTop.png",
        iconSize: [_iconSize],
    })
}

function map() {    
    return(
        <Card style = {{width: "50%"}}>
            <Card.Header className = "h5">
                Map
            </Card.Header>
            <Card.Body>
            <MapContainer center={[38.4063,-110.7918]} zoom={13} scrollWheelZoom={false} style={{height:300,width:500}}>
                <ScaleControl position='bottomright' />
                <TileLayer  url="./usgs/{z}/{x}/{y}.jpg"/>
                <Marker position={[38.4063,-110.7918]} icon={createRoverIcon(21)}/> 
            </MapContainer>  
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
    const [roll, setRoll] = useState(0);
    const [pitch, setPitch] = useState(0);
    
    return(
        <Card style = {{width: "25%"}}>
            <Card.Header className = "h5">
                Orientation
            </Card.Header>
            <Card.Body>
                <div className = "d-grid">
                    <div className='circle'>
                    <img src = {"./RoverBack.png"} style = {{width: "100px", height:"50px",transform:`rotate(${roll}deg)`}} />{/*The rotate only works with loercase tilde :|*/}
                    </div>
                    {orientationSlider("Roll")}
                    <div className='circle'>
                    <img src = {"./roverSide.png"} style={{width: "100px", height:"100px",transform:`rotate(${pitch}deg)`}}/>
                    </div>
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
