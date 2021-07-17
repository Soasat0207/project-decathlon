// allow only one payment option was checked
$(".payment-options-checkbox").on("change", function () {
  $(".payment-options-checkbox").not(this).prop("checked", false);
});

// function to render checkout right
function render() {
  $(".cart-item-list").html("");
  $(".checkbox-round:last").attr("checked", "checked");

  $.ajax({
    url: "/api/user/cartPage",
    type: "POST",
    data : {
      sold : false
    }
  })
    .then((data) => {
      // console.log(13, data);
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
    })
    .catch((err) => {
      console.log(err);
    });
}
render();

// render checkout-left for checkout page
function renderCheckoutLeft() {
  $.ajax({
    url: "/api/user/findOrder",
    type: "POST",
  })
    .then((data) => {
      // console.log(62, data);
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
      let dayToDeliveried = "";
      switch (dayNumber) {
        case 0:
          dayToDeliveried = "Chủ nhật";
          break;
        case 1:
          dayToDeliveried = "Thứ hai";
          break;
        case 2:
          dayToDeliveried = "Thứ ba";
          break;
        case 3:
          dayToDeliveried = "Thứ tư";
          break;
        case 4:
          dayToDeliveried = "Thứ năm";
          break;
        case 5:
          dayToDeliveried = "Thứ sáu";
          break;
        case 6:
          dayToDeliveried = "Thứ bảy";
          break;
      }

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
    })
    .catch((err) => {
      console.log(err);
    });
}

renderCheckoutLeft();

// Change address button
$(".payment-options-button-confirm").on("click", () => {
  let idChecked = $(".payment-options-checkbox:checked").attr("id");
  $.ajax({
    url: "/api/user/updatePaymentMethod",
    type: "PUT",
    data: {
      methodPayment: idChecked,
    },
  })
    .then((data) => {
      if (data.nModified !== 0) {
        renderOrderConfirm();
      }
    })
    .catch((err) => {
      console.log(errr);
    });
});
// function xác nhận thông tin đơn hàng
function renderOrderConfirm() {
  $(".checkout-infomation").html("");
  $(".deliveried-address").html("");
  $.ajax({
    url: "/api/user/findOrder",
    type: "POST",
  })
    .then((data) => {
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
        window.location.href = "http://localhost:3000/";
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// function convert number to VND format
function numberToCurrency(number) {
  let formatedNumber = number.toLocaleString("en-US", {
    style: "currency",
    currency: "VND",
  });
  return formatedNumber;
}
