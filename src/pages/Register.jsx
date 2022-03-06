import RegisterForm from "../components/RegisterForm";
import React, {Component} from 'react';

class Register extends Component {
    Register =(details) =>{
        //Saving information in database
        console.log(details);
    }


    //LoginForm en RegisterForm mogen niet tegelijk zichtbaar zijn!
    render(){
        return(
            <div>
                <RegisterForm Register={this.Login} />
                <button onClick={this.Logout}>LOGOUT</button>
            </div>

        );
    }
}

export default Register;