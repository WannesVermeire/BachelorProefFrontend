import RegisterForm from "../components/RegisterForm";
import React, {Component} from 'react';
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
        var data = qs.stringify(details);
        var config = {
            method: 'post',
            url: 'http://localhost:8081/userManagement/users',
            headers:{
                'Content-Type': "application/x-www-form-urlencoded"
            },
            data: data
        }
        axios(config).then(function(res){
        }).catch(function() {
            this.setState({error: "Details do not match!"});
        })
        console.log(details);
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