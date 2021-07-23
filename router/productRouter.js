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
var upload = multer({ storage: storage })
// hiển thị ra tất cả dữ liệu
router.get('/',(req,res) =>{
    ModelMongo.ProductModel.find({})
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
        console.log(error)
        res.status(500).json('loi sever')
    })
})
// tạo database mới 
router.post('/',upload.fields([{ name: 'imgColor', maxCount: 12 },{ name: 'imgProduct', maxCount: 12 }]),(req,res,next) =>{
    let imgColorArray = [];
    let imgProductArray= [];
    if(req.files.imgColor){
        imgColorArray= req.files.imgColor.map(element => {return '/public/uploads/'+element.filename})
    }
    if(req.files.imgProduct){
        imgProductArray= req.files.imgProduct.map(element => {return '/public/uploads/'+element.filename})
    }
    let img = req.body.img;
    let imgColor = req.body.imgColor;
    let name = req.body.ProductName;
    let codeProduct = req.body.CodeProduct;
    let priceImport = req.body.priceImport;
    let price = req.body.productPrice;
    let unit = req.body.productUnit;
    let quantity = req.body.productQuantity;
    let descriptionShort = req.body.descriptionShort;
    let descriptionDetails = req.body.descriptionDetails;
    let title = req.body.productTitle;
    let rate = req.body.productRate;
    let gender = req.body.productGender;
    let sizeId = req.body.productSize;
    let colorId = req.body.productColor;
    let levelId = req.body.productLevel;
    let trademarkId = req.body.productTradeMark;
    let supplierId = req.body.productSupplier;
    let categoryProductId = req.body.productCategory;
    ModelMongo.ProductModel.create({
        img:imgProductArray,
        imgColor:imgColorArray,
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
    ModelMongo.ProductModel.find({
        $or: [
            {name:{ $regex: new RegExp(name, "i")}},
        ]
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
router.post('/findProductId',(req,res) =>{
    let productId = req.body.productId;
    ModelMongo.ProductModel.find({
        _id:productId,
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
router.post('/findByCategory',(req,res) =>{
    let categoryProductId = req.body.categoryProductId;
    ModelMongo.ProductModel.find({
        categoryProductId:categoryProductId
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
router.post('/findByColor',(req,res) =>{
    let colorId = req.body.colorId;
    ModelMongo.ProductModel.find({
        colorId:colorId
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
router.post('/findByLevel',(req,res) =>{
    let levelId = req.body.levelId;
    ModelMongo.ProductModel.find({
        levelId:levelId
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
router.post('/findBySize',(req,res) =>{
    let sizeId = req.body.sizeId;
    ModelMongo.ProductModel.find({
        sizeId:sizeId
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
router.post('/findByTrademark',(req,res) =>{
    let trademarkId = req.body.trademarkId;
    ModelMongo.ProductModel.find({
        trademarkId:trademarkId
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
router.post('/findCode',(req,res) =>{
    let codeProduct = req.body.codeProduct;
    ModelMongo.ProductModel.find({
        $or: [
            {codeProduct:{ $regex: new RegExp(codeProduct, "i")}},
        ]
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
router.post('/findSize',(req,res) =>{
    let codeProduct = req.body.codeProduct;
    let colorId = req.body.colorId;
    ModelMongo.ProductModel.find({
        $and: [
            {codeProduct:{ $regex: new RegExp(codeProduct, "i")}},
            {colorId:{ $regex: new RegExp(colorId, "i")}},
        ]
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

router.post('/details/:id',(req,res) =>{
    let id = req.params.id;
    ModelMongo.ProductModel.find({
        _id:id,
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
        res.json(data);
    })
    .catch((error)=>{
        res.status(500).json('loi sever')
    })
})
router.delete('/',(req,res) =>{
    let id = req.body.id;
    ModelMongo.ProductModel.findOneAndDelete({
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
router.post('/findProductById', (req, res, next)=>{
    ModelMongo.ProductModel.findOne({
        _id : req.body.productId
    })
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
        res.json(err)
    })
})
router.put('/findProductByIdAndUpdateQuantity', (req, res, next)=>{
   
    ModelMongo.ProductModel.updateOne({
        _id : req.body.productId
    },{
        quantity : req.body.newQuantity
    })
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
        res.json(err)
    })
})

module.exports = router