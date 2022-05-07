import React,{Component} from 'react'
import backendURL from "../backendURL";
import {Button, Col, Form, Row, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import qs from "qs";
import axios from "axios";

class RegisterCompany extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            address: "",
            BTWnr: "",
            description: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        var axios = require('axios');
        var FormData = require('form-data');
        var data = qs.stringify(this.state);

        var config = {
            method: 'post',
            url: backendURL + '/userManagement/company',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <Container style={{textAlign: "left"}}>
                <Form onSubmit={this.handleSubmit}>
                    <Row className={"mb-3"}>
                        <Form.Group as={Col}  >
                            <Form.Label >Name</Form.Label>
                            <Form.Control type={"text"} name={"name"} id={"name"} onChange={this.changeHandler} required/>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type={"text"} name={"address"} id={"address"} onChange={this.changeHandler} required/>
                    </Form.Group>
                    <Form.Group  className="mb-3">
                        <Form.Label>BTW</Form.Label>
                        <Form.Control type={"text"} name={"BTWnr"} id={"BTWnr"} onChange={this.changeHandler} required/>
                    </Form.Group>
                    <Form.Group  className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type={"text"} name={"description"} id={"description"} onChange={this.changeHandler} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Button type="submit" onSubmit={this.handleSubmit} >Register</Button>
                    </Form.Group>
                </Form>
            </Container>


        );
    }
}

export default RegisterCompany;