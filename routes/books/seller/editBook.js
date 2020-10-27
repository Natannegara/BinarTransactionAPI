const express = require('express')
const { verifyJwt } = require('../../../middlewares/jwtMiddleware')
const app = express.Router()
const editData = require('../../../controllers/editController');

app.patch("/books/seller", verifyJwt('seller'), (req, res) => {
    const body = req.body
    const id = req.query.id
    const result = editData('books', id, body)
    if (result) {
        res.send(result)
    }
    else {
        res.sendStatus(404)
    }
})

module.exports = app