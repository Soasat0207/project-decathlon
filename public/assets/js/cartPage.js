// Check user cookie when show shopping cart
$.ajax({
  url: '/api/cus/checkcookies',
  type: 'post',
})
.then((data) => {
  if(data !== 'Login successful'){
    alert('You need login first to show this page')
      window.location.href = '/login-cus'
  }
})
.catch((err) => {
  console.log(err);
})

//function to Render
async function CartRender(){
  try {
  $(".cart-items").html('');
  let data = await $.ajax({
    url: "/api/user/findShoppingCart",
    type: "POST",
  });
  if( data === "Nothing" || data.product.length === 0 ){
    $(".cart-list-item").html('');
    let cartItem = `
    <div class = "empty-cart-noti">
      <img src="http://localhost:3000/public/uploads/cart-empty-1.jpg" alt="">
      <h2>Không có sản phẩm trong giỏ hàng</h2>
      <a href="http://localhost:3000/list-product" class="product-review-overview-counts-btn cart-empty-btn">
          <span>Thêm vào giỏ hàng</span>
      </a>
    </div>
    `
    $(".cart-list-item").append(cartItem);
  }else{
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
                  <div id="pricePerOneProduct${obj._id}" class="cart-items-unit-price cart-items__priceOneProduct">${item.price}</div>
                  <div class="cart-items-quantity cart-items-unit-price">
                      <button id="decre${obj._id}" class="cart-items-quantity-btn cart-items-quantity-btn-decrease">-</button>
                      <input id = "input${obj._id}" class="cart-items-quantity-input" type="number" value ="${obj.quantity}" min='1' max='5'>
                      <button id="incre${obj._id}" class="cart-items-quantity-btn cart-items-quantity-btn-increase">+</button>
                  </div>
                  <div id="price${obj._id}" class="cart-items-total-price cart-items-unit-price"></div>
                </div>
                <div class="cart-items-delete cart-items-unit-price"><button onclick="deleteProduct('${obj._id}')">Xoá</button>
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

    
    }
  } catch (error) {
    console.log(error);
  }
}
CartRender();

// add event for continue button
$('.button-continue').on('click', async ()=>{
  let data = await $.ajax({
  url: "/api/user/findShoppingCart",
  type: "POST"
  });
  if(  data == "Nothing" || data.product.length == 0  ){
    $(".cart").html('');
    let emptyCartNoti = `
    <div class = "emptyCartNoti">
      <div>You cannot continue with an empty cart. Please click the button <b>back</b> to spend your money</div>
      <div><a href ="http://localhost:3000/list-product"><button class="backToListProduct">Back</button></a></div>
    </div>
    `
    $(".cart").append(emptyCartNoti);
  }else{
    window.location.href = '/order'
  }
})

// Delete a product from shopping cart
async function deleteProduct(selectedId){
  let answer = confirm('Bạn muốn xoá sản phẩm không?');
  if( answer){
    try {
      let data = await $.ajax({
        url: '/api/user/findAndDeleteOneProduct',
        type: 'PUT',
        data: { selectedId : selectedId}
      }).then(data => {
        if(data){
          CartRender();
          renderNavbarCart();
        }
      })
    } catch (error) {
      console.log(error);
    }
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

// function to render cart in navbar
async function renderNavbarCart(){
  try {
      $('.listSelectedProduct').html('');
      let data = await $.ajax({
          url: '/api/user/findShoppingCart',
          type : 'POST'
      })
      if(data === "Nothing" || data.product.length === 0){
          $('.navbar-list_cart').html('');
          let listCart = `
          <div class="navbar-list_cart-nocart">
              <img class="navbar-list-nocart-img" src="http://learnmongodbthehardway.com/images/originals/shopping_cart_racing.png" alt="">
              <p class="navbar-list-nocart-text">Chưa có sản phẩm </p>
          </div>
          `
          $('.navbar-list_cart').append(listCart);
      }else{
          $('.navbar-list_cart').html('');
          let listCart = `
          <h4 class="list_cart-heading">Sản phẩm đã thêm </h4>
          <ul class="list_cart listSelectedProduct">
          </ul>
          <button class="btn btn-primary list-view-cart">Show Cart</button>
          `;
          $('.navbar-list_cart').append(listCart);
          $('.cartContainer').append(`<p class ="numberProductInCart">${data.product.length}</p>`);
      }
      // add event for Show Cart button
          $('.list-view-cart').on('click', ()=>{
              window.location.href = 'http://localhost:3000/cart'
          });
      let arrProduct = data.product
      let qtyTotalProduct = 0;
      arrProduct.forEach(element => {
      qtyTotalProduct += parseInt(element.quantity)
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
      // render Number in shopping cart
          $('.nav-cart_showNumber').html('');
          $('.nav-cart_showNumber').append(qtyTotalProduct)
          $('.nav-cart_showNumber').attr('style', 'background-color : yellow')
      
  } catch (error) {
      console.log(error);
  }
}
renderNavbarCart();

// function to delete selected item from Database
  function deleteSelectedProduct(selectedId){
    let delConfirm = confirm('Bạn có chắc chắn muốn xoá sản phẩm đã thêm không');
    if( delConfirm ){
      $.ajax({
          url: '/api/user/findAndDeleteOneProduct',
          type: 'PUT',
          data: {
              selectedId : selectedId
          }
      }).then(data =>{
         if(data){
           CartRender();
           renderNavbarCart();
         }
      }).catch(err =>{
          console.log(err);
      })
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