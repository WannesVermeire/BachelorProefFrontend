import React,{Component} from 'react'
import {Form, Button, Row, Col,Container } from 'react-bootstrap';
import {Link} from "react-router-dom";

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.Login(this.state);
    }

    changeHandler = (e) =>{
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group  as={Row} className={"mb-3"}>
                        <Form.Label column sm={1}>Email address</Form.Label>
                        <Col >
                            <Form.Control type={"email"} name={"email"}  placeholder={"Enter email"} onChange={this.changeHandler} required/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className={"mb-3"}>
                        <Form.Label column sm={1}>Password</Form.Label>
                        <Col >
                            <Form.Control type={"password"} name={"password"} placeholder={"Password"} onChange={this.changeHandler} required/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col >
                            <Button type="submit" onSubmit={this.handleSubmit} >Sign in</Button>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col >
                            <Link to ="/register">
                                <Button variant={"link"}>Don't have an account yet?</Button>
                            </Link>
                        </Col>
                    </Form.Group>
                </Form>

        );
    }
}

export default LoginForm;