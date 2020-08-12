import React, { Component } from 'react';
import ListResult from './ListResult';
import jsex from './JsonExcercise.json';

class ListMusicians extends Component {

    constructor(props){
        super(props);
        
    }

    render(){
        const listResult = jsex.map(
            result => <ListResult
            id={result.id}
            key={result.id}
            name={result.name}
            description={result.description}
            email={result.email}
            genre={result.genre}
            instruments={result.instruments}
            location={result.location}
            />);
        return(
            <div>
                 {listResult} 
            </div>
        );
    }
}

export default ListMusicians;
