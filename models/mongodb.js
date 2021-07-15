const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/decathlon", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Accout Schema
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
    subAddress: String,
    city: String,
    avatar: {
      type: String,
      default:
        "https://cdn1.vectorstock.com/i/1000x1000/11/10/admin-icon-male-person-profile-avatar-with-gear-vector-25811110.jpg",
    },
    createdAt: Date,
    role: { type: String, default: "user" },
    status: String,
    description: String,
  },
  {
    collection: "account",
  }
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
// end account schema

// Create product schema
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

const productSchema = new Schema(
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
    categoryProductId: {
      type: String,
      ref: "categoryProduct",
    },
    status: String,
  },
  {
    collection: "product",
  }
);

const tradeMarkSchema = new Schema(
  {
    name: String,
    description: String,
  },
  {
    collection: "trademark",
  }
);
const supplierSchema = new Schema(
  {
    name: String,
    description: String,
    email: String,
    address: String,
    phone: String,
    status: String,
  },
  {
    collection: "supplier",
  }
);
const categoryProductSchema = new Schema(
  {
    name: String,
    description: String,
  },
  {
    collection: "categoryProduct",
  }
);
// end schema product

// review and comment  schema
const reviewSchema = new Schema(
  {
    productId: {
      type: String,
      ref: "product",
    },
    rate: String,
    comment: String,
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
        type: String,
        ref: 'selectedProduct'
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
      { 
        type: String, 
        ref: "selectedProduct"
      }
    ],
    address: {
      type: String,
      ref: "useraddress",
    },
    userId: {
      type: String,
      ref: "account",
    },
    status: {
      type: String,
      default: "Dang van chuyen",
    },
    methodPayment: String,
    orderDate: Date,
    totalPrice: Number,
  },
  { collection: "orders" }
);
// End orders Schema

// Create Model
  const AccountModel = mongoose.model("account", accountSchema);
  const LastInfoLoginModel = mongoose.model("lastInfoLogin", lastInfoLoginSchema);
  const ColorProductModel = mongoose.model("colorProduct", colorProductSchema);
  const SizeProductModel = mongoose.model("sizeProduct", sizeProductSchema);
  const LevelProductModel = mongoose.model("levelProduct", levelProductSchema);
  const ProductModel = mongoose.model("product", productSchema);
  const TrademarkModel = mongoose.model("trademark", tradeMarkSchema);
  const SupplierModel = mongoose.model("supplier", supplierSchema);
  const CategoryProductModel = mongoose.model("categoryProduct",categoryProductSchema);
  const ShoppingCartModel = mongoose.model( "shoppingCartModel",shoppingCartSchema );
  const OrderModel = mongoose.model("orderModel", ordersSchema);
  const ReviewModel = mongoose.model("review", reviewSchema);
  const CommentModel = mongoose.model("comment", commentSchema);
// end of Create Model

// exports Model
module.exports = {
  OrderModel,
  ShoppingCartModel,
  AccountModel,
  LastInfoLoginModel,
  ColorProductModel,
  SizeProductModel,
  LevelProductModel,
  ProductModel,
  TrademarkModel,
  SupplierModel,
  CategoryProductModel,
  ReviewModel,
  CommentModel,
};
// end of exports model