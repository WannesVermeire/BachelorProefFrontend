import React,{Component} from 'react'
import {useState} from 'react';
import {Button, Col, Form, Row, Container} from "react-bootstrap";

import axios from "axios";
import qs from 'qs';
import {useParams} from "react-router-dom";


const CompanyDetails =()=> {
    const [company,setCompany] = useState('');
    const [id] = useState(useParams().id);
    const [hasLoaded, setHasLoaded] = useState(false);
    var axios = require('axios');
    var config = {
        method: 'get',
        url: 'http://localhost:8081/userManagement/company/' + id,
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
        }
    };
    axios(config)
        .then(function (res) {
            if(company==='')setCompany(res);
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
                        <div className="col">
                            <div className="row">
                                <h6 className="m-3" >{company.data.name}</h6>
                            </div>
                            <div className="row">
                                <h6 className="m-3" >{company.data.description}</h6>
                            </div>
                            <div className="row">
                                <h6 className="m-3" >{company.data.address}</h6>
                            </div>
                            <div className="row">
                                <h6 className="m-3" >{company.data.btwnr}</h6>
                            </div>
                        </div>
                        <div className={"m-3"}>
                            Approved:
                            {company.data.approved ? " Yes" : " No"}
                        </div>
                        <div className={"m-3"}>
                            Contacts:
                            {company.data.contacts}
                        </div>
                    </div>
                </Container>)
            : <p></p>
    );
}

export default CompanyDetails;