const express = require('express');
const dataMongo = require('./models/mongodb');
const AccountModel = dataMongo.AccountModel;
const AccountBListModel = dataMongo.AcountBListModel;
const jwt = require('jsonwebtoken');


async function checkCookies (req, res, next){
    let cookies = req.cookies.user;
try{
    let id = jwt.verify(cookies, 'duc').id;
    let data = await AccountModel.findOne({_id: id})
    if(data){
        req.role = data.role;
        req.id = data._id;
        next()
    }else(
        res.json('Chưa đăng nhập')
    )
}
catch(error){
    res.json(error)
}
}

//------------------------------------

function checkRole (req, res, next){
    if(req.role == "user"){
        next()
    }else{
        res.json("không có quyền truy cập")
    }
}

//------------------------------------

async function checkToken (req, res, next){
    let token = req.cookies.user;
    try{
        let data = await AccountBListModel.findOne({token: token})
        if(data){
            res.json("Đã có token")
        }else{
            next()
        }
    }
    catch(error){
        res.json(error)
    }
}


module.exports = {checkCookies, checkToken, checkRole};
