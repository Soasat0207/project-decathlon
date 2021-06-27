async function renderTableProduct() {
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
        </tr>
        `
        $('.admin-list-product').append(div);
      });
      
    } catch (error) {
      console.log(error);
    }
  }
renderTableProduct();
  
  