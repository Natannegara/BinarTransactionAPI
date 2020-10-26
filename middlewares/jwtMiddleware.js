const jwt = require('jsonwebtoken')
const jwtConfig = require('../jwtConfig')
/**
 * create (sign) jwt token
 * @param {any} data data payload that want to be encoded as token
 * @returns {String} jwt token
 */
// fungsi ini digunakan untuk membuat token, parameter yang digunakan
// adalah data ----> {data yang akan kita masukkan}. 
function signJwt(data) {
  // Kode Secret sudah tersedia di dalam file jwtConfig.js
  const token = jwt.sign(data, jwtConfig.secret, jwtConfig.options)
  return token
}

/**
 * verify jwt token
 * @param {String} token jwt token
 * @returns {any} returns data payload
 */
function verifyJwt(role) {
  return function verifyJwt(req, res, next) {
    const authorization = req.headers.authorization
    if (authorization) {
      const splt = authorization.split(' ')[1]
      try {
        const userChecking = jwt.verify(splt, jwtConfig.secret)
        req.user = userChecking
        if (req.user.role === role) {
          next()
        } else {
          req.send('you cant access here using your role')
        }
      } catch (error) {
        res.status(401).send('wrong token')
      }
    }
  }
}

const jwtFunctions = { signJwt, verifyJwt }
module.exports = jwtFunctions