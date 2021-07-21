const LimitProduct = 6;
let div = ``;
async function renderIndex(){
    renderCategorySea();
    RenderBanner();
    renderCategoryFitnessClub();
    renderLocalBrandBig();
}
renderIndex();
async function tableCategoryProductSale(data,index){
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
    $('.topic_sell-right-sea').append(div); 
}
async function tableCategoryProductFitnessClub(data,index){
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
let slideIndex = 1;
let delay = 10000;
let slides ;
let box;
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
        // function plusSlidesBanner(n){
        //     console.log('ok');
        //     showSlides(slideIndex += n);
        //     restart();
        //     animate();
        // };
        
        showSlides(slideIndex); 
        // function randomSlides(){

        //     if(slideIndex > slides.length){
        //         slideIndex = 1 ;
        //     }
        //     for (let i = 0; i < slides.length; i++) {
        //         box[i].classList.remove('active');
        //         slides[i].style.display = 'none';
        //     }
            
        //     if(slideIndex === slides.length + 1 ){
        //         slideIndex=1;
        //     }
        //     if(slideIndex == 0){
        //         slideIndex = slides.length;
        //     }
        //     let randomNumber = Math.ceil(Math.random() * slides.length)-1;
        //     animate();
        //     box[randomNumber].classList.add('active');
        //     slides[randomNumber].style.display = "grid";
        // }
        // let autoChange = setInterval(randomSlides,delay);
        // const restart = function(){
        //     clearInterval(autoChange);
        //     autoChange = setInterval(randomSlides,delay)
        // }
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
            console.log(data);
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
function showSlides(n){
    console.log(n);
    if(slideIndex > slides.length){
        slideIndex = 1 ;
    }
    // duyệt qua để cho tất cả các thằng sliders đều none và các thằng có clas active xoá đi
    for (let i = 0; i < slides.length; i++) {
        box[i].classList.remove('active');
        slides[i].style.display = 'none';
    }
    
    if(slideIndex === slides.length + 1 ){
        slideIndex=1;
    }
    if(slideIndex == 0){
        slideIndex = slides.length;
    }
    box[slideIndex-1].classList.add('active');
    slides[slideIndex-1].style.display = "grid";
}
function plusSlidesBanner(n){
    console.log('ok');
    showSlides(slideIndex += n);
    // restart();
    // animate();
};
