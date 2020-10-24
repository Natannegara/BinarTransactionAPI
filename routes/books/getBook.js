const express = require('express');
const getData = require('../../controllers/getController');
const app = express.Router()

app.get("/books", (req, res) => {
    res.send(getData('books'))
});

module.exports = app