import React, {Component} from 'react';
import {Button, Container, Collapse, Nav} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {Link} from "react-router-dom";
import jwt_decode from "jwt-decode";
import FormData from "form-data";
import backendURL from "../backendURL";

class Subjects extends Component {
    state = {
        subjects: [],
        approved: [],
        details: []
    }
    constructor(props) {
        super(props);
        let axios = require('axios');
        let config = {
            method: 'get',
            url: backendURL + '/subjectManagement/subjects',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
        };
        let self = this
        axios(config)
            .then(function (res) {
                self.setState({subjects: res.data});
                self.setState({approved: res.data.approved});
                console.log(self.state);
            }).catch(function (error) {
        });

    }


    isRole = (r)=>{
        let roles = null;
        if(localStorage.getItem('access_token')!=='undefined'){
            const decoded = jwt_decode(JSON.parse(localStorage.getItem('access_token')));
            roles = decoded.roles;
            for(let i = 0; i < roles.length; i++){
                if(r===roles[i])return true;
            }
        }
        return false;
    }

    approve =(subject)=>{
        let axios = require('axios');
        let FormData = require('form-data');
        let data = new FormData();
        data.append('approved', 'true');

        let config = {
            method: 'put',
            url: backendURL + '/subjectManagement/subjects/' + subject.id + '/setApproved',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
            },
            data : data
        };
        let self = this
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                self.setState({approved: response.data.aproved})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    disapprove =(subject)=>{
        let axios = require('axios');
        let FormData = require('form-data');
        let data = new FormData();
        data.append('approved', 'false');

        let config = {
            method: 'put',
            url: backendURL + '/subjectManagement/subjects/' + subject.id + '/setApproved',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
            },
            data : data
        };
        let self = this
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                self.setState({approved: response.data.aproved})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    approvedButton = (subject) =>{
        if(subject.approved) {
            return (
                <Button onClick={()=>{this.disapprove(subject)}} className={"m-3"} variant={"outline-danger"}>
                    Disapprove
                </Button>)
        }
        else {
            return (
                <Button onClick={()=>{this.approve(subject)}} className={"m-3"} variant={"outline-success"}>
                    Approve
                </Button>)
        }
    }

    renderDetails =(subject)=>{
        return(
            <>
                <Button variant="secondary" onClick={() => {
                    let details = [...this.state.details];
                    let detail = details[subject.id-1];
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
                <div className="card text-white bg-dark mb-3">
                    <div className="card-header">Students: {subject.nrOfStudents}</div>
                    <div className="card-body">
                        <h5 className="card-title">{subject.name}</h5>
                        <h6>Tags: {subject.tags.map(tags => tags.name)+" "}</h6>
                        {this.renderDetails(subject)}
                        {this.isRole("ROLE_ADMIN")?this.approvedButton(subject): null}
                    </div>
                </div>
            </Container>
        )
    }

    render(){
        return(
            <Container>
                <Container className={"mb-3"} style={{textAlign: 'right'}} >
                    <Link to ="/subjectForm">
                        <Button variant={"outline-success"}>
                            Upload
                        </Button>
                    </Link>
                </Container>
                {this.state.subjects.map(this.renderSubject)}
            </Container>
        );
    }
}


export default Subjects;