const express = require('express');
const orderRouter = express.Router();
const UserAddressModel = require('../models/addressModel')

orderRouter.post('/userAddress', async (req, res, next)=>{
    try {
        let data = await UserAddressModel.create({
            userId: req.cookies.userId,
            homeAddress: req.body.homeAddress,
            province: req.body.province,
            district: req.body.district,
            ward: req.body.ward,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            deliveryAddress: req.body.deliveryAddress,
            personalAddress: req.body.personalAddress,
            companyAddress: req.body.companyAddress
            })
        res.json(data)
    } catch (error) {
        res.json('Server error')
    }
})
// find by cookies
orderRouter.post('/findUserAddress', async (req, res, next)=>{
    try {
        let data = await UserAddressModel.find({ userId: req.cookies.userId })
        res.json(data)
    } catch (error) {
        res.json('Server error')
    }
    })
// find by id address
orderRouter.post('/findbyIdAddress', async (req, res, next)=>{
    try {
        let data = await UserAddressModel.findOne({ _id : req.body.idAddress })
        res.json(data)
    } catch (error) {
        res.json('Server error')
    }
    })
// update user address
orderRouter.put('/updateUserAddress',async (req, res, next)=>{
    try {
        let data = await UserAddressModel.updateMany({
            _id : req.body.idAddress
        }
        ,{
            homeAddress: req.body.homeAddress,
            province: req.body.province,
            district: req.body.district,
            ward: req.body.ward,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            deliveryAddress: req.body.deliveryAddress,
            personalAddress: req.body.personalAddress,
            companyAddress: req.body.companyAddress
        }
        )
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})


// delete user address
orderRouter.delete('/deleteUserAddress', async (req, res, next) =>{
    try {
        let data = await UserAddressModel.deleteOne({ _id : req.body.idAddress })
        res.json(data)
    } catch (error) {
        res.json('Server error')
    }
})


module.exports = orderRouter;