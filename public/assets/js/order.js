renderCartInfo();
updateAddress();

// function update Address to html
async function updateAddress() {
  try {
    $(".address-info__list").html("");
    let data = await $.ajax({
      url: "/api/user/findUserAddress",
      type: "POST",
    })
    data.forEach(item => {
      let content = `
        <div id="${item._id}" class="address-info__list-item">
          <div class="address-info__list-item--info">
            <p class="sub-name">
                ${item.fullname}
            </p>
            <p class="sub-address">
                Địa chỉ : ${item.detailAddress} - ${item.ward} - ${item.district} - ${item.province}
            </p>
            <p class="sub-phone">
                Điện thoại : ${item.phone}
            </p>
          </div>
          <div class="address-info__list-item--action">
              <button class="delete-button btn-danger">Xoá</button>
              <a href="#showCreatingAddressContent"><button class="edit-button btn-primary">Sửa</button></a>
          </div>
        </div>
      `;
      
      $(".address-info__list").append(content);

    })

    // add event for edit button 
      $('.edit-button').on('click', async function(){
        let idOfAddress =  $(this).parents('.address-info__list-item').attr('id') ;
        editAddress(idOfAddress);
      })
    // add event for delete button
      $('.delete-button').on('click', async function(){
        let idOfAddress =  $(this).parents('.address-info__list-item').attr('id') ;
        deleteAddress(idOfAddress);
      })

  } catch (error) {
    console.log(error);
  }
}

// function edit address 
async function editAddress(idOfAddress){
  try {
    let data = await $.ajax({
      url : '/api/user/findbyIdAddress',
      type : 'POST',
      data : { idAddress : idOfAddress} 
    })
    let showAddressEditContent = `
    <div class="address-info">
    <span class="address-info_label col-md-2"><label for="">Họ tên:</label></span>
    <div class="address-info_input">
        <input type="text" name="" id="address-info__fullname" placeholder="Nhập họ tên bạn" value="${data.fullname}">
    </div>
  </div>
  <div class="address-info">
    <span class="address-info_label col-md-2"><label for="">Công ty:</label></span>
    <div class="address-info_input">
        <input type="text" name="" id="address-info__company" placeholder="Nhập tên công ty" value="${data.companyAddress}">
    </div>
  </div>
  <div class="address-info">
    <span class="address-info_label col-md-2"><label for="">Số điện thoại:</label></span>
    <div class="address-info_input phone-number__auth">
        <input type="number" name="" id="address-info__phone" placeholder="Nhập số điện thoại" value="${data.phone}">
    </div>
  </div>
  <div class="address-info">
    <span class="address-info_label col-md-2"><label for="">Tỉnh / thành phố:</label></span>
    <div class="address-info_input">
        <select required name="" id="address-info_list-province">

        </select>
    </div>
  </div>
  <div class="address-info">
    <span class="address-info_label col-md-2"><label for="">Quận/huyện:</label></span>
    <div class="address-info_input">
        <select required name="" id="address-info_list-district">
            <option value="">Chọn Quận/Huyện</option>
        </select>
    </div>
  </div>
  <div class="address-info">
    <span class="address-info_label col-md-2"><label for="">Chọn Phường/Xã:</label></span>
    <div class="address-info_input">
        <select required name="" id="address-info_list-ward">
            <option value="">Chọn Phường/Xã</option>
        </select>
    </div>
  </div>
  <div class="address-info">
    <span class="address-info_label col-md-2"><label for="">Chi tiết:</label></span>
    <div class="address-info_input">
        <textarea placeholder="Nhập chi tiết địa chỉ của bạn" name="" id="address-info__details" cols="30"
            rows="5">${data.detailAddress}</textarea>
    </div>
  </div>
  <div class="address-info">
    <span class="address-info_label col-md-2"><label for="">Loại địa chỉ:</label></span>
    <div class="address-info_input">
        <span class="address-info_input--home">
            <input type="radio" name="address-info__type" id="address-info__homeType" value="home">
            <label for="address-info__homeType">Nhà riêng/Chung cư</label>
        </span>
        <span class="address-info_input--company">
            <input type="radio" name="address-info__type" id="address-info__companyType" value="company">
            <label for="address-info__companyType">Cơ quan/Công ty</label>
        </span>
    </div>
  </div>
  <div class="address-info">
    <span class="address-info_label col-md-2"><label for=""></label></span>
    <div class="address-info_input address-info_input--button">
        <button id ="cancel-editting-address" class="cancel-info btn-light">Huỷ bỏ</button>
        <button id="update${data._id}" class="confirm-info btn-primary">Cập nhật</button>
    </div>
  </div>
    `
  $('.address-info-details').html('');
  $('.address-info-details').append(showAddressEditContent);
    // render for select province
      renderAddressProvince();
    // add event for select district
      $('select#address-info_list-province').on('change', function () {
        renderAddressDistrict();
      });
    // add event for select ward
      $('select#address-info_list-district').on('change', function () {
        renderAddressWard();
      })
    // add event for update button 
      $(`#update${data._id}`).on('click', async function(){
        let idAddress = $(this).attr('id').slice(6, 100) ;
        try {
          let data = await $.ajax({
            url : '/api/user/updateUserAddress',
            type: 'PUT',
            data : {
              idAddress : idAddress,
              fullname: $('#address-info__fullname').val(),
              companyAddress: $('#address-info__company').val(),
              phone: $('#address-info__phone').val(),
              province: $('select#address-info_list-province').children("option:selected").html(),
              district: $('select#address-info_list-district').children("option:selected").html(),
              ward: $('select#address-info_list-ward').children("option:selected").html(),
              detailAddress: $('textarea#address-info__details').val(),
              typeOfAddress: $('input[type="radio"]:checked').val()
            }
          })
          if(data.nModified !== 0){
            updateAddress();
          }
        } catch (error) {
          console.log(error);
        }
      })
    // add event for cancel button
      $('#cancel-editting-address').on('click' , function(){
        $('.address-info-details').html('');
        // updateAddress();
      })
  } catch (error) {
    console.log(error);
  }
}

