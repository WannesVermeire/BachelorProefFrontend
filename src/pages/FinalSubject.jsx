import React, { useState} from "react";
import backendURL from "../backendURL";
import axios from "axios";
import {Alert, Container, Row, Col, Form, Button} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Select from "react-select";

const FinalSubject =()=> {
    const [prefSubjects, setPrefSubjects] = useState([]);
    const [prevPrefSubjects, setPrevPrefSubjects] = useState([]);
    const [favSubjects, setFavSubjects] = useState([])
    const [hasLoaded, setHasloaded] = useState(false);
    const [ownID,setOwnID] = useState('');
    if(!hasLoaded){
        let config = {
            method: 'get',
            url: backendURL + '/userManagement/users/ownId',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
        };
        axios(config)
            .then(function (res) {
                setOwnID(res.data);
                config = {
                    method: 'get',
                    url: backendURL + '/userManagement/users/' + res.data + '/favouriteSubjects',
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
                };
                axios(config)
                    .then(function (res2) {
                        if(favSubjects.length===0) setFavSubjects(res2.data);
                        config = {
                            method: 'get',
                            url: backendURL + '/userManagement/users/' + res.data + '/preferredSubjects',
                            headers: {
                                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
                        };
                        axios(config)
                            .then(function (res3) {
                                console.log(res3.data);
                                console.log(sortArrayByIndex(res3.data));
                                if(prevPrefSubjects.length===0) setPrevPrefSubjects(sortArrayByIndex(res3.data));
                                setHasloaded(true);
                            }).catch(function (error) {
                        });
                    }).catch(function (error) {
                });

            }).catch(function (error) {
        });
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

    const postPreferredSubjects = (e) =>{
        e.preventDefault()
        let axios = require('axios');
        let qs = require('qs');
        console.log(prefSubjects);
        for(let i =0; i <3; i++){
            if(prefSubjects[i]!==undefined){
                let data = qs.stringify({
                    'userId': ownID,
                    'subjectId': prefSubjects[i].id,
                    'index': i+1
                });
                let config = {
                    method: 'post',
                    url: backendURL + '/userManagement/users/student/addPreferredSubject',
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data : data
                };

                axios(config)
                    .then(function (response) {
                        console.log(JSON.stringify(response.data));
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }

    return(
        (hasLoaded)?
            <Container >
                {favSubjects.length!==0?
                    <div>
                        <Form onSubmit={postPreferredSubjects}>
                            <Alert style={{textAlign: 'center'}} className={"m-50"} variant={"warning"}>Only your liked subjects will appear here</Alert>
                            <Row>
                                <Col>
                                    <h1 style={{textAlign: 'center'}}>First choice</h1>
                                    <InputGroup style={{position: 'relative',left:'25%'}} className={"pt-3 pb-3"}>
                                        <InputGroup.Text >1</InputGroup.Text>
                                        <div style={{width: '43%'}}>
                                            <Select
                                                key={"firstChoice"}
                                                options={favSubjects}
                                                autosize={true}
                                                autocomplete="off"
                                                getOptionLabel={(options) => options['name']}
                                                getOptionValue={(options) => options['id']}
                                                onChange={(sub)=> {
                                                    let prefSubjectsCopy = [...prefSubjects];
                                                    prefSubjectsCopy[0] = sub;
                                                    setPrefSubjects(prefSubjectsCopy);
                                                }}>
                                            </Select>
                                        </div>
                                    </InputGroup>
                                </Col>
                                <Col >
                                    <h1 style={{textAlign: 'center'}}>Second choice</h1>
                                    <InputGroup style={{position: 'relative',left:'25%'}} className={"pt-3 pb-3"}>
                                        <InputGroup.Text >2</InputGroup.Text>
                                        <div style={{width: '43%'}}>
                                            <Select
                                                key={"secondChoice"}
                                                options={favSubjects}
                                                autosize={true}
                                                autocomplete="off"
                                                getOptionLabel={(options) => options['name']}
                                                getOptionValue={(options) => options['id']}
                                                onChange={(sub) => {
                                                    let prefSubjectsCopy = [...prefSubjects];
                                                    prefSubjectsCopy[1] = sub;
                                                    setPrefSubjects(prefSubjectsCopy);
                                                }}>
                                            </Select>
                                        </div>
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <h1 style={{textAlign: 'center'}}>Third choice</h1>
                                    <InputGroup style={{position: 'relative',left:'25%'}} className={"pt-3 pb-3"}>
                                        <InputGroup.Text >3</InputGroup.Text>
                                        <div style={{width: '43%'}}>
                                            <Select
                                                key={"thirdChoice"}
                                                options={favSubjects}
                                                autosize={true}
                                                autocomplete="off"
                                                getOptionLabel={(options) => options['name']}
                                                getOptionValue={(options) => options['id']}
                                                onChange={(sub) => {
                                                    let prefSubjectsCopy = [...prefSubjects];
                                                    prefSubjectsCopy[2] = sub;
                                                    setPrefSubjects(prefSubjectsCopy);
                                                }}>
                                            </Select>
                                        </div>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Form.Group style={{textAlign: 'center'}} className="mb-3">
                                <Button id={"prefSubjectsSubmit"} type="submit" variant={"outline-success"}>
                                    Submit
                                </Button>
                            </Form.Group>
                        </Form>
                        <div className="card text-white bg-dark mb-3">
                            <div className="card-header">Current choices</div>
                            <div className="card-body">
                                <p>1. {(prevPrefSubjects[0]!==undefined) ? prevPrefSubjects[0].subject.name : null} </p>
                                <p>2. {(prevPrefSubjects[1]!==undefined) ? prevPrefSubjects[1].subject.name : null} </p>
                                <p>3. {(prevPrefSubjects[2]!==undefined) ? prevPrefSubjects[2].subject.name : null} </p>
                            </div>
                        </div>
                    </div>
                :<p>You need to like subjects before you can choose your final subject</p>}
            </Container>
            :null
    )
}

export default FinalSubject;