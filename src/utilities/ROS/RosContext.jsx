import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import ros from './ROS';

const DefaultRosState = {
    state: 'idle',
};

export const RosContext = createContext();

function RosContextProvider({ children }) {
    const [rosState, setRosState] = useState(DefaultRosState);

    useEffect(() => {
        ros.on('error', (error) => {
            console.log('error');
            setRosState({ state: 'idle' });
        });
    }, []);

    return (
        <RosContext.Provider value={{ rosState, setRosState }}>
            {children}
        </RosContext.Provider>
    );
}

export default RosContextProvider;
