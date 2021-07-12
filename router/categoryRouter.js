const express = require('express');
const router = express.Router();
const ModelMongo = require("../models/mongodb");
router.get('/',(req,res) =>{
    ModelMongo.categoryProductModel.find({

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
    let name = req.body.name;
    ModelMongo.categoryProductModel.create({
        description:description,
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
router.post('/find',(req,res) =>{
    let id = req.body.id;
    ModelMongo.categoryProductModel.findOne({
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
    let name = req.body.name;
    ModelMongo.categoryProductModel.findOneAndUpdate({
        _id:id,
    },{
        description:description,
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
router.delete('/',(req,res) =>{
    let id = req.body.id;
    ModelMongo.categoryProductModel.findOneAndDelete({
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