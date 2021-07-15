let link = window.location.href;
let linkId = link.slice(link.lastIndexOf('/'),link.length);
async function renderProductDetails() {
    try {
        let data = await $.ajax({
          url: "/api/product/details"+linkId,
          type: "POST",
        });
        console.log(data)
        data.map((data) => {
          $('.product-main-image').append(`<img class="product-main-image-img" src="${data.img[0]}" alt="">`);
          $('.product_details-heading').append(`
            <h2 class="product_details-heading-name">${data.trademarkId.name}</h2>
            <h1 class="product_details-heading-desc">${data.title} - ${data.colorId.name}</h1>
            <p class="product_details-heading-id">Mã sản phẩm:${data.codeProduct}</p> 
          `);
          $('.product_details-price').append(`<span class="product_details-price-text">${data.price} $</span>`);
          $('.product_details-medium-score').append(`<span>${data.rate}/5</span>`);
          $('.product_details-medium-score').append(`<span>${data.rate}/5</span>`);

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
renderProductDetails();
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
    




