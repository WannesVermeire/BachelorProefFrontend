import React,{Component} from "react";
import Home from "./Home";
import {Link, Route, Routes} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Layout from "../components/Layout"
import RequireAuth from "../components/RequireAuth";
import Unauthorized from "./Unauthorized";
import Subjects from "./Subjects";

import Error from "./Error";
import StudentList from "./StudentList";
import axios from "axios";



class App extends Component {
    //Sla op in state dat je bent ingelogd of niet
    /*Logout = () => {
        localStorage.clear();
    }
    refreshToken = () => {
        console.log("Aan het checken op login");
        var config = {
            method: 'get',
            url: 'http://localhost:8081/authentication/token/refresh',
            headers:{
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('refresh_token'))
            }
        }
        axios(config).then(function(res){
            localStorage.setItem("access_token", JSON.stringify(res.data.access_token));
            localStorage.setItem("refresh_token", JSON.stringify(res.data.refresh_token));
        }).catch(function (error) {
        });
    }*/

    render(){
        return (
            <div className="App">
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path='/login' element={<Login />}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path={'/unauthorized'} element={<Unauthorized/>}/>
                        <Route element={<RequireAuth allowedRoles={["ROLE_STUDENT","ROLE_ADMIN","ROLE_PROMOTOR", "ROLE_COORDINATOR", "ROLE_CONTACT"]}/>}>
                            <Route path='/' element={ <Home />}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN","ROLE_COORDINATOR","ROLE_PROMOTOR"]}/>}>
                            <Route path='/studentlist' element={<StudentList/>}/>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={["ROLE_STUDENT","ROLE_ADMIN","ROLE_PROMOTOR", "ROLE_COORDINATOR", "ROLE_CONTACT"]}/>}>
                            <Route path='/subjects' element={<Subjects />}/>
                        </Route>
                        <Route path='*' element={<Error/>}/>
                    </Route>
                </Routes>
            </div>
        );
    }
}

export default App;
