const express = require('express');
const getData = require('../../controllers/getController');
const { verifyJwt } = require('../../middlewares/jwtMiddleware');
const app = express.Router();

app.get('/transaction/seller', verifyJwt('seller'), (req, res) => {
    //info dari token yang diperoleh dari fungsi middleware dimasukkan ke variabel userInfo
    const userInfo = req.user
    //parameter pencarian disimpan di variabel query
    const query = req.query
    //cari data dari stores dengan sellerId = userInfo.id (id user)
    const store = getData('stores', { sellerId: userInfo.id })[0]
    //cek apakah store ada
    if (!store) {
        //jika store tidak ada kirimkan respon request
        res.status(404).send('You dont have any store!')
        //berhenti jika store tidak ditemukan
        return
    }
    //Tambahkan storeId ke query dengan id dari variabel store
    query.storeId = store.id
    //Dapatkan data transaction dan simpan di variable result
    const result = getData('transactions', query)
    if (result.length != 0) {
        //kirim variable result sebagai respon request jika ditemukan
        res.send(result)
    } else {
        //respon jika tidak ada data ditemukan
        res.status(404).send("You may not have authorization or data is not exist!")
    }
});
module.exports = app