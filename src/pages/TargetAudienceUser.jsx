import React from 'react'
import {useState} from 'react';
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
            url: 'http://localhost:8081/subjectManagement/faculty',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
            }
        };
        console.log("loading faculties");
        axios(config).then(function(res){
            if(faculties.length===0){
                for(let i=0; i < res.data.length;i++){
                    setFaculties(res.data);
                }
                setHasLoaded(true);
                console.log("faculties loaded");
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const handleSubmitFaculties = async (e)=>{
        e.preventDefault();
        console.log("processing faculties");
        //Get all educations by chosen faculty
        let axios = require('axios');
        var data = new FormData();
        console.log(inputFaculty.id);
        data.append('facultyIds',inputFaculty.id);
        let config = {
            method: 'POST',
            url: 'http://localhost:8081/subjectManagement/education/byFaculties' ,
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
                console.log(educations);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const handleSubmitEducations = async (e)=> {
        e.preventDefault();

        //Get all educations by chosen faculty
        let axios = require('axios');
        console.log("Loading campusses");
        let data = new FormData();
        data.append('educationIds', inputEducation.id);
        let config = {
            method: 'post',
            url: 'http://localhost:8081/subjectManagement/campus/byEducations',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        axios(config).then(function (res) {
            if (campuses.length === 0) {
                setCampuses(res.data);
                console.log(campuses);
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
        console.log(data);
        let config = {
            method: 'put',
            url: 'http://localhost:8081/userManagement/users/student/addTargetAudience',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                console.log("TargetAudience posted");
                setPage(4);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const renderForm = () => {
        console.log(page)
        if(page === 1){
            return(
                <Container style={{textAlign:"left"}} fluid="sm"  >
                    <Form id={"facultySubmit"} onSubmit={handleSubmitFaculties}>
                        <InputGroup className={"pt-3 pb-3"}>
                            <InputGroup.Text id="Faculties">Faculty</InputGroup.Text>
                            <Select
                                fluid="sm"
                                options={faculties}
                                getOptionLabel={(options) => options['name']}
                                getOptionValue={(options) => options['id']}
                                onChange={(e) => setInputFaculty(e)}>
                            </Select>
                        </InputGroup>
                        <Form.Group style={{textAlign: 'center'}} className="mb-3">
                            <Button id={"facultySubmit"} type="submit" >
                                Next
                            </Button>
                        </Form.Group>
                    </Form>
                </Container>
            )
        }
        else if(page===2){
            return(
                <Container>
                    <Form id={"educationSubmit"} onSubmit={handleSubmitEducations}>
                        <InputGroup className={"pt-3 pb-3"}>
                            <InputGroup.Text id="Educations">Education</InputGroup.Text>
                            <Select
                                fluid="sm"
                                options={educations}
                                getOptionLabel={(options) => options['name']}
                                getOptionValue={(options) => options['id']}
                                onChange={(e) => setInputEducation(e)}>
                            </Select>
                        </InputGroup>
                        <Form.Group style={{textAlign: 'center'}} className="mb-3">
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
                <Container>
                    <Form id={"campusSubmit"} onSubmit={postTargetAudience}>
                        <InputGroup className={"pt-3 pb-3"}>
                            <InputGroup.Text id="campusses">Campus</InputGroup.Text>
                            <Select
                                fluid="sm"
                                options={campuses}
                                getOptionLabel={(options) => options['name']}
                                getOptionValue={(options) => options['id']}
                                onChange={(e) => setInputCampus(e)}>
                            </Select>
                        </InputGroup>
                        <Form.Group style={{textAlign: 'center'}} className="mb-3">
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
            <Navigate to="/subjects" />
            : hasLoaded?
                (
                    renderForm()
                )
            : <p>Loading</p>
    );
}

export default TargetAudienceUser;