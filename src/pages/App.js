import React,{Component} from "react";
import Home from "./Home";
import {Link, Route, Routes} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

import Error from "./Error";
import StudentList from "./StudentList";
import {Navbar, Container, Nav, NavDropdown, Button} from "react-bootstrap";
import axios from "axios";

class App extends Component {
    Logout = () => {
        localStorage.clear();
    }
    refreshToken = () => {
        console.log("Aan het checken op login");
        var config = {
            method: 'get',
            url: 'http://localhost:8081/authentication/token/refresh',
            headers:{
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('refresh_token'))
            }
        }
        axios(config).then(function(res){
            localStorage.setItem("access_token", JSON.stringify(res.data.access_token));
            localStorage.setItem("refresh_token", JSON.stringify(res.data.refresh_token));
        }).catch(function (error) {
        });
    }
    render(){
        return (
            <div className="App">
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
                <Routes>
                    <Route path='/' element={ <Home />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/studentlist' element={<StudentList/>}/>
                    <Route path='*' element={<Error/>}/>
                </Routes>
            </div>
        );
    }
}

export default App;
