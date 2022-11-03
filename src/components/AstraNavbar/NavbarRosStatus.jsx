import { useEffect } from 'react';
import { useContext, useState } from 'react';
import ros from '../../utilities/ROS/ROS';
import { RosContext } from '../../utilities/ROS/RosContext';

function NavbarRosStatus() {
    const { rosState } = useContext(RosContext);

    useEffect(() => {
        if (rosState.state == 'idle') {
            console.log('Attempting connection');
            ros.connect('ws://localhost');
        }
    }, []);

    return rosState.state;
}

export default NavbarRosStatus;
