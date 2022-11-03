import { useContext, useState } from 'react';
import ros from '../../utilities/ROS/ROS';
import { RosContext } from '../../utilities/ROS/RosContext';
import { RecordCircleFill } from 'react-bootstrap-icons';

function NavbarRosStatus() {
    const { rosState, rosError } = useContext(RosContext);

    var statusColor, statusMessage;

    console.log(rosState, rosError);

    if (rosError) {
        statusColor = 'yellow';
        statusMessage = 'Error';
    } else if (rosState == 'Disconnected') {
        statusColor = 'red';
        statusMessage = 'Disconnected';
    } else if (rosState == 'Connected') {
        statusColor = 'lime';
        statusMessage = 'Connected';
    }

    var onClick = () => {
        if (rosState == 'Disconnected') {
            ros.connect('ws://localhost:9090');
        } else if (rosState == 'Connected') {
            ros.close();
        }
    };

    return (
        <div onClick={onClick}>
            <RecordCircleFill color={statusColor} size={20} />
            <span>{statusMessage}</span>
        </div>
    );
}

export default NavbarRosStatus;
