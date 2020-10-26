//EDIT ROUTE FINAL
const express = require('express')
const app = express.Router()
const { verifyJwt } = require('../../../../middlewares/jwtMiddleware')

app.get('/users/profile/seller', verifyJwt('seller'), (req, res) => {
    if (req.user) return res.json(req.user)
})
module.exports = app
