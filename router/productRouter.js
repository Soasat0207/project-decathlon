const express = require('express');
const router = express.Router();
const ModelMongo = require("../models/mongodb");
// hiển thị ra tất cả dữ liệu
router.get('/',(req,res) =>{
    ModelMongo.productModel.find({

    })
    .populate({
        path:'sizeId'
    })
    .populate({
        path:'colorId'
    })
    .populate({
        path:'levelId'
    })
    .populate({
        path:'trademarkId'
    })
    .populate({
        path:'supplierId'
    })
    .populate({
        path:'categoryProductId'
    })
    .then((data) =>{
        res.json(data)
    })
    .catch((error)=>{
        res.status(500).json('loi sever')
    })
})
// tạo database mới 
router.post('/',(req,res,next) =>{
    let img = req.body.img;
    let imgColor = req.body.imgColor;
    let name = req.body.name;
    let codeProduct = req.body.codeProduct;
    let priceImport = req.body.priceImport;
    let price = req.body.price;
    let unit = req.body.unit;
    let quantity = req.body.quantity;
    let descriptionShort = req.body.descriptionShort;
    let descriptionDetails = req.body.descriptionDetails;
    let title = req.body.title;
    let rate = req.body.rate;
    let gender = req.body.gender;
    let sizeId = req.body.sizeId;
    let colorId = req.body.colorId;
    let levelId = req.body.levelId;
    let trademarkId = req.body.trademarkId;
    let supplierId = req.body.supplierId;
    let categoryProductId = req.body.categoryProductId;
    console.log(req.body)
    ModelMongo.productModel.create({
        img:img,
        imgColor:imgColor,
        name:name,
        codeProduct:codeProduct,
        priceImport:priceImport,
        price:price,
        unit:unit,
        quantity:quantity,
        descriptionShort:descriptionShort,
        descriptionDetails:descriptionDetails,
        title:title,
        rate:rate,
        gender:gender,
        sizeId:sizeId,
        colorId:colorId,
        levelId:levelId,
        trademarkId:trademarkId,
        supplierId:supplierId,
        categoryProductId:categoryProductId,
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
// tìm theo like name code product
router.post('/findname',(req,res) =>{
    let name = req.body.name;
    let codeProduct = req.body.codeProduct;
    ModelMongo.productModel.find({
        $or: [
            {name:{ $regex: new RegExp(name, "i")}},
            {codeProduct:{ $regex: new RegExp(codeProduct, "i")}},
        ]
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
})
module.exports = router