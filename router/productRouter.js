const express = require('express');
const router = express.Router();
const ModelMongo = require("../models/mongodb");
var multer  = require('multer')
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'../public/uploads'))
    },
    filename: function (req, file, cb) {
      let index = file.originalname.lastIndexOf('.');
      let extention = file.originalname.slice(index,file.originalname.length);
      cb(null, file.fieldname + '-' + Date.now() + extention);
    }
  })
var upload = multer({ storage: storage })
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
        console.log(data)
        res.json(data)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json('loi sever')
    })
})
// tạo database mới 
router.post('/',upload.fields([{ name: 'imgColor', maxCount: 12 },{ name: 'imgProduct', maxCount: 12 }]),(req,res,next) =>{
    const imgColorArray= req.files.map(element => {return '/public/uploads/'+element.filename})
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
    ModelMongo.productModel.create({
        // img:img,
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