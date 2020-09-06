import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';

class BandProfileResults extends Component {
    
    constructor(props){
        super(props); 

        this.getTabs = this.getTabs.bind(this);
    }


    getTabs() {

        const tabs = [
            { tabName: 'About', content: <div className="col-md-6">
                                            <label>{this.props.description}</label>
                                        </div>},
            { tabName: 'Details', content: <div>
                                                <div className="row">
                                        <div className="col-md-6">
                                            <label><span role="img" aria-label="acceessible-emoji">✉️</span> E-mail: </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{this.props.email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label><span role="img" aria-label="acceessible-emoji">🎶</span> Genres: </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{this.props.genres}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label><span role="img" aria-label="acceessible-emoji">📍</span> Location: </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{this.props.location}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label><span role="img" aria-label="acceessible-emoji">❓</span> Professional account: </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{this.props.professionalAccount ? ' ✔️ yes': ' ❌ no'}</p>
                                        </div>
                                    </div>
                                            </div> },
            ];

        return tabs.map((tab, index) => ({
            title: tab.tabName,
            getContent: () => tab.content,
            key: index,
            tabClassName: 'tab',
            panelClassName: 'panel',
        }));
    }


    render(){
        
        return(
            <Container>
                <Row>
                    <Col xs = {3}>
                        <div id="profile-img">
                           {this.props.gender === "female" ? <img src="/profileFemale.jpg" alt = "profile"/>: <img src="/profileMale.jpg" alt = "profile"/>}
                            <br/>
                            <div className="file btn btn-lg" id="fileDiv">
                                Change photo
                                <input type="file" name="file"></input>
                            </div>
                        </div> 
                    </Col>
                    <Col sm={9}>
                        <h2>{this.props.name}</h2>
                        <br/>
                        <Tabs items={this.getTabs()} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default BandProfileResults;