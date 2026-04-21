const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const result = require('../utils/result');

//addToCart
router.post('/addToCart',(req,res)=>{
    const { userId, ProdId } = req.body;

    const fetchDetails = `SELECT Price, ProdImage FROM Product WHERE ProdId = ?`

    pool.query(fetchDetails, [ProdId], (error,data)=>{

        const { Price, ProdImage } = data[0];

        const sql = `INSERT INTO AddToCart (userId, ProdId, ProdImage, Price) VALUES (?,?,?,?)`

        pool.query(sql, [userId, ProdId, ProdImage, Price], (error,data) =>{
            res.send(result.createResult(error,data));
        });


    });

    
});

//display cart -> check it once it is not displaying the infor just telling success.
router.get('/viewCart/:userId',(req,res)=>{
    const { userId } = req.params.userId;

    const sql = `SELECT ProdId, ProdImage, Price FROM AddToCart WHERE userId = ?`;

    pool.query(sql, [userId], (error,data)=>{
        res.send(result.createResult(error,data));  
    });
});

module.exports = router;