// Create a new user address
$(".addressBtn").on("click", function () {
  let showAddressContent = `
  <div class="address-info">
    <span class="address-info_label col-md-2"><label for="">Họ tên:</label></span>
    <div class="address-info_input">
        <input type="text" name="" id="address-info__fullname" placeholder="Nhập họ tên bạn">
    </div>
  </div>
  <div class="address-info">
    <span class="address-info_label col-md-2"><label for="">Công ty:</label></span>
    <div class="address-info_input">
        <input type="text" name="" id="address-info__company" placeholder="Nhập tên công ty">
    </div>
  </div>
  <div class="address-info">
    <span class="address-info_label col-md-2"><label for="">Số điện thoại:</label></span>
    <div class="address-info_input phone-number__auth">
        <input type="number" name="" id="address-info__phone" placeholder="Nhập số điện thoại">
    </div>
  </div>
  <div class="address-info">
    <span class="address-info_label col-md-2"><label for="">Tỉnh / thành phố:</label></span>
    <div class="address-info_input checkProvinceAddress">
        <select required name="" id="address-info_list-province">

        </select>
    </div>
  </div>
  <div class="address-info">
    <span class="address-info_label col-md-2"><label for="">Quận/huyện:</label></span>
    <div class="address-info_input checkDistrictAddress">
        <select required name="" id="address-info_list-district">
            <option value="">Chọn Quận/Huyện</option>
        </select>
    </div>
  </div>
  <div class="address-info">
    <span class="address-info_label col-md-2"><label for="">Chọn Phường/Xã:</label></span>
    <div class="address-info_input checkWardAddress">
        <select required name="" id="address-info_list-ward">
            <option value="">Chọn Phường/Xã</option>
        </select>
    </div>
  </div>
  <div class="address-info">
    <span class="address-info_label col-md-2"><label for="">Chi tiết:</label></span>
    <div class="address-info_input">
        <textarea placeholder="Nhập chi tiết địa chỉ của bạn" name="" id="address-info__details" cols="30"
            rows="5"></textarea>
    </div>
  </div>
  <div class="address-info">
    <span class="address-info_label col-md-2"><label for="">Loại địa chỉ:</label></span>
    <div class="address-info_input">
        <span class="address-info_input--home">
            <input type="radio" name="address-info__type" id="address-info__homeType" value="home">
            <label for="address-info__homeType">Nhà riêng/Chung cư</label>
        </span>
        <span class="address-info_input--company">
            <input type="radio" name="address-info__type" id="address-info__companyType" value="company">
            <label for="address-info__companyType">Cơ quan/Công ty</label>
        </span>
    </div>
  </div>
  <div class="address-info">
    <span class="address-info_label col-md-2"><label for=""></label></span>
    <div class="address-info_input address-info_input--button">
        <button class="cancel-info btn-light cancelAddress">Huỷ bỏ</button>
        <button class="confirm-info btn-primary addAddress">Cập nhật</button>
    </div>
  </div>
  `
  $('.address-info-details').html('');
  $('.address-info-details').append(showAddressContent);

  // render for select province
    renderAddressProvince();
  // add event for select district
  $('select#address-info_list-province').on('change', function () {
    renderAddressDistrict();
  });
  // add event for select ward
  $('select#address-info_list-district').on('change', function () {
    renderAddressWard();
  })

  // add event for update button
  $('.addAddress').on('click', async function () {

    try {
      let data = await $.ajax({
        url: "/api/user/userAddress",
        type: "POST",
        data: {
          fullname: $('#address-info__fullname').val(),
          companyAddress: $('#address-info__company').val(),
          phone: $('#address-info__phone').val(),
          province: $('select#address-info_list-province').children("option:selected").html(),
          district: $('select#address-info_list-district').children("option:selected").html(),
          ward: $('select#address-info_list-ward').children("option:selected").html(),
          detailAddress: $('textarea#address-info__details').val(),
          typeOfAddress: $('input[type="radio"]:checked').val()
        },
      })
      if (data) {
        $('.address-info-details').html('');
        updateAddress();
      }
    } catch (error) {
      console.log(error);
    }

  })
// add event for cancel button
    $('.cancel-info').on('click' , function(){
      $('.address-info-details').html('');
    })
  
});

