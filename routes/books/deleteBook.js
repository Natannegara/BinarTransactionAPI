const express = require('express')
const app = express.Router()
const removeDataByQuery = require('../../controllers/removeController')

app.delete("/books", (req, res) => {
    const query = req.query;
    const id = query.id;
    removeDataByQuery("books", id)
    res.status(202).send("Delete Accepted!")
    return;
});

module.exports = app