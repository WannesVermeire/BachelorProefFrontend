import React,{Component} from 'react'
import backendURL from "../backendURL";
import {useState} from 'react';
import {Button, Col, Form, Row, Container} from "react-bootstrap";

import axios from "axios";
import qs from 'qs';
import {useParams} from "react-router-dom";


const PromotorDetails =()=> {
    const [promotor,setPromotor] = useState('');
    const [id] = useState(useParams().id);
    const [hasLoaded, setHasLoaded] = useState(false);
    var axios = require('axios');
    var config = {
        method: 'get',
        url: backendURL + '/userManagement/users/' + id,
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
        }
    };
    axios(config)
        .then(function (res) {
            if(promotor==='')setPromotor(res);
            setHasLoaded(true);
            console.log(res)
        })
        .catch(function (error) {
            console.log(error);
        });

    return(
        hasLoaded ?
            (
                <Container fluid="sm">
                    <div className="card text-black bg-white m-3">
                        <div className="row">
                            <div className="col">
                                <h6 className="m-3" >{promotor.data.firstName} {promotor.data.lastName}</h6>
                            </div>
                            <div className="col">
                                <h6 className="m-3" >{promotor.data.email}</h6>
                            </div>
                            <div className="col">
                                <h6 className="m-3" >{promotor.data.telNr}</h6>
                            </div>
                        </div>
                        <div className={"m-3"}>
                            Preferences:
                            ToDo
                        </div>
                        <div className={"m-3"}>
                            Specialization:
                            ToDo
                        </div>
                        <div className={"m-3"}>
                            Campus:
                            ToDo
                        </div>
                    </div>
                </Container>)
            : <p></p>
    );
}

export default PromotorDetails;