const express = require('express')
const app = express.Router()
const editData = require('../../controllers/editController');

app.patch("/books", (req, res) => {
    const body = req.body
    const id = req.query.id
    const result = editData('books', req.query.id, body)
    if (result) {
        res.send(result)
    }
    else {
        res.sendStatus(404)
    }
})

module.exports = app