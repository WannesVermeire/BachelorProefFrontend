import React, {Component} from 'react';
import {Container, Button} from 'react-bootstrap';
import axios from 'axios';
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
            url: 'http://localhost:8081/userManagement/users/student',
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
            url: 'http://localhost:8081/userManagement/users/promotor',
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
            url: 'http://localhost:8081/userManagement/company',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
        };
        axios(config)
            .then(function (res) {
                self.setState({companies: res.data});
            }).catch(function (error) {
        });

    }

    roleSwitch =(r)=>{
        console.log(r.target.value);
        this.setState({role: r.target.value})
    }

    renderDropdownMenu =()=>{
        return (
            <div onChange={this.roleSwitch}>
                <label className={"me-1 mb-3"}>Students</label>
                <input className={"me-3"} type="radio" name="roleRadios" value={"Students"}/>
                <label className={"me-1"}>Promotors</label>
                <input className={"me-3"} type="radio" name="roleRadios" value={"Promotors"}/>
                <label className={"me-1"}>Companies</label>
                <input className={"me-3"} type="radio" name="roleRadios" value={"Companies"}/>
            </div>
        )
    }

    renderUsers =()=>{
        console.log(this.state.companies);
        if(this.state.role === "Students"){
            return(
                this.state.students.map(student =>
                    <Container fluid="sm" key={student.id}>
                        <div className="card text-black bg-white mb-3">
                            <div className="row">
                                <div className="col">
                                    <h6 className="m-3" key={student.id}>{student.firstName} {student.lastName}</h6>
                                </div>
                                <div className="col">
                                    <h6 className="m-3" key={student.id}>{student.email}</h6>
                                </div>
                                <div className="col">
                                    <h6 className="m-3" key={student.id}>{student.telNr}</h6>
                                </div>
                                <div className={"col"}>
                                    <Link fluid="sm" to="/studentDetails">
                                        <Button className="m-2" variant={"link"} style={{ color: '#000', textDecoration: 'none' }}>
                                            <h6>Details</h6>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Container>

                )
            )
        }
        if(this.state.role === "Promotors"){
            return(
                this.state.promotors.map(promotor =>
                    <Container fluid="lg" key={promotor.id}>
                        <div className="card text-black bg-white mb-3">
                            <div className="row">
                                <div className="col">
                                    <h6 className="m-3" key={promotor.id}>{promotor.firstName} {promotor.lastName}</h6>
                                </div>
                                <div className="col">
                                    <h6 className="m-3" key={promotor.id}>{promotor.email}</h6>
                                </div>
                                <div className="col">
                                    <h6 className="m-3" key={promotor.id}>{promotor.telNr}</h6>
                                </div>
                                <div className={"col"}>
                                    <Link fluid="sm" to="/studentDetails">
                                        <Button className="m-2" variant={"link"} style={{ color: '#000', textDecoration: 'none' }}>
                                            <h6>Details</h6>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Container>
                )
            )
        }
        if(this.state.role === "Companies"){
            return(
                this.state.companies.map(company =>
                <Container fluid="sm" key={company.id}>
                    <div className="card text-black bg-white mb-3">
                        <div className="row">
                            <div className="col">
                                <h6 className="m-3" key={company.id}>{company.name}</h6>
                            </div>
                            <div className="col">
                                <h6 className="m-3" key={company.id}>{company.description}</h6>
                            </div>
                            <div className="col">
                                <h6 className="m-3" key={company.id}>{company.btwnr}</h6>
                            </div>
                            <div className={"col"}>
                                <Link fluid="sm" to="/studentDetails">
                                    <Button className="m-2" variant={"link"} style={{ color: '#000', textDecoration: 'none' }}>
                                        <h6>Details</h6>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
                )
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
            </Container>
        );
    }
}

export default UserList;