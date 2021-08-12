let link = window.location.href;
let linkId = link.slice(link.lastIndexOf('/')+1,link.length);
function renderUpdate(){
    getProductDetails(linkId);
}
renderUpdate()
Validator({
    form:'#formAddProduct',
    errorSelector:'.form-message',
    errorRed:'invalid',
    rules:[
        Validator.isRequired('.page-content-form_code','Vui lòng nhập trường này'),
        Validator.isRequired('.page-content-form_name','Vui lòng nhập trường này'),
        Validator.isRequired('.page-content-form_title','Vui lòng nhập trường này'),
        Validator.isRequired('.page-content-form_description-short','Vui lòng nhập trường này'),
        Validator.isRequired('.page-content-form_description-details','Vui lòng nhập trường này'),
        Validator.isRequired('.page-content-form_price','Vui lòng nhập trường này'),
        Validator.isRequired('.page-content-form_price-import','Vui lòng nhập trường này'),
        Validator.isRequired('.page-content-form_quantity','Vui lòng nhập trường này'),
    ],
    onSubmit:function(){
        UpdateProduct(linkId);
    }
})
async function getProductDetails(id){
    let codeProduct = $('.page-content-form_code');
    let name = $('.page-content-form_name');
    let title = $('.page-content-form_title');
    let descriptionShort = $('.page-content-form_description-short');
    let descriptionDetails = $('.page-content-form_description-details');
    let price = $('.page-content-form_price');
    let priceImport = $('.page-content-form_price-import');
    let unit = $('.page-content-form_unit');
    let quantity = $('.page-content-form_quantity');
    let rate = $('.page-content-form_rate');
    let gender = $('.page-content-form_gender');
    let sizeId = $('.page-content-form_size');
    let colorId = $('.page-content-form_color');
    let levelId = $('.page-content-form_level');
    let trademarkId = $('.page-content-form_trade-mark');
    let supplierId = $('.page-content-form_supplier');
    let categoryProductId = $('.page-content-form_category');
    try {
      let data = await $.ajax({
        url: "/api/product/findProductId",
        type: "POST",
        data:{
            productId:id,
        }
      });   
      if(data.status == 200){
        data.data.map((data)=>{
            console.log(data)
            codeProduct.val(data.codeProduct);
            name.val(data.name);
            title.val(data.title);
            descriptionShort.val(data.descriptionShort);
            descriptionDetails.val(data.descriptionDetails);
            price.val(data.price);
            quantity.val(data.quantity);
            unit.val(data.unit);
            priceImport.val(data.priceImport);
            rate.val(data.rate);
            gender.val(data.gender);
            sizeId.append(`<option value="${data.sizeId._id}">${data.sizeId.size}</option>`)
            colorId.append(`<option value="${data.colorId._id}">${data.colorId.name}</option>`)
            levelId.append(`<option value="${data.levelId._id}">${data.levelId.level}</option>`)
            trademarkId.append(`<option value="${data.trademarkId._id}">${data.trademarkId.name}</option>`)
            supplierId.append(`<option value="${data.supplierId._id}">${data.supplierId.name}</option>`)
            categoryProductId.append(`<option value="${data.categoryProductId._id}">${data.categoryProductId.name}</option>`)
        }) 
      }
    } catch (error) {
      console.log(error);
    }
}
async function UpdateProduct(id) {
    let codeProduct = $('.page-content-form_code');
    let name = $('.page-content-form_name');
    let title = $('.page-content-form_title');
    let descriptionShort = $('.page-content-form_description-short');
    let descriptionDetails = $('.page-content-form_description-details');
    let price = $('.page-content-form_price');
    let priceImport = $('.page-content-form_price-import');
    let unit = $('.page-content-form_unit');
    let quantity = $('.page-content-form_quantity');
    let rate = $('.page-content-form_rate');
    let gender = $('.page-content-form_gender');
    let sizeId = $('.page-content-form_size');
    let colorId = $('.page-content-form_color');
    let levelId = $('.page-content-form_level');
    let trademarkId = $('.page-content-form_trade-mark');
    let supplierId = $('.page-content-form_supplier');
    let categoryProductId = $('.page-content-form_category');
    console.log(codeProduct.val());
    try {
      let data = await $.ajax({
        url: "/api/product",
        type: "PUT",
        data:{
            id:id,
            codeProduct:codeProduct.val(),
            name:name.val(),
            title:title.val(),
            descriptionShort:descriptionShort.val(),
            descriptionDetails:descriptionDetails.val(),
            price:price.val(),
            priceImport:priceImport.val(),
            unit:unit.val(),
            quantity:quantity.val(),
            rate:rate.val(),
            quantity:quantity.val(),
            gender:gender.val(),
            sizeId:sizeId.val(),
            colorId:colorId.val(),
            levelId:levelId.val(),
            trademarkId:trademarkId.val(),
            supplierId:supplierId.val(),
            categoryProductId:categoryProductId.val(),
        }
      });
      console.log(data)   
    } catch (error) {
      console.log(error);
    }
}