const db = require("../connections/dbConnection")

/**
 * Edit data
 * 
 * Usage example:
 * 
 *    edit('transaction', "1", { nominal: 4000 })
 *    // 👆 edit data by id "1" to having 4000 nominal
 * 
 * @param {String} tableName choose table
 * @param {String} id data id to update
 * @param {Object} data new data to update
 * @returns {Object} Returns an `object` if successfully added
 * @returns {Boolean} Retuns `false` if id wasn't string, not found, or data object keys was lacking
 */
function editData(tableName, id, data) {
  if (!id) return false
  if (typeof id !== 'string') return false
  const searchResult = db.get(tableName)
    .find({ id })
    .value()
  // checking whether users input right query
  const model = Object.keys(searchResult)
  const keys = Object.keys(data)
  keys.forEach(key => {
    if (model.includes(key) != true) throw new Error('wrong query shape')
  });
  // if users only update one parameter, this is the solution
  if (searchResult) {
    searchResult.id = data.id ? data.id : searchResult.id
    searchResult.username = data.username ? data.username : searchResult.username
    searchResult.email = data.email ? data.email : searchResult.email
    searchResult.password = data.password ? data.password : searchResult.password
    searchResult.role = data.role ? data.role : searchResult.role

    const result = db.get(tableName)
      .find(id)
      .assign(searchResult)
      .write()
    return result
  } else {
    return false
  }
}

module.exports = editData
