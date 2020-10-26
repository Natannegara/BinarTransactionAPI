const express = require('express');
const addData = require('../../controllers/addController');
const { verifyJwt } = require('../../middlewares/jwtMiddleware');
const app = express.Router();

app.post('/stores', verifyJwt('seller'), (req, res) => {
    const body = req.body
    const result = addData('stores', body);
    if (!result) {
        res.status(400).send('Wrong body');
    } else {
        res.send(result);
    }
    return;
});


module.exports = app;