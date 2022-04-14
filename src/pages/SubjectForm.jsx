import React from 'react'
import {useState} from 'react';
import {Button, Col, Form, Row, Container} from "react-bootstrap";

import axios from "axios";
import qs from 'qs';
import {useNavigate} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Select from "react-select";


const SubjectForm = () =>{
    const [title,setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [nrOfStudents, setNrOfStudents] = useState('');
    const [tags, setTags] = useState('');
    const [hasLoaded, setHasLoaded] = useState(false);
    const navigate = useNavigate();


    var axios = require('axios');
    var config = {
        method: 'get',
        url: 'http://localhost:8081/subjectManagement/tag',
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
        }
    };
    axios(config)
        .then(function (res) {
            console.log(res)
            if(tags==='')setTags(res);
            setHasLoaded(true);
        })
        .catch(function (error) {
            console.log(error);
        });


    const handleSubmit = async (e) =>{
        e.preventDefault()
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({title,description,nrOfStudents});
        var config = {
            method: 'post',
            url: 'http://localhost:8081/subjectManagement/subjects',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                navigate("../subjects",{replace:true})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        hasLoaded ?
            (
                <Container style={{textAlign:"left"}} fluid="sm"  >
                    <Form onSubmit={handleSubmit}>
                        <InputGroup className="pt-3  pb-3">
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
                        <Select
                            isMulti
                            name="colors"
                            options={tags}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                        <Form.Group className="mb-3">
                            <Form.Label className="mb-1">Max amount of students</Form.Label>
                            <Form.Control
                                type={"text"}
                                id={"nrOfStudents"}
                                autoComplete={"off"}
                                placeholder={"Maximum amount of students"}
                                onChange={(e) => setNrOfStudents(e.target.value)}
                                value={nrOfStudents}
                                required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="mb-1">Description</Form.Label>
                            <Form.Control
                                type={"text"}
                                id={"description"}
                                autoComplete={"off"}
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button type="submit" >
                                Upload subject
                            </Button>
                        </Form.Group>
                    </Form>
                </Container>
            )
            : <p></p>
    );
}

export default SubjectForm;