const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/decathlon", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

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

let UserAddressModel = mongoose.model('useraddressmodel', UserAddressSchema);



module.exports = UserAddressModel;