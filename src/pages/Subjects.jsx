import React, {Component} from 'react';
import {Button, Container, Collapse, Nav} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {Link} from "react-router-dom";
import jwt_decode from "jwt-decode";
import FormData from "form-data";
import backendURL from "../backendURL";
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';

class Subjects extends Component {
    state = {
        subjects: [],
        details: [],
        approved: [],
        liked: []
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
                self.setState({approved: res.data.map(subjects=>subjects.approved)})
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

    approve =(sub)=>{
        let axios = require('axios');
        let FormData = require('form-data');
        let data = new FormData();
        data.append('approved', 'true');

        let config = {
            method: 'put',
            url: backendURL + '/subjectManagement/subjects/' + sub.id + '/setApproved',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
            },
            data : data
        };
        let self = this
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                let approveds = [...self.state.approved];
                let approve = true;
                approveds[self.state.subjects.findIndex(subject => subject.id === sub.id)] = approve;
                self.setState({approved: approveds});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    disapprove =(sub)=>{
        let axios = require('axios');
        let FormData = require('form-data');
        let data = new FormData();
        data.append('approved', 'false');

        let config = {
            method: 'put',
            url: backendURL + '/subjectManagement/subjects/' + sub.id + '/setApproved',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
            },
            data : data
        };
        let self = this
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                let disapproveds = [...self.state.approved];
                let approve = false;
                disapproveds[self.state.subjects.findIndex(subject => subject.id === sub.id)] = approve;
                self.setState({approved: disapproveds});
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({random: 'lol'})
    }

    approvedButton = (sub) =>{
        if(this.state.approved[this.state.subjects.findIndex(subject => subject.id === sub.id)]) {
            return (
                <Button onClick={()=>{this.disapprove(sub)}} variant={"outline-danger"}>
                    Disapprove
                </Button>)
        }
        else {
            return (
                <Button onClick={()=>{this.approve(sub)}}  variant={"outline-success"}>
                    Approve
                </Button>)
        }
    }
    likeButton = (sub) =>{
        if(false) {
            return (
                <Button onClick={()=>{}} variant={"outline-warning"} >
                    <AiOutlineHeart/>
                </Button>)
        }
        else {
            return (
                <Button onClick={()=>{}} variant={"outline-warning"}>
                    <AiFillHeart/>
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
                    <div className="card-header">
                        <div style={{float: 'left'}}>Students: {subject.nrOfStudents}</div>
                        <div style={{float: 'right'}}>{this.isRole("ROLE_ADMIN")?
                            this.approvedButton(subject): this.isRole("ROLE_STUDENT")?
                                this.likeButton(subject):
                                null}
                        </div>
                    </div>

                    <div className="card-body">
                        <h5 className="card-title">{subject.name}</h5>
                        <h6>Tags: {subject.tags.map(tags => tags.name)+" "}</h6>
                        {this.renderDetails(subject)}
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