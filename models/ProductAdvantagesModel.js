const mongoose = require("mongoose");
const Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost:27017/decathlon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const AdvantagesSchema = new Schema ({
    codeproduct: String,
    productname: String,
    advantage:[{
      content:String,
      photo:[
       { type:String}
      ]
    }],
    advantagecontent1: String,
    photo1: [
      {type:String}
    ],
    advantagecontent2: String,
    photo2: [
      {type:String}
    ],

}, {collection: 'Advantages'});

const AdvantagesModel = mongoose.model('Advantages', AdvantagesSchema);

module.exports = AdvantagesModel;

