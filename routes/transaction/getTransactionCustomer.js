const express = require('express');
const getData = require('../../controllers/getController');
const { verifyJwt } = require('../../middlewares/jwtMiddleware');
const app = express.Router();

//route get dengan middleware function
app.get('/transaction/customer', verifyJwt('customer'), (req, res) => {
    //info dari token yang diperoleh dari fungsi middleware dimasukkan ke variabel userInfo
    const userInfo = req.user
    //parameter pencarian disimpan di variabel query
    const query = req.query
    //jika user adalah customer tambahkan customerId di query
    query.customerId = userInfo.id
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