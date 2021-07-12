const express = require('express');
const orderRouter = express.Router();
const model = require('../models/mongodb');

orderRouter.post('/createOrder', (req, res, next)=>{
    model.OrderModel.create({
        product: req.body.productId,
        address: req.body.idAddress,
        userId: req.cookies.userId,
        orderDate: req.body.orderDate,
        payment: req.body.payment,
        totalPrice: req.body.totalPrice
    })
    .then(data =>{
        res.json(data)
    }).catch(err => {
        res.json('server error')
    })
})

module.exports = orderRouter;