const express = require("express");
const mongodbAccount = require("../models/mongodb");
const routerUser = express.Router();
const userAcount = mongodbAccount.accountModel;
const checkcookies = require('../checkCookies');
const path = require("path")



// Đăng ký User
routerUser.post("/dangky", async(req, res) => {
    try{
        let data = await userAcount.create({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
        })
        if(data){
            res.json("Đăng ký thành công")
        }

    }
    catch(error){
        res.json("Đăng ký không thành công")
    }
})

// Đăng nhập User
routerUser.post("/dangnhap" ,async(req, res) => {
    try{
        let data = await userAcount.findOne({
            username: req.body.username,
            password: req.body.password,
        })
        if(data){
            // đuugns user pass
            res.json(data)
        }else{
            // sai user hoacj pass
            // timf theo user
            // neeus cos thif sai pass
            // k co thi sai user
         let tendangnhap = await userAcount.findOne({username: req.body.username})
         if(tendangnhap){
             res.json('Sai pass')
         }else{res.json('Sai ten dang nhap')}
        }
    }
    catch(error){
        res.json(error)
    }
})

// check cookies
routerUser.get('/',checkcookies.checkcookies1,(req,res)=>{
    res.json(
        {e:req.data,
        mes:'success'}
        ) 
})

// routerUser.post('/checkcookies', checkcookies.checkcookies1, (req, res) => {
//     res.json('Đã đăng nhập')
// })

// Tạo thông tin
routerUser.put('/thongtin/:id', async (req, res) => {
    let id = req.params.id
    console.log(34, id);
try{
    let data = await userAcount.updateOne({_id: id} ,{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
    })
    
    if(data){
        res.json(data)
    }
}
catch(error){
    res.json(error)
}
})

// Thêm địa chỉ
routerUser.put('/themdiachi', async (req, res) => {
    try{
        userAcount.updateOne({_id: req.body.id},{
            mainAddress: req.body.mainAddress,
            deliveryNote: req.body.deliveryNote,
        })
        if(data){
            res.json(data)
        }
    }
    catch(error){
        res.json(error)
    }
})





module.exports = routerUser;