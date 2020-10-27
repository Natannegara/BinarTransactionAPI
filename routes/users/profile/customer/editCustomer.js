const express = require('express')
const app = express.Router()
const editData = require('../../../../controllers/editController')
const getData = require('../../../../controllers/getController')
const { verifyJwt } = require('../../../../middlewares/jwtMiddleware')
const userModel = require('../../../../models/userModel')

app.patch('/users/profile/customer', verifyJwt('customer'), (req, res) => {
    const id = req.user.id
    const query = req.body
    const keysRequest = Object.keys(query)
    const isValid = keysRequest.filter(key => userModel.includes(key))
    if (keysRequest.length != isValid.length) return res.status(404).json({ error: "wrong keys" })
    editData('users', id, query)
    res.json({ Congratulation: `You've been updated`, "Your Data": getData('users', query) })

})
module.exports = app
