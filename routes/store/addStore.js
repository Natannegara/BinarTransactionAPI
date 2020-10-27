const express = require('express');
const { default: uid } = require('uid');
const addData = require('../../controllers/addController');
const getData = require('../../controllers/getController');
const { verifyJwt } = require('../../middlewares/jwtMiddleware');
const app = express.Router();

app.post('/stores', verifyJwt('seller'), (req, res) => {
    const body = req.body
    const result = getData('stores', body)[0];
    if (!result) {
        body.id = uid()
        const createdStores = addData('stores', body)
        addData('stores', { id: uid(), sellerId: createdStores.id })
        res.status(400).send('Wrong body');
    } else {
        res.send(result);
    }
    return;
});


module.exports = app;

// const express = require('express');
// // const { verifyJwt } = require('../../middlewares/jwtMiddleware');
// const app = express.Router();
// // const getData = require('../../controllers/getController');
// app.get('/stores', (req, res) => {
//     // const query = req.query
//     // const sellerId = req.user
//     //query.sellerId = sellerId
//     //const result = getData('stores', sellerId);
//     console.log("sellerId");
//     //     if (result && result.length) {
//     //         res.send(result);
//     //     } else {
//     //         res.status(404).send('Data not found');
//     //     }
//     //     return;
// });
// module.exports = app