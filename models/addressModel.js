const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://lehuyhiep449:123@cluster0.h6ust.mongodb.net/decathlon?retryWrites=true&w=majority", {
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

let UserAddressModel = mongoose.model('useraddress', UserAddressSchema);



module.exports = UserAddressModel;