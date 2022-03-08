import React, {Component} from 'react';
import LoginForm from "../components/LoginForm";
import {Button, Container} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const api = axios.create ({
    baseURL: 'http://localhost:8081'
})

class Home extends Component {
    state = {
        error:""
    }

    Login = (details) =>{
        /*
        var data = JSON.stringify(details);
        var config = {
            method: 'post',
            url: 'http://localhost:8081/authentication/login',
            headers:{
                'Content-Type': "application/x-www-form-urlencoded"
            },
            data: data
        }
        axios(config).then(function(res){
            console.log(JSON.stringify(res.data));
        })
            .catch(function(error){
                console.log(error);
            })
         */
        api.post('/authentication/login',details).then(res => {
            //Checking information in backend and requesting token for future requests
            if(res) { //ToDo change true to backend request
                this.props.Login(res.data.tokens);
            }
            else {
                this.setState({error: "Details do not match!"});
            }
        })
        console.log(details);
    }

    Logout = () => {
        //Logging out = resetting token
        this.setState({[this.state.user.token]: ''});
        console.log("logged out");
    }

    //LoginForm en RegisterForm mogen niet tegelijk zichtbaar zijn!
    //Logout button <Button onClick={this.Logout}>LOGOUT</Button>
    render(){
        return(
            <Container fluid="sm">
                <LoginForm Login={this.Login} error ={this.state.error}/>
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