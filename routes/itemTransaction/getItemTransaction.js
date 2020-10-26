const express = require ('express');
const getData = require ('../../controllers/getController');
const {verifyJwt} = require ('../../middlewares/jwtMiddleware');
const app = express.Router();

//menggunakan verifikasi dengan Token Jwt
app.use (verifyJwt);

app.get ('/itemTransaction', (req,res)=>{
    // melakukan request dengan parameter query
    const query = req.query; 
    //mendapatkan data itemTransaction, lalu input ke variabel Result
    const result= getData('itemTransaction',query); 
        if(result.length !=0){
        //jika result sesuai, kirim data sebagai respons dari request
        res.send(getData.get('itemTransaction',query)); 
        }else{
        //jika result tidak sesuai, respons dengan 404 not Found  
        res.status(404).send('Data not found! Please insert a valid data'); 
        }
})

module.exports = app
