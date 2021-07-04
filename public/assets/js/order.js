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
     console.log(61, data);
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
  console.log(218);
})


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
