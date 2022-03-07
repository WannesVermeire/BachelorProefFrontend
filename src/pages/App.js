import React from "react";
import Home from "./Home";
import {Route, Routes} from "react-router-dom";
import Register from "./Register";
import Error from "./Error";
import StudentList from "./StudentList";
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";

function App() {
    return (
        <div className="App">
                <Navbar className="mb-3" bg="dark" variant="dark" expand="lg">
                    <Container >
                        <Navbar.Brand  href="#home">Master Tool</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link to ="/">Home</Nav.Link>
                                <Nav.Link to ="/studentlist">Studentlist</Nav.Link>
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
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/studentlist' element={<StudentList/>}/>
                <Route path='*' element={<Error/>}/>
            </Routes>
        </div>
    );
}

export default App;
