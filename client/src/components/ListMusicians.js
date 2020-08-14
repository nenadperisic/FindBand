import React, { Component } from 'react';
import axios from 'axios';
import ListResult from './ListResult';
import jsex from './JsonExcercise.json';

class ListMusicians extends Component {

    constructor(props){
        super(props);
        this.state = {
            result: [],
            listResult: null
        }
        
        
    }

    async componentDidMount() {
        {
            await axios.get('http://localhost:5000/api/forum/getMusicians', {
                params: {
                    accountType : localStorage.accountType
                }
            }).then(res => {
                console.log(localStorage.accountType)
                this.state.result = res.data;
                console.log(this.state.result);
                this.state.listResult = this.state.result.map(
                    result => <ListResult
                    // id={result.id}
                    // key={result.id}
                    name={result.title}
                    description={result.description}
                    email={result.user}
                    genre={result.genres}
                    instruments={result.instruments}
                    // location={result.location}
                    />);
              })
          }
          this.forceUpdate();
    }
    

    render(){
        
        return(
            <div>
                { this.state.listResult}
            </div>
        );
    }
}

export default ListMusicians;
