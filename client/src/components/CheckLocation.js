import React, { Component } from 'react';

class ChekLocation extends Component {

    constructor(props){
        super(props);
        this.state={
            isPop: false,
            isRock: false,
            isCountry: false,
            isJazz: false,
            isMetal: false,
            isFolk: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const {name, checked} = event.target;
        this.setState({
            [name]: checked
        })
    }

    render(){
        return(
            <div style={{color: "white"}}>
                <p style={{fontWeight: "bold", fontSize:"20px"}}>Location:</p>
                
                    <select id="selectAccountType" className="form-control" onChange={this.onAccountTypeChange} selected="musician">
                        <option value="not_selected">Select a location</option>
                        <option value="Beograd">Beograd</option>
                        <option value="Novi Sad">Novi Sad</option>
                        <option value="Nis">Nis</option>
                        <option value="Kragujevac">Kragujevac</option>
                        <option value="Pristina">Pristina</option>
                        <option value="Subotica">Subotica</option>
                        <option value="Pancevo">Pancevo</option>
                        <option value="Loznica">Loznica</option>
                        <option value="Pristina">Pristina</option>
                        <option value="Zrenjanin">Zrenjanin</option>
                        <option value="Cacak">Cacak</option>
                        <option value="Krusevac">Krusevac</option>
                        <option value="Kraljevo">Kraljevo</option>
                        <option value="Novi Pazar">Novi Pazar</option>
                        <option value="Smederevo">Smederevo</option>
                        <option value="Leskovac">Leskovac</option>
                        <option value="Uzice">Uzice</option>
                        <option value="Vranje">Vranje</option>
                        <option value="Valjevo">Valjevo</option>
                        <option value="Sabac">Sabac</option>
                        <option value="Sombor">Sombor</option>
                        <option value="Pozarevac">Pozarevac</option>
                        <option value="Pirot">Pirot</option>
                        <option value="Zajecar">Zajecar</option>
                        <option value="Kikinda">Kikinda</option>
                        <option value="Sremska Mitrovica">Sremska Mitrovica</option>
                        <option value="Jagodina">Jagodina</option>
                        <option value="Vrsac">Vrsac</option>
                        <option value="Bor">Bor</option>
                        <option value="Prokuplje">Prokuplje</option>
                        <option value="Loznica">Loznica</option>
                    </select>
            </div>
        );
    }
}

export default ChekLocation;