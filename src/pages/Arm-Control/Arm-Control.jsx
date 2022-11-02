import { Container } from 'react-bootstrap';

function ArmControl() {
    return (
        <Container className="p-3" fluid>
            <div style={{height: '105vh'}}>
                <iframe src = {import.meta.env.VITE_ARM_URL} width = "100%" height = "100%"/>
            </div>
        </Container>
    );
}

export default ArmControl;
