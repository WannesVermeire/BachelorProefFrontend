import React,{Component} from 'react'
import {useState} from 'react';
import {Button, Col, Form, Row, Container} from "react-bootstrap";

import axios from "axios";
import qs from 'qs';
import {useParams} from "react-router-dom";


const StudentDetails =()=> {
    const [student,setStudent] = useState('');
    const id = useParams().id;
    var axios = require('axios');
    var config = {
        method: 'get',
        url: 'http://localhost:8081/userManagement/users/' + id,
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
        }
    };
    axios(config)
        .then(function (res) {
            if(student==='')setStudent(res);
        })
        .catch(function (error) {
            console.log(error);
        });
    return(
        <p>{student.data.firstName}</p>
    );
}

export default StudentDetails;