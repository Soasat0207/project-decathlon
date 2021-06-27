async function renderTableColor() {
    try {
      let data = await $.ajax({
        url: "/api/color",
        type: "GET",
      });
      
      data.map((data) => {
          console.log(data);
        let div = ``;
        div=`
        <tr>
            <td><p style="padding:10px;background:${data.colorCode}"></p></td>
            <td>${data.colorCode}</td>
            <td>${data.name}</td> 
            <td><button>X</button></td> 

        </tr>
        `
        $('.admin-list-color').append(div);
      });
      
    } catch (error) {
      console.log(error);
    }
  }
renderTableColor();
async function AddColor() {
    let colorCode = $('.page-content-form_code').val();
    let name = $('.page-content-form_name').val();
    try {
      let data = await $.ajax({
        url: "/api/color",
        type: "POST",
        data:{
            colorCode:colorCode,
            name:name,
        }
      });
      
      if(data.status == 200){
        alert(data.message);
        renderTableColor();
      }
      
    } catch (error) {
      console.log(error);
    }
}
  