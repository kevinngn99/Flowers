import React, { Component } from 'react';

class InsertFlowersEditText extends Component {
    constructor(props) {
        super(props);

        var val;
        if (this.props.change === 'name') {
            val = this.props.name;
        }
        else if (this.props.change === 'genus') {
            val = this.props.genus;
        }
        else if (this.props.change === 'species') {
            val = this.props.species;
        }

        this.state = {
            insert: this.props.insert,
            value: val,
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

        if (this.state.change === 'name') {
            this.state.insert(document.getElementById('editValue').value, null, null);
        }
        else if (this.state.change === 'genus') {
            this.state.insert(null, document.getElementById('editValue').value, null);
        }
        else if (this.state.change === 'species') {
            this.state.insert(null, null, document.getElementById('editValue').value);
        }
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

export default InsertFlowersEditText