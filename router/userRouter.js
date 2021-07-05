const express = require('express');
const dataMongo = require('../models/mongodb');
const AccountModel = dataMongo.AccountModel;
const userRouter = express.Router();
const checkCookies1 = require('../checkCookies')

// Đăng ký
userRouter.post('/dangky', async (req, res) =>{
    try{
        let data = await AccountModel.create({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            gender: req.body.gender,
            email: req.body.email,    
        })
        if(data){
            res.json(data)
        }
    }
    catch(error){
        res.json(error)
    }
})

// Đăng nhập
userRouter.post('/dangnhap', async (req, res) => {
    try{
        let data =  await AccountModel.findOne({
            username: req.body.username,
            password: req.body.password,
        })
        if(data){
            res.json({id: data._id})
        }else{
            res.json('Thất bại')
        }
    }
    catch(error){
        res.json(error)
    }
})

// Cập nhập thông tin
userRouter.put('/capnhap', checkCookies1.checkCookies, async (req, res) => {
    let id = req.id;
    try{
        let data =  await AccountModel.updateOne({_id: id}, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            gender: req.body.gender,
            email: req.body.email,  
        })
        if(data){
            res.json(data)
        }
    }
    catch(error){
        res.json(error)
    }
})

// Cập nhập địa chỉ
userRouter.put('/diachi', checkCookies1.checkCookies, async (req, res) => {
    let id = req.id;
    try{
        let data =  await AccountModel.updateOne({_id: id}, {
            mainAddress: req.body.mainAddress,
            noteAddress: req.body.noteAddress,
        })
        if(data){
            res.json(data)
        }
    }
    catch(error){
        res.json(error)
    }
})

// Check cookies
userRouter.post('/checkcookies', checkCookies1.checkCookies,  (req, res) =>{
    res.json('Đăng nhập thành công')
})

// Hiển thị các ô thông tin
userRouter.get('/thongtin', checkCookies1.checkCookies, async(req, res) => {
    let id = req.id;
    try{
        let data = await AccountModel.findOne({_id: id})
        if(data){
            res.json(data)
        }
    }
    catch(error){
        res.json(error)
    }
})

module.exports = userRouter;
