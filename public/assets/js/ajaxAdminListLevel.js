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
 async function renderLevel() {
 $('.admin-list-color').html('')
   try {
     let data = await $.ajax({
       url: "/api/level",
       type: "GET",
     });
     data.map((data,index) => {
       let div = ``;
       div=`
       <tr class="${index}">
           <td><p>${data.level}</p></td>
           <td>${data.description}</td>
           <td>
             <button onclick="DeleteLevel('${data._id}')">X</button>
             <button onclick="UpdateModalLevel('${data._id}')">Sửa</button>
           </td> 
       </tr>
       `
       $('.admin-list-color').append(div);
       $(`.${index}`).dblclick(()=>{ 
        UpdateModalLevel(data._id)
       })
     });
     
     
   } catch (error) {
     console.log(error);
   }
 }
 renderLevel();
async function AddLevel() {
 let description = $('.page-content-form_description').val();
 let level = $('.page-content-form_level').val();
 try {
   let data = await $.ajax({
     url: "/api/level",
     type: "POST",
     data:{
         description:description,
         level:level,
     }
   });
   if(data.status == 200){
    alert(data.message);
    disableModal();
    renderLevel();
   }
   
 } catch (error) {
   console.log(error);
 }
}
async function UpdateModalLevel(id) {
    enableModal();
    try {
      let data = await $.ajax({
        url: "/api/level/find",
        type: "POST",
        data:{
            id:id,
        }
      });
      if(data.status == 200){
        $('.page-content-form_description').val(data.data.description);
        $('.page-content-form_level').val(data.data.level);
        let div=`
        <button type="button" onclick="UpdateLevel('${data.data._id}')"  class="form-submit page-content-card-form-btn">SAVE PRODUCT</button>
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
  async function UpdateLevel(id) {
    let description = $('.page-content-form_description').val();
    let level = $('.page-content-form_level').val();
    try {
      let data = await $.ajax({
        url: "/api/level",
        type: "PUT",
        data:{
            id:id,
            description:description,
            level:level,
        }
      });
      if(data.status == 200){
        alert(data.message);
        disableModal();
        renderLevel();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function DeleteLevel(id) {
    if (confirm('Are you sure you want to save this thing into the database?')) {
      try {
        let data = await $.ajax({
          url: "/api/level",
          type: "DELETE",
          data:{
              id : id,
          }
        }); 
        if(data.status == 200){
            renderLevel();
        }
        
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Thing was not saved to the database.');
    }
  
  }