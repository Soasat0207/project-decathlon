const express = require('express');
const shoppingCartRouter = express.Router();
const model = require('../models/mongodb')


shoppingCartRouter.get('/shoppingCart', (req, res, next)=>{
    model.ShoppingCartModel.find({})
    .populate({ path : 'userId'})
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

shoppingCartRouter.post('/findShoppingCart', (req, res, next)=>{
    model.ShoppingCartModel.find({
        userId : req.cookies.userId,
        sold : req.body.sold
    })
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

// Create new shopping cart
shoppingCartRouter.post('/createShoppingCart', (req, res, next)=>{
    // console.log(req.body);

    model.ShoppingCartModel.create({
        userId: req.cookies.userId,
        product: req.body['listProduct[]'],
    })
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})
shoppingCartRouter.put('/updateShoppingCart', (req, res, next)=>{
    model.ShoppingCartModel.updateOne({
        userId : req.cookies.userId
    }, {
        $push : { product : req.body.newProduct}
    })
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(400).json('err')
    })
})


module.exports = shoppingCartRouter;

