const express = require('express')
const { get } = require('../../../../connections/dbConnection')
const app = express.Router()
const db = require('../../../../connections/dbConnection')
const shapeObject = require('../../../../helpers/shapeObjectHelper')
const users = require('../../../../models/userModel')

app.post('/profile/customer', (req, res) => {
    const body = req.body
    const obj = shapeObject(body, model)
    db.add(obj)
})