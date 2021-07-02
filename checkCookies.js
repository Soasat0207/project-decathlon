const mongodbAccount = require("./models/mongodb");
const userAcount = mongodbAccount.accountModel;


async function checkcookies1 (req, res, next){
    try{
        let cookies = req.cookies.user;  
        let data = await userAcount.findOne({_id: cookies});
        if(data){
            req.data = data
            next()
        }else{
            res.json('chưa đăng nhập')
        }
    }
    catch(error){
        res.json(error)
    }
}

module.exports = {checkcookies1}