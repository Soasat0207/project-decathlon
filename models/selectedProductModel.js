const mongoose = require('../connectDB');
const Schema = mongoose.Schema;


let SelectedProductSchema = new Schema({
    userId: String,
    productId: {
      type: String,
      ref: 'product'
    },
    quantity: Number
}, {
    collection: 'selectedProduct'
})


let SelectedProductModel = mongoose.model('selectedProduct', SelectedProductSchema);
module.exports = SelectedProductModel;