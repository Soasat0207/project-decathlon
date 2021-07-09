CartRender();

//function to Render
function CartRender(){
  $(".cart-items").html('');
  $.ajax({
    url: "/api/user/cartPage",
    type: "POST",
  })
    .then((data) => {
      if (data) {
        var totalPrices = 0;
        // console.log(data);
        for (const obj of data.product) {
          let item = obj.productId;

          let content = `
              <div id = "content${item._id}" class = "cart-items-info">
                  <div class="cart-items-img"><img src="${item.img}" alt=""></div>
                  <div class="cart-items-info-product">
                      <div class="cart-items-info-product-description">
                          <div><h3>${item.name}</h3></div>
                          <div>MÃ SẢN PHẨM: ${item.codeProduct}</div>
                          <div>MÀU SẮC : ${item.imgColor[0]}</div>
                          <div>KÍCH THƯỚC : None</div>
                          <div>GIAO HÀNG TRONG VÒNG CHƯA ĐẦY 72 GIỜ</div>
                      </div>
                          <div id="pricePerOneProduct${item._id}" class="cart-items-unit-price">${item.price}</div>
                          <div class="cart-items-quantity cart-items-unit-price">
                              <button id="decre${item._id}" class="cart-items-quantity-btn cart-items-quantity-btn-decrease">-</button>
                              <input id = "${item._id}" class="cart-items-quantity-input" type="number" value ="${obj.quantity}" min='1' max='5'>
                              <button id="incre${item._id}" class="cart-items-quantity-btn cart-items-quantity-btn-increase">+</button>
                          </div>
                          <div id="price${item._id}" class="cart-items-total-price cart-items-unit-price"></div>
                      </div>
                      <div class="cart-items-delete cart-items-unit-price"><button onclick="deleteProduct('${item._id}')">X</button>
                      </div>
              </div>
              `;
          
          // append to html file
          $(".cart-items").append(content);
  
          // price total
          let pricePerOneUnit = parseInt($(`#pricePerOneProduct${item._id}`).html().replace(/\./g, ""));
          let productQuantity = parseInt($(`#${item._id}`).val());
          totalPrices += ( pricePerOneUnit * productQuantity );
  
          // price handler
          decreQuantity(item._id);
          increQuantity(item._id);
          priceOfOneProduct(item._id);
        } // \End for loop
  
        // console.log(48, totalPrices);
        // check shipping cash
        if(totalPrices > 899000){
            $('.cashShipping').html('');
            $('.cashShipping').append('Miễn phí');
            $('.freeShipCondition').html('');
            $('.freeShipCondition').append(`<i class="fal fa-truck"></i><strong >Bạn được MIỄN PHÍ GIAO HÀNG</strong>`)
        }else{
          let extraMoney = 899000-totalPrices
          extraMoney = numberToCurrency(extraMoney)
          $('.cashShipping').html('');
          $('.cashShipping').append('Tính khi chọn hình thức giao hàng');
          $('.freeShipCondition').html('');
          $('.freeShipCondition').append(`<i class="fal fa-truck"></i><strong >Bạn cần mua thêm ${extraMoney} để được MIỄN PHÍ GIAO HÀNG</strong>`);

        }
        totalPrices = numberToCurrency(totalPrices)
        $('.totalPriceOfProducts').html('');
        $('.totalPriceOfProducts').html(totalPrices);
        $('.totalPrices').html('');
        $('.totalPrices').html(totalPrices);
      } // \End if condition
    })
    .catch((err) => {
      console.log("Server err");
    });
} // \end function CartRender

// delete a product that user was choose
function deleteProduct(productId){
  $.ajax({
    url: '/api/user/deleteProduct/',
    type: 'DELETE',
    data: { productId : productId}
  }).then(data => {
    if(data === "Xoa thanh cong"){
      alert('Xoa san pham thanh cong');
      CartRender();
    }else{
      alert('Khong co gi de xoa')
    }
  }).catch(err => {
    console.log(err);
  })
}

function decreQuantity(inputID) {
  // when user click "-" button
  $(`#decre${inputID}`).on("click", () => {
    let decreaseQuantity = parseInt($(`#${inputID}`).val());
    if (decreaseQuantity > 1 && decreaseQuantity <= 5) {
      decreaseQuantity--;
    }
    $(`#${inputID}`).val(decreaseQuantity);
    userUpdateQuantity(inputID);
    priceOfOneProduct(inputID);
    CartRender();
  });
}

function increQuantity(inputID) {
  // when user click "+" button
  $(`#incre${inputID}`).on("click", () => {
    let increaseQuantity = parseInt($(`#${inputID}`).val());
    if (increaseQuantity >= 1 && increaseQuantity < 5) {
      increaseQuantity++;
    }
    $(`#${inputID}`).val(increaseQuantity);
    userUpdateQuantity(inputID);
    priceOfOneProduct(inputID);
    CartRender();
  });
}

// function to send request update quantity
function userUpdateQuantity(inputID){
  // console.log($(`#${inputID}`).val());
  $.ajax({
    url: '/api/user/updateQuantity',
    type: 'PUT',
    data: {
      productId: inputID,
      newQuantity: $(`#${inputID}`).val()
    }
  }).then(data => {
    console.log(data);
  }).catch(err =>{
    console.log(err);
  })
}


// function calculate price of one product
function priceOfOneProduct(inputID) {

  let pricePerOneUnit = parseInt($(`#pricePerOneProduct${inputID}`).html().replace(/\./g, ""));
  let productQuantity = parseInt($(`#${inputID}`).val());
  let totalUnitPrice = numberToCurrency(pricePerOneUnit * productQuantity)

  $(`#price${inputID}`).html("");
  $(`#price${inputID}`).append(totalUnitPrice);
}



// function convert number to VND format
function numberToCurrency(number){
    
   let formatedNumber = (number).toLocaleString('en-US', {
      style: 'currency',
      currency: 'VND',
    });
    return formatedNumber
  }
  
  // function convert currency to number format
function currencyToNumber(item){
    var number = Number(item.replace(/[^0-9.-]+/g,""));
    return number
}