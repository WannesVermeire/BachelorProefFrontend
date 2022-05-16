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
    const [finalSubject, setFinalSubject]= useState('');
    const [finalSubjectLoaded, setFinalSubjectLoaded] = useState(false);

    if(!(studentLoaded && prefSubLoaded && finalSubjectLoaded)){
        let axios = require('axios');
        //Loading student
        if(!studentLoaded) {
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
                    setStudent(res.data);
                    setStudentLoaded(true);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        if(!prefSubLoaded) {
            //Loading preferred subject
            let config = {
                method: 'get',
                url: backendURL + '/userManagement/users/' + id + '/preferredSubjects',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
                }
            };
            axios(config)
                .then(function (res) {
                    let sortedPrefSub = sortArrayByIndex(res.data);
                    setPreferredSubjects(sortedPrefSub.map(prefSubject => prefSubject.subject));
                    setPrefSubLoaded(true);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        if(!finalSubjectLoaded) {
            let config = {
                method: 'get',
                url: backendURL + '/userManagement/users/' + id + '/finalSubject',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
                }
            };
            axios(config)
                .then(function (res) {
                    if(res.data!=='') setFinalSubject(res.data);
                    setFinalSubjectLoaded(true);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
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

    const renderSubject = (subject, index) => {
        return(
            <Container fluid="sm" key={subject.id}>
                <div className="card text-white bg-dark m-3">
                    <div className="card-header">
                        <div style={{float: 'left'}}>Students: {subject.nrOfStudents}</div>
                        <div style={{ float:"right"  }}>Nr. {index+1}</div>
                    </div>

                    <div className="card-body">
                        <h5 className="card-title">{subject.name}</h5>
                        <h6>Tags: {(subject.tags!==undefined)?subject.tags.map(tags => tags.name)+" ":null}</h6>
                    </div>
                </div>
            </Container>
        )
    }

    return(
        (studentLoaded && prefSubLoaded && finalSubjectLoaded) ?
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