import { useContext, useState } from 'react';
import { RosContext } from '../../utilities/ROS/RosContext';
import { RecordCircleFill } from 'react-bootstrap-icons';
import RosModal from '../RosModal/RosModal';
import { Button } from 'react-bootstrap';
import RosLogo from '../../assets/ros.svg';

function NavbarRosStatus() {
    const { rosState } = useContext(RosContext);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    var statusColor, statusMessage;

    if (rosState == 'Disconnected') {
        statusColor = 'red';
    } else if (rosState == 'Connected') {
        statusColor = 'lime';
    }

    return (
        <div>
            <Button variant="light" onClick={openModal}>
                <RecordCircleFill color={statusColor} size={20} />
                <img src={RosLogo} height={30} className="ps-2" />
            </Button>
            <RosModal show={showModal} closeModal={closeModal} />
        </div>
    );
}

export default NavbarRosStatus;
