import { Container } from 'react-bootstrap';

function ArmControl() {
    return (
        <Container className="p-3" fluid>
            <div id = "wrapFrame">
                <iframe id = "frame" src="http://localhost:5174/" height = "100%" width = "100%"></iframe>
            </div>
        </Container>
    );
}

export default ArmControl;
