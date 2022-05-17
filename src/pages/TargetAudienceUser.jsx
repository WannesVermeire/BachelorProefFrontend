import React from 'react'
import {useState} from 'react';
import backendURL from "../backendURL";
import {Button, Form, Container} from "react-bootstrap";

import axios from "axios";
import qs from 'qs';
import {Navigate, useParams} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Select from "react-select";

const TargetAudienceUser = () =>{
    const [id] = useState(useParams().id);
    const [faculties, setFaculties] = useState([]);
    const [inputFaculty, setInputFaculty] = useState();
    const [educations, setEducations] = useState([]);
    const [inputEducation, setInputEducation] = useState();
    const [campuses, setCampuses] = useState([]);
    const [inputCampus, setInputCampus] = useState();
    const [page, setPage]= useState(1);
    const [hasLoaded, setHasLoaded] = useState(false);
    if(!hasLoaded){
        let axios = require('axios');
        //Get all faculties
        let config = {
            method: 'get',
            url: backendURL + '/subjectManagement/faculty',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
            }
        };
        axios(config).then(function(res){
            if(faculties.length===0){
                for(let i=0; i < res.data.length;i++){
                    setFaculties(res.data);
                }
                setHasLoaded(true);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const handleSubmitFaculties = async (e)=>{
        e.preventDefault();
        //Get all educations by chosen faculty
        let axios = require('axios');
        let data = new FormData();
        data.append('facultyIds',inputFaculty.id);
        let config = {
            method: 'POST',
            url: backendURL + '/subjectManagement/education/byFaculties' ,
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:data
        };
        axios(config).then(function(res){
            if(educations.length===0){
                setEducations(res.data);
                setPage(2);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const handleSubmitEducations = async (e)=> {
        e.preventDefault();

        //Get all educations by chosen faculty
        let axios = require('axios');
        let data = new FormData();
        data.append('educationIds', inputEducation.id);
        let config = {
            method: 'post',
            url: backendURL + '/subjectManagement/campus/byEducations',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        axios(config).then(function (res) {
            if (campuses.length === 0) {
                setCampuses(res.data);
                setPage(3);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const postTargetAudience = async (e) => {
        e.preventDefault();

        let axios = require('axios');
        let qs = require('qs');

        let data = qs.stringify({
            'userId': id,
            'facultyId': inputFaculty.id,
            'educationId': inputEducation.id,
            'campusId': inputCampus.id,
        });
        let config = {
            method: 'post',
            url: backendURL + '/userManagement/users/student/addTargetAudience',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                setPage(4);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const renderForm = () => {
        if(page === 1){
            return(
                <Container >
                    <Form  id={"facultySubmit"} onSubmit={handleSubmitFaculties}>
                        <InputGroup style={{position: 'relative',left:'25%'}} className={"pt-3 pb-3"}>
                            <InputGroup.Text id="Faculties">Faculty</InputGroup.Text>
                            <div style={{width: '43%'}}>
                                <Select
                                    key={"faculty"}
                                    options={faculties}
                                    autosize={true}
                                    autocomplete="off"
                                    getOptionLabel={(options) => options['name']}
                                    getOptionValue={(options) => options['id']}
                                    onChange={(e) => setInputFaculty(e)}>
                                </Select>
                            </div>
                        </InputGroup>
                        <Form.Group style={{textAlign:'center'}} className="mb-3">
                            <Button  id={"facultySubmit"} type="submit" >
                                Next
                            </Button>
                        </Form.Group>
                    </Form>
                </Container>
            )
        }
        else if(page===2){
            return(
                <Container >
                    <Form id={"educationSubmit"} onSubmit={handleSubmitEducations}>
                        <InputGroup style={{position: 'relative',left:'25%'}} className={"pt-3 pb-3"}>
                            <InputGroup.Text id="Educations">Education</InputGroup.Text>
                            <div style={{width: '43%'}}>
                                <Select
                                    key={"education"}
                                    fluid="sm"
                                    options={educations}
                                    autocomplete="off"
                                    defaultValue={null}
                                    getOptionLabel={(options) => options['name']}
                                    getOptionValue={(options) => options['id']}
                                    onChange={(e) => setInputEducation(e)}>
                                </Select>
                            </div>
                        </InputGroup>
                        <Form.Group style={{textAlign:'center'}} className="mb-3">
                            <Button id={"educationSubmit"} type="submit" >
                                Next
                            </Button>
                        </Form.Group>
                    </Form>
                </Container>
            )
        }
        else if(page===3){
            return(
                <Container >
                    <Form id={"campusSubmit"} onSubmit={postTargetAudience}>
                        <InputGroup style={{position: 'relative',left:'25%'}} className={"pt-3 pb-3"}>
                            <InputGroup.Text id="campusses">Campus</InputGroup.Text>
                            <div style={{width: '43%'}}>
                                <Select
                                    key={"campus"}
                                    fluid="sm"
                                    options={campuses}
                                    defaultValue={null}
                                    getOptionLabel={(options) => options['name']}
                                    getOptionValue={(options) => options['id']}
                                    onChange={(e) => setInputCampus(e)}>
                                </Select>
                            </div>
                        </InputGroup>
                        <Form.Group style={{textAlign:'center'}} className="mb-3">
                            <Button id={"campusSubmit"} type="submit" variant={"outline-success"}>
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </Container>
            )
        }
        else{
            return null;
        }
    }
    return (
        page===4 ?
            <Navigate to="/userlist" />
            : hasLoaded?
                (
                    renderForm()
                )
            : <p>Loading</p>
    );
}

export default TargetAudienceUser;