const express = require('express');
const shoppingCartRouter = express.Router();
const model = require('../models/mongodb')
const cookies = require('../checkCookies');

shoppingCartRouter.post('/findShoppingCart', cookies.checkCookies, (req, res, next)=>{
    model.ShoppingCartModel.findOne({
        userId : req.id,
    })
    .populate({
        path: 'product',
        populate: { path: 'productId',
        populate: { path: 'categoryProductId , colorId ,  sizeId'}}
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
shoppingCartRouter.put('/findAndDeleteOneProduct',cookies.checkCookies, (req, res, next)=>{
    model.ShoppingCartModel.updateOne({
        userId : req.id
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
shoppingCartRouter.post('/createShoppingCart',cookies.checkCookies, (req, res, next)=>{
    let arrayProductId = convertStringToArray(req.body)
    model.ShoppingCartModel.create({
        userId: req.id,
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
shoppingCartRouter.put('/updateShoppingCart',cookies.checkCookies, (req, res, next)=>{
    let arrayProductId = convertStringToArray(req.body)
    model.ShoppingCartModel.updateOne({
        userId : req.id,
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
shoppingCartRouter.put('/updateQuantityShoppingCart', cookies.checkCookies, (req, res,next)=>{
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

// increese quantity for shoppingcart
shoppingCartRouter.put('/changeQuantityShoppingCart',cookies.checkCookies ,(req, res, next)=>{
    model.ShoppingCartModel.findOne({
        userId : req.id,
        "product.productId" : req.body.idProductCart
    })
    .then(data => {
        if(data){
        // take array include productid and quantity
            let arrProduct = data.product;
            let idOfProductCart = req.body.idProductCart;
            let obj ;
           for(let i = 0; i < arrProduct.length; i++){
               if( arrProduct[i].productId === idOfProductCart){
                obj = arrProduct[i];
                break;
               }
           }
            req.obj = obj;
            next();
        }else{
            res.json('This product doesnt exist')
        }
    })
    .catch(err =>{
        res.json(err)
    })
},(req, res, next) =>{
    let qtyNumber = parseInt(req.obj.quantity) + 1  ;

    model.ShoppingCartModel.updateOne({
        userId : req.id,
        "product.productId" : req.body.idProductCart
    }, {
        $set:{"product.$.quantity":qtyNumber}
    })
    .then(data =>{
        if(data.nModified !== 0){
            res.json('Update shopping cart successfully')
        }else{
            res.json('Nothing to update')
        }
    }).catch(err =>{
        res.json(err)
    })
}
)

// delete shopping cart after order was created
shoppingCartRouter.delete('/deleteShoppingCart',cookies.checkCookies, (req, res, next) => {
    model.ShoppingCartModel.deleteOne({
        userId : req.id,
    }).then(data =>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})
// function to convert String ( from client send to server) to array include product info
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

