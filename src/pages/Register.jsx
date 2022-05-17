import RegisterForm from "../components/RegisterForm";
import React, {Component} from 'react';
import backendURL from "../backendURL";
import axios from "axios";
import qs from 'qs';

class Register extends Component {
    constructor (){
        super();
        this.state = {
            error:""
        }
    }

    Register =(details) =>{
        let data = qs.stringify(details);
        let config = {
            method: 'post',
            url: backendURL + '/userManagement/users',
            headers:{
                'Content-Type': "application/x-www-form-urlencoded"
            },
            data: data
        }
        axios(config).then(function(res){
        }).catch(function() {
            this.setState({error: "Details do not match!"});
        })
    }


    //LoginForm en RegisterForm mogen niet tegelijk zichtbaar zijn!
    render(){
        return(
            <div className={"mt-5"} style={{textAlign: "center"}}>
                <RegisterForm Register={this.Register} />
            </div>
        );
    }
}

export default Register;