const mongoose = require('../connectDB');
const Schema = mongoose.Schema;
// schema account
const accountSchema = new Schema(
  {
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    phone: String,
    gender: String,
    email: String,
    birthday: Date,
    mainAddress: String,
    noteAddress: String,
    subAddress: String,
    city: String,
    avatar: String,
    createdAt: Date,
    role: String,
    status: String,
  },
  {
    collection: "account",
  }
);

const accountBListSchema = new Schema(
  {
    token: String,
  },
  {collection: "blacklist"}
);


const lastInfoLoginSchema = new Schema(
  {
    dateLastLogin: [
      {
        type: String,
      },
    ],
    deviceLastLogin: String,
    ipLastLogin: String,
  },
  {
    collection: "lastInfoLogin",
  }
);
// end schema account

// schema product
const colorProductSchema = new Schema(
  {
    colorCode: String,
    name: String,
  },
  {
    collection: "colorProduct",
  }
);
const sizeProductSchema = new Schema(
  {
    size: String,
    description: String,
  },
  {
    collection: "sizeProduct",
  }
);
const levelProductSchema = new Schema(
  {
    level: String,
    description: String,
  },
  {
    collection: "levelProduct",
  }
);
const ProductSchema = new Schema(
  {
    name: String,
    img: [
      {
        type: String,
      },
    ],
    codeProduct: String,
    price: String,
    priceImport: String,
    unit: String,
    quantity: String,
    descriptionShort: String,
    descriptionDetails: String,
    title: String,
    rate: String,
    gender: String,
    imgColor: [
      {
        type: String,
      },
    ],
    sizeId: {
      type: String,
      ref: "sizeProduct",
    },
    colorId: {
      type: String,
      ref: "colorProduct",
    },
    levelId: {
      type: String,
      ref: "levelProduct",
    },
    trademarkId: {
      type: String,
      ref: "trademark",
    },
    supplierId: {
      type: String,
      ref: "supplier",
    },
    categoryProductId: {
      type: String,
      ref: "categoryProduct",
    },
    categoryProductId:{
        type:String,
        ref:'categoryProduct',
    },
    status:String,
},{
    collection:'product'
})
const tradeMarkSchema = new Schema({
    name:String,
    description:String,
},{
    collection:'trademark'
})
const supplierSchema = new Schema({
    name:String,
    description:String,
    email:String,
    address:String,
    phone:String,
    status:String,
},{
    collection:'supplier'
})
const categoryProductSchema = new Schema({
    name:String,
    description:String,
},{
    collection:'categoryProduct'
})
// end schema product
// review and comment  schema 
const reviewSchema = new Schema({
    productId:{
        type:String,
        ref:'product',
    },
    rate: String,
    comment: String,
    title: String,
    accountId: {
      type: String,
      ref: "account",
    },
    createDate: String,
    img: [
      {
        type: String,
      },
    ],
    status: Boolean,
    reply: [
      {
        type: String,
        ref: "comment",
      },
    ],
  },
  {
    collection: "review",
  }
);
const commentSchema = new Schema(
  {
    reviewId: {
      type: String,
      ref: "review",
    },
    accountId: {
      type: String,
      ref: "account",
    },
    comment: String,
    createDate: String,
    img: [
      {
        type: String,
      },
    ],
  },
  {
    collection: "comment",
  }
);
// End review and comment  schema

// Shopping cart schema
const shoppingCartSchema = new Schema(
  {
    product: [
      {
        productId: {
          type: String,
          ref: 'product',
        },
        quantity: Number,
      },
    ],
    userId: {
      type: String,
      ref: "account",
    },
  },
  { collection: "shoppingCart" }
);
// End shopping cart schema
// Orders Schema
const ordersSchema = new Schema(
  {
    product: [
      {type: String, 
      ref: 'selectedProduct'
      }
    ],
    address: {
      type: String,
      ref: 'useraddress'
    },
    userId: {
      type: String,
      ref: "account",
    },
    status: {
      type: String,
      default: 'Dang van chuyen'
    },
    orderDate: Date,
    payment: String,
    totalPrice: Number,
  },
  { collection: "orders" }
);
// End orders Schema

// Model account
const AccountModel = mongoose.model("account", accountSchema);
const AcountBListModel = mongoose.model("blacklist" ,accountBListSchema);
const LastInfoLoginModel = mongoose.model("lastInfoLogin", lastInfoLoginSchema);
// End model account
// Product model
const ColorProductModel = mongoose.model("colorProduct", colorProductSchema);
const SizeProductModel = mongoose.model("sizeProduct", sizeProductSchema);
const LevelProductModel = mongoose.model("levelProduct", levelProductSchema);
const ProductModel = mongoose.model("product", ProductSchema);
const TrademarkModel = mongoose.model("trademark", tradeMarkSchema);
const SupplierModel = mongoose.model("supplier", supplierSchema);
const CategoryProductModel = mongoose.model("categoryProduct", categoryProductSchema);
const ShoppingCartModel = mongoose.model("shoppingCartModel", shoppingCartSchema);
const OrderModel = mongoose.model("orderModel", ordersSchema);
// End Product

// Review and comment
const ReviewModel = mongoose.model("review", reviewSchema);
const CommentModel = mongoose.model("comment", commentSchema);
// End review and comment

// model account
// const accountModel = new mongoose.model('account',accountSchema);
const lastInfoLoginModel = new mongoose.model('lastInfoLogin',lastInfoLoginSchema);
// end model account
// product model
const colorProductModel = new mongoose.model('colorProduct',colorProductSchema);
const sizeProductModel = new mongoose.model('sizeProduct',sizeProductSchema);
const levelProductModel = new mongoose.model('levelProduct',levelProductSchema);
const productModel = new mongoose.model('product',ProductSchema);
const trademarkModel = new mongoose.model('trademark',tradeMarkSchema);
const supplierModel = new mongoose.model('supplier',supplierSchema);
const categoryProductModel = new mongoose.model('categoryProduct',categoryProductSchema);
// end Product
// review and comment
const reviewModel = new mongoose.model('review',reviewSchema);
const commentModel = new mongoose.model('comment',commentSchema);
module.exports = {OrderModel,ShoppingCartModel, AccountModel,AcountBListModel,lastInfoLoginModel,colorProductModel,sizeProductModel,levelProductModel,productModel,trademarkModel,supplierModel,categoryProductModel,reviewModel,commentModel}
// end review and comment

