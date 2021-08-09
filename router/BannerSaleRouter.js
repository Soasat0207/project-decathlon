const express = require('express');
const router = express.Router();
const ModelMongo = require("../models/mongodb");
var multer  = require('multer')
const path = require('path');
const { copyFileSync } = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: function (req, file, cb) {
        let index = file.originalname.lastIndexOf('.');
        let extention = file.originalname.slice(index, file.originalname.length);
        cb(null, file.originalname.split('.')[0]+file.fieldname + '-' + Date.now() + extention);
    }
  })
var upload = multer({ storage: storage });
router.get('/',(req,res) =>{
    ModelMongo.BannerSaleModel.find({})
    .then((data) =>{
        res.json(data)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json('loi sever')
    })
})
// tạo database mới 
router.post('/',upload.fields([{ name: 'imgBannerSale', maxCount: 12 }]),(req,res,next) =>{  
    const imgArray= req.files.imgBannerSale.map(element => {return '/public/uploads/'+element.filename});
    let description = req.body.description;
    let status = req.body.bannerSale_Status;
    let createDate = new Date();
    ModelMongo.BannerSaleModel.create({
        description: description,
        status: status,
        createDate: createDate,
        img:imgArray,
    })
    .then((data) =>{
        return res.json({
            message:'susses',
            status:200,
            data:data,
        })
    })
    .catch((error)=>{
        res.status(500).json('loi sever')
    })
});
router.put('/',(req,res) =>{
    let id = req.body.id;
    let description = req.body.description;
    let name = req.body.name;
    let status = req.body.status;
    ModelMongo.BannerSaleModel.findOneAndUpdate({
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
    ModelMongo.BannerSaleModel.findOneAndDelete({
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
module.exports = router
