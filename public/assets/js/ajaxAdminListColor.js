async function renderTableColor() {
  $('.admin-list-color').html('')
    try {
      let data = await $.ajax({
        url: "/api/color",
        type: "GET",
      });
      
      data.map((data,index) => {
        let div = ``;
        div=`
        <tr class="${index}">
            <td><p style="padding:10px;background:${data.colorCode}"></p></td>
            <td>${data.colorCode}</td>
            <td>${data.name}</td> 
            <td>
              <button onclick="DeleteColor('${data._id}')">X</button>
              <button onclick="UpdateModalColor('${data._id}')">Sửa</button>
            </td> 
        </tr>
        `
        $('.admin-list-color').append(div);
        $(`.${index}`).dblclick(()=>{
          
          UpdateModalColor(data._id)
        })
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
async function UpdateModalColor(id) {
  modal.style.display = "block";
  let colorCode = $('.page-content-form_code').val();
  let name = $('.page-content-form_name').val();
  try {
    let data = await $.ajax({
      url: "/api/color/find",
      type: "POST",
      data:{
          id:id,
      }
    });
    if(data.status == 200){
      $('.page-content-form_code').val(data.data.colorCode);
      $('.page-content-form_name').val(data.data.name);
      let div=`
      <button onclick="UpdateColor('${data.data._id}')"  class="form-submit page-content-card-form-btn">SAVE PRODUCT</button>
      `;
      $('.btn-form-add-color').append(div);
    }
  } catch (error) {
    console.log(error);
  }
}
async function UpdateColor(id) {
  console.log(id);
  let colorCode = $('.page-content-form_code').val();
  let name = $('.page-content-form_name').val();
  try {
    let data = await $.ajax({
      url: "/api/color",
      type: "PUT",
      data:{
          id:id,
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
  
async function DeleteColor(id) {
  if (confirm('Are you sure you want to save this thing into the database?')) {
    try {
      let data = await $.ajax({
        url: "/api/color",
        type: "DELETE",
        data:{
            id : id,
        }
      }); 
      if(data.status == 200){
        renderTableColor();
      }
      
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Thing was not saved to the database.');
  }

}
