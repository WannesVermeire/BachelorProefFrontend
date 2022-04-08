import {Link, Outlet} from "react-router-dom"
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import React from "react";
import jwt_decode from "jwt-decode";


const Layout = () => {

    const Logout = () => {
        localStorage.setItem("access_token", JSON.stringify());
        localStorage.setItem("access_token_expired", JSON.stringify());
        localStorage.setItem("refresh_token", JSON.stringify());
        localStorage.setItem("refresh_token_expired", JSON.stringify());
    }

    return (
        <main className={"App"}>
            <Navbar className="mb-3" bg="dark" variant="dark" expand="lg">
                <Container >
                    <Navbar.Brand as={Link} to="/">MasterTool</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to ="/">Home</Nav.Link>
                            <Nav.Link as={Link} to ="/userlist">Userlist</Nav.Link>
                            <Nav.Link as={Link} to ="/subjects">Subjects</Nav.Link>
                        </Nav>
                        <Nav style={{textAlign: "right"}} >
                            <Nav.Link as={Link} onClick={Logout} to ="/login">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </main>
    )
}

export default Layout