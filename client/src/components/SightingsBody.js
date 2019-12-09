import React, { Component } from 'react';
import SightingsEditText from '../components/SightingsEditText.js';
const axios = require('axios');

class SightingsBody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: this.props.index,
            update: this.props.update,
            name: this.props.name,
            person: this.props.person,
            location: this.props.location,
            date: this.props.date
        };
    }

    onDelete = () => {
        var obj = {
            name: this.state.name,
            person: this.state.person,
            location: this.state.location,
            date: this.state.date,
        };
        axios.post('/api/deleteSightings', obj)
            .then((res, err) => {
                if (!err) {
                    this.state.update();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <h4><strong> <br/> Sighting: #{this.state.index + 1} </strong></h4>
                <div> 
                    <h5> Name: <SightingsEditText update={this.state.update} name={this.state.name} person={this.state.person} location={this.state.location} date={this.state.date} change="person"></SightingsEditText> </h5>
                    <h5> Person: <SightingsEditText update={this.state.update} name={this.state.name} location={this.state.location} person={this.state.person} date={this.state.date} change="location"></SightingsEditText> </h5>
                    <h5> Date: <SightingsEditText update={this.state.update} name={this.state.name} date={this.state.date} person={this.state.person} location={this.state.location} change="date"></SightingsEditText></h5>
                    <button onClick={this.onDelete} style={{ width: "100%", marginTop: "10px" }} className="btn btn-outline-secondary" type="button" > <i class="fas fa-trash-alt"></i> </button>
                </div>
            </div>
        );
    }
}

export default SightingsBody