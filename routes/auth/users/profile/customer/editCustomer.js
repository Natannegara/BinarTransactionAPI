//EDIT ROUTE FINAL
const express = require('express')
const app = express.Router()
const editData = require('../controllers/editController')
const getData = require('../controllers/getController')
const userModel = require('../models/userModel')



app.patch('/users/profile', (req, res) => {
    const id = req.query.id
    const query = req.body
    const listKeys = Object.keys(query)
    listKeys.forEach(key => {
        if (userModel.includes(key) != true) throw new Error('Please input right query')
    });


    const data = getData('users')
    function fillQuery() {
        for (i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                const input = data[i]
                input.role = query.role ? query.role : input.role
                input.username = query.username ? query.username : input.username
                input.password = query.password ? query.password : input.password
                input.email = query.email ? query.email : input.email
                return input;
            }
        }
    }
    const result = fillQuery()
    res.send(editData('users', id, result))
})
module.exports = app
