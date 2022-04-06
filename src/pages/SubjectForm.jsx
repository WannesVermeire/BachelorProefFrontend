import React from 'react'
import {useState} from 'react';
import {Button, Col, Form, Row, Container} from "react-bootstrap";

import axios from "axios";
import qs from 'qs';
import {useNavigate} from "react-router-dom";


const SubjectForm = () =>{
    const [name,setName] = useState('');
    const [description, setDescription] = useState('');
    const [nrOfStudents, setNrOfStudents] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault()

        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({name,description,nrOfStudents});
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
            <Container style={{textAlign: "left"}}>
                <Form onSubmit={handleSubmit}>
                    <Row className={"mb-3"}>
                        <Form.Group as={Col}  >
                            <Form.Label >Name</Form.Label>
                            <Form.Control
                                type={"text"}
                                id={"name"}
                                autoComplete={"off"}
                                placeholder={"Name of subject"}
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required/>
                        </Form.Group>
                        <Form.Group as={Col}  >
                            <Form.Label>Max amount of students</Form.Label>
                            <Form.Control
                                type={"text"}
                                id={"nrOfStudents"}
                                autoComplete={"off"}
                                placeholder={"Maximum amount of students"}
                                onChange={(e) => setNrOfStudents(e.target.value)}
                                value={nrOfStudents}
                                required/>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
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
        );
}

export default SubjectForm;