    // Get the modal
    var modal = document.getElementById("myModal");
    // Get the button that opens the modal
    var btn = document.getElementById("openModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
      modal.style.display = "block";
    } 
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    } 
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
function disableModal() {
  modal.style.display = "none";
  $('.page-content-form_code').val('');
  $('.page-content-form_name').val('');
}
function enableModal() {
  modal.style.display = "block";
  $('.page-content-form_code').val('');
  $('.page-content-form_name').val('');
}
async function renderTableSupplier() {
    $('.admin-list-color').html('')
      try {
        let data = await $.ajax({
          url: "/api/supplier",
          type: "GET",
        });
        
        data.map((data,index) => {
            console.log(data)
          let div = ``;
          div=`
          <tr class="${index}">
              <td><p>${data.name}</p></td>
              <td>${data.description}</td>
              <td>${data.email}</td> 
              <td>${data.phone}</td> 
              <td>${data.status}</td> 
              <td>
                <button onclick="DeleteSupplier('${data._id}')">X</button>
                <button onclick="UpdateModalColor('${data._id}')">Sửa</button>
              </td> 
          </tr>
          `
          $('.admin-list-color').append(div);
          $(`.${index}`).dblclick(()=>{
            UpdateModalSupplier(data._id)
          })
        });
        
        
      } catch (error) {
        console.log(error);
      }
    }
renderTableSupplier();
async function AddSupplier() {
    let name = $('.page-content-form_name').val();
    let description = $('.page-content-form_description').val();
    let email = $('.page-content-form_email').val();
    let phone = $('.page-content-form_phone').val();
    let status = $('.page-content-form_status').val();
    try {
      let data = await $.ajax({
        url: "/api/supplier",
        type: "POST",
        data:{
            description:description,
            name:name,
            email:email,
            phone:phone,
            status:status,
        }
      });
      if(data.status == 200){
        alert(data.message);
        disableModal();
        renderTableSupplier();
      }
      
    } catch (error) {
      console.log(error);
    }
}
async function UpdateModalSupplier(id) {
    enableModal()
    try {
      let data = await $.ajax({
        url: "/api/supplier/find",
        type: "POST",
        data:{
            id:id,
        }
      })
      if(data.status == 200){
        $('.page-content-form_name').val(data.data.name);
        $('.page-content-form_description').val(data.data.description);
        $('.page-content-form_email').val(data.data.email);
        $('.page-content-form_phone').val(data.data.phone);
        $('.page-content-form_status').val(data.data.status);
        let div=`
        <button type="button" onclick="UpdateSupplier('${data.data._id}')"  class="form-submit page-content-card-form-btn">SAVE PRODUCT</button>
        `;
        if($('.btn-form-add-color').children(`.page-content-card-form-btn`).length == 2){
          $('.btn-form-add-color').children(`.page-content-card-form-btn`).eq(1).remove();
          $('.btn-form-add-color').append(div);
        }
        if($('.btn-form-add-color').children(`.page-content-card-form-btn`).length == 1){
          $('.btn-form-add-color').append(div);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function UpdateSupplier(id) {
    let name = $('.page-content-form_name').val();
    let description = $('.page-content-form_description').val();
    let email = $('.page-content-form_email').val();
    let phone = $('.page-content-form_phone').val();
    let status = $('.page-content-form_status').val();
    try {
      let data = await $.ajax({
        url: "/api/supplier",
        type: "PUT",
        data:{
            id:id,
            description:description,
            email:email,
            phone:phone,
            status:status,
            name:name,
        }
      });
      if(data.status == 200){
        alert(data.message);
        disableModal();
        renderTableSupplier();
      }
    } catch (error) {
      console.log(error);
    }
}
  
async function DeleteSupplier(id) {
    if (confirm('Are you sure you want to save this thing into the database?')) {
      try {
        let data = await $.ajax({
          url: "/api/supplier",
          type: "DELETE",
          data:{
              id : id,
          }
        }); 
        if(data.status == 200){
            renderTableSupplier();
        }
        
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Thing was not saved to the database.');
    }
  
  }
  