import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function AstraNavbar() {
    return (
        <Navbar className="bg-primary" expand="md">
            <Container>
                <Navbar.Brand>ASTRA</Navbar.Brand>
                <Navbar.Toggle aria-controls="astra-navbar-nav" />
                <Navbar.Collapse id="astra-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Status</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/Rover-Control">
                            <Nav.Link>Rover Control</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/Arm-Control'>
                            <Nav.Link>Arm Control</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/Biosensor-Control'>
                            <Nav.Link>Biosensor Control</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/Autonomous-Control'>
                            <Nav.Link>Autonomous Control</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AstraNavbar;
