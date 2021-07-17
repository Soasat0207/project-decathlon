const SelectedProductModel = require('../models/selectedProductModel');
const express = require('express');
const SelectedProductRouter = express.Router();

SelectedProductRouter.post('/findSelectedProduct', (req, res, next) =>{
    SelectedProductModel.find({
        userId: req.cookies.userId,
        sold : req.body.sold
    })
    .populate('productId')
    .populate({
        path: 'productId',
        populate: { path : 'categoryProductId'}
    })
    .then(data =>{
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

SelectedProductRouter.delete('/deleteSelectedProduct', (req, res, next)=>{
    SelectedProductModel.deleteOne({
        _id : req.body.selectedId
    }).then(data =>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

SelectedProductRouter.put('/updateSelectedProduct', (req, res, next)=>{
    SelectedProductModel.updateMany({
        userId : req.cookies.userId,
        sold : false
    }, {
        sold : true
    }).then(data =>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

module.exports = SelectedProductRouter;