const ModelMongo = require("../models/mongodb");
const jwt = require('jsonwebtoken');
function checkcookie (req,res,next){
    let token = req.cookies.token;
    token = jwt.verify(token,"mk");
    ModelMongo.AccountModel.findOne({
        $and: [
             { _id:token._id },
         ]
    })
    .then((data) =>{
        req.data=data;
        next();
    })
    .catch((error)=>{
        res.status(500).json('loi sever')
    })
}
module.exports ={checkcookie}