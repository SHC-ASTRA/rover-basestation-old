import { Container } from 'react-bootstrap';
import { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Status.css';

function statusIndicator(name) {
    const [status, setStatus] = useState(true);

    return(
        <div style = {{backgroundColor: status ? "green" : "red", width: "100%"}}>
            {name}
        </div>
    )
}

function diagnostics() {
    return(
        <div className = "card">
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

function percentBar(name) {
    const [percent, setPercent] = useState(40)

    let rectHeight = 100 - percent
    rectHeight = rectHeight + "%"

    return(
        <div className = "card">
            <h6 className="card-title text-center">
                {name}
            </h6>
            <svg className = "card-body" style = {{backgroundColor: "green", padding: "2px"}}>
                <rect height = {rectHeight} width = "100%" style = {{fill: "rgb(255,255,255)"}}/>
            </svg>
            {percent + "%"}
        </div>
    )
}

function usage() {
    return(
        <div className = "card">
            <h5 className="card-title text-center">
                Usage
            </h5>
            <div className = "card-body">
                <Row>
                    <Col>
                        {percentBar("CPU")}
                    </Col>
                    <Col>
                        {percentBar("GPU")}
                    </Col>
                    <Col>
                        {percentBar("RAM")}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

function gps() {
    const [metrics, setMetrics] = useState([0,0,0,0,0])

    return(
        <div className = "card">
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
        <div className = "card">
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

// function modeButtons(){
//     const [mode, setMode] = useState("Manual");//replace with current rover mode 

//     let styleBool = false;

//     switch(mode){
//         case "Auto":
//             console.log("Auto");
//             styleBool = true;
//             break;
//         case "Manual":
//             console.log("Manual");
//             styleBool = false;
//             break;
//         default:
//             console.log("No option");
//             break;
//     }
    
//     return(
//         <div className='card' style={{width: '21rem'}}>
//             <h5 className="card-title text-center">Current Mode: {mode}</h5>
//             <div className='card-body'>
//                 <div className='modeButtons'>
//                     <button onClick={()=>setMode("Auto")} style={{backgroundColor: styleBool ? "green" : '#696e69'}} className='selector'>Auto</button>
//                     <button onClick={()=>setMode("Manual")} style={{backgroundColor: styleBool ? '#696e69' : "green"}} className='selector'>Manual</button>
//                 </div>
//             </div>
//         </div>
//     );
// }




function Status() {
    return (
        <Container className = "p-2">
            <Row>
                <Col>
                    {gps()}
                </Col>
                <Col>
                    {usage()}
                </Col>
                <Col>
                    {diagnostics()}
                </Col>
            </Row>
            <Row>
                <Col>
                    {battery()}
                </Col> 
                {/* <Col>
                    {modeButtons()}
                </Col> */}
            </Row>
        </Container>
    );
}

export default Status;
