import React,{Component} from 'react'
import {useState} from 'react';
import {Button, Col, Form, Row, Container} from "react-bootstrap";

import axios from "axios";
import qs from 'qs';
import {useParams} from "react-router-dom";

let counter = 0;
const StudentDetails =()=> {
    const [student,setStudent] = useState('');
    const [id] = useState(useParams().id);
    const [preferredSubjects, setPreferredSubjects] = useState([]); //Get subject objects

    if(counter<2){
        //Loading student
        let axios = require('axios');
        let config = {
            method: 'get',
            url: 'http://localhost:8081/userManagement/users/' + id,
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
            }
        };
        axios(config)
            .then(function (res) {
                if(student===''){
                    setStudent(res);
                    console.log("Student loaded");
                    console.log(student);
                    counter++;
                }
            })
            .catch(function (error) {
                console.log(error);
            });


        //Loading preferred subject
        axios = require('axios');
        config = {
            method: 'get',
            url: 'http://localhost:8081/userManagement/users/' + id +'/preferredSubjects',
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
                    counter++;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return(
        counter>=2 ?
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
                            Preferences: {preferredSubjects}
                        </div>
                        <div className={"m-3"}>
                            Campus:
                            ToDo
                        </div>
                        <div className={"m-3"}>
                            Campus:
                            ToDo
                        </div>
                        <div className={"m-3"}>
                            FinalSubject:
                            {student.data.finalSubject}
                        </div>
                    </div>
                </Container>)
            : <p>Loading</p>
    );
}

export default StudentDetails;