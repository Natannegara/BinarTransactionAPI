const express = require('express');
const { verifyJwt } = require('../../../middlewares/jwtMiddleware')
const addData = require('../../../controllers/addController');
const app = express.Router()


app.post("/books/seller", verifyJwt("seller"), (req, res) => {
    const body = req.body;
    const result = addData('books', body);
    res.send(result);
    return;
});

module.exports = app