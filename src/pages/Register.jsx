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
            <div style={{textAlign: "center"}}>
                <RegisterForm Register={this.Register} />
            </div>

        );
    }
}

export default Register;