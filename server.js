const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const productRouter = require('./router/productRouter');
const categoryRouter = require('./router/categoryRouter');
const colorRouter = require('./router/colorProductRouter');
const levelRouter = require('./router/levelProductRouter');
const sizeRouter = require('./router/sizeProductRouter');
const supplierRouter = require('./router/supplierRouter');
const trademarkRouter = require('./router/trademarkRouter');
const bodyParser = require("body-parser");
const routerUser = require("./router/userNguoiDung");
const cookieParser = require('cookie-parser');
app.use(cookieParser());


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
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/index.html'))
})
app.get('/list-product', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/list-product.html'))
})
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
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/cart.html'))
})
app.get('/dangky', (req, res) => {
  res.sendFile(path.join(__dirname, './view/dangkyUser.html'))
})
app.get('/nguoidung', (req, res) => {
  res.sendFile(path.join(__dirname, './view/trangUser.html'))
})
app.get('/dangnhap', (req, res) => {
  res.sendFile(path.join(__dirname, './view/dangnhapUser.html'))
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
app.use('/api/nguoidung', routerUser);


app.post('/profile',upload.array('avatar', 12), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})