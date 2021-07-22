let link = window.location.href;
let linkId = link.slice(link.lastIndexOf('/'),link.length);
var dataIdProducts =[];
let stored_dataIdProducts;
$('.seemore_review').click(()=>{
    $('.review-add').attr("style","display:block");
    $('.seemore_review').attr("style","display:none");
})

async function renderProductDetailsFrist(){
    if(localStorage["dataIdProducts"]){
        stored_dataIdProducts = JSON.parse(localStorage["dataIdProducts"])
        dataIdProducts.push.apply(dataIdProducts,stored_dataIdProducts);
    }
    dataIdProducts.push(linkId.slice(1,linkId.length));
    localStorage["dataIdProducts"] = JSON.stringify(dataIdProducts);
    addReview();
    renderReview();
    renderProductDetails();
};
renderProductDetailsFrist();
async function addReview() {
    $('.btn-review-add').click(async()=>{
        let comment = $('.review-add-comment').val();
        let productId = linkId.slice(1,linkId.length);
        let title = $('.review-add-title').val();
        let rate = $('.review-add-rate').val();
        try {
            let data = await $.ajax({
                url: "/api/review",
                type: "POST",
                data:{
                    productId:productId,
                    comment:comment,
                    rate:rate,
                    title:title,
                }
              });
            if(data.status==200){
                alert(data.message);
                renderReview();
                $('.review-add').attr("style","display:none");
                $('.seemore_review').attr("style","display:block");
            }
        }
        catch (error) {
            console.log(error);
        }
    }) 
}
async function renderProductDetails() {
    try {
        let data = await $.ajax({
          url: "/api/product/details"+linkId,
          type: "POST",
        });
        data.map((data) => {
            // console.log(45, data);
          $('.product-main-image').append(`<img class="product-main-image-img" src="${data.img[0]}" alt="">`);
          $('.product_details-heading').append(`
            <h2 class="product_details-heading-name">${data.trademarkId.name}</h2>
            <h1 class="product_details-heading-desc">${data.title} - ${data.colorId.name}</h1>
            <p class="product_details-heading-id">Mã sản phẩm:${data.codeProduct}</p> 
          `);
          $('.product_details-price').append(`<span class="product_details-price-text">${data.price} $</span>`);
          $('.product_details-medium-score').append(`<span>${data.rate}/5</span>`);
          $('.product_details-medium-score').append(`<span>${data.rate}/5</span>`);
          $('.product_details-addcart-btn-yellow').attr("id", `addToCart${data._id}`)

        // add event for button Add To Cart
        $('.product_details-addcart-btn-yellow').on('click', ()=>{
            let idOfProduct = $(`#addToCart${data._id}`).attr('id').slice(9, 100);
            $.ajax({
                url: '/api/user/addToSelectedProduct',
                type: 'POST',
                data: {
                    productId : idOfProduct
                }
            }).then(data =>{
                if(data){
                    findAndCreateShoppingCart();
                    alert('Thêm vào giỏ hàng thành công');
                    renderCart();
                }
            }).catch(err =>{
                console.log(err);
            })
        })

          data.imgColor.map((data)=>{
              let div =`
              <div class="product-thumbs-slider-img-image">
                <img src="${data}" alt="" class="product-thumbs-slider-img product-thumbs-slider-img-active">
                </div>
              `
              $('.product-thumbs-slider').append(div);
          })
        renderColorImg(data.codeProduct)
        renderSize(data.codeProduct,data.colorId._id)
        });
        test();
      } catch (error) {
        console.log(error);
      }
}
// function find User in shopping cart
    function findAndCreateShoppingCart(){
        
        // get selected id in collection
            $.ajax({
                url: '/api/user/findSelectedProduct',
                type: 'POST',
                data: {
                    sold : false
                }
            }).then(data =>{
               if(data){
                   let arrSelectedId = [];
                   for (const iterator of data) {
                    arrSelectedId.push(iterator._id)
                   }
                //    console.log(arrSelectedId);
                   createOrUpdateShoppingCart(arrSelectedId);
               }
            }).catch(err =>{
                console.log(err);
            })
       }
