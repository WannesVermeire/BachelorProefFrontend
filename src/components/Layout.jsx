import {Link, Outlet} from "react-router-dom"
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import React from "react";

const Layout = () => {
    return (
        <main className={"App"}>
            <Navbar className="mb-3" bg="dark" variant="dark" expand="lg">
                <Container >
                    <Navbar.Brand as={Link} to="/">Master Tool</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to ="/">Home</Nav.Link>
                            <Nav.Link as={Link} to ="/studentlist">Studentlist</Nav.Link>
                            <Nav.Link as={Link} to ="/subjects">Subjects</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </main>
    )
}

export default Layout