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
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </main>
    )
}

export default Layout