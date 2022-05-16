import React,{Component} from 'react'

import {Button, Col, Form, Row, Container} from "react-bootstrap";
import {Link, Navigate} from "react-router-dom";

class RegisterForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            telNr: "",
            password: "",
            posted: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.Register(this.state);
        this.setState({posted:true})
    }

    changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            this.state.posted?
                <Navigate to="/" />
                :
            <Container style={{textAlign: "left"}}>
                <Form onSubmit={this.handleSubmit}>
                    <Row className={"mb-3"}>
                        <Form.Group as={Col}  >
                            <Form.Label >First Name</Form.Label>
                            <Form.Control type={"text"} name={"firstName"} id={"firstName"} onChange={this.changeHandler} required/>
                        </Form.Group>
                        <Form.Group as={Col}  >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type={"text"} name={"lastName"} id={"lastName"} onChange={this.changeHandler} required/>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type={"email"} name={"email"} id={"email"} onChange={this.changeHandler} required/>
                    </Form.Group>
                    <Form.Group  className="mb-3">
                        <Form.Label>TelNr</Form.Label>
                        <Form.Control type={"text"} name={"telNr"} id={"telNr"} onChange={this.changeHandler} required/>
                    </Form.Group>
                    <Form.Group  className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={"password"} name={"password"} id={"password"} onChange={this.changeHandler} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Button type="submit" onSubmit={this.handleSubmit} >Register</Button>
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}

export default RegisterForm;