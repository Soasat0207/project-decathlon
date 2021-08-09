const mongoose = require('../connectDB');
const Schema = mongoose.Schema;

let UserAddressSchema = new Schema({
    userId: String,
    fullname: String,
    companyAddress: String,
    phone: String,
    province: String,
    district: String,
    ward: String,
    detailAddress: String,
    typeOfAddress: String,
}, {
    collection: 'useraddress'
})

let UserAddressModel = mongoose.model('useraddress', UserAddressSchema);



module.exports = UserAddressModel;