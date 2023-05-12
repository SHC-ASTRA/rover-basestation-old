import React from 'react';
import { Container, Card, InputGroup, Form, ButtonGroup, Button, FormControl, FormGroup } from 'react-bootstrap';
import { createRef, useEffect, useState, useCallback } from 'react';
import './Autonomous-Control.css';
import { useSearchParams } from 'react-router-dom';

function AutonomousControl() {
    const latitude = createRef();
    const longitude = createRef();
    const [searchParams] = useSearchParams();

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
        console.log("Going to coordinates...")
    };

    const abortButtonClick = () => {
        updateCoordState(latitude, longitude, "ABORT")
        console.log("Autonomous mode aborting...")
    };

    useEffect(() => {
        if (coordState && coordState.latitude != 0 && 0 != coordState.longitude) {
            console.log("Move it!");
            console.log(coordState);
        }
    }, [coordState]);

    const postButtonClick = useCallback(() => {
        updateCoordState(latitude, longitude, "POST");
        console.log("IDK what this does...")
    }, [coordState]);

    const gateButtonClick = () => {
        updateCoordState(latitude, longitude, "GATE");
        console.log("IDK what this does...")
    };

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
