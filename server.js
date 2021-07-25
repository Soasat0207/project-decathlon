const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const userAddressRouter = require('./router/userAddressRouter');
const checkoutRouter = require('./router/checkoutRouter');
const ProductAdvantagesRouter = require('./router/ProductAdvantagesRouter')
const reviewRouter = require('./router/reviewRouter');
const commentRouter = require('./router/commentRouter');
const shoppingCartRouter = require('./router/shoppingCartRouter');
const BannerSaleRouter = require('./router/BannerSaleRouter');



const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

// Send html file
const productRouter = require('./router/productRouter');
const categoryRouter = require('./router/categoryRouter');
const colorRouter = require('./router/colorProductRouter');
const levelRouter = require('./router/levelProductRouter');
const sizeRouter = require('./router/sizeProductRouter');
const supplierRouter = require('./router/supplierRouter');
const trademarkRouter = require('./router/trademarkRouter');
const accountRouter = require('./router/accountRouter');
const userRouter = require('./router/userRouter');
const AdvantagesModel = require('./models/ProductAdvantagesModel')


// parse cookie
app.use(cookieParser())
app.use(bodyParser.json());
var multer  = require('multer');
const { get } = require('mongoose');
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
 
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
//user
app.get('/', (req, res) => {
  res.render('user/index');
})
app.get('/list-product', (req, res) => {
  res.render('user/list-product');
})

app.get('/product-details/:id', (req, res) => {
  res.render('user/product_details');
})
// app.get('/cart', (req, res, next) => {
//   res.render('user/cart');
// })
// app.get('/order', (req, res, next) => {
//   res.render('user/order');
// })
//end user
// admin
app.get('/admin-list-category', (req, res) => {
  res.render('admin/list-category');
})
app.get('/admin-list-level', (req, res) => {
  res.render('admin/list-level');
})
app.get('/admin-list-size', (req, res) => {
  res.render('admin/list-sizeProduct');
})
app.get('/admin-list-color', (req, res) => {
  res.render('admin/list-color');
})
app.get('/admin-list-supplier', (req, res) => {
  res.render('admin/list-supplier');
})
app.get('/admin-list-tradeMark', (req, res) => {
  res.render('admin/list-tradeMark');
})
app.get('/admin-add-product', (req, res) => {
  res.render('admin/add-product');
})
app.get('/admin-update-product/:id', (req, res) => {
  res.render('admin/updateProduct');
})
app.get('/admin-list-product', (req, res) => {
  res.render('admin/list-product');
})
app.get('/admin-list-bannerSale', (req, res) => {
  res.render('admin/list-bannerSale');
})
app.get('/admin-account-details', (req, res) => {
  res.render('admin/account-details');
})
app.get('/admin-add-account', (req, res) => {
  res.render('admin/add-account');
})
app.get('/admin-add-bannerSale', (req, res) => {
  res.render('admin/add-bannerSale');
})
app.get('/admin-login', (req, res) => {
  res.render('admin/login');
})
app.get('/registered-cus', (req, res)=>{
  res.render('customer/registered-customers')
})
app.get('/login-cus', (req, res) => {
  res.render('customer/customer-login')
})
app.get('/admin-list-order', (req, res) => {
  res.render('admin/list-order');
})
app.get('/page-cus', (req, res) =>{
  res.render('customer/customer-page')
})

// Get footer subsection
app.get('/delivery-method', (req, res) => {
  res.render('footer subsection/delivery-method')
})
app.get('/payment-methods', (req, res) => {
  res.render('footer subsection/payment-methods')
})
app.get('/return-process', (req, res) => {
  res.render('footer subsection/return-process')
})
app.get('/frequently-asked-questions', (req, res) => {
  res.render('footer subsection/frequently-asked-questions')
})
app.get('/store-address', (req, res) => {
  res.render('footer subsection/store-address')
})
app.get('/customer-care', (req, res) => {
  res.render('footer subsection/customer-care')
})
app.get('/offers-for-businesses', (req, res) => {
  res.render('footer subsection/offers-for-businesses')
})
app.get('/who-is-deca', (req, res) => {
  res.render('footer subsection/who-is-deca')
})
app.get('/terms-of-purchase', (req, res) => {
  res.render('footer subsection/terms-of-purchase')
})
app.get('/privacy-policy', (req, res) => {
  res.render('footer subsection/privacy-policy')
})


app.get('/advantages', (req, res) => {
  res.sendFile(path.join(__dirname, './views/admin/admin-add-advantages.html'))
}) 
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, './views/cart.html'))
}) 
app.get('/order', (req, res) => {
  res.sendFile(path.join(__dirname, './views/order.html'))
}) 
app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, './views/admin/checkout.html'))
}) 
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

// end admin
// tạo đường dẫn tĩnh 
app.use('/public',express.static(path.join(__dirname, './public')));
app.use('/js',express.static(path.join(__dirname, './js')));
// Use router
app.use('/api/user/', ProductAdvantagesRouter);
app.use('/api/cus', userRouter);
// Use router
app.use('/api/user/', shoppingCartRouter);
app.use('/api/user/', userAddressRouter);
app.use('/api/user/', checkoutRouter);
app.use('/api/product',productRouter);
app.use('/api/category',categoryRouter);
app.use('/api/color',colorRouter);
app.use('/api/level',levelRouter);
app.use('/api/size',sizeRouter);
app.use('/api/supplier',supplierRouter);
app.use('/api/trademark',trademarkRouter);
app.use('/api/account',accountRouter);
app.use('/api/review',reviewRouter);
app.use('/api/comment',commentRouter);
app.use('/api/BannerSale',BannerSaleRouter);
var cpUpload = upload.fields([{ name: 'advantagesPhoto1', maxCount: 3 }, { name: 'advantagesPhoto2', maxCount: 3 }, { name: 'advantagesPhoto', maxCount: 3 } ])
app.post('/profile2', cpUpload, async function (req, res, next) {
  try{
    console.log(req.files)
    console.log(req.body);
    let bien = [];
  for (const key in req.files) {
    let data1 = req.files[key] 
    let linkout  =[];
        for(var i = 0; i < data1.length; i++){
        let index = data1[i].path.indexOf('public');
        let link =  data1[i].path.slice(index, data1[i].path.length)
        linkout.push(link)
}
        bien.push(linkout)
}

    let data = await AdvantagesModel.create({
      codeproduct: req.body.codeproduct,
      productname: req.body.productname,
      // advantage: bien
      title1: req.body.title1,
      advantagecontent1: req.body.advantagecontent1,
      advantagesPhoto1: bien[0],
      title2: req.body.title2,
      advantagecontent2: req.body.advantagecontent2,
      advantagesPhoto2: bien[1],
    })
    if(data){
      res.json(data)
    }
  }
  catch(error){
    res.json(error)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
