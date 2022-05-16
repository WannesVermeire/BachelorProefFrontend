import React from 'react';
import backendURL from "../backendURL";
import {Button, Col, Container, Form, Row, Image} from 'react-bootstrap';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import qs from 'qs';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import InlogLogo from '../Images/Ingelogd.PNG';

const Login = () => {
    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(() => {
        setErrMsg('');
    },[email,setPassword])

    const handleSubmit = async (e) =>{
        e.preventDefault()

        var data = qs.stringify({email, password});
        var config = {
            method: 'post',
            url: backendURL + '/authentication/login',
            headers:{
                'Content-Type': "application/x-www-form-urlencoded"
            },
            data: data
        };
        axios(config).then(function(res){
            const decoded = jwt_decode(res.data.access_token);
            const roles = decoded.roles;
            setAuth({email,password, roles});

            var time = new Date().getTime();//getTime gives the amount of millieseconds that have passed since January 1st 1970
            var access_token_expired = new Date(time + 10*60*1000).getTime();
            var refresh_token_expired = new Date(time + 24*60*60*1000).getTime();
            localStorage.setItem("access_token_expired", JSON.stringify(access_token_expired));
            localStorage.setItem("refresh_token_expired", JSON.stringify(refresh_token_expired));

            localStorage.setItem("access_token", JSON.stringify(res.data.access_token));
            localStorage.setItem("refresh_token", JSON.stringify(res.data.refresh_token));
            navigate(from, {replace: true});
        }).catch(function (error) {
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status ===401){
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus();
        });
    }
    return(
        <Container fluid={"sm"} style={{display: "flex" ,width: 500, textAlign: "center"}} >
            <p className="alert alert-danger" hidden={!errMsg} ref={errRef} aria-live="assertive" >{errMsg}</p>
            <Form className="card text-black bg-white m-3" onSubmit={handleSubmit}>
                <Image className="rounded mx-auto d-block" src={InlogLogo} style={{width: 300, textAlign: "center"}}></Image>
                <Form.Group  as={Row} className={"m-3"}>
                    <Form.Label className={"mb-0"}>Email address</Form.Label>
                    <Col>
                        <Form.Control
                            type={"email"}
                            id={"email"}
                            ref={userRef}
                            autoComplete={"off"}
                            placeholder={"Enter email"}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className={"m-3"}>
                    <Form.Label className={"mb-0"}>Password</Form.Label>
                    <Col>
                        <Form.Control
                            type={"password"}
                            name={"password"}
                            placeholder={"Password"}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col >
                        <Button type="submit">Sign in</Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}  className="mb-3">
                    <Col >
                        <Link to ="/register">
                            <Button variant={"link"}>Don't have an account yet?</Button>
                        </Link>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Login;