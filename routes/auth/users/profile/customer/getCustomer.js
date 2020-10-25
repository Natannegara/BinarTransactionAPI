//EDIT ROUTE FINAL
const express = require('express')
const app = express.Router()
const getData = require('../../../../../controllers/getController')

app.get('/users/profile/customer', (req, res) => {
    const query = req.query
    if (Object.keys(query).length != 1) return res.json({ msg: "find using one key only" })
    if (query) return res.send(getData('users', query))
    if (req.body) return res.json({ msg: "request body not allowed" })
})
module.exports = app
