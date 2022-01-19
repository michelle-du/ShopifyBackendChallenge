var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Inventory = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false,
});

module.exports = mongoose.model("Inventory", Inventory);
