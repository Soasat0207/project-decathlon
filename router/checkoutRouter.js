const express = require('express');
const checkoutRouter = express.Router();
const model = require('../models/mongodb')

// create order 
checkoutRouter.post('/createOrder', (req, res,next) =>{
    let currentTime = new Date();
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
    model.OrderModel.find({
        userId : req.cookies.userId,
    })
    .populate('address')
    .populate('product')
    .then(data => {
        res.json(data[data.length - 1])
    }).catch(err =>{
        res.json(err)
    })
})
// find all order 
checkoutRouter.post('/findAllOrders', (req, res, next)=>{
    model.OrderModel.find({})
    .populate('address')
    .populate('userId')
    .then(data =>{
        res.json(data)
    }).catch(err=>{
        res.status(400).json(err)
    })
})

// checkout update method of payment
checkoutRouter.put('/updatePaymentMethod', (req, res, next)=>{
    model.OrderModel.updateOne(
        {
             userId : req.cookies.userId,
             sold : false
             },
        {
        methodPayment: req.body.methodPayment,
        sold : true
        })
    .then(data =>{
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

checkoutRouter.delete('/deleteOrder/:id', (req, res, next)=>{
    let orderId = req.params.id;
   
    model.OrderModel.deleteOne({ _id : orderId})
    .then(data => {
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

module.exports = checkoutRouter;