import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AstraNavbar from './components/AstraNavbar/AstraNavbar';
import Status from './pages/Status/Status';
import RoverControl from './pages/Rover-Control/Rover-Control';
import ArmControl from './pages/Arm-Control/Arm-Control';
import BiosensorControl from './pages/Biosensor-Control/Biosensor-Control';
import AutonomousControl from './pages/Autonomous-Control/Autonomous-Control';
import { RosContext } from './utilities/ROS/ROS';

function App() {
    return (
        <RosContext.Provider>
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
                </Routes>
            </Router>
        </RosContext.Provider>
    );
}

export default App;
