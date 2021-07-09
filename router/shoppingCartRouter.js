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



module.exports = shoppingCartRouter;

