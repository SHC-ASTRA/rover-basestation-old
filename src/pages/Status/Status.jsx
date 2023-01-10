import { Container, InputGroup, Form} from 'react-bootstrap';
import { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Status.css';

function diagnosticIndicator(name, inStatus) {
    const [status, setStatus] = useState(inStatus);

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
    const [status, setStatus] = useState([true, true, true, true, true, true, true])

    return(
        <div className = "card" style = {{width: "25%", margin: "10px"}}>
            <h5 className="card-title text-center">
                Diagnostics
            </h5>
            <div className = "card-body">
                <div className = "d-grid gap-1">
                    {diagnosticIndicator("Communications", status[0])}
                    {diagnosticIndicator("Arm Base", status[1])}
                    {diagnosticIndicator("Biosensor", status[2])}
                    {diagnosticIndicator("Drone", status[3])}
                    {diagnosticIndicator("LiDar", status[4])}
                    {diagnosticIndicator("IMU", status[5])}
                    {diagnosticIndicator("Teensy", status[6])}
                </div>
            </div>
        </div>
    )
}

function usageBar(name, color, inUsage) {
    const [percent, setPercent] = useState(inUsage)

    const barStyle = {
        backgroundColor: color, 
        padding: "2px"
    }

    let rectHeight = 100 - percent
    rectHeight = rectHeight + "%"

    return(
        <div className = "card" style = {{width: "33%", margin: "3px"}}>
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
    const [usages, setUsages] = useState([40,50,60])

    return(
        <div className = "card" style = {{width: "25%", margin: "10px"}}>
            <h5 className="card-title text-center">
                Usage
            </h5>
            <div className = "card-body">
                <div className = "card-deck" style={{display: "flex" }}>
                    {usageBar("CPU", "rgb(40, 128, 40)", usages[0])}
                    {usageBar("GPU", "rgb(50, 50, 184)", usages[1])}
                    {usageBar("RAM", "rgb(184, 50, 50)", usages[2])}
                </div>
            </div>
        </div>
    )
}

function metric(name, nameColor, nameWidth, unit, inMetric) {
    const [metric, setMetric] = useState(inMetric);

    const nameStyle = {
        backgroundColor: nameColor, 
        width: nameWidth
    }

    return(
        <div>
            <InputGroup className="mb-3" style = {{borderColor: "rgb(76, 76, 76)"}}>
                <InputGroup.Text style = {nameStyle}>{name}:</InputGroup.Text>
                <Form.Control style = {{backgroundColor: "rgb(215, 215, 216)"}}
                    value={metric+" "+unit}
                readOnly/>
            </InputGroup>
        </div>
    );
}

function gps() {
    const [metrics, setMetrics] = useState([0,0,0,0,0])

    return(
        <div className = "card" style = {{width: "25%", margin: "10px"}}>
            <h5 className="card-title text-center">
                GPS
            </h5>
            <div className = "card-body">
                <div className = "d-grid gap-1">
                    {metric("Latitude", "rgb(184, 50, 184)", "101px", "°", metrics[0])}
                    {metric("Longitude", "rgb(184, 50, 184)", "101px", "°", metrics[1])}
                    {metric("Altitude", "rgb(184, 128, 50)", "101px", "m", metrics[2])}
                    {metric("Accuracy", "rgb(184, 128, 50)", "101px", "m", metrics[3])}
                    {metric("Time", "rgb(50, 128, 184)", "101px", "s", metrics[4])}
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
                    {metric("Charge", "rgb(184, 184, 50)", "83px", "%", metrics[0])}
                    {metric("Voltage", "rgb(184, 184, 50)", "83px", "V", metrics[1])}
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
