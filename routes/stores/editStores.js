//===========> Preparing all the necessary const variable with required dependencies
const express = require("express");
const editData = require("../../controllers/editController");
//===========> Preparing express.Router()
const app = express.Router();

app.patch("/stores", (req, res) => {
    const body = req.body;
    const id = req.query.id;
    console.log(body);
    const stores = editData("stores", id, body);
    //=============> Check if query exist
    if (id) {
        //=============> Check if data with said id exist
        if (stores && Number.isInteger(Number(id))) {
            editData("stores", id, body)
            res.json({
                message: `Data with id:${id} has succesfully edited`,
                stores,
            });
            return;
        } else {
            res.status(404).json({ message: `Can't edit data id:${id}, data not found` });
            return;
        }
    } else {
        res.status(400).json({ message: "Bad request" });
        return;
    }
});

module.exports = app;
