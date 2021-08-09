function renderFirts(){
renderTableProduct();

  $('#pagi').pagination({
    dataSource: '/api/product?page=1',
    locator: 'data',
    totalNumberLocator: function(response) {
        console.log(12, response);
        return response.total;
    },
    pageSize: 6,
    afterPageOnClick: (event, pageNumber) => {
      renderTableProduct(pageNumber)
    },
    afterPreviousOnClick: (event, pageNumber) => {
      renderTableProduct(event, pageNumber)
    },
    afterNextOnClick: (event, pageNumber) => {
      renderTableProduct(event, pageNumber)
    }
  })
}
renderFirts()


async function renderTableProduct(page) {
  $('.admin-list-product').html('');
    try {
      let data = await $.ajax({
        url: "/api/product?page=" + page,
        type: "GET",
      });
      console.log(8, data);
      data.data.map((data) => {
        let div = ``;
        div=`
        <tr>
            <td><a href="#"><img src="${data.img[0]}" alt=""></a></td>
            <td>${data.name}</td>
            <td>${data.codeProduct}</td>
            <td>$${data.price}</td>
            <td>${data.quantity}</td>
            <td>${data.trademarkId.name}</td>
            <td>
                <p class="status status-paid">Paid</p>
             </td>
             <td>
                <button onclick="DeleteProduct('${data._id}')">X</button>
                <button onclick="UpdateProduct('${data._id}')">sửa</button>

             </td>
        </tr>
        `
        $('.admin-list-product').append(div);
      });
      
    } catch (error) {
      console.log(error);
    }
  }
  
async function DeleteProduct(id) {
  if (confirm('Are you sure you want to save this thing into the database?')) {
    try {
      let data = await $.ajax({
        url: "/api/product",
        type: "DELETE",
        data:{
            id : id,
        }
      }); 
      if(data.status == 200){
        renderTableProduct();
      }
      
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Thing was not saved to the database.');
  }
}

// listening Search bar
$('.body_admin-right-header-navbar-search-input').on('keydown', (e)=>{
 if(e.keyCode === 13){
  renderSearchBar();
 }
})
// function to render equal from search bar
async function renderSearchBar(){
  try {
    let userString = removeVietnameseTones( $('.body_admin-right-header-navbar-search-input').val().toLowerCase() )  ;
    let data = await $.ajax({
      url: "/api/product",
      type: "GET",
    });
    // get array include product filtered
    let arrProductFilter = [];
    data.forEach( item => {
      if ( item.name ){
        let productName = removeVietnameseTones( item.name.toLowerCase() );
        if( productName.includes( userString ) ){
          arrProductFilter.push(item)
        }
      }
    });

    // render equal 
    $('.admin-list-product').html('');
    arrProductFilter.map((item) => {
      let div = ``;
      div=`
      <tr>
          <td><a href="#"><img src="${item.img[0]}" alt=""></a></td>
          <td>${item.name}</td>
          <td>${item.codeProduct}</td>
          <td>$${item.price}</td>
          <td>${item.quantity}</td>
          <td>${item.trademarkId.name}</td>
          <td>
              <p class="status status-paid">Paid</p>
           </td>
           <td>
              <button onclick="DeleteProduct('${item._id}')">X</button>
              <button onclick="UpdateProduct('${item._id}')">sửa</button>

           </td>
      </tr>
      `
      $('.admin-list-product').append(div);
    });
    
  } catch (error) {
    console.error(error);
  }

};

// function to filter array include product names


// function to convert vietnamese tones
function removeVietnameseTones(str) {
  if ( !alphanumeric(str) ){

    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces

    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    return str;
  }else {
    return str
  }
}


// function check exist of special character in string
function alphanumeric(inputtxt) {

  inputtxt = inputtxt.replace(/\s/g, "");
  var letterNumber = /^[0-9a-zA-Z]+$/;
  if (inputtxt.match(letterNumber)) {
    return true;
  } else {
    return false;
  }
  
}