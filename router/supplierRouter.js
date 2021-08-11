const express = require('express');
const router = express.Router();
const ModelMongo = require("../models/mongodb");
router.get('/',(req,res) =>{
    ModelMongo.SupplierModel.find({

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
    let email = req.body.email;description;
    let phone = req.body.phone;description;
    let status = req.body.status;description;
    let name = req.body.name;
    ModelMongo.SupplierModel.create({
        description:description,
        email:email,
        phone:phone,
        status:status,
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
    ModelMongo.SupplierModel.findOne({
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
    let email = req.body.email;
    let phone = req.body.phone;
    let status = req.body.status;
    let name = req.body.name;
    ModelMongo.SupplierModel.findOneAndUpdate({
        _id:id,
    },{
        description:description,
        email:email,
        phone:phone,
        status:status,
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
    ModelMongo.SupplierModel.findOneAndDelete({
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