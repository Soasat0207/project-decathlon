const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/decathlon", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

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
<<<<<<< HEAD
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
=======
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
// End schema product

// review and comment  schema
const reviewSchema = new Schema(
  {
    productId: {
      type: String,
      ref: "product",
>>>>>>> ab3ded0f308c78d41a9cfdb43ef9912e788df04d
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
      {
        id: {
          type: String,
          ref: "product",
        },
        quantity: Number,
      },
    ],
    userId: {
      type: String,
      ref: "account",
    },
    status: String,
    orderDate: Date,
    cash: String,
    totalPrice: Number,
  },
  { collection: "orders" }
);
// End orders Schema

// Model account
const AccountModel = mongoose.model("account", accountSchema);
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

// ShoppingCartModel.findOne({_id:'60d442eeb679ae3a745c655b'})
// .populate('product.productId')
// .then(data=>{console.log(data.product);})
// .catch(err=>{console.log(err);})

// ProductModel.create({
//   name: "Size 5 Football 2020 - Germany",
//     img: [
//       'https://contents.mediadecathlon.com/p1814563/671ed12bfe351b5cac761fe249e6af66/p1814563.jpg?f=650x650&format=auto',
//     ],
//     codeProduct: '8555660',
//     price: '195.000',
//     priceImport: '220.000',
//     unit: 'VND',
//     quantity: 10,
//     descriptionShort: 'Fitting comfort',
//     descriptionDetails: "The boot's machine-stitched lining is made from foam to make it more comfy.",
//     title: 'OXELO',
//     rate: '5',
//     gender: 'male',
//     imgColor: [''],
//     sizeId: '',
//     colorId: '',
//     levelId: '',
//     trademarkId: '',
//     supplierId: '',
//     categoryProductId: ''
// })

<<<<<<< HEAD
},{
    collection:'comment'
})
// model account
const accountModel = new mongoose.model('account',accountSchema);
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
module.exports = {accountModel,lastInfoLoginModel,colorProductModel,sizeProductModel,levelProductModel,productModel,trademarkModel,supplierModel,categoryProductModel,reviewModel,commentModel}
// end review and comment
=======

// End Product

// Review and comment
const ReviewModel = mongoose.model("review", reviewSchema);
const CommentModel = mongoose.model("comment", commentSchema);
// End review and comment

// Export Model 
module.exports = {
  AccountModel,
  LastInfoLoginModel,
  ColorProductModel,
  SizeProductModel,
  LevelProductModel,
  ProductModel,
  TrademarkModel,
  SupplierModel,
  CategoryProductModel,
  ShoppingCartModel,
  OrderModel,
  ReviewModel,
  CommentModel,
};
// End export model

// ShoppingCartModel.create({
//   product: [
//     {
//       productId: '60d48bce400b3f3a6081da7a',
//       quantity: 2,
//     },
//     {
//       productId: '60d48c62c545fd300c23e2cb',
//       quantity: 1,
//     },
//     {
//       productId: '60d48cb24864ab174ca806c7',
//       quantity: 3,
//     },
//   ],
//   userId: '60d441158e6b993304984a86',
// }).then(data =>{
//   console.log(data);
// }).catch(err =>{
//   console.log(err)
// })

// =================================================================Example=======================================================
>>>>>>> ab3ded0f308c78d41a9cfdb43ef9912e788df04d
// reviewModel.findOneAndUpdate({
//     productId:'60d2ecdcc0f69f9f8cc7b74b',
// })
// .populate({
//     path:'reply',
//     populate:{path:'accountId'}
// })
// .populate({
//     path:'reply',
//     populate:{path:'reviewId'}
// })
// .then((data)=>{
//     console.log(data)
// })
// .catch((err)=>{
//     console.log(err)
// })
<<<<<<< HEAD
=======

