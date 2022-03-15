import React, {Component} from 'react';
import LoginForm from "../components/LoginForm";
import {Button, Container} from 'react-bootstrap';
import Home from "./Home";

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import qs from 'qs';
import {Link} from "react-router-dom";

class Login extends Component {
    constructor(){
        super();
        this.state = {
            error:""
        }
        this.Login = this.Login.bind(this);
    }


    Login = (details) =>{
        var self =this;
        var data = qs.stringify(details);
        var config = {
            method: 'post',
            url: 'http://localhost:8081/authentication/login',
            headers:{
                'Content-Type': "application/x-www-form-urlencoded"
            },
            data: data
        };
        axios(config).then(function(res){
            localStorage.setItem("access_token", JSON.stringify(res.data.access_token));
            localStorage.setItem("refresh_token", JSON.stringify(res.data.refresh_token));
        }).catch(function (error) {
        });
    }
    render(){
        return(
            <Container fluid="sm">
                <LoginForm Login={this.Login} error ={this.state.error}/>
                <h2 >{this.state.error}</h2>
            </Container>
        );
    }
}

export default Login;