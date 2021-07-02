const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
<<<<<<< HEAD
const productRouter = require('./router/productRouter');
const categoryRouter = require('./router/categoryRouter');
const colorRouter = require('./router/colorProductRouter');
const levelRouter = require('./router/levelProductRouter');
const sizeRouter = require('./router/sizeProductRouter');
const supplierRouter = require('./router/supplierRouter');
const trademarkRouter = require('./router/trademarkRouter');
const bodyParser = require("body-parser");
var multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'./public/uploads'))
    },
    filename: function (req, file, cb) {
      let index = file.originalname.lastIndexOf('.');
      let extention = file.originalname.slice(index,file.originalname.length);
      cb(null, file.fieldname + '-' + Date.now() + extention);
    }
  })
var upload = multer({ storage: storage })
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json()); 
=======
const cartRouter = require('./router/cartRouter');
const orderRouter = require('./router/orderRouter');
var cookieParser = require('cookie-parser');
 

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
 
// parse application/json
app.use(express.json())

// parse cookie
app.use(cookieParser())

// Send html file
>>>>>>> ab3ded0f308c78d41a9cfdb43ef9912e788df04d
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/index.html'))
})
app.get('/list-product', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/list-product.html'))
})
app.get('/product-details', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/product_details.html'))
})
app.get('/admin-list-product', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/admin-list-product.html'))
})
app.get('/admin-add-product', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/admin-add-product.html'))
})
app.get('/admin-list-color', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/admin-list-color.html'))
})
<<<<<<< HEAD
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/cart.html'))
})
app.get('/test3', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/test3.html'))
})
// tạo đường dẫn tĩnh 
app.use('/public',express.static(path.join(__dirname, './public')));
app.use('/api/product',productRouter);
app.use('/api/category',categoryRouter);
app.use('/api/color',colorRouter);
app.use('/api/level',levelRouter);
app.use('/api/size',sizeRouter);
app.use('/api/supplier',supplierRouter);
app.use('/api/trademark',trademarkRouter);


app.post('/profile',upload.array('avatar', 12), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
})

=======
app.get('/test3', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/test3.html'))
})
app.get('/cart', (req, res, next) => {
  res.sendFile(path.join(__dirname, './view/cart.html'))
})
app.get('/order', (req, res, next) => {
  res.sendFile(path.join(__dirname, './view/order.html'))
})

// make static link
app.use('/public',express.static(path.join(__dirname, './public')));

// Use router
app.use('/api/user/', cartRouter);
app.use('/api/user/', orderRouter);

// Port to listen
>>>>>>> ab3ded0f308c78d41a9cfdb43ef9912e788df04d
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})