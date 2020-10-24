const express = require('express');
const addData = require('../../controllers/addController');
const app = express.Router()


app.post("/books", (req, res) => {
    const body = req.body;
    const result = addData('books', body);
    res.send(result);
    return;
});

module.exports = app