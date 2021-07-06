let link = window.location.href;
let linkId = link.slice(link.lastIndexOf('/'),link.length);
console.log()
async function renderProductDetails() {

    try {
        let data = await $.ajax({
          url: "/api/product/details"+linkId,
          type: "POST",
        });
        data.map((data) => {
            console.log(data)
          $('.product-main-image').append(`<img class="product-main-image-img" src="${data.img[0]}" alt="">`);
          $('.product_details-heading').append(`
            <h2 class="product_details-heading-name">${data.trademarkId.name}</h2>
            <h1 class="product_details-heading-desc">${data.descriptionShort} - ${data.colorId.name}</h1>
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
          data.imgColor.map((data)=>{
            let div =`
                <div class="swiper-slide swiper-slide-active">
                    <img class="swiper-slide-img" src="${data}" alt="">
                </div>
            `
            $('.product_details-swiper-list').append(div);
        })
        });
        test();
      } catch (error) {
        console.log(error);
      }
}
renderProductDetails();

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