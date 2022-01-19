const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/inventoryRoute.js");
const { PORT } = require("./constants/constants.js");

const app = express();
app.use(cors());
app.use(express.json());

// Database URL
const URL =
    "mongodb+srv://user:Ortk0KdoaEY24BzS@cluster0.m76zh.mongodb.net/InventoryDB?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
    .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => console.log(err));

app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
