const express = require('express')
const getData = require('../../controllers/getController')
const { signJwt } = require('../../middlewares/jwtMiddleware')
const shapedBody = require('../../helpers/shapeObjectHelper')

const app = express.Router()

app.post('/auth/login', (req, res) => {
  const body = req.body
  const keyLogin = ["username", "password", "role"]
  const isValid = shapedBody(body, keyLogin)
  if (!isValid) return res.json({
    msg: " Please input username, password and role (use body !!)"
  })
  const result = getData('users', body)[0]
  if (result) {
    const token = signJwt(result)
    result.accessToken = token
    res.send(result)
  } else {
    res.status(400).send(`can't find user`)
  }
})

module.exports = app
