import { Container } from 'react-bootstrap';

function ArmControl() {
    return (
            <Container style={{height: '89vh'}}>
                <iframe src = {import.meta.env.VITE_ARM_URL} width = "100%" height = "99%"/>
            </Container>
    );
}

export default ArmControl;
