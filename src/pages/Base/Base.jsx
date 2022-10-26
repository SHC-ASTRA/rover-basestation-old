import { Container } from 'react-bootstrap';
import AstraNavbar from '../../components/AstraNavbar/AstraNavbar';

function Base() {
    return (
        <Container className="p-0" fluid>
                <AstraNavbar />
        </Container>
    );
}

export default Base;
