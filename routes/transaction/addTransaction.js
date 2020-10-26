const express = require('express')
const addData = require('../../controllers/addController')
const getData = require('../../controllers/getController')
const app = express.Router()
// uid is a id generator library
// Reference: https://www.npmjs.com/package/uid
const uid = require('uid')
const { verifyJwt } = require('../../middlewares/jwtMiddleware')

//Gunakan fungsi middleware pada app.post
app.post('/transaction', verifyJwt('customer'), (req, res) => {
    //request body disimpan di variabel body
    const body = req.body
    //Info dari token disimpan di variabel userInfo
    const userInfo = req.user
    //cek apakah ada store dengan id : body.storeId
    if (getData('stores', { id: body.storeId }).length == 0) {
        //jika tidak ada kirimkan respon request
        res.status(404).send("Stores is not existt")
        return
    }
    //deklarasi variable date = datetime saat ini
    const date = new Date()
    //tambahkan id pada body dan tentukan nilainya dengan uid()
    body.id = uid()
    //tambah transactionDate pada body dan set nilainya date.toLocaleString(['ban', 'id'])= tanggal format indonesia
    body.transactionDate = date.toLocaleString(['ban', 'id'])
    //tambah customId pada body dan set nilainya useInfo.id
    body.customerId = userInfo.id
    //tambahkan nominal pada body dan set nilai awal 0, akan di update jika user menambahkan item transaksi
    body.nominal = "0"
    //gunakan fungsi addData pada data transaction dan tambahkan body, simpan return di variabel result
    const result = addData('transactions', body)
    //kirim respost request result
    res.send(result)
})
//export app
module.exports = app