const express = require('express');
const addressRouter = express.Router();
const UserAddressModel = require('../models/addressModel');
const check = require('../checkCookies')

addressRouter.post('/userAddress', check.checkCookies, async (req, res, next)=>{
    try {
        let data = await UserAddressModel.create({
            userId: req.id,
            fullname: req.body.fullname,
            companyAddress: req.body.companyAddress,
            phone: req.body.phone,
            province: req.body.province,
            district: req.body.district,
            ward: req.body.ward,
            detailAddress: req.body.detailAddress,
            typeOfAddress: req.body.typeOfAddress
            })
        res.json(data)
    } catch (error) {
        res.json('Server error')
    }
})
// find by cookies
addressRouter.post('/findUserAddress', check.checkCookies , async (req, res, next)=>{
    try {
        let data = await UserAddressModel.find({ userId: req.id })
        res.json(data)
    } catch (error) {
        res.json('Server error')
    }
    })
// find by id address
addressRouter.post('/findbyIdAddress', async (req, res, next)=>{
    try {
        let data = await UserAddressModel.findOne({ _id : req.body.idAddress })
        res.json(data)
    } catch (error) {
        res.json('Server error')
    }
    })
// update user address
addressRouter.put('/updateUserAddress',async (req, res, next)=>{
    try {
        let data = await UserAddressModel.updateOne({
            _id : req.body.idAddress
        }
        ,{
            fullname: req.body.fullname,
            companyAddress: req.body.companyAddress,
            phone: req.body.phone,
            province: req.body.province,
            district: req.body.district,
            ward: req.body.ward,
            detailAddress: req.body.detailAddress,
            typeOfAddress: req.body.typeOfAddress
        }
        )
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})

// delete user address
addressRouter.delete('/deleteUserAddress', async (req, res, next) =>{
    try {
        let data = await UserAddressModel.deleteOne({ _id : req.body.idAddress })
        res.json(data)
    } catch (error) {
        res.json('Server error')
    }
})

module.exports = addressRouter;