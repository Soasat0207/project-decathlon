function renderAdd(){
    renderTrademark();
    renderSupplier();
    renderSize();
    renderLevel();
    renderColor();
    renderCategory();
}
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
        createProduct();
    }
})
async function createProduct() {
    //let img = req.body.img;
    // let imgColor = req.body.imgColor;
    let name = $('.page-content-form_name').val();
    let codeProduct = $('.page-content-form_code').val();
    let priceImport = $('.page-content-form_price-import').val();
    let price = $('.page-content-form_price').val();
    let unit = $('.page-content-form_unit').val();
    let quantity = $('.page-content-form_quantity').val();
    let descriptionShort = $('.page-content-form_description-short').val();
    let descriptionDetails = $('.page-content-form_description-details').val();
    let title = $('.page-content-form_title').val();
    let rate = $('.page-content-form_rate').val();
    let gender = $('.page-content-form_gender').val();
    let sizeId = $('.page-content-form_size').val();
    let colorId = $('.page-content-form_color').val();
    let levelId = $('.page-content-form_level').val();
    let trademarkId = $('.page-content-form_trade-mark').val();
    let supplierId = $('.page-content-form_supplier').val();
    let categoryProductId = $('.page-content-form_category').val();
    try {
      let data = await $.ajax({
        url: "/api/product",
        type: "POST",
        data: {
            name : name,
            codeProduct : codeProduct,
            priceImport : priceImport,
            price : price,
            unit : unit,
            quantity : quantity,
            descriptionShort : descriptionShort,
            descriptionDetails : descriptionDetails,
            title : title,
            rate : rate,
            gender : gender,
            sizeId : sizeId,
            colorId : colorId,
            levelId : levelId,
            trademarkId : trademarkId,
            supplierId : supplierId,
            categoryProductId : categoryProductId,
        }
      });
      if(data.status == 200){
        alert(data.message);
        location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
}
async function renderCategory(){
    try {
        let data = await $.ajax({
          url: "/api/category",
          type: "GET",
        });
        data.map((data) => {
            let div = ``;
            div=`
            <option value="${data._id}">${data.name}</option>
            `
            $('.page-content-form_category').append(div);
        })
    }
    catch (error) {
        console.log(error);
    }
}

async function renderColor(){
    try {
        let data = await $.ajax({
          url: "/api/color",
          type: "GET",
        });
        data.map((data) => {

            let div = ``;
            div=`
            <option value="${data._id}">${data.name}</option>
            `
            $('.page-content-form_color').append(div);
        })
    }
    catch (error) {
        console.log(error);
    }
}

async function renderLevel(){
    try {
        let data = await $.ajax({
          url: "/api/level",
          type: "GET",
        });
        data.map((data) => {
            let div = ``;
            div=`
            <option value="${data._id}">${data.level}</option>
            `
            $('.page-content-form_level').append(div);
        })
    }
    catch (error) {
        console.log(error);
    }
}

async function renderSize(){
    try {
        let data = await $.ajax({
          url: "/api/size",
          type: "GET",
        });
        data.map((data) => {
            let div = ``;
            div=`
            <option value="${data._id}">${data.size}</option>
            `
            $('.page-content-form_size').append(div);
        })
    }
    catch (error) {
        console.log(error);
    }
}

async function renderSupplier(){
    try {
        let data = await $.ajax({
          url: "/api/supplier",
          type: "GET",
        });
        data.map((data) => {
            let div = ``;
            div=`
            <option value="${data._id}">${data.name}</option>
            `
            $('.page-content-form_supplier').append(div);
        })
    }
    catch (error) {
        console.log(error);
    }
}

async function renderTrademark(){
    try {
        let data = await $.ajax({
          url: "/api/trademark",
          type: "GET",
        });
        data.map((data) => {
            let div = ``;
            div=`
            <option value="${data._id}">${data.name}</option>
            `
            $('.page-content-form_trade-mark').append(div);
        })
    }
    catch (error) {
        console.log(error);
    }
}


renderAdd();