const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/decathlon", {
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


module.exports = SelectedProductModel;