const mongoose = require('../connectDB');
const Schema = mongoose.Schema;

let UserAddressSchema = new Schema({
    userId: String,
    homeAddress: String,
    province: String,
    district: String,
    ward: String,
    firstName: String,
    lastName: String,
    phone: Number,
    deliveryAddress: String,
    personalAddress: String,
    companyAddress: String
}, {
    collection: 'useraddress'
})

let UserAddressModel = mongoose.model('useraddress', UserAddressSchema);



module.exports = UserAddressModel;