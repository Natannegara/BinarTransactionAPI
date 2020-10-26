// const express = require('express');
// const addData = require('../../controllers/addController');
// const app = express.Router()

// app.post("/stores", (req, res) => {
//     const body = req.body;
//     const result = addData("stores", body);
//     res.send(result)
// });

// module.exports = app

const express = require('express');
const addData = require('../../controllers/addController');
const { verifyJwt } = require('../../middlewares/jwtMiddleware');
const router = express.Router();

router.post('/stores', verifyJwt, (req, res) => {
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