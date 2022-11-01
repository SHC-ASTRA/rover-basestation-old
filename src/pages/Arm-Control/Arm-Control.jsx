import { Container } from 'react-bootstrap';
import IframeResizer from 'iframe-resizer-react'

function ArmControl() {
    return (
        
        <Container className="p-3" fluid>
            <div>
                <iframe src = {import.meta.env.VITE_ARM_URL}/>
            </div>
        </Container>
    );
}

export default ArmControl;
