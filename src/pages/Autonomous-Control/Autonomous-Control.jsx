import { Container, Card, InputGroup, Form, ButtonGroup, Button, FormControl } from 'react-bootstrap';
import {useState} from 'react';

function statusUpdate() {
    return(
        <div>
            <Form.Control readOnly/>
        </div>
    );
}

function stateButtons(){
    return(
        <ButtonGroup style={{width: "100%"}}>
            <Button className="btn btn-success" style = {{width: "50%"}}>
                Navigate
            </Button>
            <Button className="btn btn-danger" style = {{width: "50%"}}>
                Abort
            </Button>
        </ButtonGroup>
    );
}

function modeButtons(){
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
            <Card style = {{margin: "10px"}}>
                <h3 className="card-header text-center" style = {{marginBottom: "3px"}}>
                    Autonomous Navigation Controls
                </h3>
                <div className = "card-body">
                    <div className = "d-grid gap-3">
                        {coords()}
                        {modeButtons()}
                        {stateButtons()}
                        {statusUpdate()}
                    </div>
                </div>
            </Card>
        </Container>
    );
}

export default AutonomousControl;
