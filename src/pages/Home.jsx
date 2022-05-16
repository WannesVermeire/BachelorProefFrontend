import React, {Component} from 'react';
import {Button, Container} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import isRole from "../hooks/isRole.jsx"

class Home extends Component {

    render(){
        return(
            <Container fluid="sm">
                <div className="card text-white bg-primary mb-3">
                    <div className="card-header">MasterTool</div>
                    <div className="card-body">
                        <h5 className="card-title">How to use?</h5>
                        {isRole("ROLE_STUDENT")?
                        <div  className="card-text">
                            <p>1. Start of by scrolling through the available subjects. </p>
                            <p>2. Like the subjects you prefer. </p>
                            <p>3. Contact the promoter/contact of the subject. You can view their emails by hovering over their name.</p>
                            <p>4. Choose your final top 3 in the Final subject page. Only your liked subjects will appear as a choice.</p>
                            <p>5. Wait for the final allocation of subjects to students</p>
                        </div>: null}
                        {isRole("ROLE_CONTACT")?
                            <div  className="card-text">
                                <p>1. Start by adding your own company in the user section</p>
                                <p>2. Wait for the admin to approve your company, you'll get an email when this process is completed.</p>
                                <p>3. Post subjects with your company in the company selection</p>
                                <p>4. Wait for the admin to approve these subjects.</p>
                                <p>4. Boost students who chose your subject as their preferred subject</p>
                            </div>: null}
                        {isRole("ROLE_PROMOTOR")?
                            <div  className="card-text">
                                <p>1. Start by adding your own subjects.</p>
                                <p>2. Post subjects with you as promoter.</p>
                                <p>3. Wait for the admin to approve these subjects.</p>
                                <p>4. Boost students who chose your subject as their preferred subject</p>
                            </div>: null}
                        {isRole("ROLE_COORDINATOR")?
                            <div  className="card-text">
                                <p>1. Contact the admin for more information</p>
                            </div>: null}
                    </div>
                </div>
            </Container>
        );
    }
}

export default Home;