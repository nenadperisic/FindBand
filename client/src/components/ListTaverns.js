import React, { Component } from 'react';
import ListResult from './ListResult';
import jsex from './JsonExcercise.json';

class ListBands extends Component {

    render(){
        const listResult = jsex.map(
            result => <ListResult
            id={result.id}
            key={result.id}
            name={result.name}
            description={result.description}
            email={result.email}
            location={result.location}
            />);
        return(
            <div>
                 {listResult} 
            </div>
        );
    }
}

export default ListBands;
