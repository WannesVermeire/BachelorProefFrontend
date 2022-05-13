import React,{Component} from 'react'
import backendURL from "../backendURL";
import {useState} from 'react';
import {Button, Col, Form, Row, Container} from "react-bootstrap";

import axios from "axios";
import qs from 'qs';
import {useParams} from "react-router-dom";
import Select from "react-select";
import InputGroup from "react-bootstrap/InputGroup";
import FormData from "form-data";
import Tooltip from "@mui/material/Tooltip";


const CompanyDetails =()=> {
    const [company,setCompany] = useState('');
    const [id] = useState(useParams().id);
    const [companyLoaded, setCompanyLoaded] = useState(false);
    const [contactsLoaded, setContactsLoaded] = useState(false);
    const [approved, setApproved] = useState();
    const [contactForm, setContactForm] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [inputContacts,setInputContacts] = useState([]);

    if(!companyLoaded){
        let axios = require('axios');
        let config = {
            method: 'get',
            url: backendURL + '/userManagement/company/' + id,
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
            }
        };
        axios(config)
            .then(function (res) {
                setCompany(res.data);
                setCompanyLoaded(true);
                setApproved(res.data.approved);
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    if(!contactsLoaded){
        let config = {
            method: 'get',
            url: backendURL + '/userManagement/users/contact',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))}
        };
        axios(config)
            .then(function (res) {
                setContacts(res.data);
                setContactsLoaded(true);
            }).catch(function (error) {
        });
    }

    const approve =()=>{
        let axios = require('axios');
        let FormData = require('form-data');
        let data = new FormData();
        data.append('approved', 'true');

        let config = {
            method: 'put',
            url: backendURL + '/userManagement/company/'+id+'/setApproved',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setApproved(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const disapprove =()=>{
        let axios = require('axios');
        let FormData = require('form-data');
        let data = new FormData();
        data.append('approved', 'false');

        let config = {
            method: 'put',
            url: backendURL + '/userManagement/company/'+id+'/setApproved',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token')),
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setApproved(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const postContacts =() =>{
        let data = new FormData();
        console.log(inputContacts[0].id)
        for(let i =0; i<inputContacts.length; i++){
            data.append('userIds',inputContacts[i].id);
        }
        let config = {
            method: 'post',
            url: backendURL + '/userManagement/company/' + company.id + '/addContact',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
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
        setContactForm(false);
    }

    return(
        (contactsLoaded && companyLoaded)?
            (
                <Container fluid="sm">
                    <div  className="card text-black bg-white m-3">
                        <div className="col">
                            <div className="row">
                                <h6 className="m-3" >{company.name}</h6>
                            </div>
                            <div className="row">
                                <h6 className="m-3" >{company.description}</h6>
                            </div>
                            <div className="row">
                                <h6 className="m-3" >{company.address}</h6>
                            </div>
                            <div className="row">
                                <h6 className="m-3" >{company.btwNr}</h6>
                            </div>
                        </div>
                        <Tooltip title={contacts.map(contact=> contact.email)} arrow className="col-4">
                            <div className={"m-3"}>
                                Contacts:
                                {contacts.map(contact=> ' ' + contact.firstName + ' ' + contact.lastName)}
                            </div>
                        </Tooltip>
                        <Button onClick={()=>{setContactForm(true)}} className={"m-3"} variant={"outline-success"}>
                            Add contacts
                        </Button>
                        {contactForm?
                            <Form className={"m-3"} onSubmit={postContacts}>
                                <InputGroup >
                                    <Form.Label>Contacts</Form.Label>
                                    <div style={{width: '100%'}}>
                                        <Select
                                            key={"Contacts"}
                                            fluid="sm"
                                            options={contacts}
                                            getOptionLabel={(options) => options['firstName'] + ' ' +options['lastName']}
                                            getOptionValue={(options) => options['id']}
                                            isMulti
                                            onChange={(e) => setInputContacts(e)}>
                                        </Select>
                                    </div>
                                </InputGroup>
                                <Button type="submit" onSubmit={postContacts} >Submit</Button>
                            </Form>
                            :null}
                        {approved?
                            <Button onClick={()=>{disapprove()}} className={"m-3"} variant={"outline-danger"}>
                                Disapprove
                            </Button>
                        :
                            <Button onClick={()=>{approve()}} className={"m-3"} variant={"outline-success"}>
                                Approve
                            </Button>
                        }
                    </div>
                </Container>)
            : <p></p>
    );
}

export default CompanyDetails;