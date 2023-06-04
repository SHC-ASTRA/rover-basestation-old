import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AstraNavbar from './components/AstraNavbar/AstraNavbar';
import Status from './pages/Status/Status';
import RoverControl from './pages/Rover-Control/Rover-Control';
import ArmControl from './pages/Arm-Control/Arm-Control';
import BiosensorControl from './pages/Biosensor-Control/Biosensor-Control';
import AutonomousControl from './pages/Autonomous-Control/Autonomous-Control';
import RosContextProvider from './utilities/ROS/RosContext';
import CameraControl from './pages/Camera-Control/Camera-Control';

function App() {
    return (
        <RosContextProvider>
            <Router>
                <AstraNavbar />
                <Routes>
                    <Route exact path="/" element={<Status />}></Route>
                    <Route
                        path="/Rover-Control"
                        element={<RoverControl />}
                    ></Route>
                    <Route path="/Arm-Control" element={<ArmControl />}></Route>
                    <Route
                        path="/Biosensor-Control"
                        element={<BiosensorControl />}
                    ></Route>
                    <Route
                        path="/Autonomous-Control"
                        element={<AutonomousControl />}
                    ></Route>
                    <Route 
                        path='/Camera-Control'
                        element={<CameraControl />}
                    ></Route>
                </Routes>
            </Router>
        </RosContextProvider>
    );
}

export default App;
