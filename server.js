const express = require('express');
const app = express();
const port = 3000;
const path = require('path');


// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
 
// parse application/json
app.use(express.json())

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

// make static link
app.use('/public',express.static(path.join(__dirname, './public')));

// Use router


// Port to listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})