const LimitProduct = 6;
let div = ``;
// Retrieve
console.log(localStorage["dataIdProducts"]);
let stored_dataIdProducts;


async function renderIndex(){
    document.querySelector('.activate-clear-localstorage').addEventListener('click',()=>{
        localStorage.removeItem('dataIdProducts');
    });
    if(localStorage["dataIdProducts"]){
        stored_dataIdProducts = JSON.parse(localStorage["dataIdProducts"]);
        stored_dataIdProducts = stored_dataIdProducts.filter((item,index)=>{
            return stored_dataIdProducts.indexOf(item) === index 
        });
        stored_dataIdProducts = stored_dataIdProducts.limit(4);
        renderLastViewProduct();
    }
    else{
        document.querySelector('.activate-localstorage').setAttribute('style','display: none');
    }
    renderCategorySea();
    RenderBanner();
    renderCategoryFitnessClub();
    renderLocalBrandBig();
}
renderIndex();
async function renderLastViewProduct(){
    stored_dataIdProducts.map(async(stored_dataIdProducts,index)=>{
        try {
            let productId = stored_dataIdProducts;
            let data = await $.ajax({
              url: "/api/product/findProductId",
              type: "POST",
              data:{
                productId:productId,
              }
            });
            if(data.status == 200){
                data.data.map((data)=>{
                    let div=`
                    <div class="col col-lg-3 col-md-2 col-sm-3">
                                <div class="topic_sell-product">
                                    <div class="topic_sell-product-list">
                                            <a href="/product-details/${data._id}"><img src="${data.img[0]}" alt="" class="topic_sell-product-img"></a>
                                            <p class="topic_sell-product-text">${data.trademarkId.name}</p>
                                            <p class="topic_sell-product-description">${data.name}</p>
                                            <div class="topic_sell-product-rate">
                                                <input id="star5" type="radio" name="rate" value="5">
                                                <label  for="star5"></label>
                                                <input id="star4" type="radio" name="rate" value="4">
                                                <label  for="star4"></label>
                                                <input id="star3" type="radio" name="rate" value="3">
                                                <label  for="star3"></label>
                                                <input id="star2" type="radio" name="rate" value="2">
                                                <label  for="star2"></label>
                                                <input id="star1" type="radio" name="rate" value="1">
                                                <label  for="star1"></label>
                                            </div>
                                            <p class="topic_sell-product-leadtime">Prise de rdv en 72h</p>
                                            <div class="topic_sell-product-price">
                                                <p>${data.price}</p>
                                            </div>
                                    </div>
                                    <div class="topic_sell-addtocart">
                                        <div class="topic_sell-addtocart-size topic_sell-addtocart-size${index}">
                                        </div>
                                        <button class="btn topic_sell-addtocart-btn product_details-addcart-btn product_details-addcart-btn-yellow">
                                            Thêm vào giỏ hàng 
                                        </button>
                                    </div>
                                </div>
                        </div>`;
                    $(`.carousel-activate-lastViewProduct`).append(div);
                    renderSizeLastView(data.codeProduct,data.colorId,index);
                })
            }
        }
        catch (error) {
            console.log(error);
        }
    })
}
async function renderSizeLastView(codeProduct,colorId,indexdiv) {
    try {
        let data = await $.ajax({
          url: "/api/product/findSize",
          type: "POST",
          data:{
            codeProduct:codeProduct, 
            colorId:colorId,
          }
        }); 
        if(data.status == 200) {
            let sizeArr = [];
            data.data.map((data)=>{
                if (sizeArr.indexOf(data) === -1) {
                   sizeArr.push(data.sizeId._id);
                }
            })
            let dataSize = sizeArr.filter((item,index)=>{
                return sizeArr.indexOf(item) === index 
            })
            
            dataSize.map((dataSize)=>{
                for(let i = 0; i < data.data.length; i++){
                    if(data.data[i].sizeId._id == dataSize){
                    let div =`<p>${data.data[i].sizeId.size}</p>`
                    $(`topic_sell-addtocart-size${indexdiv}`).append(div);
                    break;
                    }
                }
            })
        }

    } catch (error) {
        console.log(error);
    }
}
async function divTableCategoryProduct(data){
    div=`
    <div class="topic_sell-product">
        <div class="topic_sell-product-list">
                <a href="/product-details/${data._id}"><img src="${data.img[0]}" alt="" class="topic_sell-product-img"></a>
                <p class="topic_sell-product-text">${data.trademarkId.name}</p>
                <p class="topic_sell-product-description">${data.name}</p>
                <div class="topic_sell-product-rate">
                    <input id="star5" type="radio" name="rate" value="5">
                    <label  for="star5"></label>
                    <input id="star4" type="radio" name="rate" value="4">
                    <label  for="star4"></label>
                    <input id="star3" type="radio" name="rate" value="3">
                    <label  for="star3"></label>
                    <input id="star2" type="radio" name="rate" value="2">
                    <label  for="star2"></label>
                    <input id="star1" type="radio" name="rate" value="1">
                    <label  for="star1"></label>
                </div>
                <p class="topic_sell-product-leadtime">Prise de rdv en 72h</p>
                <div class="topic_sell-product-price">
                    <p>${data.price}$</p>
                </div>
        </div>
    </div>`
}
async function tableCategoryProductSale(data,index){
    divTableCategoryProduct(data);
    $('.topic_sell-right-sea').append(div); 
}
async function tableCategoryProductFitnessClub(data,index){
    divTableCategoryProduct(data);
    $('.topic_sell-right-indoor').append(div); 
}
async function renderCategorySea(){
    try {
        let CodeProductArr = [];
        let data = await $.ajax({
          url: "/api/product/findByCategory",
          type: "POST",
          data:{
            categoryProductId:'60f3e37181316e02f87c3874',
          }
        });
        if(data.status == 200){
            data.data.map((data)=>{
                if (CodeProductArr.indexOf(data) === -1) {
                  CodeProductArr.push(data.codeProduct);
                }
            })
            let dataCodeProduct = CodeProductArr.filter((item,index)=>{
                return CodeProductArr.indexOf(item) === index 
            });
            // dataCodeProduct = dataCodeProduct.skip(8);
            dataCodeProduct = dataCodeProduct.limit(LimitProduct);
            dataCodeProduct.map(async(dataCodeProduct)=>{    
                for(let i = 0; i <data.data.length; i++){
                    if(data.data[i].codeProduct == dataCodeProduct){
                        await tableCategoryProductSale(data.data[i],i);  
                    break;
                    }
                }
            })
        }
    }
    catch (error) {
        console.log(error);
    }
}
async function renderCategoryFitnessClub(){
    try {
        let CodeProductArr = [];
        let data = await $.ajax({
          url: "/api/product/findByCategory",
          type: "POST",
          data:{
            categoryProductId:'60f54d40a248bd36e8b5115b',
          }
        });
        if(data.status == 200){
            data.data.map((data)=>{
                if (CodeProductArr.indexOf(data) === -1) {
                  CodeProductArr.push(data.codeProduct);
                }
            })
            let dataCodeProduct = CodeProductArr.filter((item,index)=>{
                return CodeProductArr.indexOf(item) === index 
            });
            // dataCodeProduct = dataCodeProduct.skip(8);
            dataCodeProduct = dataCodeProduct.limit(LimitProduct);
            dataCodeProduct.map(async(dataCodeProduct)=>{    
                for(let i = 0; i <data.data.length; i++){
                    if(data.data[i].codeProduct == dataCodeProduct){
                        await tableCategoryProductFitnessClub(data.data[i],i);  
                    break;
                    }
                }
            })
        }
    }
    catch (error) {
        console.log(error);
    }
}
async function RenderBanner(){
    try {
        let CodeProductArr = [];
        let data = await $.ajax({
          url: "/api/BannerSale",
          type: "GET",
        });
        data.map((data,index)=>{
            let div =`
            <div class="box${index+1} box" style=" background-image: url(${data.img[0]})"></div>
            `
            $('.carousel-banner_slider').append(div); 
        })
        data.map((data,index)=>{
            let div =`<div onclick="currentSlide(${index+1})" class="box${index+1}"></div>`
            $('.trail').append(div); 
        }) 
        let divPlusBanner=`
        <svg xmlns="http://www.w3.org/2000/svg" onclick="plusSlidesBanner(-1)" class="prev" width="56.898" height="91" viewBox="0 0 56.898 91"><path d="M45.5,0,91,56.9,48.452,24.068,0,56.9Z" transform="translate(0 91) rotate(-90)" fill="#fff" /></svg>
        <svg xmlns="http://www.w3.org/2000/svg" onclick="plusSlidesBanner(1)" class="next" width="56.898" height="91" viewBox="0 0 56.898 91"><path d="M45.5,0,91,56.9,48.452,24.068,0,56.9Z" transform="translate(56.898) rotate(90)" fill="#fff" /></svg>`
        $('.carousel-banner_slider').append(divPlusBanner); 
        slides = document.querySelectorAll('.box');
        box = document.querySelectorAll('.trail div');
        showSlides(slideIndex); 
        
    }
    catch (error) {
        console.log(error);
    }
}
async function renderLocalBrandBig(){
    try {
        let TradeMarkArr = [];
        let data = await $.ajax({
          url: "/api/trademark",
          type: "GET",
        });
        data = data.limit(5);
        data.map((data)=>{
            let div=`
            <div class="col col-lg-2-4 col-md-2 col-sm-3">
                <div class="local_brand-items">
                    <a href="" class="local_brand-items-link local_big-brand-items-link">
                        <img src="${data.img}" alt="" class="local_brand-img">    
                    </a>
                 </div>
            </div>
            `
            $(`.local_-big-brand-list`).append(div);
        })
    }
    catch (error) {
        console.log(error);
    }
}

