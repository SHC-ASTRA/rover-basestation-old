import React, { useContext } from 'react';
import { Container, Card, InputGroup, Form, ButtonGroup, Button, FormControl, FormGroup } from 'react-bootstrap';
import { createRef, useEffect, useState, useCallback } from 'react';
import './Autonomous-Control.css';
import { useSearchParams } from 'react-router-dom';
import ROSLIB from 'roslib';
import { rosNode } from '../../utilities/ROS/ROS';
import { RosContext } from '../../utilities/ROS/RosContext';

function AutonomousControl() {
    const latitude = createRef();
    const longitude = createRef();
    const [searchParams] = useSearchParams();
    const {rosState} = useContext(RosContext);
    const [coordState, setCoordState] = useState({
        latitude: 0,
        longitude: 0,
        target: null,
        altitude: 0,
        accuracy: 3.0
    });

    const updateCoordState = (lat, long, target) => {
        if (lat.current) {
            setCoordState({
                latitude: lat.current.value,
                longitude: long.current.value,
                target: target,
            });
        }
    };

    useEffect(() => {
        if(searchParams?.size == 2)
        {
            latitude.current.value = searchParams.get('lat');
            longitude.current.value = searchParams.get('lng');
            setCoordState({ latitude: searchParams.get('lat'), longitude: searchParams.get('lng')});
        }
    }, []);

    const navigateButtonClick = () => {
        updateCoordState(latitude, longitude)
        console.log("Coords: " + latitude.current.value + "°, " + longitude.current.value + "°")
        console.log("Going to coordinates...");
        if(rosState == "Connected"){
            gps_goal = new ROSLIB.Message({
                latitude: latitude.current.value,
                longitude: longitude.current.value,
                altitude: 0
            });
            nav_cmd = new ROSLIB.Message({
                target: coordState.target,
                latitude: coordState.latitude,
                longitude: coordState.longitude,
                accuracy: 3.0
            });

            rosNode.nav_command_pub.publish(nav_cmd);
            rosNode.nav_gps_pub.publish(gps_goal);
        }
        

    };

    const abortButtonClick = () => {
        updateCoordState(latitude, longitude, "Abort");
        console.log("Autonomous mode aborting...");
        abort_cmd = new ROSLIB.Message({
            target: "Abort",
            latitude: latitude.current.value,
            longitude: longitude.current.value,
            accuracy: 3.0
        });
        rosNode.nav_command_pub.publish(abort_cmd);
    };

    useEffect(() => {
        if (coordState && coordState.latitude != 0 && 0 != coordState.longitude) {
            console.log("Move it!");
            console.log(coordState);
        }
    }, [coordState]);

    const postButtonClick = useCallback(() => {
        updateCoordState(latitude, longitude, "Post");
      


    }, [coordState]);

    const gateButtonClick = useCallback(() => {
        updateCoordState(latitude, longitude, "Gate");

    },[coordState]);

    return (
        <Container className = "p-4">
            <Card>
                <Card.Header className = "h5">
                    Autonomous Controls
                </Card.Header>
                <Card.Body>
                    <div className = "d-grid">
                        <InputGroup>
                            <InputGroup.Text>Coordinates</InputGroup.Text>
                            <Form.Control 
                                name = "latitude"
                                type = "number"
                                ref = {latitude}
                                defaultValue = {coordState.latitude}
                            />
                            <InputGroup.Text>°,</InputGroup.Text>
                            <Form.Control 
                                name = "longitude"
                                type = "number"
                                ref = {longitude}
                                defaultValue = {coordState.longitude}
                            />
                            <InputGroup.Text>°</InputGroup.Text>
                        </InputGroup>
                        <ButtonGroup>
                            <Button 
                                className = "btn-info"
                                onClick = {postButtonClick}
                            >
                                Post
                            </Button>
                            <Button
                                onClick = {gateButtonClick}
                            >
                                Gate
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button 
                                className="btn-success"
                                onClick = {navigateButtonClick}
                            >
                                Navigate
                            </Button>
                            <Button 
                                className="btn-danger"
                                onClick = {abortButtonClick}
                            >
                                Abort
                            </Button>
                        </ButtonGroup>
                        <InputGroup.Text 
                            className = "feed"
                        >
                        </InputGroup.Text>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AutonomousControl;
