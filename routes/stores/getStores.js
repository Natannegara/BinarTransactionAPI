const express = require('express');
const router = express.Router();
const getData = require('../../controllers/getController');


router.get('/stores', (req, res) => {
    const result = getData('stores', req.query);
    if (result && result.length) {
        res.send(result);
    } else {
        res.status(404).send('Data not found');
    }
    return;
});
module.exports = router;