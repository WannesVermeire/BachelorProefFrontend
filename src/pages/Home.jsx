import React, {Component} from 'react';
import LoginForm from "../components/LoginForm";
import {Button, Container} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import qs from 'qs';

class Home extends Component {
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
        }
        axios(config).then(function(res){
            console.log(res.data);
            localStorage.setItem("access_token", JSON.stringify(res.data.access_token));
            localStorage.setItem("refresh_token", JSON.stringify(res.data.refresh_token));
        })
    }
    render(){
        return(
            <Container fluid="sm">
                <LoginForm Login={this.Login} error ={this.state.error}/>
                <h2 >{this.state.error}</h2>
                <div className="card text-white bg-primary mb-3">
                    <div className="card-header">Welkom bij de grootste fout van je leven</div>
                    <div className="card-body">
                        <h5 className="card-title">MasterTool</h5>
                        <p className="card-text">Met deze mastertool geraak je aan een onderwerp voor je masterproef.
                        Als je naar de opbouw van deze tool kijkt zie je dat hij perfect is. Moest je dus geen
                        onderwerp vinden ligt het aan jou en niet aan de makers van deze tool!</p>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Home;