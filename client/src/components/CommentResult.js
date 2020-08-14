import React, { Component } from 'react';

class CommentResult extends Component{

    constructor(props){
        super(props)

        this.viewAd = this.viewAd.bind(this);
    }

    viewAd(id){
        console.log(id);
    }

    render(){
        const style={borderRadius: "25px", 
                borderStyle: "solid", 
                borderColor: "#343a40", 
                height: "40%", 
                margin: "3%",
                backgroundColor: "rgba(4,4,4, 0.7)"
            };
            const styleItems={
                marginLeft: "20px", 
                color: "white"
            };

        return(
            <div style = {style}>
                <div style={{marginTop: "20px"}}>
                    <h2 style={styleItems}>{this.props.name}</h2>
                    <h6 style={styleItems}>GRADE: {this.props.genre}</h6>
                    <h5 style={styleItems}>COMMENT: {this.props.description}</h5>
                </div>                

            </div>
        );
    }

}

export default CommentResult;