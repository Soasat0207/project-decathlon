async function tableProduct(data,index){
    let div = ``;
    div = `
            <div class=" col-lg-3 col-md-6 col-sm-6">
                <a href="/product-details/${data._id}">
                    <div class="product-items">
                    <div class="product_gallert">
                        <div class="product_gallert-slider">
                            <img src="${data.img[0]}" alt="" class="product_gallert-slider-img">
                        </div>
                        <div class="product_gallert-thumbnails">
                            <span onclick="prevSlides(-1)"><i class="fal fa-chevron-left"></i></span>
                            <div class="product_gallert-thumbnails-wrapper">
                                <div class="product_gallert-thumbnails-list-img poduct_gallert-thumbnails-list-img${index} "> 
                                
                                </div>
                            </div>
                            <span onclick="plusSlides()"><i class="fal fa-chevron-right"></i></span> 
                        </div>
                    </div> 
                    <div class="product_info-wrapper">
                        <a href="" class="product_info-link">
                            <span class="product_info-brand">${data.trademarkId.name}</span>
                            <span class="product_info-description">${data.descriptionShort} - ${data.gender}</span>
                        </a>
                        <div class="produc_info-rate">
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
                        </div>
                        <div class="product_info-availability">
                            <span class="product_info-availability-description">${data.status}</span>
                        </div>
                        <div class="product-info-sticker"><span class="product_info-sticker-description">Phát triển </span></div>
                        <div class="product-info-price"><span class="product_info-price-description">${data.price} $</span></div>
                    </div>
                </div>
                </a>
                
            </div>
        `;
    $('.product-list').append(div); 
    data.imgColor.map((imgColor)=>{
        let divImgColor =`
            <img src="${imgColor}" alt="" class="product_gallert-thumbnails-img">
        `;
        $(`.poduct_gallert-thumbnails-list-img${index}`).append(divImgColor);
    })   
}

async function render() {
  try {
    let data = await $.ajax({
      url: "/api/product",
      type: "GET",
    });
    
    data.map(async(data,index) => {
        await tableProduct(data,index);
    });
    product_thumbnail_img = document.querySelectorAll('.product_gallert-thumbnails-img');
    
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
        
        data.map(async(data,index) => {
            let div = ``;
            div = `
            <li class="menu-search-category-items">
                <a onclick="renderTableFindCategory('${data._id}')" class="menu-search-category-link">
                    <img src="https://contents.mediadecathlon.com/p1581230/k$bd3f8d54a01b2985d5d02d99bf337f13/sq/DEBARDEUR+YOGA+DYNAMIQUE+FEMME+SANS+COUTURES+NOIR.jpg?f=100x100" class="menu-search-category-img"></img>
                    <p class="menu-search-category-description">${data.name}<span class="menu-search-quantity-product${index}"></span></p>
                    <span class="menu-search-category-icon"><i class="fal fa-chevron-right"></i></span>
                </a>
            </li>    
            `
            $('.menu-search-category-list').append(div);
            
        })
        data.map(async(item,index) => {
            try {
                let data = await $.ajax({
                  url: "/api/product/findByCategory",
                  type: "POST",
                  data:{
                    categoryProductId:item._id
                  }
                });
                let div = ``;
                div = `(${data.data.length})`
                $(`.menu-search-quantity-product${index}`).append(div);
            }
            catch (error) {
                console.log(error);
            }
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
        data.map(async(data,index) => {
            let div = ``;
            div = `
            <a onclick="renderTableFindColor('${data._id}')" class="menu-search-filter-link menu-search-filter-color-link">
                <span class="menu-search-filter-color" style="background-color:${data.colorCode}"></span>
            </a>
            `
            $('.menu-search-filter-items-color').append(div);
            
        })
    }
    catch (error) {
        console.log(error);
    }
}
async function renderTableFindColor(colorId) {
    try {
      let data = await $.ajax({
        url: "/api/product/findByColor",
        type: "POST",
        data:{
            colorId:colorId
        }
      });
    if(data.status == 200){
        $('.product-list').html('')
        data.data.map(async(data,index) => {
            await tableProduct(data,index);
        });
      product_thumbnail_img = document.querySelectorAll('.product_gallert-thumbnails-img');
    }
    } catch (error) {
      console.log(error);
    }
}
async function renderTableFindCategory(categoryProductId) {
    try {
      let data = await $.ajax({
        url: "/api/product/findByCategory",
        type: "POST",
        data:{
            categoryProductId:categoryProductId
        }
      });
    if(data.status == 200){
        $('.product-list').html('')
        data.data.map(async(data,index) => {
            await tableProduct(data,index);
        });
      product_thumbnail_img = document.querySelectorAll('.product_gallert-thumbnails-img');
    }
    } catch (error) {
      console.log(error);
    }
}
async function renderLevel(){
    try {
        let data = await $.ajax({
          url: "/api/level",
          type: "GET",
        });
        data.map(async(data,index) => {
            console.log(data)
            let div = ``;
            div = `
            <li class="menu-search-filter-items">
                <a class="menu-search-filter-link">
                    <input class="menu-search-filter-checkbox" type="checkbox" name="level" id="${data.level}">
                    <label onclick="renderTableFindLevel('${data._id}')" for="${data.level}" class="menu-search-filter-description">${data.level}<span class="menu-search-filter-level-quantity${index}"></span></label>
                </a>
            </li>
            `
            $('.menu-search-filter-list').append(div);     
        })
        data.map(async(item,index) => {
            try {
                let data = await $.ajax({
                  url: "/api/product/findByLevel",
                  type: "POST",
                  data:{
                    levelId:item._id
                  }
                });
                console.log(data);
                let div = ``;
                div = `(${data.data.length})`
                $(`.menu-search-filter-level-quantity${index}`).append(div);
            }
            catch (error) {
                console.log(error);
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}
async function renderTableFindLevel(levelId) {
    try {
      let data = await $.ajax({
        url: "/api/product/findByLevel",
        type: "POST",
        data:{
            levelId:levelId
        }
      });
    if(data.status == 200){
        $('.product-list').html('')
        data.data.map(async(data,index) => {
            await tableProduct(data,index);
        });
      product_thumbnail_img = document.querySelectorAll('.product_gallert-thumbnails-img');
    }
    } catch (error) {
      console.log(error);
    }
}
renderCategory();
renderColor();
renderLevel();
render();


