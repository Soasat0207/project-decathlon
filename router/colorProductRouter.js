const express = require('express');
const router = express.Router();
const ModelMongo = require("../models/mongodb");
router.get('/',(req,res) =>{
    ModelMongo.colorProductModel.find({

    })
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.status(500).json('loi sever')
    })
});
router.post('/',(req,res) =>{
    console.log(req.body);
    let colorCode = req.body.colorCode;
    let name = req.body.name;
    ModelMongo.colorProductModel.create({
        colorCode:colorCode,
        name:name
    })
    .then((data)=>{
        return res.json({
            message:'susses',
            status:200,
            data:data,
        })
    })
    .catch((err)=>{
        res.status(500).json('loi sever')
    })
});
module.exports = router;