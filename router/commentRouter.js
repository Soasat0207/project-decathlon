const express = require('express');
const router = express.Router();
const ModelMongo = require("../models/mongodb");


router.get('/',(req,res) =>{
    ModelMongo.CommentModel.find({

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
    let reviewId = req.body.reviewId;
    let comment= req.body.comment;
    let accountId=req.body.accountId;
    let createDate = new Date();
    ModelMongo.commentModel.create({
        reviewId:reviewId,
        comment:comment,
        accountId:accountId,
        createDate:createDate,
    })
    .then((data) =>{
        res.json(data);
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json('loi sever')
    })
})

module.exports = router;
