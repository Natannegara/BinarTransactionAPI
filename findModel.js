const readDir = require('read-dir-deep');
const path = require('path')
const routesPath = path.resolve('models')
const filePaths = readDir.readDirDeepSync(routesPath)
const fs = require('fs');
let rawdata = fs.readFileSync('db.json')
let keys = JSON.parse(rawdata)
const shapeObject = require('./helpers/shapeObjectHelper');


function checkingModel(tableName, data) {
    const listModel = []
    filePaths.forEach((filePath) => {
        const relativeFilePath = `./${filePath}`
        const model = require(relativeFilePath)
        listModel.push(model)
    })
    let shapedData;
    const listKeys = Object.keys(keys)
    const valid = listKeys.includes(tableName)
    if (valid) {
        let index = (listKeys.sort()).findIndex(key => key == tableName)
        shapedData = shapeObject(data, listModel[index])
    };
    return shapedData
}
module.exports = checkingModel