const express = require('express');
const { verifyJwt } = require('../../middlewares/jwtMiddleware')
const getData = require('../../controllers/getController');
const app = express.Router()

app.get("/books/customer", verifyJwt('customer'), (req, res) => {
    const result = getData('books');

    if (result) {
        res.send(result);
    } else {
        res.status(404).send('data not found');
    }
    return;
});

module.exports = app