>>>>>>> ab3ded0f308c78d41a9cfdb43ef9912e788df04d
// productModel.create({
//     name:String,
//     img:[
//         "https://contents.mediadecathlon.com/p1800992/k$f6570730f6ff3ea4b05081347ded180c/sq/sac-a-dos-40-litres-de-trek-voyage-travel-100-bleu.jpg?format=auto&f=112x112",
//         "https://contents.mediadecathlon.com/p1801029/k$1c334332a02ee65e9db8fccf3fc4f9d8/sq/sac-a-dos-40-litres-de-trek-voyage-travel-100-bleu.jpg?format=auto&f=112x112",
//         'https://contents.mediadecathlon.com/p1800950/k$178d124a6d33ebb1b92e82b4e0a5651e/sq/sac-a-dos-40-litres-de-trek-voyage-travel-100-bleu.jpg?format=auto&f=112x112',
//         'https://contents.mediadecathlon.com/p1801012/k$6772dcb984ed9032969aaee6cac22b1e/sq/sac-a-dos-40-litres-de-trek-voyage-travel-100-bleu.jpg?format=auto&f=112x112',
//         'https://contents.mediadecathlon.com/p1800983/k$5e4135a26ac07e55ae56fa616353994d/sq/sac-a-dos-40-litres-de-trek-voyage-travel-100-bleu.jpg?format=auto&f=1296x1296',
//         'https://contents.mediadecathlon.com/p1800963/k$5c7791c41404a15ac774b1d77924f5ef/sq/sac-a-dos-40-litres-de-trek-voyage-travel-100-bleu.jpg?format=auto&f=1296x1296',
//         'https://contents.mediadecathlon.com/p1801002/k$bc5329b6229e87ffb7579346623e76fa/sq/sac-a-dos-40-litres-de-trek-voyage-travel-100-bleu.jpg?format=auto&f=1296x1296',
//         'https://contents.mediadecathlon.com/p1801025/k$bf6b7783bfa387e37266525bbef1409b/sq/sac-a-dos-40-litres-de-trek-voyage-travel-100-bleu.jpg?format=auto&f=1296x1296',
//         'https://contents.mediadecathlon.com/p1801014/k$6a8d42a5d226a04fd2356c19e203d1f8/sq/sac-a-dos-40-litres-de-trek-voyage-travel-100-bleu.jpg?format=auto&f=1296x1296',
//         'https://contents.mediadecathlon.com/p1801005/k$574baa6441b258a85f2b716a7f2ec7a7/sq/sac-a-dos-40-litres-de-trek-voyage-travel-100-bleu.jpg?format=auto&f=1296x1296',
//         'https://contents.mediadecathlon.com/p1800979/k$f85f54fc32d50d9429f4db08c225da88/sq/sac-a-dos-40-litres-de-trek-voyage-travel-100-bleu.jpg?format=auto&f=1296x1296',
//     ],
//     codeProduct:'8554558',
//     price:'40',
//     priceImport:'35',
//     unit:'cái',
//     quantity:'10',
//     descriptionShort:'BALO DU LỊCH PHƯỢT 40 LÍT ',
//     descriptionDetails:'Các nhà thiết kế ba lô của chúng tôi đã tạo ra ba lô 40L này để cho phép bạn thực hiện một cuộc phiêu lưu với sự yên tâm hoàn toàn, nhờ có khóa kéo của nó.Kích thước của túi sẽ cho phép bạn mang nó trong cabin mà không cần phải kiểm tra trong kho. Nắp che mưa tích hợp sẽ bảo vệ đồ đạc bên trong túi trong trường hợp trời mưa.',
//     title:'BALO DU LỊCH ',
//     rate:'5',
//     gender:'all',
//     imgColor:['https://contents.mediadecathlon.com/p1800992/k$f6570730f6ff3ea4b05081347ded180c/sq/sac-a-dos-40-litres-de-trek-voyage-travel-100-bleu.jpg?format=auto&f=48x48 48w, https://contents.mediadecathlon.com/p1800992/k$f6570730f6ff3ea4b05081347ded180c/sq/sac-a-dos-40-litres-de-trek-voyage-travel-100-bleu.jpg?format=auto&f=96x96 96w, https://contents.mediadecathlon.com/p1800992/k$f6570730f6ff3ea4b05081347ded180c/sq/sac-a-dos-40-litres-de-trek-voyage-travel-100-bleu.jpg?format=auto&f=144x144 144w'],
//     sizeId:'60d2e5187d64c699a8f0d9ee',
//     colorId:'60d2e5187d64c699a8f0d9ed',
//     levelId:'60d2e5187d64c699a8f0d9ef',
//     trademarkId:'60d2e94044427f9cdea17f93',
//     supplierId:'60d2e94044427f9cdea17f95',
//     categoryProductId:'60d2e94044427f9cdea17f94',
// })
// productModel.findOne({
    
// })
// .populate({
//     path:'sizeId'
// })
// .populate({
//     path:'colorId'
// })
// .populate({
//     path:'levelId'
// })
// .populate({
//     path:'trademarkId'
// })
// .populate({
//     path:'supplierId'
// })
// .populate({
//     path:'categoryProductId'
// })
// .then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// })
