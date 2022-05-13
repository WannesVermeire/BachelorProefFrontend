import React from 'react'
import {useState} from 'react';
import backendURL from "../backendURL";
import {Button, Form, Container} from "react-bootstrap";

import axios from "axios";
import qs from 'qs';
import {Navigate, useParams} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Select from "react-select";

const TargetAudienceSubject = () =>{
    const [id] = useState(useParams().id);
    const [faculties, setFaculties] = useState([]);
    const [inputFaculties, setInputFaculties] = useState([]);
    const [educations, setEducations] = useState([]);
    const [inputEducations, setInputEducations] = useState([]);
    const [campuses, setCampuses] = useState([]);
    const [inputCampuses, setInputCampuses] = useState([]);
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
        let data = new FormData();
        let facultyIds = inputFaculties.map(inputFaculties=>inputFaculties.id);
        for(let i =0; i<facultyIds.length; i++){
            console.log(facultyIds[i]);
            data.append('facultyIds',facultyIds[i]);
        }
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
                console.log( res.data);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const handleSubmitEducations = async (e)=> {
        e.preventDefault();

        //Get all educations by chosen faculty
        let axios = require('axios');
        const educationIds = inputEducations.map(inputEducations=>inputEducations.id);
        let config;
        if(educationIds.length===0) {
            let data = new FormData();
            const facultyIds = inputFaculties.map(inputFaculties=>inputFaculties.id);
            for(let i =0; i<facultyIds.length; i++){
                data.append('facultyIds',facultyIds[i]);
            }
            config = {
                method: 'post',
                url: backendURL + '/subjectManagement/campus/byFaculties',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };
        }
        else {
            let data = new FormData();
            for(let i =0; i<educationIds.length; i++){
                data.append('educationIds',educationIds[i]);
            }
            config = {
                method: 'post',
                url: backendURL + '/subjectManagement/campus/byEducations',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };
        }
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

        const facultyIds = inputFaculties.map(inputFaculties=>inputFaculties.id);
        const educationIds = inputEducations.map(inputEducations=>inputEducations.id);
        if(inputEducations.length===0)educationIds[0]=0;
        const campusIds = inputCampuses.map(inputCampuses=>inputCampuses.id);
        if(inputCampuses.length===0)campusIds[0]=0;
        let data = qs.stringify({
            'facultyIds': facultyIds,
            'educationIds': educationIds,
            'campusIds': campusIds,
        }, {arrayFormat: 'repeat'});
        console.log(data);
        let config = {
            method: 'post',
            url: backendURL + '/subjectManagement/subjects/' + id + '/addTargetAudience',
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
                <Container >
                    <Form  id={"facultySubmit"} onSubmit={handleSubmitFaculties}>
                        <InputGroup style={{position: 'relative',left:'25%'}} className={"pt-3 pb-3"}>
                            <InputGroup.Text id="Faculties">Faculty</InputGroup.Text>
                            <div style={{width: '43%'}}>
                                <Select
                                    key={"faculty"}
                                    isMulti
                                    options={faculties}
                                    autosize={true}
                                    autocomplete="off"
                                    getOptionLabel={(options) => options['name']}
                                    getOptionValue={(options) => options['id']}
                                    onChange={(e) => setInputFaculties(e)}>
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
                                    isMulti
                                    options={educations}
                                    autocomplete="off"
                                    defaultValue={null}
                                    getOptionLabel={(options) => options['name']}
                                    getOptionValue={(options) => options['id']}
                                    onChange={(e) => {setInputEducations(e)}}>
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
                                    isMulti
                                    options={campuses}
                                    defaultValue={null}
                                    getOptionLabel={(options) => options['name']}
                                    getOptionValue={(options) => options['id']}
                                    onChange={(e) => setInputCampuses(e)}>
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
            <Navigate to="/subjects" />
            : hasLoaded?
                (
                    renderForm()
                )
                : <p>Loading</p>
    );
}

export default TargetAudienceSubject;