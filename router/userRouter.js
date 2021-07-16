const express = require('express');
const dataMongo = require('../models/mongodb');
const AccountModel = dataMongo.AccountModel;
const AccountBListModel = dataMongo.AcountBListModel;
const userRouter = express.Router();
const checkCookies1 = require('../checkCookies')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Đăng ký
userRouter.post('/registeredcus', async (req, res) =>{
    try{
        let pass =  await bcrypt.hash(req.body.password,saltRounds)
        let data2 = await AccountModel.findOne({username: req.body.username})
        if(data2){
            res.json('Tài khoản đã tồn tại')
        }else{
            let data = await AccountModel.create({
                username: req.body.username,
                password: pass,
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
userRouter.post('/login-cus', async (req, res) => {
    try {
        let password= req.body.password;
        let data =  await AccountModel.findOne({username: req.body.username})
        if(data){
            let result = await bcrypt.compare(password, data.password);
            if(result){
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
                    mes: 'sai pass'
                })
            }
        }else{
            res.json({
                status: 400,
                err: false,
                mes: 'Thất bại'
            })
        }
    } catch (error) {
         // console.log(error);
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
            birthday: req.body.birthday,  
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
userRouter.put('/address', checkCookies1.checkCookies, async (req, res) => {
    let id = req.id;
    try{
        let data =  await AccountModel.updateOne({_id: id}, {
            mainAddress: req.body.mainAddress,
            noteAddress: req.body.noteAddress,
            city: req.body.city,
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
userRouter.get('/information', checkCookies1.checkCookies, async(req, res) => {
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
