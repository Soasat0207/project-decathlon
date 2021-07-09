Validator({
    form:'#formAddAccount',
    errorSelector:'.form-message',
    errorRed:'invalid',
    rules:[
        Validator.isRequired('.page-content-form_username','Vui lòng nhập trường này'),
        Validator.isRequired('.page-content-form_password','Vui lòng nhập trường này'),
    ],
    onSubmit:function(){
        createAccount();
    }
})
Validator({
    form:'#formlogin',
    errorSelector:'.form-message',
    errorRed:'invalid',
    rules:[
        Validator.isRequired('.username','Vui lòng nhập trường này'),
        Validator.isRequired('.password','Vui lòng nhập trường này'),
    ],
    onSubmit:function(){
        loginAdmin();
    }
})
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  var delete_cookie = function(name) {
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };
async function createAccount() {
    let myForm = document.getElementById('formAddAccount');
    let formData = new FormData(myForm);   
    for(var pair of formData.entries()) {
        console.log(pair[0] , pair[1]);
     }  
    try {
      let data = await $.ajax({
        url: "/api/account",
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
async function loginAdmin(){  
    let password = $('.password').val();
    let username = $('.username').val();
    try {
        let data = await $.ajax({
          url: "/api/account/login",
          type: "POST",
          data:{
            password: password,
            username: username,
          },
        });
        
        if(data.status == 200){
            alert(data.message);
            setCookie('token',data.token,1);
        //   location.href="/admin-list-product";
        }
      } catch (error) {
        console.log(error);
      }
}