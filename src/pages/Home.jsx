import React, {Component} from 'react';
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

class Home extends Component {
    Login = (details) =>{
        console.log(details);
    }
    Register =(details) =>{
        console.log(details);
    }
    render(){
        return(
            <div>
                <LoginForm Login={this.Login} error ={this.error}/>
                <RegisterForm Register={this.Register} error ={this.error}/>
            </div>
        );
    }
}

export default Home;