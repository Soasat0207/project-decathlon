async function renderBannerSale() {
    $('.admin-list-color').html('')
      try {
        let data = await $.ajax({
          url: "/api/BannerSale",
          type: "GET",
        });
        data.map((data,index) => {
          let div = ``;
          div=`
          
          <tr class="${index}">
              <td><img class="bannerSaleImg" src="${data.img}"></td>
              <td>${data.description}</td>
              <td>${data.status}</td>
              <td>
                <button onclick="DeleteBannerSale('${data._id}')">X</button>
                <button onclick="UpdateModalCategory('${data._id}')">Sửa</button>
              </td> 
          </tr>
          `
          $('.admin-list-color').append(div);
          $(`.${index}`).dblclick(()=>{ 
            UpdateModalCategory(data._id)
          })
        });
        
        
      } catch (error) {
        console.log(error);
      }
    }
renderBannerSale();

async function DeleteBannerSale(id) {
    if (confirm('Are you sure you want to save this thing into the database?')) {
      try {
        let data = await $.ajax({
          url: "/api/BannerSale",
          type: "DELETE",
          data:{
              id : id,
          }
        }); 
        if(data.status == 200){
            renderBannerSale();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Thing was not saved to the database.');
    }
  
}