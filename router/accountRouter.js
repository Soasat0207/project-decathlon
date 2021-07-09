const express = require('express');
const router = express.Router();
const ModelMongo = require("../models/mongodb");
const jwt = require('jsonwebtoken');
var multer  = require('multer')
const path = require('path');
const { copyFileSync } = require('fs');

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
router.get('/',(req,res) =>{
    ModelMongo.accountModel.find({

    })
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.status(500).json('loi sever')
    })
});
router.post('/',upload.fields([{ name: 'imgAvatar', maxCount: 12 }]),(req,res) =>{
    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let phone = req.body.phone;
    let gender = req.body.gender;
    let email = req.body.email;
    let birthday = req.body.birthday;
    let mainAddress = req.body.mainAddress;
    let subAddress = req.body.subAddress;
    let city = req.body.city;
    // let avatar = req.files.imgAvatar.map(element => {return '/public/uploads/'+element.filename});
    let createdAt = new Date();
    let role = req.body.role;
    let status = req.body.status;
    let description = req.body.description;
    // console.log(avatar)
    ModelMongo.accountModel.create({
        username: username,
        password:password,
        firstname:firstname,
        lastname:lastname,
        phone:phone,
        gender:gender,
        email:email,
        birthday:birthday,
        mainAddress:mainAddress,
        subAddress:subAddress,
        city:city,
        // avatar:avatar,
        createdAt:createdAt,
        role:role,
        status:status,
        description:description,
    })
    .then((data)=>{

        return res.json({
            message:'susses',
            status:200,
            data:data,
        })
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json('loi sever')
    })
});
router.post('/login',(req,res) =>{
    let username = req.body.username;
    let password = req.body.password;
    ModelMongo.accountModel.findOne({
        $and: [
            { username: username },
           { password: password }
        ] 
    })
    .then((data)=>{
        let token = jwt.sign({_id:data._id,},'mk')
        if (data.length != 0){
            return res.json({
                message:'susses',
                status:200,
                data:data,
                token:token,
            })
          }
        else {
            res.status(400).json('dang nhap that bai');
        }
        
    })
    .catch((err)=>{
        res.status(500).json('loi sever')
    })
});
module.exports = router;