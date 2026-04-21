const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const result = require('../utils/result');

//get all the products
router.get('/get-all-prod',(req,res)=>{
    const sql = `SELECT ProdName,Price,Description,ProdImage,ArtistName,Stock,Type FROM Product`

    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data));
    })

});

//delete the product
router.delete('/delete-prod/:ProdId',(req,res)=>{
    //api using the params
    const { ProdId } = req.params;
    
    const sql = `DELETE FROM Product WHERE ProdId = ?`

    pool.query(sql, [ProdId] ,(error,data)=>{
        res.send(result.createResult(error,data));
    })

});

//add a new product
router.post('/add-prod',(req,res)=>{
    const {ProdName, Description, Price, ProdImage, ArtistName, Stock, Type} = req.body;

    const sql = `INSERT INTO Product (ProdName, Description, Price, ProdImage, ArtistName,Stock, Type) VALUES (?,?,?,?,?,?,?)`

    pool.query(sql, [ProdName, Description, Price, ProdImage, ArtistName, Stock, Type],(error,data)=>{
        res.send(result.createResult(error,data));  
    })
})

//update the existing product
router.put('/updateProd/:ProdId',(req,res)=>{
    const { ProdId } = req.params.ProdId;
    const {ProdName, Description, Price, ProdImage } = req.body;

    const sql = `UPDATE Product
        SET ProdName = ?, Description = ?, 
        Price = ?, ProdImage = ?
        WHERE ProdId = ?`

    pool.query(sql,[ProdName, Description, Price, ProdImage, ProdId], (error,data)=>{
        res.send(result.createResult(error,data));
    })
})

//check update product code it is not working
module.exports = router;