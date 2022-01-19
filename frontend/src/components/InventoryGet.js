import React from "react";
import axios from "axios";
const { URL } = require("../constants/constants.js");

export default class InventoryGet extends React.Component {
    state = {
        inventory: [],
        displayTable: false // To display result table
    }

    // GET /inventory
    getInventory = () => {
        console.log(URL);
        axios.get(`${URL}/inventory`)
            .then(res => {
                this.setState({ inventory: res.data, displayTable: true })
            });
    }

    // GET /inventory/csv
    exportCSV = () => {
        axios.get(`${URL}/inventory/csv`)
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "inventory.csv");
                document.body.appendChild(link);
                link.click();
            })
    }

    render() {
        return (
            <div>
                <h2>List Inventory Items</h2>
                <div>
                    <button onClick={this.getInventory}> Get inventory </button>
                    {this.state.displayTable && (<table>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Quantity</th>
                            </tr>
                            {
                                this.state.inventory.map(item =>
                                    <tr key={item._id}>
                                        <th>{item._id}</th>
                                        <th>{item.name}</th>
                                        <th>{item.quantity}</th>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>)}
                </div>
                <div>
                    <button onClick={this.exportCSV}> Export inventory to CSV </button>
                </div>
            </div>
        )
    }
}
