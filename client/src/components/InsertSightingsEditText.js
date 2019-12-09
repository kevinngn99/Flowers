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
            value: val,
            person: this.props.person,
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
    }

    renderEdit = () => {
        return (
            <div style={{marginTop: "10px", marginBottom: "10px"}}>
                <input autoComplete="off" type="text" className="form-control" id="editValue" defaultValue={this.state.value} />
                <div style={{marginTop: "10px"}}>
                    <button onClick={this.onEdit} className="btn btn-outline-secondary" type="button" > <i class="fas fa-times"></i> </button>
                    <button style={{marginLeft: "10px"}} onClick={this.onUpdate} className="btn btn-outline-success" type="button" > <i class="fas fa-check"></i> </button>
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