import React,{Component} from 'react'
import {useState} from 'react'

import {Button, Col, Form, Row, Container} from "react-bootstrap";

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
                    setStudent(res);
                    console.log("Student loaded");
                    console.log(res);
                    setStudentLoaded(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });


        //Loading preferred subject
        axios = require('axios');
        config = {
            method: 'get',
            url: backendURL + '/userManagement/users/' + id +'/preferredSubjects',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
            }
        };
        axios(config)
            .then(function (res) {
                if(preferredSubjects.length===0){
                    setPreferredSubjects(res.data);
                    console.log("preferred subjects loaded");
                    console.log(preferredSubjects);
                    setPrefSubLoaded(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return(
        (studentLoaded && prefSubLoaded) ?
            (
                <Container fluid="sm">
                    <div className="card text-black bg-white m-3">
                        <div className="row">
                            <div className="col">
                                <h6 className="m-3" >{student.data.firstName} {student.data.lastName}</h6>
                            </div>
                            <div className="col">
                                <h6 className="m-3" >{student.data.email}</h6>
                            </div>
                            <div className="col">
                                <h6 className="m-3" >{student.data.telNr}</h6>
                            </div>
                        </div>
                        <div className={"m-3"}>
                            Faculty: {student.data.targetAudience!==null
                                ? student.data.targetAudience.faculty.name
                                : null
                            }
                        </div>
                        <div className={"m-3"}>
                            Education: {student.data.targetAudience!==null
                                    ? student.data.targetAudience.education.name
                                    : null
                            }
                        </div>
                        <div className={"m-3"}>
                            Campus: {student.data.targetAudience!==null
                            ? student.data.targetAudience.campus.name
                            : null}
                        </div>
                        <div className={"m-3"}>
                            Preferences: {preferredSubjects}
                        </div>
                        <div className={"m-3"}>
                            FinalSubject:
                            {student.data.finalSubject}
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