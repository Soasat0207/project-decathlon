const SelectedProductModel = require('../models/selectedProductModel');
const express = require('express');
const SelectedProductRouter = express.Router();

SelectedProductRouter.post('/findSelectedProduct', (req, res, next) =>{
    SelectedProductModel.find({
        userId: req.cookies.userId
    }).then(data =>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

SelectedProductRouter.post('/addToSelectedProduct', (req, res, next)=>{
    SelectedProductModel.create({
        userId: req.cookies.userId,
        productId: req.body.productId,
        quantity: 1
    }).then(data => res.json(data))
    .catch(err => res.json('Lỗi server'))
})

module.exports = SelectedProductRouter;