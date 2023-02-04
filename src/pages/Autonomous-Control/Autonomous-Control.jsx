import { Container, Card, InputGroup, Form, ButtonGroup, Button, FormControl, FormGroup } from 'react-bootstrap';
import { createRef, useEffect, useState } from 'react';
import './Autonomous-Control.css';
import ros from '../../utilities/ROS/ROS'

function AutonomousControl() {
    const latitude = createRef();
    const longitude = createRef();

    const [coordState, setCoordState] = useState({
        latitude: 0,
        longitude: 0,
    });

    const updateCoordState = (lat, long) => {
        if (lat.current) {
            setCoordState({
                latitude: lat.current.value,
                longitude: long.current.value,
            });
        }
    };

    const postButtonClick = () => {
        updateCoordState(latitude, longitude)
        console.log("IDK what this does...")
    };

    const gateButtonClick = () => {
        updateCoordState(latitude, longitude)
        console.log("IDK what this does...")
    };

    const updateFeed = () => {
        autoFeed.val("Destination reached! \n" + autoFeed.val())
    };

    const navigateButtonClick = () => {
        updateCoordState(latitude, longitude)
        console.log("Coords: " + latitude.current.value + "°, " + longitude.current.value + "°")
        console.log("Going to coordinates...")

        var navCommand = new ROSLIB.Message({
            target: "Post",
            latitude: latitude.current.value,
            longitude: longitude.current.value,
            accuracy: 3.0
        });
        
        var navGoalGps = new ROSLIB.Message({
            latitude: navCommand.latitude,
            longitude: navCommand.longitude,
            altitude: 0
        });
        
        navCommandPub.publish(navCommand);
        navGpsPub.publish(navGoalGps);
    }
      
    const abortButtonClick = () => {
        updateCoordState(latitude, longitude)
        console.log("Autonomous mode aborting...")

        var navCommand = new ROSLIB.Message({
            target: "Abort",
            latitude: latitude.current.value,
            longitude: longitude.current.value,
            accuracy: 3.0
        });
    
        navCommandPub.publish(navCommand);
    }

    var navCommandPub = new ROSLIB.Topic({
        ros: ros,
        name: '/navigation_command',
        messageType: 'navigation_controller/NavigationCommand'
    });
    
    var navGpsPub = new ROSLIB.Topic({
        ros: ros,
        name: '/nav_goal_gps',
        messageType: 'sensor_msgs/NavSatFix'
    });

    var navStatusSub = new ROSLIB.Topic({
        ros: ros,
        name: '/navigation_status',
        messageType: 'std_msgs/String'
    });
    navStatusSub.subscribe(updateFeed)

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
                            id = "autoFeed"
                        >
                        </InputGroup.Text>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AutonomousControl;
