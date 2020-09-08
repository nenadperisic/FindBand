import React, { Component } from 'react';
import axios from 'axios';

class BandMembers extends Component {
    constructor(props) {
        super(props);

        this.memberNames = [];
        this.memberEmails = this.props.members;
    }

   async getBandMembers() {
        let memberNames = [];
        try {
            let result = await axios.post(
                'http://localhost:5000/api/user/get/bandMembers',
                {bandMembers: this.props.members}
            );

            console.log(result.status);
            memberNames = result.data.members;

        } catch (e) {
            console.log(e);
        }

        return memberNames;
    }

    async componentDidMount() {
        this.memberNames = await this.getBandMembers();

        this.forceUpdate();
    }

    zip(arrays) {
        return arrays[0].map(function(_,i){
            return arrays.map(function(array){return array[i]})
        });
    }

    render() {
        let i = 0, tmp = [];
        for (let [name, email] of this.zip([this.memberNames, this.memberEmails])) {
            tmp.push(
                <div key={i++} className="row">
                    <div className="col-md-6">
                        {name}
                    </div>
                    <div className="col-md-6">
                        {email}
                    </div>
                </div>
            );
        }

        return (
            <div>
                {tmp}
            </div>
        );
    }

}

export default BandMembers;