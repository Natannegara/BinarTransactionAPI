//EDIT ROUTE FINAL
const express = require('express')
const app = express.Router()
const remove = require('../../../../controllers/removeController')
const { verifyJwt } = require('../../../../middlewares/jwtMiddleware')

app.delete('/users/profile/customer', verifyJwt('customer'), (req, res) => {
    remove.removeDataById('users', req.user.id)
    res.json({ "Message": "I wish you will use our App next time" })
})

module.exports = app
