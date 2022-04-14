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
    const [tags, setTags] = useState([]);
    const [inputTags, setInputTags] = useState([]);
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
            if(tags.length===0){
                for(let i =0; i< res.data.length; i++){
                    setTags(res.data);
                }
                setHasLoaded(true);
            }

        })
        .catch(function (error) {
            console.log(error);
        });

    console.log(tags);
    const handleSubmit = async (e) =>{
        e.preventDefault()
        /*var axios = require('axios');
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
            });*/
        console.log("Title: " + title + "\n" + "Tags: " + inputTags.map(inputTags=>inputTags.id) + "\n" + "Max nr of students: " + nrOfStudents + "\n" + "Description: " + description)
    }

    return (
        hasLoaded ?
            (
                <Container style={{textAlign:"left"}} fluid="sm"  >
                    <Form onSubmit={handleSubmit}>
                        <InputGroup style={{display: "flex" ,width: 400}} className={"pt-3  pb-3"}>
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
                            <InputGroup.Text id="tags">Tags</InputGroup.Text>
                            <Select
                                style={{display: "flex",width:20}}
                                options={tags}
                                getOptionLabel={(options) => options['name']}
                                getOptionValue={(options) => options['id']}
                                isMulti
                                onChange={(e) => setInputTags(e)}
                            />
                        </InputGroup>
                        <InputGroup className={"pt-3 pb-3"}>
                            <InputGroup.Text id="nrOfStudents">Max amount of students</InputGroup.Text>
                            <input
                                type={"number"}
                                id={"nrOfStudents"}
                                min="1" max="3"
                                placeholder={1}
                                defaultValue={1}
                                onChange={(e) => setNrOfStudents(e.target.value)}
                                value={nrOfStudents}
                                required/>
                        </InputGroup>
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