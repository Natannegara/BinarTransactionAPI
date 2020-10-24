const db = require("../connections/dbConnection")
const shapeObject = require("../helpers/shapeObjectHelper")
const transactionModel = require("../models/transactionModel")
const userModel = require("../models/userModel")
const booksModel = require('../models/booksModel')
const genresModel = require('../models/genresModel')
const itemTransactionModel = require('../models/itemTransactionModel')
const storesModel = require('../models/storesModel')
const checkingModel = require("../findModel")


/**
 * Add data to database
 * 
 * Usage example:
 * 
 *    add('transaction', { id: "1", nominal: 3000 })
 *    // 👆 add data by id "1" and nominal 3000
 * 
 * @param {String} tableName choose table
 * @param {Object} data data to insert
 * @returns {Object} Returns an `object` if successfully added
 * @returns {Boolean} Retuns `false` if id wasn't string, not found, or data object keys was lacking
 */
function addData(tableName, data) {
  // if you only have one line code inside an if
  // you can shorten it like this 👇
  if (!data.id) return false
  if (typeof data.id !== 'string') return false


  let shapedData = checkingModel(tableName, data)
  if (!shapedData) return false


  db.get(tableName)
    .push(shapedData)
    .write()
  return data
}
module.exports = addData