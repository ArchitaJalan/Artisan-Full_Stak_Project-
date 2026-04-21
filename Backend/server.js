const express = require('express');
const userRouter = require('./routes/user');
const prodRouter = require('./routes/product');
const cartRouter = require('./routes/cart');

const app = express();

app.use(express.json())

app.use("/user",userRouter)
app.use("/product",prodRouter);
app.use("/cart",cartRouter);

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});