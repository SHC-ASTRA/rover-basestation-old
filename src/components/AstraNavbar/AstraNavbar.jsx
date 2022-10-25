import { Container, Nav, Navbar } from 'react-bootstrap';

function AstraNavbar() {
    return (
        <Navbar className="bg-light" expand="md">
            <Container>
                <Navbar.Brand className="">ASTRA</Navbar.Brand>
                <Navbar.Toggle aria-controls="astra-navbar-nav" />
                <Navbar.Collapse id="astra-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>Status</Nav.Link>
                        <Nav.Link>Rover Control</Nav.Link>
                        <Nav.Link>Arm Control</Nav.Link>
                        <Nav.Link>Biosensor Control</Nav.Link>
                        <Nav.Link>Autonomous Control</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AstraNavbar;
