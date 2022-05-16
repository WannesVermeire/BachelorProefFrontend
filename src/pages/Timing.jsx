import React, {useState} from 'react';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backendURL from "../backendURL";
import axios from "axios";
import qs from "qs";

const Timing =()=> {
    const [endAddingSubjects,setEndAddingSubjects] = useState(new Date());
    const [endStudentsChoice,setEndStudentsChoice] = useState(new Date());
    const [endFinalAllocation,setEndFinalAllocation] = useState(new Date());

    const postTiming =(e)=>{
        e.preventDefault()
        let axios = require('axios');
        let data = qs.stringify({
            'endAddingSubjects': endAddingSubjects.toISOString().substring(0,10),
            'endPreferredSubjects': endStudentsChoice.toISOString().substring(0,10),
            'endFinalAllocation': endFinalAllocation.toISOString().substring(0,10)
            }
        )
        console.log(data);
        let config = {
            method: 'post',
            url: backendURL + '/timing',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))},
            data: data
        };
        axios(config)
            .then(function (res) {
                console.log(res)
            }).catch(function (error){

        })
    }
    return(
            <Container >
                    <div>
                        <Form onSubmit={postTiming}>
                            <Row style={{textAlign: 'center'}}>
                                <Col>
                                    <h1 style={{textAlign: 'center'}}>End adding subjects</h1>
                                    <DatePicker selected={endAddingSubjects} onChange={(date:Date) => setEndAddingSubjects(date)} />
                                </Col>
                                <Col >
                                    <h1 style={{textAlign: 'center'}}>End students choice</h1>
                                    <DatePicker selected={endStudentsChoice} onChange={(date:Date) => setEndStudentsChoice(date)} />
                                </Col>
                                <Col>
                                    <h1 style={{textAlign: 'center'}}>End final allocation</h1>
                                    <DatePicker selected={endFinalAllocation} onChange={(date:Date) => setEndFinalAllocation(date)} />
                                </Col>
                            </Row>
                            <Form.Group style={{textAlign: 'center'}} className="m-3">
                                <Button id={"prefSubjectsSubmit"} type="submit" variant={"outline-success"}>
                                    Submit
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>
            </Container>
    )
}

export default Timing;