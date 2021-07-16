const express = require('express');
const dataMongo = require('../models/mongodb');
const AccountModel = dataMongo.AccountModel;
const AccountBListModel = dataMongo.AcountBListModel;
const userRouter = express.Router();
const checkCookies1 = require('../checkCookies')
const jwt = require('jsonwebtoken');

// Đăng ký
userRouter.post('/dangky', async (req, res) =>{
    try{
        let data2 = await AccountModel.findOne({username: req.body.username})
        if(data2){
            res.json('Tài khoản đã tồn tại')
        }else{
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
        console.log(data);
        if(data){
            let token = jwt.sign({id: data._id}, 'duc')
            res.json({
                status: 200,
                err: false,
                mes: 'Thanh cong',
                data: token
            })
        }else{
            res.json({
                status: 400,
                err: false,
                mes: 'Thất bại'
            })
        }
    }
    catch(error){
        console.log(error);
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
userRouter.post('/checkcookies', checkCookies1.checkToken ,checkCookies1.checkCookies,  (req, res) =>{
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

userRouter.post('/blacklist', checkCookies1.checkCookies, async (req, res)=>{
    let token = req.cookies.user;
    try{
        let data =  await AccountBListModel.create({token: token})
        if(data){
            res.json(data)
        }else{
            res.json("khong co token")
        }
    }
    catch(error){
        res.json(error)
    }
})

module.exports = userRouter;