// add event to delete address button
async function deleteAddress(idAddress) {
  try {
    let data = await $.ajax({
      url: "/api/user/deleteUserAddress",
      type: "DELETE",
      data: { idAddress: idAddress, }
    })
    if (data.deletedCount !== 0) {
      updateAddress();
    }
  } catch (error) {
    console.log(error);
  }
}



// Render Cart
async function renderCartInfo() {
  try {
    $(".cart-item-list").html("");
    let data = await $.ajax({
      url: "/api/user/findShoppingCart",
      type: "POST",
    });
    if (data) {
      let totalPrice = 0;
      for (const item of data.product) {
        let objProduct = item.productId;
        let productInfo = `
        <div class="cart-item-list-product">
          <div class="cart-item-list-image">
            <img src="${objProduct.img[0]}" alt="">
          </div>
          <div class="cart-item-list-infomation">
            <div class="cart-item-list-name">
              <h4>${objProduct.name}</h4>
            </div>
            <div class="cart-item-list-price">
              <span>Số lượng: <b>${item.quantity}</b></span>
              <span>Giá: <b>${objProduct.price}</b></span>
              <span>Kích cỡ: <b>${objProduct.sizeId.size}</b></span>
            </div>
          </div>
        </div>
        `;
        let pricePerOneProduct = parseInt(objProduct.price.replace(/\,/g, ""));
        let quantityProduct = item.quantity;
        totalPrice += pricePerOneProduct * quantityProduct;
        $(".cart-item-list").append(productInfo);
      } // end for loop
      if (totalPrice > 899000) {
        $(".shipping-cash-calc").append("Miễn phí");
      } else {
        $(".shipping-cash-calc").append("Có phí");
      }
      let stringTotalPrice = numberToCurrency(totalPrice);

      $(".total-price-calc").append(stringTotalPrice);
      $(".all-price-calc").append(stringTotalPrice);
    } // end if condition
  } catch (error) {
    console.log(error);
  }
}

// Add event to Choose form delivery
$(".checkout-right-delivery-button").on("click", () => {
  $.ajax({
    url: '/api/user/findUserAddress',
    type: 'POST'
  }).then(data => {
    if (data.length !== 0) {
      renderOrderPage();
    } else {
      $('.checkout-notification').html('');
      let content = `
      <span style="color:red">You have not an address, please add your address to continue</span>
      `
      $('.checkout-notification').append(content)
    }
  })
});

