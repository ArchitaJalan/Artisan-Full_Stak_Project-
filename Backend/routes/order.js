const express = require('express');
const pool = require('../db/pool');
const result = require('../utils/result');

const router = express.Router();

router.post('/placeOrder',(req,res) =>{
    const { userId, Price, ProdId, Address, MobileNo} = req.body;

    if(!userId || !Price || !ProdId || !Address || !MobileNo){
        res.send(result.createResult('All fields are required', null));
        return;
    }

    const sql = `INSERT INTO Orders (userId, Price, ProdId, DateTime, Address, MobileNo) VALUES(?,?,?,NOW(),?,?)`;

    pool.query(sql,[userId, Price, ProdId, Address, MobileNo], (error,data) =>{
        res.send(result.createResult(error,data));
    });
});

//check this API once it is giving error
router.get('/viewOrders/:userId',(req,res)=>{
    const userId = req.params.userId;

    const sql = `SELECT ProdId, Price, ProdImage, ProdName FROM Orders NATURAL JOIN Product WHERE userId = ?`;

    pool.query(sql, [userId], (error,data)=>{
        console.log("view orders")
        res.send(result.createResult(error,data));
    });
});

module.exports = router;