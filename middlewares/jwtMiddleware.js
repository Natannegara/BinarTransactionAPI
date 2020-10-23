const jwt = require('jsonwebtoken')
const jwtConfig = require('../jwtConfig')

/**
 * create (sign) jwt token
 * @param {any} data data payload that want to be encoded as token
 * @returns {String} jwt token
 */
// fungsi ini digunakan untuk membuat token, parameter yang digunakan
// adalah data ----> {data yang akan kita masukkan}. Kode Secret sudah tersedia
// di dalam file jwtConfig.js
function signJwt(data) {
  const token = jwt.sign(data, jwtConfig.secret, jwtConfig.options)
  return token
}

/**
 * verify jwt token
 * @param {String} token jwt token
 * @returns {any} returns data payload
 */
function verifyJwt(token) {

}

const jwtFunctions = { signJwt, verifyJwt }
module.exports = jwtFunctions