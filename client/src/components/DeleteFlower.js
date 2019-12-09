import React, { Component } from 'react';
const axios = require('axios');

class DeleteFlower extends Component {
    constructor(props) {
        super(props);

        this.state = {
            update: this.props.update,
            index: this.props.index,
            name: this.props.name,
            genus: this.props.genus,
            species: this.props.species
        };
    }

    onDelete = () => {
        var obj = {
            name: this.state.name,
            genus: this.state.genus,
            species: this.state.species
        };
        axios.post('/api/deleteFlowers', obj)
            .then((res, err) => {
                if (!err) {
                    this.state.update(this.state.index);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <button onClick={this.onDelete} style={{ width: "45%", float: "right" }} className="btn btn-outline-secondary" type="button" > <i class="fas fa-trash-alt"></i> </button>
        );
    }
}

export default DeleteFlower