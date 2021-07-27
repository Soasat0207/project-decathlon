CartRender();
//function to Render
async function CartRender(){
  try {
  $(".cart-items").html('');
  let data = await $.ajax({
    url: "/api/user/findShoppingCart",
    type: "POST",
  });
 
  if (data) {
        var totalPrices = 0;
        for (const obj of data.product) {
          let item = obj.productId;
          let content = `
            <div id = "content${obj._id}" class = "cart-items-info">
              <div class="cart-items-img"><img src="${item.img}" alt=""></div>
              <div class="cart-items-info-product">
                <div class="cart-items-info-product-description">
                    <div><h3>${item.name}</h3></div>
                    <div>MÃ SẢN PHẨM: <strong>${item.codeProduct}</strong></div>
                    <div>MÀU SẮC : <strong>${item.colorId.name}</strong></div>
                    <div>KÍCH THƯỚC : <strong>${item.sizeId.size}</strong></div>
                    <div>GIAO HÀNG TRONG VÒNG CHƯA ĐẦY 72 GIỜ</div>
                </div>
                  <div id="pricePerOneProduct${obj._id}" class="cart-items-unit-price">${item.price}</div>
                  <div class="cart-items-quantity cart-items-unit-price">
                      <button id="decre${obj._id}" class="cart-items-quantity-btn cart-items-quantity-btn-decrease">-</button>
                      <input id = "input${obj._id}" class="cart-items-quantity-input" type="number" value ="${obj.quantity}" min='1' max='5'>
                      <button id="incre${obj._id}" class="cart-items-quantity-btn cart-items-quantity-btn-increase">+</button>
                  </div>
                  <div id="price${obj._id}" class="cart-items-total-price cart-items-unit-price"></div>
                </div>
                <div class="cart-items-delete cart-items-unit-price"><button onclick="deleteProduct('${obj._id}')">X</button>
                </div>
            </div>
              `;
          
          // append to html
          $(".cart-items").append(content);
  
          // price total
          let pricePerOneUnit = parseInt($(`#pricePerOneProduct${obj._id}`).html().replace(/\,/g, ""));
          let productQuantity = parseInt($(`#input${obj._id}`).val());
          totalPrices += ( pricePerOneUnit * productQuantity );
  
          // price handler
          decreQuantity(obj._id);
          increQuantity(obj._id);
          priceOfOneProduct(obj._id);
        } // \End for loop

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
        totalPricesCurrencyFormated = numberToCurrency(totalPrices)
        $('.totalPriceOfProducts').html('');
        $('.totalPriceOfProducts').html(totalPricesCurrencyFormated);
        $('.totalPrices').html('');
        $('.totalPrices').html(totalPricesCurrencyFormated);

    // add event for continue button
      $('.button-continue').on('click', async ()=>{
        let data = await $.ajax({
        url: "/api/user/findShoppingCart",
        type: "POST"
        });
        if(data.product.length === 0){
          // $(".cart").html('');
          let emptyCartNoti = `
          <div class = "emptyCartNoti">
            <div>Your shopping cart is empty, you cannot continue. Please click the button <b>back</b> to continue</div>
            <div><button class="backToListProduct"><a href ="http://localhost:3000/list-product">BACK</a></button></div>
          </div>
          `
          $(".cart").append(emptyCartNoti);
        }else{
          window.location.href = '/order'
        }
      })
    }
  } catch (error) {
    console.log(error);
  }
} 
// \end function CartRender

// delete a product 
async function deleteProduct(selectedId){
  try {
    let data = await $.ajax({
      url: '/api/user/findAndDeleteOneProduct',
      type: 'PUT',
      data: { selectedId : selectedId}
    }).then(data => {
      console.log(data);
      if(data){
        alert('Xoa san pham thanh cong');
        CartRender();
      }
    })
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

 function decreQuantity(selectedId) {
  // when user click "-" button
  $(`#decre${selectedId}`).on("click", () => {
    let decreaseQuantity = parseInt($(`#input${selectedId}`).val());
    if (decreaseQuantity > 1 && decreaseQuantity <= 5) {
      decreaseQuantity--;
    }
    $(`#input${selectedId}`).val(decreaseQuantity);
    updateQuantityCart(selectedId);
    priceOfOneProduct(selectedId);
  });
}

function increQuantity(selectedId) {
    // when user click "+" button
  $(`#incre${selectedId}`).on("click", () => {
    let increaseQuantity = parseInt($(`#input${selectedId}`).val());
    if (increaseQuantity >= 1 && increaseQuantity < 5) {
      increaseQuantity++;
    }
    $(`#input${selectedId}`).val(increaseQuantity);
    updateQuantityCart(selectedId);
    priceOfOneProduct(selectedId);
  });
}

// function to update quantity
async function updateQuantityCart(selectedId){
  try {
    let data = await $.ajax({
      url: '/api/user/updateQuantityShoppingCart',
      type: 'PUT',
      data: {
        selectedId: selectedId,
        newQuantity: $(`#input${selectedId}`).val()
      }
    })
    if(data.nModified !== 0){
      CartRender();
      renderNavbarCart();
    }
  } catch (error) {
    console.log(error);
  }
}

// function calculate price of one product
function priceOfOneProduct(selectedId) {

  let pricePerOneUnit = parseInt($(`#pricePerOneProduct${selectedId}`).html().replace(/\,/g, ""));
  let productQuantity = parseInt($(`#input${selectedId}`).val());
  let totalUnitPrice = numberToCurrency(pricePerOneUnit * productQuantity)
  
  $(`#price${selectedId}`).html("");
  $(`#price${selectedId}`).append(totalUnitPrice);
}



// function render cart in navbar
async function renderNavbarCart(){
  $('.listSelectedProduct').html('');
  try {
    let data = await $.ajax({
      url: '/api/user/findShoppingCart',
      type : 'POST',
  });
  if(data){
    let arrProduct = data.product
      arrProduct.forEach(element => {
      let liItem = `
      <li class="list-cart-items">
          <img class="list-cart-items-img" src="${element.productId.img[0]}" alt="">
          <div class="list-cart-item-wrapper">
              <div class="list-cart-item-head">
                  <h5 class="list-cart-item-name">${element.productId.name}</h5>
                  <p class="list-cart-item-price">${element.productId.price}</p>
                  <p class="list-cart-item-multiphy">x</p>
                  <p class="list-cart-item-quatity">${element.quantity}</p>
              </div>
              <div class="list-cart-item-body">
                  <p class="list-cart-item-category">Species: ${element.productId.categoryProductId.name}</p>
                  <p class="list-cart-item-delete"><button class ="delProduct" id ="item${element._id}">Delete</button></p>
              </div>
          </div>
      </li>
      `
      $('.listSelectedProduct').append(liItem);
  // add event for Delete button 
      $(`#item${element._id}`).on('click', ()=>{
        let selectedId = $(`#item${element._id}`).attr('id').slice(4,100);
        deleteSelectedProduct(selectedId)
      })

      });
      // end loop
  }
  } catch (error) {
    console.log(error);
  }
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
   var number = Number(item.replace(/[^0-9,-]+/g,""));
   return number
}