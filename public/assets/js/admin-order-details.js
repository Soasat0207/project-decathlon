$('#myList a').on('click', function (e) {
    e.preventDefault()
    $('.list-group-item').removeClass('active');
    $('.tab-pane').removeClass('active');
    $(this).addClass('active');
    console.log($(this).attr('href'));
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