// function to find order in shopping cart and create shopping cart
       function createOrUpdateShoppingCart(arrSelectedId){
           $.ajax({
               url: '/api/user/findShoppingCart',
               type: 'POST',
               data : {
                   sold : false
               }
           }).then(data => {
               if(data.length === 0){
                   createShoppingCart(arrSelectedId);
               }else{
                   updateShoppingCart(arrSelectedId);
               }
           }).catch(err =>{
               console.log(err);
           })
       }


// function create shopping cart
    function createShoppingCart(arrSelectedId){
        
        $.ajax({
            url: '/api/user/createShoppingCart',
            type: 'POST',
            data: {
                listProduct: arrSelectedId,
            }
        }).then(data =>{
            console.log(data);
        }).catch(err =>{
            console.log(err);
        })
    }

// function update shopping cart
    function updateShoppingCart(arrSelectedId){
        let lastSelectedId = arrSelectedId[arrSelectedId.length-1]
        $.ajax({
            url: '/api/user/updateShoppingCart',
            type: 'PUT',
            data: {
                newProduct: lastSelectedId
            }
        }).then(data =>{
            console.log(data);
        }).catch(err =>{
            console.log(err);
        })
    }


async function renderColorImg(codeProduct) {
    try {
        let data = await $.ajax({
          url: "/api/product/findcode",
          type: "POST",
          data:{
            codeProduct:codeProduct, 
          }
        });
        if(data.status == 200){
            let newArr = [];
            data.data.map((data)=>{
                if (newArr.indexOf(data) === -1) {
                   newArr.push(data.colorId._id);
                }
            })
            let dataColor = newArr.filter((item,index)=>{
                return newArr.indexOf(item) === index 
            })
            dataColor.map((dataColor)=>{
                for(let i = 0; i < data.data.length; i++){
                    if(data.data[i].colorId._id == dataColor){
                        let div =`
                        <div class="swiper-slide swiper-slide-active">
                            <a href="/product-details/${data.data[i]._id}">
                                <img class="swiper-slide-img" src="${data.data[i].imgColor[0]}" alt="">
                            </a>    
                        </div>
                    `
                    $('.product_details-swiper-list').append(div);
                        break;
                    }
                }
            })
        }

    } catch (error) {
        console.log(error);
    }
}
async function renderSize(codeProduct,colorId) {
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
                        let div =`
                        <option class="product_details-size-items-option" value="${data.data[i].sizeId.size}">${data.data[i].sizeId.size}</option>
                    `
                    $('.product_details-size-list-option').append(div);
                    break;
                    }
                }
            })
        }

    } catch (error) {
        console.log(error);
    }
}
async function renderReview() {
    try{
        let data = await $.ajax({
          url: "/api/review",
          type: "GET",
          
        });
        data.map((data, index) => {
            // console.log(data)
            let div = `
                <div class="review-list-items">
                    <div class="row no-gutters">
                        <div class="col col-lg-3">
                            <div class="review-items-info">
                                <h3>${data.accountId.lastname}</hh3>
                                <p class="review-items-info-accuracy"><i class="fal fa-check-circle"></i><span>Đã xác thực</span></p>
                            </div>
                        </div>
                        <div class="col col-lg-9">
                            <div class="review-items-details">
                                <h3 class="review-items-details-title">${data.title}</h3>
                                <div class="review-items-details-rate">
                                    <svg class="full svelte-1eztogk" viewBox="0 0 32 32" widht="1.1em" height="1em" style="fill: url(&quot;#gradient-full-1-26&quot;);"><linearGradient id="gradient-full-1-26"><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="100%"></stop></linearGradient><path d="m16 26.0943175-8.59386153
                                    3.819494c-.76761529.3411624-1.5883458-.3588243-1.37259057-1.1706584l2.35327244-8.8547885-6.0989377-6.1863042c-.58190844-.5902442-.23437487-1.5915311.58808263-1.6943383l7.49636683-.9370458
                                    4.7535106-8.55631923c.3810053-.68580943 1.3673093-.68580943 1.7483146 0l4.7535106 8.55631923
                                    7.4963668.9370458c.8224575.1028072 1.1699911 1.1040941.5880827 1.6943383l-6.0989377
                                    6.1863042 2.3532724 8.8547885c.2157552.8118341-.6049753 1.5118208-1.3725906 1.1706584z"></path>
                                    </svg>
                                    <svg class="full svelte-1eztogk" viewBox="0 0 32 32" widht="1.1em" height="1em" style="fill: url(&quot;#gradient-full-1-26&quot;);"><linearGradient id="gradient-full-1-26"><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="100%"></stop></linearGradient><path d="m16 26.0943175-8.59386153
                                    3.819494c-.76761529.3411624-1.5883458-.3588243-1.37259057-1.1706584l2.35327244-8.8547885-6.0989377-6.1863042c-.58190844-.5902442-.23437487-1.5915311.58808263-1.6943383l7.49636683-.9370458
                                    4.7535106-8.55631923c.3810053-.68580943 1.3673093-.68580943 1.7483146 0l4.7535106 8.55631923
                                    7.4963668.9370458c.8224575.1028072 1.1699911 1.1040941.5880827 1.6943383l-6.0989377
                                    6.1863042 2.3532724 8.8547885c.2157552.8118341-.6049753 1.5118208-1.3725906 1.1706584z"></path>
                                    </svg>
                                    <svg class="full svelte-1eztogk" viewBox="0 0 32 32" widht="1.1em" height="1em" style="fill: url(&quot;#gradient-full-1-26&quot;);"><linearGradient id="gradient-full-1-26"><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="100%"></stop></linearGradient><path d="m16 26.0943175-8.59386153
                                    3.819494c-.76761529.3411624-1.5883458-.3588243-1.37259057-1.1706584l2.35327244-8.8547885-6.0989377-6.1863042c-.58190844-.5902442-.23437487-1.5915311.58808263-1.6943383l7.49636683-.9370458
                                    4.7535106-8.55631923c.3810053-.68580943 1.3673093-.68580943 1.7483146 0l4.7535106 8.55631923
                                    7.4963668.9370458c.8224575.1028072 1.1699911 1.1040941.5880827 1.6943383l-6.0989377
                                    6.1863042 2.3532724 8.8547885c.2157552.8118341-.6049753 1.5118208-1.3725906 1.1706584z"></path>
                                    </svg>
                                    <svg class="full svelte-1eztogk" viewBox="0 0 32 32" widht="1.1em" height="1em" style="fill: url(&quot;#gradient-full-1-26&quot;);"><linearGradient id="gradient-full-1-26"><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="100%"></stop></linearGradient><path d="m16 26.0943175-8.59386153
                                    3.819494c-.76761529.3411624-1.5883458-.3588243-1.37259057-1.1706584l2.35327244-8.8547885-6.0989377-6.1863042c-.58190844-.5902442-.23437487-1.5915311.58808263-1.6943383l7.49636683-.9370458
                                    4.7535106-8.55631923c.3810053-.68580943 1.3673093-.68580943 1.7483146 0l4.7535106 8.55631923
                                    7.4963668.9370458c.8224575.1028072 1.1699911 1.1040941.5880827 1.6943383l-6.0989377
                                    6.1863042 2.3532724 8.8547885c.2157552.8118341-.6049753 1.5118208-1.3725906 1.1706584z"></path>
                                    </svg>
                                    <svg class="full svelte-1eztogk" viewBox="0 0 32 32" widht="1.1em" height="1em" style="fill: url(&quot;#gradient-full-1-26&quot;);"><linearGradient id="gradient-full-1-26"><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="100%"></stop></linearGradient><path d="m16 26.0943175-8.59386153
                                    3.819494c-.76761529.3411624-1.5883458-.3588243-1.37259057-1.1706584l2.35327244-8.8547885-6.0989377-6.1863042c-.58190844-.5902442-.23437487-1.5915311.58808263-1.6943383l7.49636683-.9370458
                                    4.7535106-8.55631923c.3810053-.68580943 1.3673093-.68580943 1.7483146 0l4.7535106 8.55631923
                                    7.4963668.9370458c.8224575.1028072 1.1699911 1.1040941.5880827 1.6943383l-6.0989377
                                    6.1863042 2.3532724 8.8547885c.2157552.8118341-.6049753 1.5118208-1.3725906 1.1706584z"></path>
                                    </svg>
                                    <svg class="full svelte-1eztogk" viewBox="0 0 32 32" widht="1.1em" height="1em" style="fill: url(&quot;#gradient-full-1-26&quot;);"><linearGradient id="gradient-full-1-26"><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="0%"></stop><stop stop-color="#fdc62e" offset="100%"></stop></linearGradient><path d="m16 26.0943175-8.59386153
                                    3.819494c-.76761529.3411624-1.5883458-.3588243-1.37259057-1.1706584l2.35327244-8.8547885-6.0989377-6.1863042c-.58190844-.5902442-.23437487-1.5915311.58808263-1.6943383l7.49636683-.9370458
                                    4.7535106-8.55631923c.3810053-.68580943 1.3673093-.68580943 1.7483146 0l4.7535106 8.55631923
                                    7.4963668.9370458c.8224575.1028072 1.1699911 1.1040941.5880827 1.6943383l-6.0989377
                                    6.1863042 2.3532724 8.8547885c.2157552.8118341-.6049753 1.5118208-1.3725906 1.1706584z"></path>
                                    </svg>
                                    <span>${data.rate}/5</span>
                                    <span class="review-items-details-rate-time">${data.createDate}</span>
                                </div>
                                <div class="review-items-desc">
                                    <img class="review-items-avatar-user" src="${data.accountId.avatar}" alt="">
                                    <span>${data.comment}</span>
                                </div>
                                <div class="review-reaction">
                                    <span><i class="fal fa-thumbs-up"></i><i class="review-add-input-comment fal fa-comments"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            `
            $('.review-list-body').append(div);
            
            data.reply.map((data) => {
                // console.log(data);
                let div=`
                <div class="review-items-desc review-items-desc-feedback">
                    <img class="review-items-avatar-user" src="${data.accountId.avatar}" alt="">
                    <span>${data.comment}</span>
                </div>
                `
            $('.review-items-details').eq(index).append(div);
            })
        });
        let addInputComment = $('.review-add-input-comment');
        for (let i = 0; i < addInputComment.length; i++) {
            addInputComment.eq(i).click(()=>{
                addInputComment.eq(i).parent().parent().append(`<input class="review-add-title" type="text">`)
            });
        }  
    }
    catch(error){
        console.log(error);
    }
}
function test(){
    let product_thumbs_slider_img = document.querySelectorAll('.product-thumbs-slider-img');
    let swiper_slide_img = document.querySelectorAll('.swiper-slide-img');
    let product_details_swiper_list = document.querySelector('.product_details-swiper-list');
    let vale_detail = 0 ;
    let value_max =-(100 -(100/(product_thumbs_slider_img.length)*3));
    let vale_detailColor = 0 ;
    let value_maxColor =-(100 -(100/(swiper_slide_img.length)*3));
    function plusSlides_details(){
        vale_detail -= (100/(product_thumbs_slider_img.length));
        if(vale_detail < (value_max)){
            vale_detail = 0 ;
        }
        document.querySelector('.product-thumbs-slider').style.transform =`translateY(${vale_detail}%)`
    }
    function prevSlides_details(){
        vale_detail += (100/(product_thumbs_slider_img.length));
        if(vale_detail > 0){
            vale_detail = value_max;
        }
        document.querySelector('.product-thumbs-slider').style.transform =`translateY(${vale_detail}%)`
    }
    function plusSlides_detailsColor(){
        vale_detailColor -= (100/(swiper_slide_img.length));
        if(vale_detailColor < (value_maxColor)){
            vale_detailColor = 0 ;
        }
        product_details_swiper_list.style.transform =`translateX(${vale_detailColor}%)`
    }
    function prevSlides_detailsColor(){
        vale_detailColor += (100/(swiper_slide_img.length));
        if(vale_detailColor > 0){
            vale_detailColor = value_maxColor;
        }
        product_details_swiper_list.style.transform =`translateX(${vale_detailColor}%)`
    }
    Array.prototype.map.call(product_thumbs_slider_img,(product_thumbs_slider_img)=>{
        product_thumbs_slider_img.addEventListener('click',()=>{
            document.querySelector('.product-main-image-img').setAttribute('src',`${product_thumbs_slider_img.getAttribute('src')}`);
            product_thumbs_slider_img.parentElement.parentElement.querySelector('.product-thumbs-slider-img-active').classList.remove('product-thumbs-slider-img-active');
            product_thumbs_slider_img.classList.add('product-thumbs-slider-img-active');
        })
    })
    Array.prototype.map.call(swiper_slide_img,(swiper_slide_img)=>{
        swiper_slide_img.addEventListener('click',()=>{
            document.querySelector('.product-main-image-img').setAttribute('src',`${swiper_slide_img.getAttribute('src')}`);
            swiper_slide_img.parentElement.parentElement.querySelector('.swiper-slide-active').classList.remove('swiper-slide-active');
            swiper_slide_img.classList.add('swiper-slide-active');
        })
    })
}

