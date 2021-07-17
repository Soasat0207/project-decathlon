const SelectedProductModel = require('../models/selectedProductModel');
const express = require('express');
const SelectedProductRouter = express.Router();

// find selected product with sold status
SelectedProductRouter.post('/findSelectedProduct', (req, res, next) =>{
    SelectedProductModel.find({
        userId: req.cookies.userId,
        sold : req.body.sold
    }).then(data =>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})



module.exports = SelectedProductRouter;