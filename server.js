const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const cartRouter = require('./router/cartRouter');
const orderRouter = require('./router/orderRouter');
var cookieParser = require('cookie-parser');
const userRouter = require('./router/userRouter');
 

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
 
// parse application/json
app.use(express.json())

// parse cookie
app.use(cookieParser())

// Send html file
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
app.get('/test3', (req, res) => {
  res.sendFile(path.join(__dirname,'./view/test3.html'))
})
app.get('/cart', (req, res, next) => {
  res.sendFile(path.join(__dirname, './view/cart.html'))
})
app.get('/order', (req, res, next) => {
  res.sendFile(path.join(__dirname, './view/order.html'))
})
app.get('/dangky', (req, res) =>{
  res.sendFile(path.join(__dirname, './view/dangkyUser.html'))
})
app.get('/dangnhap', (req, res) => {
  res.sendFile(path.join(__dirname, './view/dangnhapUser.html'))
})
app.get('/nguoidung', (req, res) => {
  res.sendFile(path.join(__dirname, './view/trangUser.html'))
})

// make static link
app.use('/public',express.static(path.join(__dirname, './public')));

// Use router
app.use('/api/user/', cartRouter);
app.use('/api/user/', orderRouter);
app.use('/api/nguoidung', userRouter);

// Port to listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})