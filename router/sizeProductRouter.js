const express = require('express');
const router = express.Router();
const ModelMongo = require("../models/mongodb");
router.get('/',(req,res) =>{
    ModelMongo.SizeProductModel.find({

    })
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.status(500).json('loi sever')
    })
});
router.post('/',(req,res) =>{
    let description = req.body.description;
    let size = req.body.size;
    ModelMongo.SizeProductModel.create({
        description:description,
        size:size
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
router.post('/find',(req,res) =>{
    let id = req.body.id;
    ModelMongo.SizeProductModel.findOne({
        _id:id,
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
router.put('/',(req,res) =>{
    let id = req.body.id;
    let description = req.body.description;
    let size = req.body.size;
    ModelMongo.SizeProductModel.findOneAndUpdate({
        _id:id,
    },{
        description:description,
        size:size
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
router.delete('/',(req,res) =>{
    let id = req.body.id;
    ModelMongo.SizeProductModel.findOneAndDelete({
        _id:id,
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
})
module.exports = router;