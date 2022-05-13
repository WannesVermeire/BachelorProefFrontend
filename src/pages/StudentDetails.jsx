import React,{Component} from 'react'
import {useState} from 'react'

import {Button, Col, Form, Row, Container, Alert} from "react-bootstrap";

import axios from "axios";
import qs from 'qs';
import {Link, useParams} from "react-router-dom";
import backendURL from "../backendURL";


const StudentDetails =()=> {
    const [student,setStudent] = useState('');
    const [id] = useState(useParams().id);
    const [preferredSubjects, setPreferredSubjects] = useState([]); //Get subject objects
    const [studentLoaded, setStudentLoaded] = useState(false);
    const [prefSubLoaded, setPrefSubLoaded] = useState(false);

    if(!(studentLoaded && prefSubLoaded)){
        //Loading student
        let axios = require('axios');
        let config = {
            method: 'get',
            url: backendURL + '/userManagement/users/' + id,
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
            }
        };
        axios(config)
            .then(function (res) {
                if(student===''){
                    setStudent(res.data);
                    console.log("Student loaded");
                    setStudentLoaded(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });


        //Loading preferred subject
        config = {
            method: 'get',
            url: backendURL + '/userManagement/users/' + id +'/preferredSubject',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
            }
        };
        axios(config)
            .then(function (res) {
                if(preferredSubjects.length===0){
                    setPreferredSubjects(res.data.map(prefSubject => prefSubject.subject));
                    console.log("preferred subjects loaded");
                    console.log(preferredSubjects);
                    setPrefSubLoaded(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    console.log(preferredSubjects)
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
        (studentLoaded && prefSubLoaded) ?
            (
                <Container fluid="sm">
                    <div className="card text-black bg-white m-3">
                        <div className="row">
                            <div className="col">
                                <h6 className="m-3" >{student.firstName} {student.lastName}</h6>
                            </div>
                            <div className="col">
                                <h6 className="m-3" >{student.email}</h6>
                            </div>
                            <div className="col">
                                <h6 className="m-3" >{student.telNr}</h6>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"col m-3"}>
                                Faculty: {student.targetAudience!==null
                                ? student.targetAudience.faculty.name
                                : null
                            }
                            </div>
                            <div className={"col m-3"}>
                                Education: {student.targetAudience!==null
                                ? student.targetAudience.education.name
                                : null
                            }
                            </div>
                            <div className={"col m-3"}>
                                Campus: {student.targetAudience!==null
                                ? student.targetAudience.campus.name
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
                            {student.finalSubject}
                        </div>
                        <Link className={"m-3"} style={{textAlign: 'right'}} to ={"/targetAudienceUser" + id}>
                            <Button variant={"outline-success"}>
                                Change school information
                            </Button>
                        </Link>
                    </div>
                </Container>)
            : <p>Loading</p>
    );
}

export default StudentDetails;