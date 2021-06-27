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
    console.log(vale_detailColor);
    console.log(value_maxColor);
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