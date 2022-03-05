import React, {Component} from 'react';
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

class Home extends Component {
    state = {
        user:{
            token: ''
        },
        error:""
    }
    Register =(details) =>{
        //Saving information in database
        this.Login(details);
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
                <div>
                    <LoginForm Login={this.Login} error ={this.state.error}/>
                </div>
                <div style={{display: 'none'}}>
                    <RegisterForm Register={this.Register} />
                </div>
                <button onClick={this.Logout}>LOGOUT</button>
            </div>

        );
    }
}

export default Home;