$(document).ready(function() {
  // show only tab pane
  $('#myList a').on('click', function (e) {
    e.preventDefault();
    $('.list-group-item').removeClass('active');
    $('.tab-pane').removeClass('active');
    $(this).addClass('active');
    
    let link = $(this).attr('href');
    if( link === "#userInfo" ){
      $('#userInfo').addClass('active');
    }else if( link === "#listProduct" ){
      $('#listProduct').addClass('active');
    }else if( link === "#status" ){
      $('#status').addClass('active');
    }else if( link === "#addressDeliveried" ){
      $('#addressDeliveried').addClass('active');
    }else if( link === "#orderDate" ){
      $('#orderDate').addClass('active');
    }else if( link === "#paymentMethod" ){
      $('#paymentMethod').addClass('active');
    }else if( link === "#totalPrice" ){
      $('#totalPrice').addClass('active');
    }
  })
  
  // render order details function
  let link = window.location.href;
  let orderId = link.slice(link.lastIndexOf('/') + 1, link.length)
  console.log(29, orderId);
  async function renderOrderDetails(){
  try {
    let data = await $.ajax({
      url: '/api/user/findOrderDetails/'+orderId,
      type: 'POST'
    })
    if(data){
      //  user infomation
      let userInfo = `
      <div class="row">
        <div class="col-md-4">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5">
          <img class="rounded-circle" src="https://icon-library.com/images/google-user-icon/google-user-icon-11.jpg" 
          style="object-fit:fill;
                   width:250px;
                   height:250px;
                   border: solid 1px #CCC"/>
            <span class="font-weight-bold">${data.userId.role}</span>
            <span class="text-black-50">${data.userId.email}</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-center align-items-center mb-3">
                <h2 class="text-right">Profile details</h2>
            </div>
            <div class="row mt-2">
                <div class="col-md-6">
                  <label class="labels">Username</label>
                  <input type="text" class="form-control" value="${data.userId.username}" placeholder="firstname" disabled>
                </div>
                <div class="col-md-6">
                  <label class="labels">Fullname</label>
                  <input type="text" class="form-control" value="${data.userId.firstname} ${data.userId.lastname}" placeholder="fullname" disabled>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-12">
                  <label class="labels">PhoneNumber</label>
                  <input type="text" class="form-control" placeholder="phone number" value="${data.userId.phone}" disabled>
                </div>
                <div class="col-md-12">
                  <label class="labels">Gender</label>
                  <input type="text" class="form-control" placeholder="gender" value="${data.userId.gender}" disabled>
                </div>
                <div class="col-md-12">
                  <label class="labels">Main address</label>
                  <input type="text" class="form-control" placeholder="address" value="${data.userId.mainAddress}" disabled>
                </div>
                <div class="col-md-12">
                  <label class="labels">Sub address</label>
                  <input type="text" class="form-control" placeholder="address" value="${data.userId.subAddress}" disabled>
                </div>
                <div class="col-md-12">
                  <label class="labels">Status</label>
                  <input type="text" class="form-control" placeholder="Status" value="${data.userId.status}" disabled>
                </div>
                <div class="col-md-12">
                  <label class="labels">Decription</label>
                  <input type="text" class="form-control" placeholder="decription" value="${data.userId.description}" disabled>
                </div>
            </div>
          </div>
        </div>
      </div>
      `
      $('.user-Info').append(userInfo)
    // List product
      let arrayProduct = data.product;
      let totalPrice = 0;
      arrayProduct.forEach(item =>{
        // calculate price
        let productInfo = item.productId;
        let pricePerOneUnit = parseInt(productInfo.price.replace(/\,/g, ""));
        let unit = parseInt(item.quantity)
        let totalAProduct = pricePerOneUnit*unit;
        totalPrice += totalAProduct;
        pricePerOneUnit = numberToCurrency(pricePerOneUnit);
        totalAProduct = numberToCurrency(totalAProduct)
        let listproduct = `
        <div class="d-flex justify-content-center row">
          <div class="col-md-10">
            <div class="row p-2 bg-white border rounded">
              <div class="col-md-3 mt-1 d-flex align-items-center">
                <img class="img-fluid img-responsive rounded product-image" src="${item.productId.imgColor[0]}">
              </div>
              <div class="col-md-6 mt-1">
                <h2>${productInfo.name}</h2>
                <div class="d-flex flex-row">
                    <div class="ratings mr-2">
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </div>
                    <span>Ratings</span>
                </div>
                <div class="d-flex flex-column">
                  <p><i class="fas fa-arrow-square-right"></i> TradeMark : ${productInfo.trademarkId.name}</p>
                  <p><i class="fas fa-arrow-square-right"></i> Category : ${productInfo.categoryProductId.name}</p>
                  <p><i class="fas fa-arrow-square-right"></i> Color : ${productInfo.colorId.name}</p>
                  <p><i class="fas fa-arrow-square-right"></i> Size : ${productInfo.sizeId.size}</p>
                  <p><i class="fas fa-arrow-square-right"></i> Level : ${productInfo.levelId.level}</p>
                  <p><i class="fas fa-arrow-square-right"></i> Inventory : ${productInfo.quantity} ${productInfo.unit}<br></p>
                  <p><i class="fas fa-arrow-square-right"></i> Supplier : ${productInfo.supplierId.name}<br></p>
                </div>
                <p class="text-justify text-truncate para mb-0"><i class="fas fa-arrow-square-right"></i> ${productInfo.descriptionShort}<br><br></p>
              </div>
              <div class="d-flex flex-column justify-content-center align-items-center col-md-3 border-left mt-1">
                  <span>Price: <strong>${pricePerOneUnit}</strong></span>
                  <span>Quantity: <strong>${unit}</strong></span>
                  <span>Total: <strong>${totalAProduct}</strong></span>
              </div>
            </div>
          </div>
        </div>
        `
        $('.list-product').append(listproduct)
      })
  // Order Status
    $('#status').append(`<div>Order status: <strong>${data.status}</strong></div>`)
  // Address delivery
      let addressDeliveried = `
      <div class="d-flex justify-content-center"><h2>Address details</h2></div>
      <table style="width:100%">
        <tr>
            <td>Full name</td>
            <td><strong>${data.address.firstName} ${data.address.lastName}</strong></td>
        </tr>
        <tr>
            <td>Address deliveried</td>
            <td><strong>${data.address.ward} - ${data.address.district} - ${data.address.province}</strong></td>
        </tr>
        <tr>
            <td>Phone number</td>
            <td><strong>${data.address.phone}</strong></td>
        </tr>
      </table>
      `
    $('#addressDeliveried').append(addressDeliveried)
  //  Order date
      let orderDateCre = new Date(data.orderDate)
      let date = orderDateCre.getDate();
      let month = orderDateCre.getMonth();
      let year = orderDateCre.getFullYear();
      let orderDate = `
      <div class="d-flex flex-column">
        <span><h2>Order date deliveried</h2></span>
        <span><strong>Ngày ${date} tháng ${month} năm ${year}</strong></span>
      </div>
      `
      $('#orderDate').append(orderDate)
  //  Payment method
      let method = "";
      if( data.methodPayment === "CashByCod" ){
        method = "Payment by Cash on Delivery "
      }else if( data.methodPayment === "CashByZalopay" ){
        method = "Payment by Cash by Zalopay "
      }else if( data.methodPayment === "CashByVisa" ){
        method = "Payment by Cash by ViSa Cart "
      }
      let paymentMethod = `
      <div class="d-flex flex-column">
        <span><h2>Payment method</h2></span>
        <span style="color:green"><i class="fad fa-dollar-sign"></i><strong> ${method}</strong> <i class="fad fa-dollar-sign"></i></span>
      </div>
      `
      $('#paymentMethod').append(paymentMethod)
  // Total Price
    totalPrice = numberToCurrency(totalPrice);
    let  totalPricePage = `
        <div class="d-flex flex-column">
          <span><h2>Total price of order</h2></span>
          <span style="color:pink; font-size: 24px"><i class="far fa-ellipsis-h"></i><strong> ${totalPrice}</strong> <i class="far fa-ellipsis-h"></i></span>
        </div>
        `;
    $('#totalPrice').append(totalPricePage);
    }  // end condition 
  
  } catch (error) {
    console.log(error);
  }
  }
  renderOrderDetails()
  
  
  
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
});