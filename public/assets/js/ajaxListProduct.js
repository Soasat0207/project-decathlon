let currentPage = 1;
let view = 10;
let totalPage= Number;
let totalPages ;
let page = 1;
let element;
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
                            <span class="product_info-description">${data.title} - ${data.gender}</span>
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
    // $('.pagination').html(``);
    $('.product-list').html(``);
    if(currentPage < 1 ){
      currentPage = 1;
    }
    let data = await $.ajax({
      url: "/api/product",
      type: "GET",
    });
    CheckCodeProduct(data);
    product_thumbnail_img = document.querySelectorAll('.product_gallert-thumbnails-img');
    
  } catch (error) {
    console.log(error);
  }
}

function CheckCodeProduct(data){
  $('.product-list').html('');
  let CodeProductArr = [];
  data.map((data)=>{
    if(CodeProductArr.indexOf(data) === -1) {
      CodeProductArr.push(data.codeProduct);
    }
  })
  let dataCodeProduct = CodeProductArr.filter((item,index)=>{
    return CodeProductArr.indexOf(item) === index 
  });
  totalPage = Math.ceil((dataCodeProduct.length)/view);
  dataCodeProduct = dataCodeProduct.skip((currentPage-1)*view);
  dataCodeProduct = dataCodeProduct.limit(view);
  dataCodeProduct.map(async(dataCodeProduct)=>{  
    for(let i = 0; i <data.length; i++){
        if(data[i].codeProduct == dataCodeProduct){
          await tableProduct(data[i],i);
        break;
        }
    }
  })
  element = document.querySelector(".pagination-items");
  totalPages=totalPage;
  element.innerHTML = createPagination(totalPages, page);
  // for(let i = 1; i <= totalPage ; i++){
  //   let item = $(`
  //       <li class="page-item"><a class="page-link" onclick=loadPage(${i}) href="#">${i}</a></li>
  //   `)
  //   $('.pagination-items').append(item);
    
  // }
  //calling function with passing parameters and adding inside element which is ul tag
}
function createPagination(totalPages, page){
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if(page > 1){ //show the next button if the page value is greater than 1
    liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${page - 1});loadPage(${page - 1})"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }
  if(page > 2){ //if page value is less than 2 then add 1 after the previous button
    liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
    if(page > 3){ //if page value is greater than 3 then add this (...) after the first li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }
  // how many pages or li show before the current li
  if (page == totalPages) {
    if(totalPages == 1){
      beforePage = 0 
    }
    else{
      beforePage = beforePage - 2;
    }
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // how many pages or li show after the current li
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage  = afterPage + 1;
  }
  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) { //if plength is greater than totalPage length then continue
      continue;
    }
    if (plength == 0) { //if plength is 0 than add +1 in plength value
      plength = plength + 1;
    }
    if(page == plength){ //if page is equal to plength than assign active string in the active variable
      active = "active";
    }else{ //else leave empty to the active variable
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength});loadPage(${plength})"><span>${plength}</span></li>`;
  }

  if(page < totalPages - 1){ //if page value is less than totalPage value by -1 then show the last li or page
    if(page < totalPages - 2){ //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) { //show the next button if the page value is less than totalPage(20)
    liTag += `<li class="btn next" onclick="createPagination(totalPages, ${page + 1});loadPage(${page + 1})"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }
  element.innerHTML = liTag; //add li tag inside ul tag
  return liTag; //reurn the li tag
}
async function loadPage(page) {
  currentPage = page;
  render();
}
function paginationNextPage(){
  currentPage += 1 ;
  if(currentPage <1){
    currentPage = 1;
  }
  if(currentPage > totalPage){
    currentPage = 1;
  }
  render();
}
function paginationPrevPage(){
  currentPage -= 1 ;
  if(currentPage < 1 ){
    currentPage = totalPage;
  }
  render();
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
      CheckCodeProduct(data.data);
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
        CheckCodeProduct(data.data);
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
            let div = ``;
            div = `
            <li class="menu-search-filter-items">
                <a class="menu-search-filter-link">
                    <input class="menu-search-filter-checkbox" type="checkbox" name="level" id="${data.level}">
                    <label onclick="renderTableFindLevel('${data._id}')" for="${data.level}" class="menu-search-filter-description">${data.level}<span class="menu-search-filter-level-quantity${index}"></span></label>
                </a>
            </li>
            `
            $('.menu-search-filter-list-level').append(div);     
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
      CheckCodeProduct(data.data);
      product_thumbnail_img = document.querySelectorAll('.product_gallert-thumbnails-img');
    }
    } catch (error) {
      console.log(error);
    }
}
async function renderSize(){
    try {
        let data = await $.ajax({
          url: "/api/size",
          type: "GET",
        });
        data.map(async(data,index) => {
            let div = ``;
            div = `
            <li class="menu-search-filter-items">
                <a class="menu-search-filter-link">
                    <input class="menu-search-filter-checkbox" type="checkbox" name="size" id="${data.size}">
                    <label onclick="renderTableFindSize('${data._id}')" for="${data.size}" class="menu-search-filter-description">${data.size}<span class="menu-search-filter-size-quantity${index}"></span></label>
                </a>
            </li>
            `
            $('.menu-search-filter-list-size').append(div);     
        })
        data.map(async(item,index) => {
            try {
                let data = await $.ajax({
                  url: "/api/product/findBySize",
                  type: "POST",
                  data:{
                    sizeId:item._id
                  }
                });
                let div = ``;
                div = `(${data.data.length})`
                $(`.menu-search-filter-size-quantity${index}`).append(div);
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
async function renderTableFindSize(sizeId) {
    try {
      let data = await $.ajax({
        url: "/api/product/findBySize",
        type: "POST",
        data:{
            sizeId:sizeId
        }
      });
    if(data.status == 200){
      CheckCodeProduct(data.data);
      product_thumbnail_img = document.querySelectorAll('.product_gallert-thumbnails-img');
    }
    } catch (error) {
      console.log(error);
    }
}
async function renderTrademark(){
    try {
        let data = await $.ajax({
          url: "/api/trademark",
          type: "GET",
        });
        data.map(async(data,index) => {
            let div = ``;
            div = `
            <li class="menu-search-filter-items">
                <a class="menu-search-filter-link">
                    <input class="menu-search-filter-checkbox" type="checkbox" name="trademark" id="${data.name}">
                    <label onclick="renderTableFindTrademark('${data._id}')" for="${data.name}" class="menu-search-filter-description">${data.name}<span class="menu-search-filter-Trademark-quantity${index}"></span></label>
                </a>
            </li>
            `
            $('.menu-search-filter-list-Trademark').append(div);     
        })
        data.map(async(item,index) => {
            try {
                let data = await $.ajax({
                  url: "/api/product/findByTrademark",
                  type: "POST",
                  data:{
                    trademarkId:item._id
                  }
                });
                let div = ``;
                div = `(${data.data.length})`
                $(`.menu-search-filter-Trademark-quantity${index}`).append(div);
            }
            catch(error) {
                console.log(error);
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}
async function renderTableFindTrademark(trademarkId) {
    try {
      let data = await $.ajax({
        url: "/api/product/findByTrademark",
        type: "POST",
        data:{
            trademarkId:trademarkId
        }
      });
    if(data.status == 200){
      CheckCodeProduct(data.data);
      product_thumbnail_img = document.querySelectorAll('.product_gallert-thumbnails-img');
    }
    } catch (error) {
      console.log(error);
    }
}
let globalTimeout = null;  
$('.navbar-search-input').keyup(function() {
  if (globalTimeout != null) {
    clearTimeout(globalTimeout);
  }
  globalTimeout = setTimeout(async function() {
    let name = $('.navbar-search-input').val();
    try {
        let data = await $.ajax({
          url: "/api/product/findname",
          type: "POST",
          data:{
            name:name
          }
        });
      if(data.status == 200){
          console.log(data)
          $('.product-list').html('')
          data.data.map(async(data,index) => {
              await tableProduct(data,index);
          });
        product_thumbnail_img = document.querySelectorAll('.product_gallert-thumbnails-img');
      }
    }
    catch (error) {
        console.log(error);
    }
  }, 1000);  
})

renderSize();
renderCategory();
renderColor();
renderLevel();
renderTrademark();
render();



