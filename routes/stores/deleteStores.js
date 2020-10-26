//========> Preparing all the necessary const variable with required dependencies
const express = require("express");
const getData = require("../../controllers/getController");
const { removeDataById } = require("../../controllers/removeController");
//========> Preparing express.Router()
const app = express.Router();

app.delete("/stores", (req, res) => {
    const body = req.body;
    const id = req.query.id;
    const data = getData("stores", id)

    //===========> Check if request query exist

    if (id) {
        if (data && Number.isInteger(Number(id))) {
            removeDataById("stores", id)
            res.json({ message: `Data with id:${id} is deleted` });
            return;
        } else {
            res.status(404).json({ message: `can't delete data, id:${id} not found` });
            return;
        }
    } else {
        res.status(400).json({ message: "Bad Request" });
        return;
    }
});

module.exports = app;