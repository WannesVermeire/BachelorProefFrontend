import React, {Component} from 'react';
import LoginForm from "../components/LoginForm";
import {Button} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {
    state = {
        user:{
            token: ''
        },
        error:""
    }
    Register =(details) =>{
        //Saving information in database
        console.log(details);
    }

    Login = (details) =>{
        /*api.get('/').then(res => {
            console.log(res.data)
            this.setState({students: res.data })
        })*/
        //Checking information in backend and requesting token for future requests
        if(true) { //ToDo change true to backend request
            this.setState({[this.state.user.token]: "backendtoken"});
        }
        else {
            this.setState({error: "Details do not match!"});
        }
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