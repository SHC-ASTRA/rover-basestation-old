import { Container, InputGroup, Form, CardGroup, Card} from 'react-bootstrap';
import { useState } from 'react'
import './Status.css';

function rosFeed() {
    return(
        <Card style = {{width: "100%"}}>
            <Card.Header className = "h5">
                ROS Feed
            </Card.Header>
            <Card.Body>
                <InputGroup.Text className = "feed">
                </InputGroup.Text>
            </Card.Body>
        </Card>
    );
}

function diagnosticIndicator(name, inStatus) {
    const [status, setStatus] = useState(inStatus);

    return(
        <div>
            <InputGroup>
                <InputGroup.Text className = "indicator" style = {{backgroundColor: status ? "rgb(54, 146, 54)" : "rgb(198, 54, 54)"}}></InputGroup.Text>
                <Form.Control
                    value={name}
                readOnly/>
            </InputGroup>
        </div>
    );
}

function diagnostics() {
    const [status, setStatus] = useState([true, true, false, true, true, false, true, true])

    return(
        <Card style = {{width: "25%"}}>
            <Card.Header className = "h5">
                Diagnostics
            </Card.Header>
            <Card.Body>
                <div className = "d-grid">
                    {diagnosticIndicator("Communications", status[0])}
                    {diagnosticIndicator("Arm Base", status[1])}
                    {diagnosticIndicator("Biosensor", status[2])}
                    {diagnosticIndicator("Drone", status[3])}
                    {diagnosticIndicator("LiDar", status[4])}
                    {diagnosticIndicator("IMU", status[5])}
                    {diagnosticIndicator("Teensy", status[6])}
                    {diagnosticIndicator("Controller", status[7])}
                </div>
            </Card.Body>
        </Card>
    )
}

function usageBar(name, barColor, inUsage) {
    const [percent, setPercent] = useState(inUsage)

    let rectHeight = 100 - percent
    rectHeight = rectHeight + "%"

    return(
        <Card style = {{width: "33%"}}>
            <Card.Header className = "h7">
                {name}
            </Card.Header>
            <svg style = {{backgroundColor: barColor}}>
                <rect height = {rectHeight} width = "100%" style = {{fill: "rgb(255,255,255)"}}/>
            </svg>
            <Card.Footer>
                {percent + "%"}
            </Card.Footer>
        </Card>
    )
}

function usage() {
    const [usages, setUsages] = useState([25,66,100])

    return(
        <Card style = {{width: "25%"}}>
            <Card.Header className = "h5">
                Usage
            </Card.Header>
            <Card.Body>
                <div className = "card-deck" style = {{display: "flex"}}>
                    {usageBar("CPU", "rgb(58, 158, 58)", usages[0])}
                    {usageBar("GPU", "rgb(58, 58, 214)", usages[1])}
                    {usageBar("RAM", "rgb(214, 58, 58)", usages[2])}
                </div>
            </Card.Body>
        </Card>
    )
}

function metric(name, nameColor, nameWidth, unit, inMetric) {
    const [metric, setMetric] = useState(inMetric);

    return(
        <div>
            <InputGroup>
                <InputGroup.Text style = {{width: nameWidth, backgroundColor: nameColor}}>{name}:</InputGroup.Text>
                <Form.Control
                    value = {metric + " " + unit}
                readOnly/>
            </InputGroup>
        </div>
    );
}

function gps() {
    const [metrics, setMetrics] = useState([0,0,0,0,0])

    return(
        <Card style = {{width: "25%"}}>
            <Card.Header className = "h5">
                GPS
            </Card.Header>
            <Card.Body>
                <div className = "d-grid">
                    {metric("Latitude", "rgb(214, 58, 214)", "101px", "°", metrics[0])}
                    {metric("Longitude", "rgb(214, 58, 214)", "101px", "°", metrics[1])}
                    {metric("Altitude", "rgb(214, 150, 58)", "101px", "m", metrics[2])}
                    {metric("Accuracy", "rgb(214, 150, 58)", "101px", "m", metrics[3])}
                    {metric("Time", "rgb(58, 150, 214)", "101px", "s", metrics[4])}
                </div>
            </Card.Body>
        </Card>
    )
}

function battery() {
    const [metrics, setMetrics] = useState([0,0]);

    return(
        <Card style = {{width: "25%"}}>
            <Card.Header className = "h5">
                Battery
            </Card.Header>
            <Card.Body>
                <div className = "d-grid">
                    {metric("Charge", "rgb(214, 214, 58)", "83px", "%", metrics[0])}
                    {metric("Voltage", "rgb(214, 214, 58)", "83px", "V", metrics[1])}
                </div>
            </Card.Body>
        </Card>
    )
}

function Status() {
    return (
        <Container className = "p-4">
            <div className = "card-deck">
                {gps()}
                {usage()}
                {diagnostics()}
                {battery()}
            </div>
            <div className = "card-deck">
                {rosFeed()}
            </div>
        </Container>
    );
}

export default Status;
