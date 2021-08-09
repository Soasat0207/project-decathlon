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

// allow only one payment option was checked
$(".payment-options-checkbox").on("change", function () {
  $(".payment-options-checkbox").not(this).prop("checked", false);
});

// function to render checkout right
async function renderCartInfo() {
  try {
    $(".cart-item-list").html("");
  $(".checkbox-round:last").attr("checked", "checked");
  let data = await $.ajax({
    url: "/api/user/findShoppingCart",
    type: "POST"
  })
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
          <span>Số lượng: <b>${item.quantity}</b> </span><span>Giá: <b>${objProduct.price}</b></span>
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
renderCartInfo();

// render checkout-left for checkout page
async function renderCheckoutLeft() {
  try {
    let data = await $.ajax({
      url: "/api/user/findOrder",
      type: "POST",
    })
    let deliveryAddress = `
    <div class="text-deliveried-address ">
    Giao hàng đến <span style="font-weight: 700;" class="end-address"> ${data.address.province}</span>
    </div>
    <button class="change-deliveried-address">Thay đổi</button>
    `;
    let timeToDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    let date = timeToDelivery.getDate();
    let month = timeToDelivery.getMonth() + 1;
    let year = timeToDelivery.getFullYear();
  
    let dayNumber = timeToDelivery.getDay();
    let arrayOfWeekday = ["Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy" ];
    let dayToDeliveried = arrayOfWeekday[dayNumber];
  
    let dateOfDeliveried = `
    <div class="text-deliveried-date">
      Giao hàng tiêu chuẩn<strong class="end-date"> từ ${dayToDeliveried}, ${date}/${month}/${year} </strong>
    </div>
    `;
    $(".deliveried-address").html("");
    $(".deliveried-address").append(deliveryAddress);
    $(".deliveried-date").html("");
    $(".deliveried-date").append(dateOfDeliveried);
  
    // Change address button
    $(".change-deliveried-address").on("click", () => {
      window.location.href = "http://localhost:3000/order";
    });
  } catch (error) {
    console.log(error);
  }
}

renderCheckoutLeft();

// Add event for Confirm button
$(".payment-options-button-confirm").on("click", async () => {
  let idChecked = $(".payment-options-checkbox:checked").attr("id");
  
  if ( idChecked ){

    try {
    let data = await $.ajax({
      url: "/api/user/updatePaymentMethod",
      type: "PUT",
      data: { methodPayment: idChecked }
    })
    if(data){
     // ajax to delete shopping cart after order has created
     let data2 = await $.ajax({
      url: '/api/user/deleteShoppingCart',
      type: 'DELETE'
      })
    if(data2.deletedCount !== 0){
      renderOrderConfirm();
    }
    }
    } catch (error) {
      console.log(error);
    }

  }else{
    let nochecked = `
    <div style="color : red">Vui lòng chọn 1 hình thức thanh toán</div>
    `
    $('.payment-options__notify').html('');
    $('.payment-options__notify').append(nochecked);
  }
});

// function to confirm order infomation
async function renderOrderConfirm() {
  try {
    $(".checkout-infomation").html("");
  $(".deliveried-address").html("");
  let data = await $.ajax({
    url: "/api/user/findOrder",
    type: "POST",
  })
      let methodOfPayment = "";
      if (data.methodPayment === "CashByCod") {
        methodOfPayment = "Thanh toán khi nhận hàng";
      } else if (data.methodPayment === "CashByZalopay") {
        methodOfPayment = "Thanh toán qua Zalopay";
      } else if (data.methodPayment === "CashByVisa") {
        methodOfPayment = "Thanh toán qua Visa";
      }
      let content = `
    <div class = "orderNotification">
      <div class = "methodPayment">Phương thức thanh toán bạn đã chọn: <strong>${methodOfPayment}</strong></div>
      <div class = "orderInfo">Đơn hàng của bạn đã được tạo thành công!!!</div>
      <button class="goToHomePage"> Tiếp tục mua sắm </button>
    </div>
    `;
      let addressConfirm = `
    <div class="text-deliveried-address ">
    Giao hàng đến <span style="font-weight: 700;" class="end-address"> ${data.address.ward} - ${data.address.district} - ${data.address.province}</span>
    </div>
    `;

      $(".checkout-infomation").append(content);
      $(".deliveried-address").append(addressConfirm);
      // go to homepage button
      $(".goToHomePage").on("click", () => {
        window.location.href = "http://localhost:3000/list-product";
      });
  } catch (error) {
    console.log(error);
  }
}

// function convert number to VND format
function numberToCurrency(number) {
  let formatedNumber = number.toLocaleString("en-US", {
    style: "currency",
    currency: "VND",
  });
  return formatedNumber;
}
