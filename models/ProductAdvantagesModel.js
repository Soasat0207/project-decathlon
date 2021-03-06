const mongoose = require('../connectDB');
const Schema = mongoose.Schema;


// mongoose.connect('mongodb://localhost:27017/decathlon', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });

const AdvantagesSchema = new Schema ({
    codeproduct: String,
    productname: String,
    // advantage:[{
    //   content:String,
    //   photo:[
    //    { type:String}
    //   ]
    // }],
    title1: String,
    advantagecontent1: String,
    advantagesPhoto1: [
      {type:String}
    ],
    title2: String,
    advantagecontent2: String,
    advantagesPhoto2: [
      {type:String}
    ],

}, {collection: 'Advantages'});

const AdvantagesModel = mongoose.model('Advantages', AdvantagesSchema);

module.exports = AdvantagesModel;

