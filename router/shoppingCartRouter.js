const express = require('express');
const shoppingCartRouter = express.Router();
const model = require('../models/mongodb')

shoppingCartRouter.post('/findShoppingCart', (req, res, next)=>{
    model.ShoppingCartModel.findOne({
        userId : req.cookies.userId,
    })
    .populate({
        path: 'product',
        populate: { path: 'productId',
        populate: { path: 'categoryProductId'}}
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

// find shopping cart by userId + selected productId and delete one
shoppingCartRouter.put('/findAndDeleteOneProduct', (req, res, next)=>{
    // console.log(req.body);
    model.ShoppingCartModel.updateOne({
        userId : req.cookies.userId
    },{
        $pull : { product : { _id : req.body.selectedId}}
    })
    .then(data =>{
        if(data){
          res.json(data)
        }else{
            res.json('Nothing')
        }
    }).catch( err => {
        res.json('server error')
    })
})

// Create new shopping cart
shoppingCartRouter.post('/createShoppingCart', (req, res, next)=>{
    let arrayProductId = convertStringToArray(req.body)
    model.ShoppingCartModel.create({
        userId: req.cookies.userId,
        product : arrayProductId
    })
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})
// add product for shopping cart 
shoppingCartRouter.put('/updateShoppingCart', (req, res, next)=>{
    let arrayProductId = convertStringToArray(req.body)
    model.ShoppingCartModel.updateOne({
        userId : req.cookies.userId,
    }, {
        $push : { product : { $each : arrayProductId }}
    })
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(400).json('err')
    })
})
// update quantity for shopping cart
shoppingCartRouter.put('/updateQuantityShoppingCart', (req, res,next)=>{
    model.ShoppingCartModel.updateOne({
        "product._id" : req.body.selectedId,
    },{
        '$set' : { "product.$.quantity" : req.body.newQuantity}
    }).then(data =>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

// delete shopping cart after order was created
shoppingCartRouter.delete('/deleteShoppingCart', (req, res, next)=>{
    model.ShoppingCartModel.deleteOne({
        userId : req.cookies.userId,
    }).then(data =>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})
// function to convert String ( from client sent to server) to array include product info
function convertStringToArray(item){
    let array = [];
    let index = -1;
    for (const key in item) {
        let arr = key.split('][');
        let x = arr[0]
        let keyData = arr[1].slice(0,arr[1].length-1)
        if(index < x[x.length-1]){
            let obj = {}
            obj[keyData] = item[key]
            array.push(obj)
            index++
        }
        array[index][keyData]=item[key]
    }
    return array
}

module.exports = shoppingCartRouter;

