const express = require('express');
const checkoutRouter = express.Router();
const model = require('../models/mongodb')

// create order 
checkoutRouter.post('/createOrder', (req, res,next) =>{
    let currentTime = new Date();
    console.log(req.body)
    model.OrderModel.create({
        product: req.body['product[]'],
        address: req.body.addressId,
        userId: req.cookies.userId,
        orderDate: currentTime ,
        methodPayment: req.body.methodPayment,
        totalPrice: req.body.totalPrice
    }).then(data => {
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

// find order 
checkoutRouter.post('/findOrder', (req,res,next)=>{
    model.OrderModel.findOne({userId : req.cookies.userId})
    .populate('address')
    .populate('product')
    .then(data => {
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

// checkout update method of payment
checkoutRouter.put('/updatePaymentMethod', (req, res, next)=>{
    // console.log(req.body.methodPayment);
    // console.log(req.cookies.userId);
    model.OrderModel.updateOne(
        { userId : req.cookies.userId },
        {
        methodPayment: req.body.methodPayment
        })
    .then(data =>{
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})


module.exports = checkoutRouter;