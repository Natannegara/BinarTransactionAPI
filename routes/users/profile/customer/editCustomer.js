const express = require('express')
const app = express.Router()
const editData = require('../../../../controllers/editController')
const getData = require('../../../../controllers/getController')
const { verifyJwt } = require('../../../../middlewares/jwtMiddleware')

app.patch('/users/profile/customer', verifyJwt('customer'), (req, res) => {
    if (req.user.role != 'customer') return res.json({ msg: "Only customer can access here" })
    const id = req.query.id
    const query = req.body
    editData('users', id, query)
    res.json({ Congratulation: `You've been updated`, "Your Data": getData('users', query) })

})
module.exports = app