// Hiển thị thông tin Advantages
$.ajax({
    url: '/api/user/viewadvantages/sp100011',
    type: 'get',
})
.then((data) => {
    console.log(15 ,data);
    console.log(17, data.title1);
    if(data){
        $('.photoAdvantages1').attr("src",data.advantagesPhoto1[0])
        $('.avdantagesTitle1').append(data.title1)
        $('.advantageContent01').append(data.advantagecontent1)
        $('.avdantagesTitle2').append(data.title2)
        $('.advantageContent02').append(data.advantagecontent2)
    }
})
.catch((err) => {
    console.log(182,err);
})

// function render cart 
function renderCart(){
    $('.listSelectedProduct').html('');
    $.ajax({
        url: '/api/user/findSelectedProduct',
        type : 'POST',
        data: {
            sold : false
        }
    }).then(data =>{
        // console.log(data);
        data.forEach(element => {

            let liItem = `
        <li class="list-cart-items">
            <img class="list-cart-items-img" src="${element.productId.img[0]}" alt="">
            <div class="list-cart-item-wrapper">
                <div class="list-cart-item-head">
                    <h5 class="list-cart-item-name">${element.productId.name}</h5>
                    <p class="list-cart-item-price">${element.productId.price}</p>
                    <p class="list-cart-item-multiphy">x</p>
                    <p class="list-cart-item-quatity">${element.quantity}</p>
                </div>
                <div class="list-cart-item-body">
                    <p class="list-cart-item-category">Phân loại: ${element.productId.categoryProductId.name}</p>
                    <p class="list-cart-item-delete"><button class ="delProduct" id ="item${element._id}">Delete</button></p>
                </div>
            </div>
        </li>
        `
        $('.listSelectedProduct').append(liItem);
    // add event for Delete button 
        $(`#item${element._id}`).on('click', ()=>{
          let selectedId = $(`#item${element._id}`).attr('id').slice(4,100);
          deleteSelectedProduct(selectedId)
        })

        }); // end loop

    }).catch(err =>{
        console.log('Server error');
    })
}
