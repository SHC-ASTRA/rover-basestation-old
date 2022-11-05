import { createRef, useContext, useEffect, useState } from 'react';
import {
    Container,
    Modal,
    Row,
    Col,
    Form,
    InputGroup,
    Button,
} from 'react-bootstrap';
import ros from '../../utilities/ROS/ROS';
import { RosContext } from '../../utilities/ROS/RosContext';

function RosModal({ show, closeModal }) {
    const { rosState } = useContext(RosContext);
    
    // References to form inputs
    const webBridgeAddress = createRef();
    const webBridgePort = createRef();

    // Store the state of the form
    const [formState, setFormState] = useState({
        address: 'localhost',
        port: '9090',
    });

    // Update if there is a valid reference
    const updateFormState = (addr, port) => {
        if (addr.current) {
            setFormState({
                address: addr.current.value,
                port: port.current.value,
            });
        }
    };

    // Only update when the show state changes (when the modal dis/appears)
    useEffect(() => {
        updateFormState(webBridgeAddress, webBridgePort);
    }, [show]);

    // Connect Button Configuration
    var connectButtonVariant, connectButtonMessage;
    if (rosState == 'Disconnected') {
        connectButtonVariant = 'success';
        connectButtonMessage = 'Connect';
    } else {
        connectButtonVariant = 'danger';
        connectButtonMessage = 'Disconnect';
    }

    const connectButtonClick = () => {
        if (rosState == 'Disconnected') {
            var url = `ws://${webBridgeAddress.current.value}:${webBridgePort.current.value}`;
            ros.connect(url);
        } else {
            ros.close();
        }
    };

    return (
        <Modal show={show} onHide={closeModal} size="lg">
            <Modal.Header>
                <Modal.Title>ROS Connection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>List of Previous Connections</Col>
                        <Col>
                            <Form>
                                <Form.Group controlId="formRosConnect">
                                    <Form.Label>
                                        ROSBridge Server Address
                                    </Form.Label>
                                    <div className="d-grid gap-2">
                                        <InputGroup>
                                            <InputGroup.Text>
                                                ws://
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                ref={webBridgeAddress}
                                                defaultValue={formState.address}
                                            />
                                            <InputGroup.Text>:</InputGroup.Text>
                                            <Form.Control
                                                type="number"
                                                ref={webBridgePort}
                                                defaultValue={formState.port}
                                                style={{ maxWidth: 85 }}
                                            />
                                        </InputGroup>
                                        <Button
                                            variant={connectButtonVariant}
                                            onClick={connectButtonClick}
                                        >
                                            {connectButtonMessage}
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}

export default RosModal;
