  // Get the modal
    var modal = document.querySelector(".modal");
    // Get the button that opens the modal
    var btn = document.querySelector(".openModal");
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
async function renderTrademark() {
    $('.admin-list-color').html('')
      try {
        let data = await $.ajax({
          url: "/api/trademark",
          type: "GET",
        });
        data.map((data,index) => {
          let div = ``;
          div=`
          <tr class="${index}">
              <td><p>${data.name}</p></td>
              <td>${data.description}</td>
              <td>
                <button onclick="DeleteTradeMark('${data._id}')">X</button>
                <button onclick="UpdateModalColor('${data._id}')">Sửa</button>
              </td> 
          </tr>
          `
          $('.admin-list-color').append(div);
          $(`.${index}`).dblclick(()=>{ 
            UpdateModalTradeMark(data._id)
          })
        });
        
        
      } catch (error) {
        console.log(error);
      }
    }
renderTrademark();
async function AddTrademark() {
    let description = $('.page-content-form_description').val();
    let name = $('.page-content-form_name').val();
    try {
      let data = await $.ajax({
        url: "/api/trademark",
        type: "POST",
        data:{
            description:description,
            name:name,
        }
      });
      if(data.status == 200){
        renderTrademark();
      }
      
    } catch (error) {
      console.log(error);
    }
}
async function UpdateModalTradeMark(id) {
  modal.style.display = "block";
  try {
    let data = await $.ajax({
      url: "/api/trademark/find",
      type: "POST",
      data:{
          id:id,
      }
    });
    if(data.status == 200){
      $('.page-content-form_description').val(data.data.description);
      $('.page-content-form_name').val(data.data.name);
      let div=`
      <button onclick="UpdateTradeMark('${data.data._id}')"  class="form-submit page-content-card-form-btn">SAVE PRODUCT</button>
      `;
      $('.btn-form-add-color').append(div);
    }
  } catch (error) {
    console.log(error);
  }
}
async function UpdateTradeMark(id) {
  let description = $('.page-content-form_description').val();
  let name = $('.page-content-form_name').val();
  try {
    let data = await $.ajax({
      url: "/api/trademark",
      type: "PUT",
      data:{
          id:id,
          description:description,
          name:name,
      }
    });
    if(data.status == 200){
      alert(data.message);
      renderTrademark();
    }
  } catch (error) {
    console.log(error);
  }
}
async function DeleteTradeMark(id) {
  if (confirm('Are you sure you want to save this thing into the database?')) {
    try {
      let data = await $.ajax({
        url: "/api/trademark",
        type: "DELETE",
        data:{
            id : id,
        }
      }); 
      if(data.status == 200){
        renderTrademark();
      }
      
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Thing was not saved to the database.');
  }

}