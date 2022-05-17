import React, {Component} from 'react';
import {Button, Collapse, Container} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {Link} from "react-router-dom";
import FormData from "form-data";
import backendURL from "../backendURL";
import {AiFillHeart, AiOutlineHeart, AiFillStar, AiOutlineStar, AiFillFlag, AiOutlineFlag} from 'react-icons/ai';
import isRole from "../hooks/isRole"
import Tooltip from '@mui/material/Tooltip';
import subDelete from "../hooks/subDelete";
import qs from "qs";

class Subjects extends Component {
    state = {
        subjects: [],
        preferredStudents: [],
        details: [],
        approved: [],
        liked: [],
        ownID: ''
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
                self.setState({approved: res.data.map(subjects=>subjects.approved)});
                for(let i =0; i < res.data.length; i++){
                    let subjectId = res.data[i].id;
                    let FormData = require('form-data');
                    let data = new FormData();
                    data.append('subjectId', subjectId);
                    let config = {
                        method: 'post',
                        url: backendURL + '/subjectManagement/subjects/preferredStudents',
                        headers: {
                            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
                        },
                        data: data
                    };
                    axios(config)
                        .then(function (res2) {
                            let preferredStudentsCopy = [...self.state.preferredStudents];
                            preferredStudentsCopy[i] = res2.data;
                            self.setState({preferredStudents: preferredStudentsCopy});
                        }).catch(function (error) {
                    });
                }

            }).catch(function (error) {
        });
        config = {
            method: 'get',
            url: backendURL + '/userManagement/users/ownId',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
        };
        axios(config)
            .then(function (res) {
                self.setState({ownID: res.data});
                config = {
                    method: 'get',
                    url: backendURL + '/userManagement/users/' + res.data + '/favouriteSubjects',
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
                };
                axios(config)
                    .then(function (res2) {
                        self.setState({liked: res2.data});
                    }).catch(function (error) {
                });
            }).catch(function (error) {
        });
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
                let disapproveds = [...self.state.approved];
                let approve = false;
                disapproveds[self.state.subjects.findIndex(subject => subject.id === sub.id)] = approve;
                self.setState({approved: disapproveds});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    approvedButton = (sub) =>{
        if(this.state.approved[this.state.subjects.findIndex(subject => subject.id === sub.id)]) {
            return (
                <Button className={'me-2'} onClick={()=>{this.disapprove(sub)}} variant={"outline-warning"}>
                    Disapprove
                </Button>)
        }
        else {
            return (
                <Button className={'me-2'} onClick={()=>{this.approve(sub)}}  variant={"outline-success"}>
                    Approve
                </Button>)
        }
    }
    likeButton = (sub) =>{
        let isLiked = false;
        for(let i =0; i < this.state.liked.length; i++){
            if(this.state.liked[i].id===sub.id)isLiked = true;
        }
        if(isLiked) {
            return (
                <Button onClick={()=>{this.dislikeSubject(sub)}} variant={"outline-warning"} >
                    <AiFillHeart/>
                </Button>)
        }
        else {
            return (
                <Button onClick={()=>{this.likeSubject(sub)}} variant={"outline-warning"}>
                    <AiOutlineHeart/>
                </Button>)
        }
    }

    likeSubject = (sub) =>{
        let qs = require('qs');
        let data = qs.stringify({
            'userId' : this.state.ownID,
            'subjectId': sub.id
        });
        let config = {
            method: 'post',
            url: backendURL + '/userManagement/users/student/addFavouriteSubject',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
            },
            data : data
        };
        let self = this
        axios(config)
            .then(function (response) {
                config = {
                    method: 'get',
                    url: backendURL + '/userManagement/users/' + self.state.ownID + '/favouriteSubjects',
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
                };
                axios(config)
                    .then(function (res2) {
                        self.setState({liked: res2.data});
                    }).catch(function (error) {
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    dislikeSubject = (sub) =>{
        let qs = require('qs');
        let data = qs.stringify({
            'userId' : this.state.ownID,
            'subjectId': sub.id
        });
        let config = {
            method: 'delete',
            url: backendURL + '/userManagement/users/student/favouriteSubject',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };
        let self = this
        axios(config)
            .then(function (response) {
                config = {
                    method: 'get',
                    url: backendURL + '/userManagement/users/' + self.state.ownID + '/favouriteSubjects',
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
                };
                axios(config)
                    .then(function (res2) {
                        self.setState({liked: res2.data});
                    }).catch(function (error) {
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    boostStudent =(student, subject) =>{
        let axios = require('axios');
        let qs = require('qs');
        let data = qs.stringify({
            'userId': student.id,
            'subjectId': subject.id
        });
        let config = {
            method: 'post',
            url: backendURL + '/userManagement/users/student/addBoost' ,
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };

        let self = this;
        axios(config)
            .then(function (response) {
                config = {
                    method: 'get',
                    url: backendURL + '/subjectManagement/subjects',
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
                };

                axios(config)
                    .then(function (res) {
                        self.setState({subjects: res.data});
                    }).catch(function (error){
                })
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    removeBoostStudent =(student, subject) =>{
        let axios = require('axios');
        let qs = require('qs');
        let data = qs.stringify({
            'userId': student.id,
            'subjectId': subject.id
        });
        let config = {
            method: 'post',
            url: backendURL + '/userManagement/users/student/removeBoost' ,
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };

        let self = this;
        axios(config)
            .then(function (response) {
                config = {
                    method: 'get',
                    url: backendURL + '/subjectManagement/subjects',
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
                };

                axios(config)
                    .then(function (res) {
                        self.setState({subjects: res.data});
                    }).catch(function (error){
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    preferredStudentsDetails =(student, subject) =>{
        let isBoosted = false;
        for(let i =0; i < subject.boostedStudents.length; i++){
            if(student.id===subject.boostedStudents[i].id)isBoosted = true;
        }
        let isFinal = false;
        for(let i =0; i < subject.finalStudents.length;i++) {
            if (student.id === subject.finalStudents[i].id) isFinal = true;
        }
        return (
            <div className={'mb-3'}>
                {isRole("ROLE_ADMIN")||isRole("ROLE_COORDINATOR")?
                    isBoosted?
                        <Button className={'me-3'} style={{float:'left'}} onClick={()=>{this.removeBoostStudent(student,subject)}} variant={"outline-warning"}>
                            <AiFillStar/>
                        </Button>
                        :
                        <Button className={'me-3'} style={{float:'left'}} onClick={()=>{this.boostStudent(student,subject)}} variant={"outline-warning"}>
                            <AiOutlineStar/>
                        </Button>
                    :null}
                {isRole("ROLE_ADMIN")||isRole("ROLE_COORDINATOR")?
                    isFinal?
                        <Button className={'me-3'} style={{float:'left'}} variant={"outline-warning"}>
                            <AiFillFlag/>
                        </Button>
                        :
                        <Button className={'me-3'} style={{float:'left'}} onClick={()=>{this.postFinalStudent(student,subject)}} variant={"outline-warning"}>
                            <AiOutlineFlag/>
                        </Button>
                    :null}
                <Tooltip title={(student!==null)?student.email:null} arrow className="col-4">
                    <div>
                        {student.firstName + ' ' + student.lastName}
                    </div>
                </Tooltip>
            </div>
        );
    }

    postFinalStudent = (student,subject)=>{
        let axios = require('axios');
        let qs = require('qs');
        let data = qs.stringify({
            'userId': student.id,
            'subjectId': subject.id
        });
        let config = {
            method: 'post',
            url: backendURL + '/userManagement/users/student/addFinalSubject' ,
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };

        let self = this;
        axios(config)
            .then(function (response) {
                config = {
                    method: 'get',
                    url: backendURL + '/subjectManagement/subjects',
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
                };

                axios(config)
                    .then(function (res) {
                        self.setState({subjects: res.data});
                    }).catch(function (error){
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    subDeleteDynamic = (subID) =>{
        subDelete(subID);
        let axios = require('axios');
        let config = {
            method: 'get',
            url: backendURL + '/subjectManagement/subjects',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
        };
        const self =this;
        axios(config)
            .then(function (res) {
                self.setState({subjects: res.data});
            }).catch(function (error){
        })
    }

    renderDetails =(subject,index)=>{
        let uniqueFaculties = subject.targetAudiences.map(sub=>sub).map(sub=>sub.faculty.name);
        uniqueFaculties = uniqueFaculties.filter((c, index) => {
            return uniqueFaculties.indexOf(c) === index;
        });
        let uniqueEducations = subject.targetAudiences.map(sub=>sub).map(sub=>sub.education.name);
        uniqueEducations = uniqueEducations.filter((c, index) => {
            return uniqueEducations.indexOf(c) === index;
        });
        let uniqueCampusses = subject.targetAudiences.map(sub=>sub).map(sub=>sub.campus.name);
        uniqueCampusses = uniqueCampusses.filter((c, index) => {
            return uniqueCampusses.indexOf(c) === index;
        });
        return(
            <div>
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
                    <div>
                        <div className="card text-white bg-secondary m-3">
                            <div className="card-header">
                                Info
                            </div>
                            <div className="card-body">
                                <div className="mb-3 row">
                                    <div className="col-4">
                                        <div >Students: {subject.nrOfStudents}</div>
                                    </div>
                                    <Tooltip title={(subject.promotor!==null)?subject.promotor.email:null} arrow className="col-4">
                                        <div >Promoter: {(subject.promotor!==null)?(subject.promotor.firstName + " " + subject.promotor.lastName):null}</div>
                                    </Tooltip>
                                    <Tooltip title={(subject.company!==null)?((subject.company.contacts.length!==0)?subject.company.contacts.map(contact => contact.email):null):null} arrow className="col-4">
                                        <div>Company: {(subject.company!==null)?subject.company.name:null}</div>
                                    </Tooltip>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <div >Faculties: {uniqueFaculties}</div>
                                    </div>
                                    <div className="col-4">
                                        <div >Educations: {uniqueEducations}</div>
                                    </div>
                                    <div className="col-4">
                                        <div>Campusses: {uniqueCampusses}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card text-white bg-secondary m-3">
                            <div className="card-header">
                                Description
                            </div>
                            <div className="card-body">
                                <div id={"subjectDescription"}>
                                    {subject.description}
                                </div>
                            </div>
                        </div>
                        <div className="card text-white bg-secondary m-3">
                            <div className="card-header">
                                <div style={{float:'left'}}>Interested students</div>
                                {isRole("ROLE_ADMIN")||isRole("ROLE_COORDINATOR")?
                                <div style={{float:'right'}}>
                                    Boosting
                                    <AiFillStar/>
                                    Final
                                    <AiFillFlag/>
                                </div>:null}

                            </div>
                            <div className="card-body">
                                <div id={"interestedStudents"}>
                                    {(this.state.preferredStudents[index]!==undefined)?this.state.preferredStudents[index].map(student =>
                                        (this.preferredStudentsDetails(student.student,subject))
                                    ):null}
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </div>
        )
    }

    renderSubject = (subject, index) => {
        return(
            <Container fluid="sm" key={subject.id}>
                <div className="card text-white bg-dark mb-3">
                    <div  className="card-header">
                        {(isRole("ROLE_ADMIN") || isRole("ROLE_COORDINATOR"))?
                            <Button style={{float: 'right'}} onClick={()=>{this.subDeleteDynamic(subject.id)}}  variant={"outline-danger"}>
                                Delete
                            </Button>:null}
                        <div className={"ms-3"} style={{float: 'right'}}>{(isRole("ROLE_ADMIN") || isRole("ROLE_COORDINATOR"))?
                            this.approvedButton(subject): isRole("ROLE_STUDENT")?
                                this.likeButton(subject):
                                null}
                        </div>
                        <h5 className="card-title" >{subject.name}</h5>
                        <div>Tags: {subject.tags.map(tags => tags.name)+" "}</div>
                    </div>

                    <div className="card-body">
                        {this.renderDetails(subject, index)}
                        {(isRole("ROLE_ADMIN") || isRole("ROLE_COORDINATOR"))?
                            <div style={{float: 'right'}}>
                                <Link to ={"/targetAudienceSubject" + subject.id}>
                                    <Button  variant={"outline-success"}>
                                        Change targetAudience
                                    </Button>
                                </Link>
                            </div>
                            : null}
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
                        <Button className={"m-1"} variant={"outline-success"}>
                            Upload subject
                        </Button>
                    </Link>
                </Container>
                {this.state.subjects.map((subject,index) => this.renderSubject(subject, index))}
            </Container>
        );
    }
}


export default Subjects;