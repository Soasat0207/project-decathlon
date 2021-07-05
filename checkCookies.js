const express = require('express');
const dataMongo = require('./models/mongodb');
const AccountModel = dataMongo.AccountModel;

async function checkCookies (req, res, next){
    let cookies = req.cookies.user;
try{
    let data = await AccountModel.findOne({_id: cookies})
    if(data){
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


module.exports = {checkCookies};
