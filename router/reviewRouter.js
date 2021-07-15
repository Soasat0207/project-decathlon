const express = require('express');
const router = express.Router();
const ModelMongo = require("../models/mongodb");
const jwt = require('jsonwebtoken');
router.get('/',(req,res) =>{
    ModelMongo.reviewModel.find({

    })
    // .sort({createDate:-1})
    .populate({
        path:'productId'
    })
    .populate({
        path:'accountId'
    })
    .populate({
        path:'reply',
        populate : {path :'accountId'}
    })
    .then((data) =>{
        res.json(data)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json('loi sever')
    })
})
router.post('/',(req,res) =>{
    let token = req.cookies.token;
    token = jwt.verify(token,"mk");
    let productId = req.body.productId;
    let rate= req.body.rate;
    let title= req.body.title;
    let comment= req.body.comment;
    let accountId=token._id;
    let createDate = new Date();
    let status = true;
    ModelMongo.reviewModel.create({
        productId:productId,
        rate:rate,
        title:title,
        comment:comment,
        accountId:accountId,
        createDate:createDate,
        status:status,
    })
    .then((data) =>{
        return res.json({
            message:'susses',
            status:200,
            data:data,
        })
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json('loi sever')
    })
})
router.put('/',(req,res) =>{
    let reply = req.body.reply;
    let id = req.body.id;
    console.log(reply)
    ModelMongo.reviewModel.findOneAndUpdate({
        _id:id,
    },{
        reply:reply,
    }
    )
    .then((data) =>{
        res.json(data);
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json('loi sever')
    })
})


module.exports = router;
