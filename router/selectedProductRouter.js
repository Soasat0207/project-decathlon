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


module.exports = SelectedProductRouter;