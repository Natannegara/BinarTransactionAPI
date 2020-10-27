const express = require('express')
const { verifyJwt } = require('../../middlewares/jwtMiddleware')
const app = express.Router()
const remove = require('../../controllers/removeController')

app.delete("/books", verifyJwt('seller'), (req, res) => {
    const query = req.query;
    const id = query.id;
    remove.removeDataByQuery("books", id)
    res.status(202).send("Delete Accepted!")
    return;
});

module.exports = app