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

// find shopping cart by userId + selected productId and update
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

