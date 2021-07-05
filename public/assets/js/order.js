updateAddress();
render();

// function to render
function render() {
  $(".cart-item-list").html('');
  $.ajax({
    url: "/api/user/cartPage",
    type: "POST",
  })
    .then((data) => {
      if (data) {
        let totalPrice = 0;
        for (const item of data.product) {
          // console.log(item.productId);
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
            <span>Số lượng: <b>${item.quantity}</b> </span><span>Giá: <b>${objProduct.price} ${objProduct.unit}</b></span>
            </div>
          </div>
        </div>
        `;
          let pricePerOneProduct = parseInt(
            objProduct.price.replace(/\./g, "")
          );
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
    })
    .catch((err) => {
      console.log(err);
    });
}

// function update Address to html
function updateAddress(){
  $('.checkout-left-address-list').html('');
  $.ajax({
    url: "/api/user/findUserAddress",
    type: "POST",
  })
    .then((data) => {
     console.log(63, data);
    for (const item of data) {
        // console.log(63 , item);
        let content = `
    <div id ="${item._id}" class="selected-address">
      <div class="selected-homeAddress">
        <div>${item.homeAddress}</div>
        <div>
          <button data-toggle="modal" data-target="#updateUserAddress" class = "float-right editAddress${item._id}">Edit Address</button>
          <button class = "float-right deleteAddress${item._id}">Delete Address</button>
        </div>
      </div>
      <div class="selected-fullname">${item.firstName} ${item.lastName}</div>
      <div class="selected-deliveryAddress">${item.homeAddress} ${item.deliveryAddress}  ${item.ward}  ${item.district}  ${item.province}</div>
      <div class="selected-phoneNumber">${item.phone}</div>
    </div>
    `;

      $('.checkout-left-address-list').append(content);
  // edit button event
      $(`.editAddress${item._id}`).on('click', ()=>{
        editAddress(item._id);
      })
  // delete button event
     $(`.deleteAddress${item._id}`).on('click', ()=>{
      deleteAddress(item._id)
     })
  
      } // end for loop
    })
    .catch((err) => {
      console.log(err);
    });
}


// Add event to Edit address button
function editAddress(idAddress){
  // console.log(idAddress);
  $.ajax({
    url: '/api/user/findbyIdAddress',
    type: 'POST',
    data: {
      idAddress : idAddress
    }
  }).then(data=>{
   if(data){
     $("#homeAddressEdited").val(data.homeAddress);
     $("#provinceSelectedEdited").val(data.province);
     $("#districtSelectedEdited").val(data.district);
     $("#wardSelectedEdited").val(data.ward);
     $("#firstNameEdited").val(data.firstName);
     $("#lastNameEdited").val(data.lastName);
     $("#phoneNumberEdited").val(data.phone);
     $("#deliveryAddressEdited").val(data.deliveryAddress);
     $("#personalAddressEdited").val(data.personalAddress);
     $("#companyAddressEdited").val(data.companyAddress);
  //send id address to confirm edit btn
    $('.edit-confirm-btn').attr('id', `idAdress${idAddress}`)
   }
  }).catch(err =>{
    console.log(err);
  })
  
}

// add event to delete address button
function deleteAddress(idAddress){
  $.ajax({
    url: '/api/user/deleteUserAddress',
    type: 'DELETE',
    data: {
      idAddress: idAddress
    }
  }).then(data =>{
    if(data.deletedCount !== 0){
      updateAddress()
    }
  }).catch(err =>{
    console.log(' Server error');
  })
}

// Add event when user click Confirm edit button
$(".edit-confirm-btn").on("click", function () {
  let idAddress = $(this).attr('id').slice(8,100)

  $.ajax({
    url: "/api/user/updateUserAddress",
    type: "PUT",
    data: {
      idAddress: idAddress,
      homeAddress: $("#homeAddressEdited").val(),
      province: $("#provinceSelectedEdited").val(),
      district: $("#districtSelectedEdited").val(),
      ward: $("#wardSelectedEdited").val(),
      firstName: $("#firstNameEdited").val(),
      lastName: $("#lastNameEdited").val(),
      phone: $("#phoneNumberEdited").val(),
      deliveryAddress: $("#deliveryAddressEdited").val(),
      personalAddress: $("#personalAddressEdited").val(),
      companyAddress: $("#companyAddressEdited").val(),
    },
  })
    .then((data) => {
      console.log(data);
      if(data.nModified !== 0){
        updateAddress()
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// when user click Save Address btn
$(".save-address-btn").on("click", function () {
  $.ajax({
    url: "/api/user/userAddress",
    type: "POST",
    data: {
      homeAddress: $("#homeAddress").val(),
      province: $("#provinceSelected").val(),
      district: $("#districtSelected").val(),
      ward: $("#wardSelected").val(),
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      phone: $("#phoneNumber").val(),
      deliveryAddress: $("#deliveryAddress").val(),
      personalAddress: $("#personalAddress").val(),
      companyAddress: $("#companyAddress").val(),
    },
  })
    .then((data) => {
      if(data){
        $("#homeAddress").val('');
        $("#provinceSelected").val('');
        $("#districtSelected").val('');
        $("#wardSelected").val('');
        $("#firstName").val('');
        $("#lastName").val('');
        $("#phoneNumber").val('');
        $("#deliveryAddress").val('');
        $("#personalAddress").val('');
        $("#companyAddress").val('');
        updateAddress();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// Add event to Choose form delivery
$('.checkout-right-delivery-button').on('click', ()=>{
  renderOrderPage()
})

// render to order page
function renderOrderPage(){
  $('.checkout-left').html('');
  $.ajax({
    url: '/api/user/findUserAddress',
    type: 'POST'
  }).then( async (data) =>{

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
                              Từ thứ 5, ngày 08/07
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
    `
    $('.checkout-left').prepend(content);
    for await (item of data){
      console.log(item);
      let addressContent = `
      <div class="deliveried-address-content">
        <div id ="address${item._id}"><input type="checkbox" class="radio" name="" id="input${item._id}"></div>
        <div class="deliveried-address-district"> Giao hàng đến ${item.district} ${item.province}</div>
        <div class="deliveried-address-btn address-btn-${item._id}">
                  <button onclick="reloadOderPage()" class ="deliveried-address-change-btn">Thay đổi</button>
              </div>
      </div>
      `
      $('.deliveried-address').prepend(addressContent);

    } // end for loop
    
    // Add event for div click
    $('.deliveried-options-item').on('click', ()=>{
      let content =`
        <div class="location-card">
            <h5>
                <img style="width: 20px; height: 15px"  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NC41NSIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDU0LjU1IDQwIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojNDI0NDUzO308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTQ4My40MjUgLTk1NC43NzIpIj48cGF0aCBjbGFzcz0iYSIgZD0iTTU0LjU1LDI2LjY5MXYtMTEuNWEuOTQxLjk0MSwwLDAsMC0uNDctLjgxOEw0MS43NDksNy4zMjZhLjk0Ljk0LDAsMCwwLS42LS4xMTNsLTYuNzcyLjk0MVYuOTRhLjk0MS45NDEsMCwwLDAtLjMyOS0uNzE1QS45NDEuOTQxLDAsMCwwLDMzLjI3NSwwTC43ODEsNS42NDJBLjk0MS45NDEsMCwwLDAsMCw2LjU4M1YzNS43MzlhLjk0MS45NDEsMCwwLDAsLjM2Ny43MjQuOTQxLjk0MSwwLDAsMCwuNzM0LjM3NmguMTZsNS44ODgtMS4xQTYuNTM3LDYuNTM3LDAsMCwwLDE5LjgwNywzMy41MUwzNy41LDMwLjM3OGE2LjU4NCw2LjU4NCwwLDAsMCwxMi41NTYtMi4xNjNsMy43NjItLjY1OEg1My45YS43ODEuNzgxLDAsMCwwLC4yMDctLjA3NWwuMDY2LS4yMDdhLjUzNi41MzYsMCwwLDAsLjE1LS4xNDEuNDguNDgsMCwwLDAsLjA4NS0uMTIyLjgyOC44MjgsMCwwLDAsLjA4NS0uMTg4Ljk0MS45NDEsMCwwLDAsLjA1Ni0uMTMyWk0zMi40OTUsMi4wNTl2MTUuNGwtMzAuNjE0LDUuNFY3LjMzNUwxNS4xNCw1LjA1Wk0xLjg4MSwzNC44VjI0Ljc2M2wzMC42MTQtNS40djkuOTg4TDE5LjU1MywzMS42MjlBNi41ODQsNi41ODQsMCwwLDAsNi43MjUsMzMuNDM0YzAsLjE2LDAsLjMsMCwuNDUxWm0xMS4zOSwzLjM0OGE0LjY3OSw0LjY3OSwwLDEsMCwwLS4wNDdabTIxLjEwNS05LjA4NVYxMC4wODJMNDEuMSw5LjE0MWwxMS41NjgsNi41ODRWMjUuNzg4bC0yLjgyMi41NDVhNi41ODQsNi41ODQsMCwwLDAtMTIuODY2LDEuNWMwLC4yMzUsMCwuNDgsMCwuNzE1Wm05LjE1MSwzLjQ4YTQuNjMyLDQuNjMyLDAsMSwwLDAtLjA0N1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0ODMuNDI1IDk1NC43ODQpIi8+PC9nPjwvc3ZnPg==" alt="">
                <span style="padding-left: 16px;">GIAO HÀNG TẠI NHÀ</span>
            </h5>
            <div class="location-card-infomation">
                <h3>TỪ <span style="color:#00B3B4">THỨ TƯ, 07/07</span></h3>
                <p>Giao hàng đến Đắk lak</p>
            </div>
        </div>
        <div class="card-button">
            <button class="card-button-confirm">Thanh toán</button>
        </div>
   
      `
      $('.card-container').html('');
      $('.card-container').append(content);


    })

  }).catch(err=>{
    console.log(err);
  })

}

// function reload order page

function reloadOderPage(){
  location.reload();
  return false
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

// function checked input

$('.radio').on('change', function() {
  $('.radio').not(this).prop('checked', false);
});

