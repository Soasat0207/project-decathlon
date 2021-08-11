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
    console.log(product_thumbnail_img);
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

let productFilter = `
<div class="menu-search">
    <div class="menu-search-category">
        <h2 class="menu-search-category-title">Category <span><i class="far fa-plus"></i></span></h2>
        <ul class="menu-search-category-list">
            
        </ul>
    </div>
    <div class="menu-search-filter">
        <h2 class="menu-search-filter-title">Bộ lọc <span><i class="far fa-plus"></i></span></h2>
        <ul class="menu-search-filter-list menu-search-filter-list-level">
            <h4 class='menu-search-filter-item-title'>Lọc theo Trình Độ</h4>
        </ul>
        <ul class="menu-search-filter-list menu-search-filter-list-size">
            <h4 class='menu-search-filter-item-title'>Lọc theo Size</h4>
        </ul>
        <ul class="menu-search-filter-list">
            <h4 class='menu-search-filter-item-title'>Lọc theo màu sắc</h4>
            <li class="menu-search-filter-items menu-search-filter-items-color"></li>
        </ul>
        <ul class="menu-search-filter-list menu-search-filter-list-Trademark">
            <h4 class='menu-search-filter-item-title'>Lọc theo Thương Hiệu</h4>
        </ul>
        <ul class="menu-search-filter-list hide-on-mobile-tablet">
            <h4 class='menu-search-filter-item-title'>Lọc theo phạm vi gia</h4>
            <li class="menu-search-filter-items menu-search-filter-items-range">
                <div class="menu-search-filter-range">
                    <div class="range-slider flat" data-ticks-position='top' style='--min:-500; --max:500; --value-a:-220; --value-b:400; --suffix:"$"; --text-value-a:"-220"; --text-value-b:"400";'>
                        <input type="range" min="-500" max="500" value="-220" oninput="this.parentNode.style.setProperty('--value-a',this.value); this.parentNode.style.setProperty('--text-value-a', JSON.stringify(this.value));">
                        <output></output>
                        <input type="range" min="-500" max="500" value="400" oninput="this.parentNode.style.setProperty('--value-b',this.value); this.parentNode.style.setProperty('--text-value-b', JSON.stringify(this.value))">
                        <output></output>
                        <div class='range-slider__progress'></div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    
</div>
`

$('.filters-faceting').append(productFilter);
