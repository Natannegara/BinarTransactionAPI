//EDIT ROUTE FINAL
const express = require('express')
const app = express.Router()
const { verifyJwt } = require('../../../../middlewares/jwtMiddleware')

app.get('/users/profile/customer', verifyJwt('customer'), (req, res) => {
    if (req.user) return res.json(req.user)
})
module.exports = app
