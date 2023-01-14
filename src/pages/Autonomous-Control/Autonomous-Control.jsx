import { Container, Card, InputGroup, Form, ButtonGroup, Button } from 'react-bootstrap';
import {useState} from 'react';

function buttons(){
    return(
        <div>
            <ButtonGroup style={{width: "100%"}}>
                <Button>
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
        <InputGroup className="mb-3">
            <InputGroup.Text>Coordinates:</InputGroup.Text>
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
            <Card style = {{margin: "10px"}}>
                <h3 className="card-title text-center" style = {{margin: "10px"}}>
                    Autonomous Navigation Controls
                </h3>
                <div className = "card-body">
                    <div className = "d-grid gap-1">
                        {coords()}
                        {buttons()}
                    </div>
                </div>
            </Card>
        </Container>
    );
}

export default AutonomousControl;
