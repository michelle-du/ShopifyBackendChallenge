import React from "react";
import axios from "axios";
const { URL } = require("../constants/constants.js");

export default class InventoryPut extends React.Component {
    state = {
        id: null,
        name: null,
        quantity: null,
        response: null
    }

    // Update state
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // PUT /inventory/:id
    handleSubmit = (event) => {
        event.preventDefault();
        // Handle form data
        const item = {};
        if (this.state.name) item.name = this.state.name;
        if (this.state.quantity) item.id = this.state.quantity;

        axios.put(`${URL}/inventory/${this.state.id}`, item)
            .then(res => {
                console.log(res);
                this.setState({ response: res.data.message });
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response);
                    this.setState({ response: err.response.data.message });
                } else {
                    console.log(err);
                }
            })
    }

    render() {
        return (
            <div>
                <h2>Update Inventory Item</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Item ID to update:
                        <input type="text" name="id" onChange={this.handleChange} />
                        New item name:
                        <input type="text" name="name" onChange={this.handleChange} />
                        New item quantity:
                        <input type="number" name="quantity" onChange={this.handleChange} />
                    </label>
                    <button type="submit">Submit</button>
                    {this.state.response && <div>{this.state.response}</div>}
                </form>
            </div>
        )
    }
}
