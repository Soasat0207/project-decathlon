
$.ajax({
  url: "/api/user/",
  type: "GET",
})
  .then((data) => {
    let arrProductID = data.product;
    arrProductID.forEach((item) => {
      // console.log(item.productId);
      getInfoProduct(item)
    });
  })
  .catch((err) => {
    console.log("Server error");
  });

  // function to get infomation of product
function getInfoProduct(productId) {
    $.ajax({
      url: "/api/user/productInfo",
      type: "POST",
      data: productId,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Server error");
      });
  }


// when user click "-" button 
$('.cart-items-quantity-btn-decrease').on('click', ()=>{
   let decreaseQuantity = parseInt($('.cart-items-quantity-input').val());
   if(decreaseQuantity > 1 && decreaseQuantity <= 5){
    decreaseQuantity--;
   }
   $('.cart-items-quantity-input').val(decreaseQuantity);
})
// when user click "+" button 
$('.cart-items-quantity-btn-increase').on('click', ()=>{
    let increaseQuantity = parseInt($('.cart-items-quantity-input').val());
    if( increaseQuantity >= 1 && increaseQuantity < 5){
        increaseQuantity++;
    }
    $('.cart-items-quantity-input').val(increaseQuantity);
 })