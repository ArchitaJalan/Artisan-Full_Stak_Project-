const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const result = require('../utils/result')

router.post('/signup',(req,res)=>{

    //handle user sign up here
    const { Username,Password,Role,Address,MobileNo } = req.body;

    const userRole = (Role=== 'customer') ? 'customer' : 'artist';

    const sql = `INSERT INTO user (Username,Password,Role,Address,MobileNo) VALUES (?,?,?,?,?)`;

    pool.query(sql, [Username,Password,userRole,Address,MobileNo], (error,data)=>{
        res.send(result.createResult(error,data));
    });

});

router.post('/signin',(req,res)=>{

    const { Username,Password } = req.body;

    const sql = `SELECT * FROM user WHERE Username = ?`;

    pool.query(sql, [ Username ], (error,data)=>{

        if(data.length > 0){
            console.log("logged in successfully");
        }

        res.send(result.createResult(error,data));

        
    });

});


module.exports = router;