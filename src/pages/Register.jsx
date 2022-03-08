import RegisterForm from "../components/RegisterForm";
import React, {Component} from 'react';
import axios from "axios";

const api = axios.create ({
    baseURL: 'http://localhost:8081'
})
class Register extends Component {
    Register =(details) =>{
        api.post('/userManagement/users',details).then(res => {
            console.log(res.data)
            //this.setState({students: res.data})
        })
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