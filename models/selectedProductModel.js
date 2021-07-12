const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/decathlon", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

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

// SelectedProductModel.create({
//   userId: '60d441158e6b993304984a86',
//   productId: '60dd79972cc65f3630441840',
//   quantity: 3
// })

module.exports = SelectedProductModel;