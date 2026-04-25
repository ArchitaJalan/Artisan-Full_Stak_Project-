const express = require('express');
const pool = require('../db/pool');
const result = require('../utils/result');

const router = express.Router();

router.post('/addFavorites', (req, res) => {
    const { userId, ProdId } = req.body;

    if (!userId || !ProdId) {
        res.send(result.createResult('All fields are required', null));
        return;
    }

    const sql = `
        INSERT INTO Favorites (userId, ProdId)
        VALUES (?, ?)
    `;

    pool.query(sql, [userId, ProdId], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

router.get('/viewFavorites/:userId', (req, res) => {
    const userId = req.params.userId;

    const sql = `
        SELECT f.ProdId, p.ProdName, p.Price, p.ProdImage
        FROM Favorites f
        JOIN Product p ON f.ProdId = p.ProdId
        WHERE f.userId = ?
    `;

    pool.query(sql, [userId], (error, data) => {
        console.log("view favorites");
        res.send(result.createResult(error, data));
    });
});


module.exports = router;