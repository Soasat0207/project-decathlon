const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const cartRouter = require("./router/cartRouter");
const userAddressRouter = require("./router/userAddressRouter");
const orderRouter = require("./router/orderRouter");
const SelectedProductRouter = require("./router/selectedProductRouter");
const productRouter = require("./router/productRouter");
const categoryRouter = require("./router/categoryRouter");
const colorRouter = require("./router/colorProductRouter");
const levelRouter = require("./router/levelProductRouter");
const sizeRouter = require("./router/sizeProductRouter");
const supplierRouter = require("./router/supplierRouter");
const trademarkRouter = require("./router/trademarkRouter");
const accountRouter = require("./router/accountRouter");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var multer = require("multer");
var cookieParser = require("cookie-parser");
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// parse cookie
app.use(cookieParser());

// Send html file
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./public/uploads"));
  },
  filename: function (req, file, cb) {
    let index = file.originalname.lastIndexOf(".");
    let extention = file.originalname.slice(index, file.originalname.length);
    cb(null, file.fieldname + "-" + Date.now() + extention);
  },
});
var upload = multer({ storage: storage });
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
//user
app.get("/", (req, res) => {
  res.render("user/index");
});
app.get("/list-product", (req, res) => {
  res.render("user/list-product");
});
app.get("/product-details/:id", (req, res) => {
  res.render("user/product_details");
});
app.get("/cart", (req, res, next) => {
  res.render("user/cart");
});
app.get("/order", (req, res, next) => {
  res.render("user/order");
});
//end user
// admin
app.get("/admin-list-category", (req, res) => {
  res.render("admin/list-category");
});
app.get("/admin-list-level", (req, res) => {
  res.render("admin/list-level");
});
app.get("/admin-list-size", (req, res) => {
  res.render("admin/list-sizeProduct");
});
app.get("/admin-list-color", (req, res) => {
  res.render("admin/list-color");
});
app.get("/admin-list-supplier", (req, res) => {
  res.render("admin/list-supplier");
});
app.get("/admin-list-tradeMark", (req, res) => {
  res.render("admin/list-tradeMark");
});
app.get("/admin-add-product", (req, res) => {
  res.render("admin/add-product");
});
app.get("/admin-list-product", (req, res) => {
  res.render("admin/list-product");
});
app.get("/admin-account-details", (req, res) => {
  res.render("admin/account-details");
});
app.get("/admin-add-account", (req, res) => {
  res.render("admin/add-account");
});
app.get("/admin-login", (req, res) => {
  res.render("admin/login");
});
// end admin
// tạo đường dẫn tĩnh
app.use("/public", express.static(path.join(__dirname, "./public")));
// Use router
app.use("/api/user/", cartRouter);
app.use("/api/user/", userAddressRouter);
app.use("/api/user/", orderRouter);
app.use("/api/user/", SelectedProductRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/color", colorRouter);
app.use("/api/level", levelRouter);
app.use("/api/size", sizeRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/trademark", trademarkRouter);
app.use("/api/account", accountRouter);

app.post("/profile", upload.array("avatar", 12), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
});

var cpUpload = upload.fields([
  { name: "advantagesPhoto1", maxCount: 3 },
  { name: "advantagesPhoto2", maxCount: 3 },
]);
app.post("/profile2", cpUpload, async function (req, res, next) {
  try {
    console.log(req.files);
    let index1 = req.files.advantagesPhoto1[0].path.indexOf("public");
    let link1 = req.files.advantagesPhoto1[0].path.slice(
      index1,
      req.files.advantagesPhoto1[0].path.length
    );
    let index2 = req.files.advantagesPhoto2;
    console.log(index2);
    // let data = await AdvantagesModel.create({
    //   advantagecontent1: req.body.advantagecontent1,
    //   photo1: link1,
    // })
    // if(data){
    //   res.json(data)
    // }
  } catch (error) {
    res.json(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