// render to order page
async function renderOrderPage() {
  try {
    $(".checkout-left").html("");
    let data = await $.ajax({
      url: "/api/user/findUserAddress",
      type: "POST",
    })
    let timeToDeliveried = Date.now() + 3 * 24 * 60 * 60 * 1000;
    let time = new Date(timeToDeliveried)
    let date = time.getDate()
    let day = time.getDay();
    let month = time.getMonth() + 1;
    let year = time.getFullYear()
    let daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

    let content = `
    <div class="bg-border">
          <div class="deliveried-address">
          </div>
          <div class="deliveried-options">
              <h3>Hình thức giao hàng phù hợp</h3>
              <p>Vui lòng chọn hình thức giao hàng</p>
              <div class="deliveried-options-list">
                  <div class="deliveried-options-item">
                      <div class="deliveried-options-left-content">
                          <div class="deliveried-options-checkbox-input"><input type="checkbox" name="" id=""></div>
                          <div class="deliveried-options-list-text">Giao hàng tiêu chuẩn</div>
                      </div>
                      <div class="deliveried-options-right-content">
                          <div class="deliveried-options-list-date">
                              Từ<b>\u00A0${daysOfWeek[day]}</b>, ngày<b>\u00A0${date}/${month}/${year}</b>
                          </div>
                          <div class="deliveried-options-list-cash">
                              36.000 VND
                          </div>
                      </div>
                  </div>
                  <div class="card-container"></div>
                      
              </div>
              <div class="deliveried-options-terms">
                  <input type="checkbox" name="" checked id="" class="deliveried-options-terms-checkbox"> Tôi đã đọc và đồng ý với <span style="cursor: pointer;color: rgb(0, 0, 255);text-decoration: underline;">Điều khoản và Điều kiện</span>
              </div>
          </div>
        </div>
    `;
    $(".checkout-left").prepend(content);
    for await (item of data) {
      // console.log(item);
      let addressContent = `
      <div class="deliveried-address-content">
        <input type="checkbox" class="ratio" name="" id="input${item._id}">
        <div class="deliveried-address-district"> Giao hàng đến ${item.district} ${item.province}</div>
        <div class="deliveried-address-btn address-btn-${item._id}">
          <button onclick="reloadOderPage()" class ="deliveried-address-change-btn">Thay đổi</button>
        </div>
      </div>
      `;
      $(".deliveried-address").prepend(addressContent);

      // Allow only checked input
      $(".ratio").on("change", function () {
        $(".ratio").not(this).prop("checked", false);
      });
    } // end for loop

    // Add event when user click div
    $(".deliveried-options-item").on("click", async () => {
      // get id address from checked checkbox
      let checkedIdValue = $('.ratio:checked').attr('id').slice(5, 100);
      // ajax to get address from db
      try {
        let data = await $.ajax({
          url: '/api/user/findbyIdAddress',
          type: 'POST',
          data: {
            idAddress: checkedIdValue
          }
        })
        let timeToDeliveried = Date.now() + 3 * 24 * 60 * 60 * 1000;
        let time = new Date(timeToDeliveried)
        let date = time.getDate()
        let day = time.getDay();
        let month = time.getMonth() + 1;
        let year = time.getFullYear()
        let daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']

        let content = `
          <div class="location-card">
              <h5>
                  <img style="width: 20px; height: 15px"  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NC41NSIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDU0LjU1IDQwIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojNDI0NDUzO308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTQ4My40MjUgLTk1NC43NzIpIj48cGF0aCBjbGFzcz0iYSIgZD0iTTU0LjU1LDI2LjY5MXYtMTEuNWEuOTQxLjk0MSwwLDAsMC0uNDctLjgxOEw0MS43NDksNy4zMjZhLjk0Ljk0LDAsMCwwLS42LS4xMTNsLTYuNzcyLjk0MVYuOTRhLjk0MS45NDEsMCwwLDAtLjMyOS0uNzE1QS45NDEuOTQxLDAsMCwwLDMzLjI3NSwwTC43ODEsNS42NDJBLjk0MS45NDEsMCwwLDAsMCw2LjU4M1YzNS43MzlhLjk0MS45NDEsMCwwLDAsLjM2Ny43MjQuOTQxLjk0MSwwLDAsMCwuNzM0LjM3NmguMTZsNS44ODgtMS4xQTYuNTM3LDYuNTM3LDAsMCwwLDE5LjgwNywzMy41MUwzNy41LDMwLjM3OGE2LjU4NCw2LjU4NCwwLDAsMCwxMi41NTYtMi4xNjNsMy43NjItLjY1OEg1My45YS43ODEuNzgxLDAsMCwwLC4yMDctLjA3NWwuMDY2LS4yMDdhLjUzNi41MzYsMCwwLDAsLjE1LS4xNDEuNDguNDgsMCwwLDAsLjA4NS0uMTIyLjgyOC44MjgsMCwwLDAsLjA4NS0uMTg4Ljk0MS45NDEsMCwwLDAsLjA1Ni0uMTMyWk0zMi40OTUsMi4wNTl2MTUuNGwtMzAuNjE0LDUuNFY3LjMzNUwxNS4xNCw1LjA1Wk0xLjg4MSwzNC44VjI0Ljc2M2wzMC42MTQtNS40djkuOTg4TDE5LjU1MywzMS42MjlBNi41ODQsNi41ODQsMCwwLDAsNi43MjUsMzMuNDM0YzAsLjE2LDAsLjMsMCwuNDUxWm0xMS4zOSwzLjM0OGE0LjY3OSw0LjY3OSwwLDEsMCwwLS4wNDdabTIxLjEwNS05LjA4NVYxMC4wODJMNDEuMSw5LjE0MWwxMS41NjgsNi41ODRWMjUuNzg4bC0yLjgyMi41NDVhNi41ODQsNi41ODQsMCwwLDAtMTIuODY2LDEuNWMwLC4yMzUsMCwuNDgsMCwuNzE1Wm05LjE1MSwzLjQ4YTQuNjMyLDQuNjMyLDAsMSwwLDAtLjA0N1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0ODMuNDI1IDk1NC43ODQpIi8+PC9nPjwvc3ZnPg==" alt="">
                  <span style="padding-left: 16px;">GIAO HÀNG TẠI NHÀ</span>
              </h5>
              <div class="location-card-infomation">
                  <h3>TỪ <span style="color:#00B3B4">${daysOfWeek[day]}, ${date}/${month}/${year} </span></h3>
                  <p>Giao hàng đến ${data.district} ${data.province} </p>
              </div>
          </div>
          <div class="card-button">
              <button onclick="createOrderButton('${data._id}')" class="card-button-confirm">Thanh toán</button>
          </div>
          `;
        // add content to html 
        $(".card-container").html("");
        $(".card-container").append(content);
      } catch (error) {
        console.log(error);
      }
    });
    // end of event for div click
  } catch (error) {
    console.log(error);
  }
}

