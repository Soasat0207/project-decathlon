const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://vulong:123@cluster0.utibo.mongodb.net/decathlon?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
module.exports = mongoose;