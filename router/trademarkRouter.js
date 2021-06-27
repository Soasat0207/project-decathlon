const express = require('express');
const router = express.Router();
const ModelMongo = require("../models/mongodb");
router.get('/',(req,res) =>{
    ModelMongo.trademarkModel.find({

    })
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.status(500).json('loi sever')
    })
});
module.exports = router;