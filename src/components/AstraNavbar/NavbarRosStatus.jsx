import { useContext, useState } from 'react';
import ros from '../../utilities/ROS/ROS';
import { RosContext } from '../../utilities/ROS/RosContext';
import { RecordCircleFill } from 'react-bootstrap-icons';
import RosModal from '../RosModal/RosModal';

function NavbarRosStatus() {
    const { rosState, rosError } = useContext(RosContext);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    var statusColor, statusMessage;

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

    // var onClick = () => {
    //     if (rosState == 'Disconnected') {
    //         ros.connect('ws://localhost:9090');
    //     } else if (rosState == 'Connected') {
    //         ros.close();
    //     }
    // };

    return (
        <div>
            <div onClick={openModal}>
                <RecordCircleFill color={statusColor} size={20} />
                <span>{statusMessage}</span>
            </div>
            <RosModal show={showModal} closeModal={closeModal} />
        </div>
    );
}

export default NavbarRosStatus;
