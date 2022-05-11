import React from 'react'
import backendURL from "../backendURL";
import {useState} from 'react';
import {Button, Form, Container} from "react-bootstrap";

import axios from "axios";
import qs from 'qs';
import {Navigate} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import isRole from '../hooks/isRole'


const SubjectForm = () =>{
    const [title,setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [nrOfStudents, setNrOfStudents] = useState('');
    const [tags, setTags] = useState([]);
    const [inputTags, setInputTags] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [inputFaculties, setInputFaculties] = useState([]);
    const [educations, setEducations] = useState([]);
    const [inputEducations, setInputEducations] = useState([]);
    const [campuses, setCampuses] = useState([]);
    const [inputCampuses, setInputCampuses] = useState([]);
    const [page, setPage]= useState(1);
    const [subjectId, setSubjectId] = useState('')

    const hasLoadedArray = [
        {
            id: 1,
            state: false,
        },
        {
            id: 2,
            state: false,
        },
    ]
    const [hasLoaded, setHasLoaded] = useState(hasLoadedArray);
    const [allHaveLoaded, setAllHaveLoaded] = useState(false);

    if(!allHaveLoaded){
        let axios = require('axios');

        //Get all tags
        let config = {
            method: 'get',
            url: backendURL + '/subjectManagement/tag',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
            }
        };
        axios(config)
            .then(function (res) {
                if(tags.length===0){
                    for(let i =0; i< res.data.length; i++){
                        setTags(res.data);
                    }
                    setHasLoaded[0] = true;
                }

            })
            .catch(function (error) {
                console.log(error);
            });

        //Get all faculties
        if(!isRole("ROLE_STUDENT")) {
            config = {
                method: 'get',
                url: backendURL + '/subjectManagement/faculty',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
                }
            };
            console.log("loading faculties");
            axios(config).then(function (res) {
                if (faculties.length === 0) {
                    for (let i = 0; i < res.data.length; i++) {
                        setFaculties(res.data);
                    }
                    setHasLoaded[1] = true;
                    console.log("faculties loaded");
                }
            }).catch(function (error) {
                console.log(error);
            });
        }

        let counter =0;
        for(let i =0; i<2; i++){
            if(hasLoaded[i].state === true) counter++;
        }
        if(counter===2)setAllHaveLoaded(true);
    }

    const handleSubmitBaseSubject = async (e) =>{
        e.preventDefault()

        //Subject post
        let axios = require('axios');
        const tagNames = inputTags.map(inputTags=>inputTags.name);
        let data = new FormData();
        data.append('name', title);
        data.append('description', description);
        data.append('nrOfStudents', nrOfStudents);
        for(let i =0; i<tagNames.length; i++){
            data.append('tagNames',tagNames[i]);
        }
        console.log(tagNames);
        let config = {
            method: 'post',
            url: backendURL + '/subjectManagement/subjects',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };

        axios(config)
            .then(function (res) {
                console.log("baseSubject posted");
                setSubjectId(res.data);
                setPage(2);
                if(isRole("ROLE_STUDENT"))setPage(5);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    //Target Audience post
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
                setPage(3);
                console.log(educations);
            }
        }).catch(function (error) {
            console.log(error);
        });

    }
    const handleSubmitEducations = async (e)=>{
        e.preventDefault();

        //Get all educations by chosen faculty
        let axios = require('axios');
        console.log("Loading campusses");
        const educationIds = inputEducations.map(inputEducations=>inputEducations.id);
        let config;
        if(educationIds === []) {
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
        axios(config).then(function(res){
            if(campuses.length===0){
                setCampuses(res.data);
                console.log(campuses);
                setPage(4);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const postTargetAudience = async (e) =>{
        e.preventDefault();

        let axios = require('axios');
        let qs = require('qs');

        const facultyIds = inputFaculties.map(inputFaculties=>inputFaculties.id);
        const educationIds = inputEducations.map(inputEducations=>inputEducations.id);
        const campusIds = inputCampuses.map(inputCampuses=>inputCampuses.id);

        let data = qs.stringify({
            'facultyIds': facultyIds,
            'educationIds': educationIds,
            'campusIds': campusIds,
        }, {arrayFormat: 'repeat'});
        console.log(data);
        var config = {
            method: 'post',
            url: backendURL + '/subjectManagement/subjects/' + subjectId + '/addTargetAudience',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                console.log("TargetAudience posted");
                setPage(5);
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
                    <Form id={"BaseSubject"} onSubmit={handleSubmitBaseSubject}>
                        <InputGroup style={{display: "flex",width:400}} className={"pt-3  pb-3"}>
                            <InputGroup.Text id="title">Title</InputGroup.Text>
                            <Form.Control
                                autoComplete={"off"}
                                placeholder={"Name of subject"}
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                aria-label="Title"
                                aria-describedby="title"
                                required/>
                        </InputGroup>

                        <InputGroup className={"pt-3 pb-3"}>
                            <InputGroup.Text id="tags">Disciplines</InputGroup.Text>
                            <CreatableSelect
                                key={"tags"}
                                fluid="sm"
                                options={tags}
                                getOptionLabel={(options) => options['name']}
                                getOptionValue={(options) => options['id']}
                                isMulti
                                onChange={(e) => setInputTags(e)}>
                            </CreatableSelect>
                        </InputGroup>

                        <InputGroup style={{display: "flex",width:250}} className={"pt-3 pb-3"}>
                            <InputGroup.Text id="nrOfStudents">Max amount of students</InputGroup.Text>
                            <Form.Control
                                type={"number"}
                                id={"nrOfStudents"}
                                min="1" max="3"
                                placeholder={1}
                                onChange={(e) => setNrOfStudents(e.target.value)}
                                value={nrOfStudents}
                                required/>
                        </InputGroup>

                        <InputGroup className={"pt-3 pb-3"}>
                            <InputGroup.Text id="description">Description</InputGroup.Text>
                            <textarea
                                id={"description"}
                                rows={10}
                                cols={125}
                                autoComplete={"off"}
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                required>
                            </textarea>
                        </InputGroup>
                        <Form.Group style={{textAlign: 'center'}} className="mb-3">
                            <Button id={"BaseSubject"} type="submit" >
                                Next
                            </Button>
                        </Form.Group>
                    </Form>
                </Container>
            )
        }
        else if(page===2){
            return(
                <Container style={{textAlign:"left"}} fluid="sm"  >
                    <Form id={"facultySubmit"} onSubmit={handleSubmitFaculties}>
                        <InputGroup style={{position: 'relative',left:'25%'}} className={"pt-3 pb-3"}>
                            <InputGroup.Text  id="Faculties">Faculty</InputGroup.Text>
                            <div style={{width: '43%'}}>
                                <Select
                                    key={"Faculties"}
                                    fluid="sm"
                                    options={faculties}
                                    getOptionLabel={(options) => options['name']}
                                    getOptionValue={(options) => options['id']}
                                    isMulti
                                    onChange={(e) => setInputFaculties(e)}>
                                </Select>
                            </div>
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
        else if(page===3){
            return(
                <Container>
                    <Form id={"educationSubmit"} onSubmit={handleSubmitEducations}>
                        <InputGroup  style={{position: 'relative',left:'25%'}} className={"pt-3 pb-3"}>
                            <InputGroup.Text id="Educations">Education</InputGroup.Text>
                            <div style={{width: '43%'}}>
                                <Select
                                    key={"Educations"}
                                    fluid="sm"
                                    options={educations}
                                    getOptionLabel={(options) => options['name']}
                                    getOptionValue={(options) => options['id']}
                                    isMulti
                                    onChange={(e) => setInputEducations(e)}>
                                </Select>
                            </div>
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
        else if(page===4){
            return(
                <Container>
                    <Form id={"campusSubmit"} onSubmit={postTargetAudience}>
                        <InputGroup style={{position: 'relative',left:'25%'}} className={"pt-3 pb-3"}>
                            <InputGroup.Text  id="campusses">Campus</InputGroup.Text>
                            <div style={{width: '43%'}}>
                                <Select
                                    key={"campusses"}
                                    fluid="sm"
                                    options={campuses}
                                    getOptionLabel={(options) => options['name']}
                                    getOptionValue={(options) => options['id']}
                                    isMulti
                                    onChange={(e) => setInputCampuses(e)}>
                                </Select>
                            </div>
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
        page===5 ?
            <Navigate to="/subjects" />
            : hasLoaded ?
                (
                    renderForm()
                )
                : <p>Loading</p>
    );
}

export default SubjectForm;