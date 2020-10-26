const express = require('express');
const addData = require('../../controllers/addController');
const router = express.Router();

router.post('/stores', (req, res) => {
    const body = req.body
    const result = addData('stores', body);

    if (!result) {
        res.status(400).send('Wrong body');
    } else {
        res.send(result);
    }
    return;
});


module.exports = router;