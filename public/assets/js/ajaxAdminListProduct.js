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
