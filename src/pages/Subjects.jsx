import React, {Component} from 'react';
import {Button, Container, Collapse} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {Link} from "react-router-dom";

class Subjects extends Component {
    state = {
        subjects: [],
        details: [false,false,false]
    }
    constructor(props) {
        super(props);
        var axios = require('axios');
        var config = {
            method: 'get',
            url: 'http://localhost:8081/subjectManagement/subjects',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
        };
        var self = this
        axios(config)
            .then(function (res) {
                self.setState({subjects: res.data});
            }).catch(function (error) {
        });
    }

    renderDetails =(subject)=>{
        return(
            <>
                <Button onClick={() => {
                    let details = [...this.state.details];
                    let detail = details[subject.id-1];
                    console.log(detail);
                    detail = !detail;
                    details[subject.id-1] = detail;
                    this.setState({details});
                }
                        }
                        aria-controls={"subjectDescription"}
                        aria-expended={this.state.details[subject.id-1]}
                >
                    Details
                </Button>
                <Collapse in={this.state.details[subject.id-1]}>
                    <div id={"subjectDescription"}>
                        {subject.description}
                    </div>
                </Collapse>
            </>
        )
    }

    renderSubject = (subject) => {
        return(
            <Container fluid="sm" key={subject.id}>
                <div className="card text-white bg-info mb-3">
                    <div className="card-header">Students: {subject.nrOfStudents}</div>
                    <div className="card-body">
                        <h5 className="card-title">{subject.name}</h5>
                        {this.renderDetails(subject)}
                    </div>
                </div>
            </Container>
        )
    }


    render(){
        return(
            <Container>
                {this.state.subjects.map(this.renderSubject)}
            </Container>

        );
    }
}


export default Subjects;