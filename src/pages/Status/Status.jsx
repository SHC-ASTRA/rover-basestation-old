import { Container, InputGroup, Form} from 'react-bootstrap';
import { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Status.css';

function statusIndicator(name) {
    const [status, setStatus] = useState(true);

    return(
        <div>
            <InputGroup className="mb-3" style = {{borderColor: "rgb(76, 76, 76)"}}>
                <InputGroup.Text style = {{backgroundColor: status ? "rgb(40, 128, 40)" : "rgb(184, 50, 50)", width: "30px"}}></InputGroup.Text>
                <Form.Control style = {{backgroundColor: "rgb(215, 215, 216)"}}
                    value={name}
                readOnly/>
            </InputGroup>
        </div>
    );
}

function diagnostics() {
    return(
        <div className = "card" style = {{width: "25%", margin: "10px"}}>
            <h5 className="card-title text-center">
                Diagnostics
            </h5>
            <div className = "card-body">
                <div className = "d-grid gap-2">
                    {statusIndicator("Coms")}
                    {statusIndicator("Arm")}
                    {statusIndicator("Bio Sensor")}
                    {statusIndicator("Drone")}
                    {statusIndicator("LiDar")}
                    {statusIndicator("IMU")}
                    {statusIndicator("Teensy")}
                    {statusIndicator("Controller")}
                </div>
            </div>
        </div>
    )
}

function percentBar(name, color) {
    const [percent, setPercent] = useState(40)

    const barStyle = {
        backgroundColor: color, 
        padding: "2px"
    }

    let rectHeight = 100 - percent
    rectHeight = rectHeight + "%"

    return(
        <div className = "card">
            <h6 className="card-title text-center">
                {name}
            </h6>
            <svg className = "card-body" style = {barStyle}>
                <rect height = {rectHeight} width = "100%" style = {{fill: "rgb(255,255,255)"}}/>
            </svg>
            <div style = {{textAlign: "center"}}>
                {percent + "%"}
            </div>
        </div>
    )
}

function usage() {
    return(
        <div className = "card" style = {{width: "25%", margin: "10px"}}>
            <h5 className="card-title text-center">
                Usage
            </h5>
            <div className = "card-body">
                <Row>
                    <Col>
                        {percentBar("CPU", "rgb(40, 128, 40)")}
                    </Col>
                    <Col>
                        {percentBar("GPU", "rgb(50, 50, 184)")}
                    </Col>
                    <Col>
                        {percentBar("RAM", "rgb(184, 50, 50)")}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

function gps() {
    const [metrics, setMetrics] = useState([0,0,0,0,0])

    return(
        <div className = "card" style = {{width: "25%", margin: "10px"}}>
            <h5 className="card-title text-center">
                GPS
            </h5>
            <div className = "card-body">
                <div className = "d-grid gap-2">
                    <div>
                        Latitude: {metrics[0]}°
                    </div>
                    <div>
                        Longitude: {metrics[1]}°
                    </div>
                    <div>
                        Altitude: {metrics[2]}m
                    </div>
                    <div>
                        Accuracy: {metrics[3]}m
                    </div>
                    <div>
                        Time: {metrics[4]}s
                    </div>
                </div>
            </div>
        </div>
    )
}

function battery() {
    const [metrics, setMetrics] = useState([0,0]);

    return(
        <div className = "card" style = {{width: "25%", margin: "10px"}}>
            <h5 className="card-title text-center">
                Battery
            </h5>
            <div className = "card-body">
                <div className = "d-grid gap-2">
                    <div>
                        Charge: {metrics[0]}%
                    </div>
                    <div>
                        Voltage: {metrics[1]}V
                    </div>
                </div>
            </div>
        </div>
    )
}

function Status() {
    return (
        <Container className = "p-4">
            <div className = "card-deck" style={{display: "flex" }}>
                {gps()}
                {usage()}
                {diagnostics()}
                {battery()}
            </div>
        </Container>
    );
}

export default Status;
