import React,{Component} from 'react'
import {useState} from 'react'

import {Button, Col, Form, Row, Container, Alert} from "react-bootstrap";

import axios from "axios";
import qs from 'qs';
import {Link, useParams} from "react-router-dom";
import backendURL from "../backendURL";
import isRole from "../hooks/isRole"


const UserDetails =()=> {
    const [user, setUser] = useState();
    const [userLoaded, setUserLoaded] = useState(false);
    const [ownID, setOwnID] = useState('');
    const [preferredSubjects, setPreferredSubjects] = useState([]);
    const [prefSubLoaded, setPrefSubLoaded] = useState(false);
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
                if (preferredSubjects.length === 0) {
                    setPreferredSubjects(res.data.map(prefSubject => prefSubject.subject));
                    setPrefSubLoaded(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const renderSubject = (subject) => {
        return(
            <Container fluid="sm" key={subject.id}>
                <div className="card text-white bg-dark m-3">
                    <div className="card-header">
                        <div style={{float: 'left'}}>Students: {subject.nrOfStudents}</div>
                    </div>

                    <div className="card-body">
                        <h5 className="card-title">{subject.name}</h5>
                        <h6>Tags: {subject.tags.map(tags => tags.name)+" "}</h6>
                    </div>
                </div>
            </Container>
        )
    }

    return(
        (userLoaded && (prefSubLoaded || !isRole("ROLE_STUDENT"))) ?
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
                        {isRole("ROLE_STUDENT")?
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
                                        {preferredSubjects.map(renderSubject)}
                                    </div>

                                </div>
                                <div className={"m-3"}>
                                    FinalSubject:
                                    {user.finalSubject}
                                </div>
                            </div>
                            : null}
                    </div>
                </Container>
    )
            : <p>Loading</p>
    );
}

export default UserDetails;