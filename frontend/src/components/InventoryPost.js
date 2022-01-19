import React from "react";
import axios from "axios";
const { URL } = require("../constants/constants.js");

export default class InventoryPost extends React.Component {
    state = {
        name: null,
        quantity: 0,
        response: null
    }

    // Update state
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // POST /inventory
    handleSubmit = (event) => {
        event.preventDefault();
        // Data from form
        const item = {
            name: this.state.name,
            quantity: this.state.quantity
        }

        axios.post(`${URL}/inventory`, item)
            .then(res => {
                this.setState({ response: res.data.message });
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response)
                    this.setState({ response: err.response.data.message });
                } else {
                    console.log(err);
                }
            })
    }

    render() {
        return (
            <div>
                <h2>Add Inventory Item</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Item Name:
                        <input type="text" name="name" onChange={this.handleChange} />
                        Item Quantity:
                        <input type="number" name="quantity" onChange={this.handleChange} />
                    </label>
                    <button type="submit">Submit</button>
                    {this.state.response && <div>{this.state.response}</div>}
                </form>
            </div>
        )
    }
}
