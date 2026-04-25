const express = require('express');
const pool = require('../db/pool');
const result = require('../utils/result');

const router = express.Router();

router.post('/addToCart', (req, res) => {
    const { userId, ProdId } = req.body;

    if (!userId || !ProdId) {
        res.send(result.createResult('All fields are required', null));
        return;
    }

    const sql = `
        INSERT INTO Cart (userId, ProdId)
        VALUES (?, ?)
    `;

    pool.query(sql, [userId, ProdId], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

router.get('/viewCart/:userId', (req, res) => {
    const userId = req.params.userId;

    const sql = `
        SELECT c.ProdId, p.ProdName, p.Price, p.ProdImage
        FROM Cart c
        JOIN Product p ON c.ProdId = p.ProdId
        WHERE c.userId = ?
    `;

    pool.query(sql, [userId], (error, data) => {
        console.log("view cart");
        res.send(result.createResult(error, data));
    });
});


module.exports = router;