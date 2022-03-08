import React, {Component} from 'react';
import LoginForm from "../components/LoginForm";
import {Button} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const api = axios.create ({
    baseURL: 'http://localhost:8081'
})

class Home extends Component {
    state = {
        user:{
            token: ''
        },
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
            console.log(res.data)
            //this.setState({students: res.data})
        })
        //Checking information in backend and requesting token for future requests
        if(true) { //ToDo change true to backend request
            this.setState({[this.state.user.token]: "backendtoken"});
        }
        else {
            this.setState({error: "Details do not match!"});
        }
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
            <div >
                <LoginForm Login={this.Login} error ={this.state.error}/>
            </div>

        );
    }
}

export default Home;