
async function render() {
  try {
    let data = await $.ajax({
      url: "/api/product",
      type: "GET",
    });
    
    data.map((data,index) => {
        console.log(data)
      let div = ``;
      let divImgColor = ``;
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
            // console.log(imgColor);
            divImgColor =`
                <img src="${imgColor}" alt="" class="product_gallert-thumbnails-img">
            `;
            $(`.poduct_gallert-thumbnails-list-img${index}`).append(divImgColor);
        })
    });
    product_thumbnail_img = document.querySelectorAll('.product_gallert-thumbnails-img')
  } catch (error) {
    console.log(error);
  }
}

render();

