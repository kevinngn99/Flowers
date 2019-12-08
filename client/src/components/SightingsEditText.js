import React, { Component } from 'react';
const axios = require('axios');

class SightingsEditText extends Component {
    constructor(props) {
        super(props);

        var val;
        if (this.props.change === 'person') {
            val = this.props.person;
        }
        else if (this.props.change === 'location') {
            val = this.props.location;
        }
        else if (this.props.change === 'date') {
            val = this.props.date;
        }

        this.state = {
            update: this.props.update,
            value: val,
            person: this.props.person,
            name: this.props.name,
            location: this.props.location,
            date: this.props.date,
            change: this.props.change,
            isEditing: false
        };
    }

    onEdit = () => {
        this.setState({isEditing: !this.state.isEditing});
    }

    onUpdate = () => {
        this.setState({isEditing: false});
        this.setState({value: document.getElementById('editValue').value});

        var obj = {
            newName: document.getElementById('editValue').value,
            person: this.state.person,
            name: this.state.name,
            location: this.state.location,
            date: this.state.date,
            change: this.state.change
        };
        axios.post('/api/updateSightings', obj)
            .then((res, err) => {
                if (!err) {
                    this.state.update();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    renderEdit = () => {
        return (
            <div style={{marginTop: "10px", marginBottom: "10px"}}>
                <input autoComplete="off" type="text" className="form-control" id="editValue" defaultValue={this.state.value} />
                <div style={{marginTop: "10px"}}>
                    <button onClick={this.onEdit} className="btn btn-outline-secondary" type="button" > X </button>
                    <button style={{marginLeft: "10px"}} onClick={this.onUpdate} className="btn btn-outline-success" type="button" > ✓ </button>
                </div>
            </div>
        );
    }

    renderText = () => {
        return (
            <div onClick={this.onEdit}>
                {this.state.value}
            </div>
        );
    }

    render() {
        return (
            this.state.isEditing ? this.renderEdit() : this.renderText()
        );
    }
}

export default SightingsEditText