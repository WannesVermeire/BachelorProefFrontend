import React, {Component} from 'react';
import backendURL from "../backendURL";
import {Container, Button, Alert} from 'react-bootstrap';
import axios from 'axios';
import ReactFileReader from 'react-file-reader';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

class UserList extends Component {
    state = {
        promotors: [],
        companies: [],
        students: [],
        dropdown: false,
        role: "Students"
    }
    constructor(props) {
        super(props);
        const self = this
        var axios = require('axios');

        //Get all students
        var config = {
            method: 'get',
            url: backendURL + '/userManagement/users/student',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
        };
        axios(config)
            .then(function (res) {
                self.setState({students: res.data});
            }).catch(function (error) {
            });

        //Get all promotors
        config = {
            method: 'get',
            url: backendURL + '/userManagement/users/promotor',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
        };
        axios(config)
            .then(function (res) {
                self.setState({promotors: res.data});
            }).catch(function (error) {
        });

        //Get all companies
        config = {
            method: 'get',
            url: backendURL + '/userManagement/company',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
        };
        axios(config)
            .then(function (res) {
                console.log(res.data);
                self.setState({companies: res.data});
            }).catch(function (error) {
        });

    }

    roleSwitch =(r)=>{
        this.setState({role: r.target.value})
    }

    uploadFile = (e) =>{
        let files=e.target.files;
        let axios = require('axios');
        let data = new FormData();
        data.append('file', files[0]);

        let config = {
            method: 'post',
            url: backendURL + '/userManagement/users/batch',
            headers: {
                'Authorization': 'Bearer ' +JSON.parse(localStorage.getItem('access_token')),
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    renderDropdownMenu =()=>{
        return (
            <div style={{overflow: "hidden"}}>
                <div style={{float: "left" }} onChange={this.roleSwitch}>
                    <label className={"mt-2 me-1 mb-3"}>Students</label>
                    <input className={"me-3"} type="radio" name="roleRadios" value={"Students"}/>
                    <label className={"me-1"}>Promotors</label>
                    <input className={"me-3"} type="radio" name="roleRadios" value={"Promotors"}/>
                    <label className={"me-1"}>Companies</label>
                    <input className={"me-3"} type="radio" name="roleRadios" value={"Companies"}/>
                </div>
                <div style={{ float:"right"  }}>
                    <Link  className={"me-3"} style={{ textDecoration: 'none' }} to ="/register">
                        <Button variant={"outline-success"}>
                            Add new user
                        </Button>
                    </Link>
                    <Link  style={{ textDecoration: 'none' }} to ="/registerCompany">
                        <Button variant={"outline-success"}>
                            Add new company
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    renderUsers =()=>{
        if(this.state.role === "Students"){
            return(
                <div className="card text-black bg-secondary mb-3">
                    {this.state.students.map(student =>
                        <Container fluid="sm" key={student.id}>
                            <div style={{textAlign: 'left'}} className="card text-black bg-white m-3">
                                <div className="row">
                                    <div className="col-3">
                                        <h6 className="m-3" key={student.id}>{student.firstName} {student.lastName}</h6>
                                    </div>
                                    <div className="col-3" >
                                        <h6 className="m-3" key={student.id}>{student.email}</h6>
                                    </div>
                                    <div className="col-3">
                                        <h6 className="m-3" key={student.id}>{student.telNr}</h6>
                                    </div>
                                    <div className={"col-3"}>
                                        <Link fluid="sm" to={{pathname:"/studentDetails/" + student.id }}>
                                            <Button className="m-2" variant={"link"}
                                                    style={{color: '#000', textDecoration: 'none'}}>
                                                <h6>Details</h6>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    )
                    }
                </div>
            )
        }
        if(this.state.role === "Promotors"){
            return(
                <div className="card text-black bg-secondary mb-3">
                    {this.state.promotors.map(promotor =>
                            <Container fluid="lg" key={promotor.id}>
                                <div className="card text-black bg-white m-3">
                                    <div className="row">
                                        <div className="col-3">
                                            <h6 className="m-3" key={promotor.id}>{promotor.firstName} {promotor.lastName}</h6>
                                        </div>
                                        <div className="col-3">
                                            <h6 className="m-3" key={promotor.id}>{promotor.email}</h6>
                                        </div>
                                        <div className="col-3">
                                            <h6 className="m-3" key={promotor.id}>{promotor.telNr}</h6>
                                        </div>
                                        <div className={"col-3"}>
                                            <Link fluid="sm" to={"/promotorDetails/" + promotor.id}>
                                                <Button className="m-2" variant={"link"}
                                                        style={{color: '#000', textDecoration: 'none'}}>
                                                    <h6>Details</h6>
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        )
                    }
                </div>

            )
        }
        if(this.state.role === "Companies"){
            return(
                <div className="card text-black bg-secondary mb-3">
                    {this.state.companies.map(company =>
                            <Container fluid="sm" key={company.id}>
                                <div className={company.approved?"card text-black m-3 bg-white" : "card text-black m-3 bg-danger"}>
                                    <div className="row">
                                        <div className="col-2">
                                            <h6 className="m-3" key={company.id}>{company.name}</h6>
                                        </div>
                                        <div className="col-2">
                                            <h6 className="m-3" key={company.id}>{company.btwNr}</h6>
                                        </div>
                                        <div className={"col-2"}>
                                            <Link fluid="sm" to={"/companyDetails/" + company.id}>
                                                <Button className="m-2" variant={"link"}
                                                        style={{color: '#000', textDecoration: 'none'}}>
                                                    <h6>Details</h6>
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        )
                    }
                </div>
            )
        }
    }
    render(){
        return(
            <Container>
                {this.renderDropdownMenu()}
                <div className={"users"}>
                    {this.renderUsers()}
                </div>
                <Alert style={{textAlign: 'center'}} variant={"warning"}>
                    <input type ="file" placeholder="Add user batch file" onChange={(e)=>this.uploadFile(e)}/>
                </Alert>
            </Container>
        );
    }
}

export default UserList;