const express = require('express');
const pool = require('../db/pool');
const result = require('../utils/result');
const { checkCustomerAuthorization } = require('../utils/auth');

const router = express.Router();

router.use(checkCustomerAuthorization);

router.post('/add-to-cart', (req, res) => {
    const userId = req.user.id; 
    const { ProdId, ProdImage, price } = req.body;

    const checkSql = `SELECT * FROM cart WHERE UserId=? AND ProdId=?`;

    pool.query(checkSql, [userId, ProdId], (err, data) => {
        if (err) return res.send(result.createResult(err));

       
        if (data.length > 0) {
            const updateSql = `UPDATE cart SET quantity = quantity + 1 WHERE UserId=? AND ProdId=?`;

            pool.query(updateSql, [userId, ProdId], (err2, updateData) => {
                if (err2) return res.send(result.createResult(err2));

                return res.send({
                    status: 'success',
                    message: 'Quantity updated in cart',
                    data: updateData
                });
            });
        } 
       
        else {
            const insertSql = `
                INSERT INTO cart(UserId, ProdId, ProdImage, price, quantity)
                VALUES (?, ?, ?, ?, 1)
            `;

            pool.query(insertSql, [userId, ProdId, ProdImage, price], (err3, insertData) => {
                if (err3) return res.send(result.createResult(err3));

                return res.send({
                    status: 'success',
                    message: 'Product added to cart',
                    data: insertData
                });
            });
        }
    });
});

router.get('/view-cart', (req, res) => {
    const userId = req.user.id; 

    const sql = `
        SELECT CartId, ProdId, ProdImage, price
        FROM cart
        WHERE UserId = ?
    `;

    pool.query(sql, [userId], (err, data) => {
        if (err) return res.send(result.createResult(err));

        let totalAmount = 0;

        data.forEach(item => {
            totalAmount += item.price * item.quantity;
        });

        return res.send({
            status: 'success',
            totalItems: data.length,
            totalAmount: totalAmount,
            cartItems: data
        });
    });
});

module.exports = router;