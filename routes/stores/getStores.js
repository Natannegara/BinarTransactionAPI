// // const express = require('express');
// // const getData = require('../../controllers/getController');
// // const app = express.Router()

// // app.get('/stores', (req, res) => {
// //     let id = Number(req.query.id);
// //     if (!isNaN(id)) {
// //         const getbyId = getData("stores", id)
// //         if (getbyId) {
// //             res.send(getbyId);
// //         } else {
// //             res.status(404).send("ID not found. Please, enter a valid ID! ");
// //         }
// //     } else {
// //         res.status(400).send("You must enter an ID which is a number!");
// //     }
// // })

// // module.exports = app

// const express = require('express');
// const getData = require('../../controllers/getController');
// const app = express.Router()

// app.get("/stores", (req, res) => {
//     let id = req.query.id;
//     const stores = getData("stores", id)
//     if (!id) {
//         const result = getData("stores")
//         res.send(result);
//     } else {
//         //Check to make sure query id is a numeric value
//         id = Number(id);
//         if (stores && Number.isInteger(id)) {
//             res.status(200).json({ stores });
//         } else {
//             res.status(404).json({ message: "No data found or incorrect ID" });
//         }
//     }

//     // if (Object.keys(req.query) != 'id') {
//     //     res.status(405).send("Input ID Only")
//     // } else {
//     //     let id = req.query.id;
//     //     const stores = getData("stores", id)
//     //     if (!id) {
//     //         const result = getData("stores")
//     //         res.send(result);
//     //     } else {
//     //         //Check to make sure query id is a numeric value
//     //         id = Number(id);
//     //         if (stores && Number.isInteger(id)) {
//     //             res.status(200).json({ stores });
//     //         } else {
//     //             res.status(404).json({ message: "No data found or incorrect ID" });
//     //         }
//     //     }
//     // }

// })

// module.exports = app

const express = require('express');
const router = express.Router();
const getData = require('../../controllers/getController');
const { verifyJwt } = require('../../middlewares/jwtMiddleware');

router.get('/stores', verifyJwt, (req, res) => {
    const result = getData('stores', req.query);
    if (result && result.length) {
        res.send(result);
    } else {
        res.status(404).send('Data not found');
    }
    return;
});


module.exports = router;