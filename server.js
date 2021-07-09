const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const cartRouter = require('./router/cartRouter');
const userAddressRouter = require('./router/userAddressRouter');
const orderRouter = require('./router/orderRouter');
const SelectedProductRouter = require('./router/selectedProductRouter')
var cookieParser = require('cookie-parser');
 

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
 
// parse application/json
app.use(express.json())

// parse cookie
app.use(cookieParser())

// Send html file
const productRouter = require('./router/productRouter');
const categoryRouter = require('./router/categoryRouter');
const colorRouter = require('./router/colorProductRouter');
const levelRouter = require('./router/levelProductRouter');
const sizeRouter = require('./router/sizeProductRouter');
const supplierRouter = require('./router/supplierRouter');
const trademarkRouter = require('./router/trademarkRouter');
const accountRouter = require('./router/accountRouter');
const bodyParser = require("body-parser");
var multer  = require('multer')
var cookieParser = require('cookie-parser');
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
app.use(cookieParser())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json()); 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/index.html'))
})
app.get('/list-product', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/list-product.html'))
})
app.get('/product-details', (req, res) => {
app.get('/product-details/:id', (req, res) => {
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
app.use('/api/user/', userAddressRouter);
app.use('/api/user/', orderRouter);
app.use('/api/user/', SelectedProductRouter);

// Port to listen
app.get('/admin-list-tradeMark', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/admin-list-tradeMark.html'))
})
app.get('/admin-list-supplier', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/admin-list-supplier.html'))
})
app.get('/admin-list-size', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/admin-list-sizeProduct.html'))
})
app.get('/admin-list-level', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/admin-list-level.html'))
})
app.get('/admin-list-category', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/admin-list-category.html'))
})
app.get('/admin-login', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/admin-login.html'))
})
app.get('/admin-add-account', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/admin-add-account.html'))
})
app.get('/admin-account-details', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/admin-account-details.html'))
})
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/cart.html'))
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
app.use('/api/account',accountRouter);
app.post('/profile',upload.array('avatar', 12), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
