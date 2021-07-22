Validator({
    form:'#formAddBannerSale',
    errorSelector:'.form-message',
    errorRed:'invalid',
    rules:[
        Validator.isRequired('.page-content-form_description','Vui lòng nhập trường này'),
    ],
    onSubmit:function(){
        createBannerSale();
    }
})
async function createBannerSale() {
    let myForm = document.getElementById('formAddBannerSale');
    let formData = new FormData(myForm);
    for(var pair of formData.entries()) {
        console.log(pair[0],pair[1]);
     }   
    try {
      let data = await $.ajax({
        url: "/api/BannerSale",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
      });
      if(data.status == 200){
        alert(data.message);
        location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
}