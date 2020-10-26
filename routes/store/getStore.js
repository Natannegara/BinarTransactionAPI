const express = require('express');
const { verifyJwt } = require('../../middlewares/jwtMiddleware');
const app = express.Router();
const getData = require('../../controllers/getController');


app.get('/stores', verifyJwt('seller'), (req, res) => {
    const result = getData('stores', req.query);
    if (result && result.length) {
        res.send(result);

    } else {
        res.status(404).send('Data not found');
    }
    return;
});
module.exports = app