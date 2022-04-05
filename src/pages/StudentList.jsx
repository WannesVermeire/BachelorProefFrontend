import React, {Component} from 'react';
import {Container, Form} from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class StudentList extends Component {
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
                <label className={"me-1"}>Students</label>
                <input className={"me-3"} type="radio" name="roleRadios" value={"Students"}/>
                <label className={"me-1"}>Promotors</label>
                <input className={"me-3"} type="radio" name="roleRadios" value={"Promotors"}/>
                <label className={"me-1"}>Companies</label>
                <input className={"me-3"} type="radio" name="roleRadios" value={"Companies"}/>
            </div>
        )
    }

    renderUsers =()=>{
        if(this.state.role === "Students"){
            return(
                <div className="row">
                    <div className="col">
                        {this.state.students.map(student => <h6 key={student.id}>{student.firstName} {student.lastName}</h6> )}
                    </div>
                    <div className="col">
                        {this.state.students.map(student => <h6 key={student.id}>{student.email}</h6> )}
                    </div>
                    <div className="col">
                        {this.state.students.map(student => <h6 key={student.id}>{student.telNr}</h6> )}
                    </div>
                </div>
            )
        }
        if(this.state.role === "Promotors"){
            return(
                <div className="row">
                    <div className="col">
                        {this.state.promotors.map(promotor => <h6 key={promotor.id}>{promotor.firstName} {promotor.lastName}</h6> )}
                    </div>
                    <div className="col">
                        {this.state.promotors.map(promotor => <h6 key={promotor.id}>{promotor.email}</h6> )}
                    </div>
                    <div className="col">
                        {this.state.promotors.map(promotor => <h6 key={promotor.id}>{promotor.telNr}</h6> )}
                    </div>
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
            </Container>
        );
    }
}

export default StudentList;