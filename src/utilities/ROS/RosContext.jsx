import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import ros from './ROS';

const DefaultRosState = 'Disconnected';
const DefaultRosError = false;

export const RosContext = createContext();

function RosContextProvider({ children }) {
    const [rosState, setRosState] = useState(DefaultRosState);
    const [rosError, setRosError] = useState(DefaultRosError);

    useEffect(
        () => {
            ros.on('error', (error) => {
                setRosError(error);
            });
            ros.on('connection', () => {
                setRosState('Connected');
            });
            ros.on('close', () => {
                setRosState('Disconnected');
            });
        },
        [] // Empty dependency array makes sure callbacks are only registered once
    );

    return (
        <RosContext.Provider value={{ rosState, rosError }}>
            {children}
        </RosContext.Provider>
    );
}

export default RosContextProvider;
