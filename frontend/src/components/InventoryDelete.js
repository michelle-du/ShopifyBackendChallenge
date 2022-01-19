import React from "react";
import axios from "axios";
const { URL } = require("../constants/constants.js");

export default class InventoryPost extends React.Component {
    state = {
        id: null,
        response: null
    }

    // Update state
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // DELETE /inventory/:id
    handleSubmit = (event) => {
        event.preventDefault();

        axios.delete(`${URL}/inventory/${this.state.id}`)
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
                <h2>Delete Inventory Item</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Item ID to delete:
                        <input type="text" name="id" onChange={this.handleChange} />
                    </label>
                    <button type="submit">Submit</button>
                    {this.state.response && <div>{this.state.response}</div>}
                </form>
            </div>
        )
    }
}
