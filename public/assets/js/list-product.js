let option_product = document.querySelector('.information-product-option');
let product_list = document.querySelector('.information-product-list');
let product_thumbnail_img ;
let product_gallert_slider_img ;
let menu_search_filter_mobile = document.querySelectorAll('.menu-search-filter-item-title-mobile')
let menu_search_filter_list = document.querySelectorAll('.menu-search-filter-list-mobile-warp');
option_product.addEventListener('click',()=>{
    console.log(product_list.style.display);
    if(product_list.style.display == ""){
        product_list.setAttribute('style','display:flex')
    }
    else if(product_list.style.display == "none"){
        product_list.setAttribute('style','display:flex')
    }
    else{
        product_list.setAttribute('style','display:none')
    }  
})
let value = 0;
function plusSlides(n){
    value -= (100/(product_thumbnail_img.length));
    let value_max =-(100 -(100/(product_thumbnail_img.length)*3));
    if(value < (value_max)){
        value = 0 ;
    }
    document.querySelector('.product_gallert-thumbnails-list-img').style.transform = `translateX(${value}%)`; 
}
function prevSlides(){
    value += (100/(product_thumbnail_img.length));
    let value_max =-(100 -(100/(product_thumbnail_img.length)*3));
    if(value > 0){
        value = value_max ;
    }
    document.querySelector('.product_gallert-thumbnails-list-img').style.transform = `translateX(${value}%)`;
}

Array.prototype.map.call(menu_search_filter_list,(menu_search_filter_list)=>{
    menu_search_filter_list.querySelector('.menu-search-filter-item-title-mobile').addEventListener('click',()=>{
        console.log(menu_search_filter_list.querySelector('.menu-search-filter-list-mobile'))
        if(!menu_search_filter_list.querySelector('.menu-search-filter-list-mobile-active')){
            menu_search_filter_list.querySelector('.menu-search-filter-list-mobile').classList.add('menu-search-filter-list-mobile-active');
        }
        else{
            menu_search_filter_list.querySelector('.menu-search-filter-list-mobile').classList.remove('menu-search-filter-list-mobile-active');
        }
    })
})
document.querySelector('.information-product-mobile-fillter').addEventListener('click',()=>{
    document.querySelector('.filters-faceting').style.display = 'block';
})
document.querySelector('.filters-faceting-top-close').addEventListener('click',()=>{
    document.querySelector('.filters-faceting').style.display = 'none';
})
