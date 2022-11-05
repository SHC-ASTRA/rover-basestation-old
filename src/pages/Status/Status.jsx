import { Container } from 'react-bootstrap';
import {useState,props} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Status.css';


function modeButtons(){
    const [mode, setMode] = useState("Manual");//replace with current rover mode  
    let styleBool = false;
    switch(mode){
        case "Auto":
            console.log("Auto");
            styleBool = true;
            break;
        case "Manual":
            console.log("Manual");
            styleBool = false;
            break;
        default:
            console.log("No option");
            break;
    }
    return(
        <div className='card' style={{width: '21rem'}}>
            <h5 className="card-title text-center">Current Mode: {mode}</h5>
            <div className='card-body'>
                <div className='modeButtons'>
                    <button onClick={()=>setMode("Auto")} style={{backgroundColor: styleBool ? "green" : '#696e69'}} className='selector'>Auto</button>
                    <button onClick={()=>setMode("Manual")} style={{backgroundColor: styleBool ? '#696e69' : "green"}} className='selector'>Manual</button>
                </div>
            </div>
        </div>
    );
}




function Status() {
    return (
        <Container className = "p-2">
            <Row>
                <Col>
                    <div className = "card">
                        <h5 className="card-title text-center">
                            GPS
                        </h5>
                        <div className = "card-body">
                            <div className = "d-grid gap-2">
                                <div>
                                    Latitude:
                                </div>
                                <div>
                                    Longitude: 
                                </div>
                                <div>
                                    Altitude: 
                                </div>
                                <div>
                                    Accuracy: 
                                </div>
                                <div>
                                    Time: 
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className = "card">
                        <h5 className="card-title text-center">
                            Performance
                        </h5>
                        <div className = "card-body">
                            <Row>
                                <Col>
                                    <div className = "card">
                                        <h6 className="card-title text-center">
                                            CPU
                                        </h6>
                                        <div className = "card-body">
                                            <div id = 'cpuStatus'>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className = "card">
                                        <h6 className="card-title text-center">
                                            GPU
                                        </h6>
                                        <div className = "card-body">
                                            <div id = 'gpuStatus'>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className = "card">
                                        <h6 className="card-title text-center">
                                            RAM
                                        </h6>
                                        <div className = "card-body">
                                            <div id = 'memoryStatus'> 
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className = "card">
                        <h5 className="card-title text-center">
                            Battery
                        </h5>
                        <div className = "card-body">
                            <div className = "d-grid gap-2">
                                <div>
                                    Charge: 
                                </div>
                                <div>
                                    Voltage: 
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className = "card">
                        <h5 className="card-title text-center">
                            Diagnostics
                        </h5>
                        <div className = "card-body">
                            <div className = "d-grid gap-2">
                                <div>
                                    Coms: 
                                </div>
                                <div>
                                    Arm: 
                                </div>
                                <div>
                                    Bio Sensor: 
                                </div>
                                <div>
                                    Drone: 
                                </div>
                                <div>
                                    LiDar: 
                                </div>
                                <div>
                                    IMU: 
                                </div>
                                <div>
                                    Teensy: 
                                </div>
                                <div>
                                    Controller: 
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                {modeButtons()}
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default Status;
