import React, {Component} from 'react';
import {Button, Container} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {

    render(){
        return(
            <Container fluid="sm">
                <div className="card text-white bg-primary mb-3">
                    <div className="card-header">MasterTool</div>
                    <div className="card-body">
                        <h5 className="card-title">How to use?</h5>
                        <div  className="card-text">
                            <p>1. Start of by scrolling through the available subjects. </p>
                            <p>2. Like the subjects you prefer. </p>
                            <p>3. Contact the promoter/contact of the subject. You can view their emails by hovering over their name.</p>
                            <p>4. Choose your final top 3 in the Final subject page. Only your liked subjects will appear as a choice.</p>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Home;