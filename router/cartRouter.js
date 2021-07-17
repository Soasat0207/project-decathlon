const express = require('express');
const cartRouter = express.Router();
const model = require('../models/mongodb');
const SelectedProductModel = require('../models/selectedProductModel')

cartRouter.post('/cartPage', (req, res, next)=>{
    model.ShoppingCartModel.findOne({
        userId : req.cookies.userId,
        sold : false
    })
    .populate('product')
    // .populate({
    //     path: 'product',
    //     populate: { path: 'productId'}
    // })
    .populate({
        path: 'product',
        populate: { path: 'productId',
        populate: { path : 'colorId'}
    }
    })
    
    .then(data =>{
        if(data){
          res.json(data)
        }else{
            res.json('Nothing')
        }
    }).catch( err => {
        res.json(err)
    })
})

// delete product from Cart
cartRouter.delete('/deleteProduct', (req, res, next) =>{
    
    SelectedProductModel.deleteOne({
        userId : req.cookies.userId,
        productId : req.body.productId
    })
    .then(data => {
        if(data.nModified !== 0){
            res.json('Xoa thanh cong')
        }else{
            res.json('Khong co gi de xoa')
        }
    }).catch(err => {
        res.json('Server error')
    })
})

// update quantity of product 

cartRouter.put('/updateQuantity', (req, res, next)=>{

    SelectedProductModel.updateOne(
        {
        userId : req.cookies.userId,
        productId : req.body.productId
        },
        { quantity : req.body.newQuantity }
    ).then(data =>{
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = cartRouter;