import { Container, Card, InputGroup, Form, ButtonGroup, Button, FormControl, FormGroup } from 'react-bootstrap';
import { useState } from 'react';
import './Autonomous-Control.css';

function autonomousFeed() {
    return(
        <div>
            <InputGroup.Text className = "feed">
            </InputGroup.Text>
        </div>
    );
}

function stateButtons(){
    return(
        <ButtonGroup>
            <Button className="btn-success">
                Navigate
            </Button>
            <Button className="btn-danger">
                Abort
            </Button>
        </ButtonGroup>
    );
}

function modeButtons(){
    return(
        <div>
            <ButtonGroup>
                <Button className = "btn-info">
                    Post
                </Button>
                <Button>
                    Gate
                </Button>
            </ButtonGroup>
        </div>
    );
}

function coords() {
    return(
        <InputGroup>
            <InputGroup.Text>Coordinates</InputGroup.Text>
            <Form.Control
                placeholder="Latitude"
            />
            <InputGroup.Text>,</InputGroup.Text>
            <Form.Control
                placeholder="Longitude"
            />
        </InputGroup>
    );
}

function AutonomousControl() {
    return (
        <Container className = "p-4">
            <Card>
                <Card.Header className = "h5">
                    Autonomous Controls
                </Card.Header>
                <Card.Body>
                    <div className = "d-grid">
                        {coords()}
                        {modeButtons()}
                        {stateButtons()}
                        {autonomousFeed()}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AutonomousControl;
