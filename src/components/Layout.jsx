import {Link, Outlet} from "react-router-dom"
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import React from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {AiOutlineUser} from "react-icons/ai"
import isRole from "../hooks/isRole";


const Layout = () => {
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.setItem("access_token", JSON.stringify());
        localStorage.setItem("access_token_expired", JSON.stringify());
        localStorage.setItem("refresh_token", JSON.stringify());
        localStorage.setItem("refresh_token_expired", JSON.stringify());
    }

    let isRole = (r)=>{
        let roles = null;
        if(localStorage.getItem('access_token')!=='undefined'){
            const decoded = jwt_decode(JSON.parse(localStorage.getItem('access_token')));
            roles = decoded.roles;
            for(let i = 0; i < roles.length; i++){
                if(r===roles[i])return true;
            }
        }
        return false;
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
                            <Nav.Link as={Link} to ="/subjects">Subjects</Nav.Link>
                            {(isRole("ROLE_ADMIN") || isRole("ROLE_COORDINATOR"))?<Nav.Link as={Link} to ="/userlist">Userlist</Nav.Link>: null}
                            {isRole("ROLE_STUDENT")? <Nav.Link as={Link} to ="/finalSubject">Final subject</Nav.Link> :null}
                        </Nav>
                        <Nav style={{textAlign: "right"}} >
                            <Nav.Link as={Link} to ="/userDetails">
                                <AiOutlineUser/>
                            </Nav.Link>
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