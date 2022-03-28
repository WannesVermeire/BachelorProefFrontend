import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import axios from 'axios';
import Login from './Login';

const api = axios.create ({
    baseURL: 'http://localhost:8081/'
})

class StudentList extends Component {
    state = {
        students: []
    }
    constructor(props) {
        super(props);
        var axios = require('axios');
        var config = {
            method: 'get',
            url: 'http://localhost:8081/userManagement/users/student',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
        };
        const self = this
        axios(config)
            .then(function (res) {
                self.setState({students: res.data});
            }).catch(function (error) {
            });
    }


    render(){

        return(
            <Container>
                <h2>Students</h2>
                <div className={"users"}>
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
                </div>
            </Container>

        );
    }

}

export default StudentList;