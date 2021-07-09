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
async function checklogin(){
    let token = getCookie('token')
    try {
      let data = await $.ajax({
        url: "/api/account/checkcookie",
        type: "POST",
        data:{
          token:token,
        },
      });
      
      if(data.status == 200){
        let link = window.location.href;
        if(link.slice(link.lastIndexOf('/'),link.length) == "/admin-list-product"){
          console.log('ok')
        }
        else{
          location.href="/admin-list-product";
        }
       
      }
    } catch (error) {
      let link = window.location.href;
      if(link.slice(link.lastIndexOf('/'),link.length) == "/admin-login"){
        console.log('ok')
      }
      else{
        location.href="/admin-login";
      }
      console.log(error);
    }
}
checklogin();