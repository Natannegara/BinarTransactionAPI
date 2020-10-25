//EDIT ROUTE FINAL
const express = require('express')
const app = express.Router()
const getData = require('../../../../../controllers/getController')
const { verifyJwt } = require('../../../../../middlewares/jwtMiddleware')

app.get('/users/profile/customer', verifyJwt, (req, res) => {
    if (req.user.role != 'customer') return res.json({ msg: "Only customer can access here" })
    if (req.user) return res.json(req.user)
})
module.exports = app
