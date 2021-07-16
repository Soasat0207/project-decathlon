const express = require('express');
const ProductAdvantagesRouter = express.Router();
const AdvantagesModel = require('../models/ProductAdvantagesModel');

ProductAdvantagesRouter.get('/viewadvantages/:code', async (req, res) => {
    try{
        let data = await AdvantagesModel.findOne({codeproduct: req.params.code})
        if(data){
            res.json(data)
        }
    }
    catch(error){
        res.json(error)
    }
})


module.exports = ProductAdvantagesRouter;