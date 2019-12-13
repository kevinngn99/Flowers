import React, { Component } from 'react';
import InsertSightingsEditText from '../components/InsertSightingsEditText.js';
import Card from 'react-bootstrap/Card';
const axios = require('axios');

class InsertBody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            update: this.props.update,
            name: this.props.name,
            insertName: this.props.name,
            insertPerson: "Blank",
            insertLocation: "Blank",
            insertDate: "Blank",
        }
    }

    saveInsert = (name, person, location, date) => {
        if (name) {
            this.setState({insertName: name});
        }
        if (person) {
            this.setState({insertPerson: person});
        }
        if (location) {
            this.setState({insertLocation: location});
        }
        if (date) {
            this.setState({insertDate: date});
        }
    }

    onInsert = () => {
        var obj = {
            name: this.state.insertName,
            person: this.state.insertPerson,
            location: this.state.insertLocation,
            date: this.state.insertDate,
        };
        axios.post('/api/insertSightings', obj)
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
            <Card style={{ borderBottomColor: "#FFFFFF", borderRightColor: "#FFFFFF", borderLeftColor: "#FFFFFF" }}>
            <div className="p-3">
                <div>
                    <h4><strong> New Sighting: </strong></h4>
                    <div>
                        <h5> Person: <InsertSightingsEditText insert={this.saveInsert} name={this.state.name} person="Blank" location="Blank" date="Blank" change="person"></InsertSightingsEditText> </h5>
                        <h5> Location: <InsertSightingsEditText insert={this.saveInsert} name={this.state.name} location="Blank" person="Blank" date="Blank" change="location"></InsertSightingsEditText> </h5>
                        <h5> Date: <InsertSightingsEditText insert={this.saveInsert} name={this.state.name} date="Blank" person="Blank" location="Blank" change="date"></InsertSightingsEditText> </h5>
                        <button onClick={this.onInsert} style={{width: "100%", marginTop: "10px"}} className="btn btn-outline-success" type="button" > <i class="fas fa-plus"></i> </button>
                    </div>
                </div>
            </div>
            </Card>  
        );
    }
}

export default InsertBody