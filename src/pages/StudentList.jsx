import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import axios from 'axios';

const api = axios.create ({
    baseURL: 'http://localhost:8081/'
})

class StudentList extends Component {
    state = {
        students: []
    }
    constructor() {
        super();
        api.get('/userManagement/users/student').then(res => {
            console.log(res.data)
            this.setState({students: res.data})
        })
    }
    render(){
        return(
            <Container>
                <h2>Students</h2>
                <div className={"users"}>
                    {this.state.students.map(student => <h6 key={student.id}>{student.firstname} {student.lastname} {student.email} {student.telNr}</h6> )}
                </div>
            </Container>

        );
    }

}

export default StudentList;