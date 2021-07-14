async function renderTableProduct() {
  $('.admin-list-product').html('');
    try {
      let data = await $.ajax({
        url: "/api/product",
        type: "GET",
      });
      data.map((data) => {
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
                <button onclick="DeleteColor('${data._id}')">X</button>
             </td>
        </tr>
        `
        $('.admin-list-product').append(div);
      });
      
    } catch (error) {
      console.log(error);
    }
  }
renderTableProduct();
  
async function DeleteColor(id) {
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