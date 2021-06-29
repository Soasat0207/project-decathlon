const express = require('express');
const cartRouter = express.Router();
const model = require('../models/mongodb')

cartRouter.get('/', (req, res, next)=>{
    model.ShoppingCartModel.findOne({
        userId : req.cookies.userId
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
} )

// get product info
cartRouter.post('/productInfo', (req, res, next)=>{
    model.ProductModel.findOne({
        _id : req.body.productId
    }).then(data =>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})


module.exports = cartRouter;