// function to create order
async function createOrderButton(idAddress) {
  try {
    let data = await $.ajax({
      url: '/api/user/findShoppingCart',
      type: 'POST'
    })
    let arrayProductId = [];
    let arr = data.product;
    arr.forEach(item => {
      let obj = { productId: item.productId._id, quantity: item.quantity };
      arrayProductId.push(obj);
    })
    if (data) {
      let totalPriceString = $('.all-price-calc').html();
      let totalPrice = currencyToNumber(totalPriceString);
      createOrder(arrayProductId, idAddress, totalPrice);
      for (let i = 0; i < arrayProductId.length; i++) {
        updateProductQuantity(arrayProductId[i].productId, arrayProductId[i].quantity);
        console.log('Update quantity succesfully')
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// function to find by id and update quantity after order created
async function updateProductQuantity(productId, qtyInCart) {
  try {
    let data = await $.ajax({
      url: '/api/product/findProductById',
      type: 'POST',
      data: {
        productId: productId
      }
    })
    if (data) {
      let qtyFromCart = parseInt(qtyInCart);
      let qtyFromStorage = parseInt(data.quantity);
      console.log(361, 'kho : ', qtyFromStorage, 'cart : ', qtyFromCart);
      let updateQty = qtyFromStorage - qtyFromCart;
      try {
        let data2 = await $.ajax({
          url: '/api/product/findProductByIdAndUpdateQuantity',
          type: 'PUT',
          data: {
            productId: productId,
            newQuantity: updateQty
          }
        })
        if (data2.nModified !== 0) {
          console.log('Update quantity succesfully')
        }
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// function to create order 
async function createOrder(arrayProductId, idAddress, totalPrice) {
  try {
    let data = await $.ajax({
      url: '/api/user/createOrder',
      type: 'POST',
      data: {
        arrayProductId: arrayProductId,
        addressId: idAddress,
        methodPayment: '',
        totalPrice: totalPrice
      }
    })
    if (data) {
      window.location.href = 'http://localhost:3000/checkout'
    }
  } catch (error) {
    console.log(error);
  }
}

// function reload order page
function reloadOderPage() {
  location.reload();
  return false;
}

// function convert number to VND format
function numberToCurrency(number) {
  let formatedNumber = number.toLocaleString("en-US", {
    style: "currency",
    currency: "VND",
  });
  return formatedNumber;
}

// function convert currency to number format
function currencyToNumber(item) {
  var number = Number(item.replace(/[^0-9.-]+/g, ""));
  return number;
}