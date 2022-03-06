import React, {Component} from 'react';
import LoginForm from "../components/LoginForm";


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
    render(){
        return(
            <div>
                <h1>Master Tool</h1>
                <LoginForm Login={this.Login} error ={this.state.error}/>
                <button onClick={this.Logout}>LOGOUT</button>
            </div>

        );
    }
}

export default Home;