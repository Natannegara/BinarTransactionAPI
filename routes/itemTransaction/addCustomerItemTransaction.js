const express = require ('express');
const getData = require ('../../controllers/getController');
const editData = require('../../controllers/editController');
const addData = require ('../../controllers/addController');
const {verifyJwt} = require ('../../middlewares/jwtMiddleware');
const app = express.Router();

//menggunakan verifikasi dengan Token Jwt
app.use (verifyJwt);

app.post ('/itemTransaction', (req,res)=>{
     // melakukan request body disimpan dalam variable body
     const body = req.body;
     //melakukan request user yang disimpan dalam userInfo 
     const userInfo = req.user
     //cek apakah user customer
     if (userInfo.role == 'customer') {
       //jika user merupakan customer lakukan checking data transaction dengan id : body.transactionId
       const transaction = getData('transactions', { id: body.transactionId })[0]
       console.log(body.transactionId);
       console.log(transaction);
        if (!transaction) {
         //jika transaction Id tidak ada, kirimkan respons 404 not Found
            res.status(404).send("Transaction is not exist!")
         return}
         
         //mengambil data transaksi sekaligus checking apakah customerId sesuai dengan userInfo.id
        if (getData('transactions', { id: body.transactionId })[0].customId != userInfo.id) {
            //jika customerId tidak sesuai dengan yang ada di userInfo respons status 400 
            res.status(400).send("Unauthorized")
            return}
        
         //mengambil data books sekaligus checking bookId dengan dimasukkan ke dalam variabel book 
        const book = getData('books', { id: body.bookId })[0]
        if (!book) {
            //jika bookId tidak valid, kirim status 404 
            res.status(404).send("Book is not exist!")
            return}
            
         //mengecek apakah jumlah buku melebihi stock yang ada atau tidak
        if (parseInt(body.quantity) > parseInt(book.stock)) {
            //jika jumlah buku melebihi stock, respons status 400
            res.status(400).send("Book stok is not enough!")
            return}
  
        body.id = uid()
        body.bookPrice = book.price
        //jika proses di atas telah valid, customer dapat menambahkan item transaction
        const result = addData('itemTransactions', body)
        //kirim respond berupa result
        res.send(result)
        if (result) {
            //customer dapat merevisi stok buku yang ingin dibeli
            revisiStokBook(book, body.quantity)
            //customer dapat merevisi nominal transaksi yang ingin dilakukan
            revisiNominalTransaction(transaction, body.quantity, body.bookPrice)
            }
    } else {
      //jika user bukan customer request tidak bisa dilakukan
      res.status(401).send('Unauthorized')
    }
})

//fungsi untuk merevisi stok buku
function revisiStokBook(book, qty) {
    //mendeclare variabel stock yang merupakan selisih antara stok bukud dengan jumlah buku 
    const stock = parseInt(book.stock) - parseInt(qty)
    book.stock = `${stock}`
    console.log(book);
    const edit = editData('books', book.id, book)
  }
  
  //fungsi untuk merevisi nominal Transaksi
  function revisiNominalTransaction(transaction, qty, price) {
    //mendeclare variabel nominal yang terdiri dari nominal transaksi dan (jumlah buku x harga buku)
    const nominal = parseInt(transaction.nominal) + (parseInt(qty) * parseInt(price))
    transaction.nominal = `${nominal}`
    console.log(transaction);
    const edit = editData('transactions', transaction.id, transaction)
  }

    module.exports = app