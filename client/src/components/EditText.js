import React, { Component } from 'react';
const axios = require('axios');

class EditText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flowerUpdate: this.props.updateFlower,
            sightUpdate: this.props.updateSight,
            value: this.props.input,
            change: this.props.change,
            isEditing: false
        };
    }

    onEdit = () => {
        this.setState({isEditing: !this.state.isEditing});
    }

    onUpdate = () => {
        var old = this.state.value;
        this.setState({isEditing: false});
        this.setState({value: document.getElementById('editValue').value});

        var obj = {
            newName: document.getElementById('editValue').value,
            oldName: old,
            change: this.state.change
        };
        axios.post('/api/updateFlowers', obj)
            .then((res, err) => {
                if (!err) {
                    this.state.flowerUpdate();
                    this.state.sightUpdate();
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

export default EditText