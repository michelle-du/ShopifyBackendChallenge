const express = require("express");
const { Parser } = require("json2csv");

const Inventory = require("../model/inventoryModel.js");

const router = express.Router();

// Create Inventory items
router.post("/inventory", (req, res) => {
    // Validation
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty."
        });
        return;
    }

    // Create Inventory object
    const inventory = new Inventory(req.body);

    // Save to database
    inventory
        .save()
        .then((data) => {
            res.status(200).send({
                message: "Successfully added: " + data
            });
        })
        .catch((err) => {
            res.status(400).send({
                message: err.message
            });
        });
});

// List Inventory items
router.get("/inventory", (req, res) => {
    Inventory.find()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(400).send(err.message);
        });
});

// Delete Inventory item by id
router.delete("/inventory/:id", (req, res) => {
    const id = req.params.id;

    // Find and delete
    Inventory.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Inventory item with id=${id} not found.`
                });
            } else {
                res.status(200).send({
                    message: "Invetory item deleted."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete Inventory item with id ${id}.`
            });
        });
})

// Update Inventory item by id
router.put("/inventory/:id", (req, res) => {
    const id = req.params.id;

    // Validation
    console.log(!req.body);
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty."
        });
        return;
    }
    if (!req.body.name) {
        res.status(400).send({
            message: "Item name is required."
        });
    }

    // Find and update
    Inventory.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Inventory item with id=${id} not found.`
                });
            } else {
                res.status(200).send({
                    message: "Invetory item was updated."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not update Inventory item with id ${id}.`
            });
        });
})

// Export data as CSV 
router.get("/inventory/csv", (req, res) => {
    Inventory.find()
        .then((data) => {
            const fields = Object.keys(Inventory.schema.paths);
            const json2csv = new Parser({ fields });
            const csv = json2csv.parse(data);
            res.header("Content-Type", "text/csv");
            res.attachment("inventory.csv");
            res.status(200).send(csv);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
})

module.exports = router;
