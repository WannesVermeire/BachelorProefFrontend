import React, {Component} from 'react';
import {Button, Container} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {

    render(){
        return(
            <Container fluid="sm">
                <div className="card text-white bg-primary mb-3">
                    <div className="card-header">Welkom bij de grootste fout van je leven</div>
                    <div className="card-body">
                        <h5 className="card-title">MasterTool</h5>
                        <p className="card-text">Met deze mastertool geraak je aan een onderwerp voor je masterproef.
                        Als je naar de opbouw van deze tool kijkt zie je dat hij perfect is. Moest je dus geen
                        onderwerp vinden ligt het aan jou en niet aan de makers van deze tool!</p>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Home;