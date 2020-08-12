import React, { Component } from 'react';

class ListResult extends Component{

    constructor(props){
        super(props)

        this.viewAd = this.viewAd.bind(this);
    }

    viewAd(id){
        console.log(id);
    }

    render(){
        return(
            <div style={{borderStyle: "solid", borderColor: "black", height: "40%", margin: "3%"}}>
                <h2>{this.props.name}</h2>
                <h6>Genre: {this.props.genre}</h6>
                <h5>Description: {this.props.description}</h5>
                <h6>Email: {this.props.email}</h6>
                <br/>
                <button onClick={() => this.viewAd(this.props.id)}>View Ad</button>

            </div>
        );
    }

}

export default ListResult;