import React,{Component} from 'react'
import {useState} from 'react'

import {Button, Col, Form, Row, Container, Alert} from "react-bootstrap";

import axios from "axios";
import qs from 'qs';
import {Link, useParams} from "react-router-dom";
import backendURL from "../backendURL";
import isRole from "../hooks/isRole"
import subDelete from "../hooks/subDelete";
import FormData from "form-data";
import {AiFillFlag, AiFillStar, AiOutlineFlag, AiOutlineStar} from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";


const UserDetails =()=> {
    const [user, setUser] = useState();
    const [userLoaded, setUserLoaded] = useState(false);
    const [ownID, setOwnID] = useState('');
    const [preferredSubjects, setPreferredSubjects] = useState([]);
    const [prefSubLoaded, setPrefSubLoaded] = useState(false);
    const [preferredStudents, setPreferredStudents] = useState([]);
    const [ownSubjects, setOwnSubjects] = useState([]);
    const [ownSubjectsLoaded, setOwnSubjectsLoaded] = useState(false);
    const [finalSubject, setFinalSubject]= useState();
    const [finalSubjectLoaded, setFinalSubjectLoaded] = useState();

    let axios = require('axios');
    if(!userLoaded){
        let config = {
            method: 'get',
            url: backendURL + '/userManagement/users/ownId',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
            }
        };
        axios(config)
            .then(function (res) {
                setOwnID(res.data);
                config = {
                    method: 'get',
                    url: backendURL + '/userManagement/users/' + res.data,
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
                    }
                };
                axios(config)
                    .then(function (res2) {
                        setUser(res2.data);
                        setUserLoaded(true);
                    }).catch(function (error) {
                    console.log(error);
                });
                if(!finalSubjectLoaded) {
                    let config = {
                        method: 'get',
                        url: backendURL + '/userManagement/users/' + res.data + '/finalSubject',
                        headers: {
                            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
                        }
                    };
                    axios(config)
                        .then(function (res) {
                            if(res.data.length!==0) setFinalSubject(res.data);
                            setFinalSubjectLoaded(true);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }).catch(function (error) {
        });
    }

    if (isRole("ROLE_STUDENT") && userLoaded && !prefSubLoaded) {
        let config = {
            method: 'get',
            url: backendURL + '/userManagement/users/' + ownID + '/preferredSubjects',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
            }
        };
        axios(config)
            .then(function (res) {
                console.log(res.data);
                let sortedPrefSub = sortArrayByIndex(res.data);
                setPreferredSubjects(sortedPrefSub.map(prefSubject => prefSubject.subject));
                setPrefSubLoaded(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    if((isRole("ROLE_PROMOTOR")||isRole("ROLE_CONTACT")) && userLoaded && !ownSubjectsLoaded){
        let config = {
            method: 'get',
            url: backendURL + '/userManagement/users/mySubjects',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
            }
        };
        axios(config)
            .then(function (res) {
                setOwnSubjects(res.data);
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
                            let preferredStudentsCopy = [...preferredStudents];
                            preferredStudentsCopy[i] = res2.data;
                            setPreferredStudents(preferredStudentsCopy);
                        }).catch(function (error) {
                    });
                }
                setOwnSubjectsLoaded(true);

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const sortArrayByIndex = (array) =>{
        let newArray = [...array];
        for(let i =0; i < array.length; i++){
            for(let j =0; j < array.length; j++){
                if(array[j].index===i+1)newArray[i] = array[j];
            }
        }
        return newArray;
    }

    const subDeleteDynamic = (subID) =>{
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

    const boostStudent =(student, subject) =>{
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
                    url: backendURL + '/userManagement/users/mySubjects',
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
                    }
                };
                axios(config)
                    .then(function (res) {
                        setOwnSubjects(res.data);
                    }).catch(function (error) {
            })}).catch(function (error){
        })
    }

    const removeBoostStudent =(student, subject) =>{
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

        axios(config)
            .then(function (response) {
                config = {
                    method: 'get',
                    url: backendURL + '/userManagement/users/mySubjects',
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
                    }
                };
                axios(config)
                    .then(function (res) {
                        console.log(res.data);
                        setOwnSubjects(res.data);
                    }).catch(function (error) {
                })}).catch(function (error){
        })
    }

    const renderStudent = (student, subject)=>{
        let isBoosted = false;
        for(let i =0; i < subject.boostedStudents.length; i++){
            if(student.id===subject.boostedStudents[i].id)isBoosted = true;
        }
        return (
            <div className={'mb-3'}>
                {isBoosted?
                        <Button className={'me-3'} style={{float:'left'}} onClick={()=>{removeBoostStudent(student,subject)}} variant={"outline-warning"}>
                            <AiFillStar/>
                        </Button>
                        :
                        <Button className={'me-3'} style={{float:'left'}} onClick={()=>{boostStudent(student,subject)}} variant={"outline-warning"}>
                            <AiOutlineStar/>
                        </Button>}
                <Tooltip title={(student!==null)?student.email:null} arrow className="col-4">
                    <div>
                        {student.firstName + ' ' + student.lastName}
                    </div>
                </Tooltip>
            </div>
        );
    }

    const renderSubject = (subject, index) => {
        if(subject===undefined)return null;
        return(
            <Container fluid="sm" key={subject.id}>
                <div className="card text-white bg-dark m-3">
                    <div className="card-header">
                        {(isRole("ROLE_ADMIN") || isRole("ROLE_COORDINATOR"))?
                        <Button style={{float: 'right'}} onClick={()=>{subDeleteDynamic(subject.id)}}  variant={"outline-danger"}>
                            Delete
                        </Button>:null}
                        {isRole("ROLE_STUDENT")?<div style={{ float:"right"  }}>Nr. {index+1}</div>:null}
                        <h5 className="card-title">{subject.name}</h5>
                        <h6 >Tags: {(subject.tags!==undefined)?subject.tags.map(tags => tags.name)+" ":null}</h6>
                    </div>

                    <div className="card-body">
                        <div >Students: {subject.nrOfStudents}</div>
                        {(isRole("ROLE_ADMIN") || isRole("ROLE_COORDINATOR") || isRole("ROLE_PROMOTOR") || isRole("ROLE_CONTACT"))?
                        (preferredStudents[index]!==undefined)?preferredStudents[index].map(student =>
                            (renderStudent(student.student,subject))
                        ):null:null}
                        {(isRole("ROLE_ADMIN") || isRole("ROLE_COORDINATOR")|| isRole("ROLE_PROMOTOR")|| isRole("ROLE_CONTACT"))?
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

    return(
        (userLoaded && ((prefSubLoaded && finalSubjectLoaded) || !isRole("ROLE_STUDENT")) && (ownSubjectsLoaded || (!isRole("ROLE_PROMOTOR") && !isRole("ROLE_CONTACT")))) ?
            (
                <Container fluid="sm">
                    <div className="card text-black bg-white m-3">
                        <div className="row">
                            <div className="col m-3">
                                Name: {user.firstName} {user.lastName}
                            </div>
                            <div className="col m-3">
                                Email: {user.email}
                            </div>
                            <div className="col m-3">
                                telNr: {user.telNr}
                            </div>
                        </div>
                        {(user.roles[0].name==="ROLE_CONTACT")?
                            <div className="m-3">
                                Company: {user.companyName}
                            </div>:null}
                        {(isRole("ROLE_PROMOTOR")||isRole("ROLE_CONTACT"))?
                        <div className="card text-black bg-white m-3">
                            <div className="card-header">
                                My posted subjects
                            </div>
                            <div className="card-body">
                                {ownSubjects.length!==0?ownSubjects.map(renderSubject):null}
                            </div>

                        </div>
                        :isRole("ROLE_STUDENT")?
                            <div>
                                <div className={"row"}>
                                    <div className={"col m-3"}>
                                        Faculty: {user.targetAudience!==null
                                        ? user.targetAudience.faculty.name
                                        : null
                                    }
                                    </div>
                                    <div className={"col m-3"}>
                                        Education: {user.targetAudience!==null
                                        ? user.targetAudience.education.name
                                        : null
                                    }
                                    </div>
                                    <div className={"col m-3"}>
                                        Campus: {user.targetAudience!==null
                                        ? user.targetAudience.campus.name
                                        : null}
                                    </div>
                                </div>
                                <div className="card text-black bg-white m-3">
                                    <div className="card-header">
                                        Preferences
                                    </div>
                                    <div className="card-body">
                                        {preferredSubjects.length!==0?preferredSubjects.map(renderSubject):null}
                                    </div>

                                </div>
                                <div className="card text-black bg-white m-3">
                                    <div className="card-header">
                                        Final subject
                                    </div>
                                    <div className="card-body">
                                        {finalSubject!==''?renderSubject(finalSubject):null}
                                    </div>
                                </div>
                            </div>
                            : null
                        }
                        {isRole("ROLE_CONTACT")?
                            <Link  className={'m-3'} style={{ float: 'right', textDecoration: 'none' }} to ="/registerCompany">
                                <Button variant={"outline-success"}>
                                    Add new company
                                </Button>
                            </Link>
                        :null}
                    </div>
                </Container>
    )
            : <p>Loading</p>
    );
}

export default UserDetails;