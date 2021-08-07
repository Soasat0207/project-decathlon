window.onscroll = function() {
    scrollFunction()
}
function scrollFunction(){ 
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        document.querySelector('.navbar').classList.add('navbar-fiexd');
        document.querySelector('.grad-bar').classList.add('navbar-fiexd');

    }
    else{
        document.querySelector('.navbar').classList.remove('navbar-fiexd');
        document.querySelector('.grad-bar').classList.remove('navbar-fiexd');
    }
}

//Append avatar for My Account
$.ajax({
    url: '/api/cus/information',
    type: 'get',
})
.then((data) => {
    if(data){
        $('.myAccount').attr('data-i18n','')
        $('.myAccount').html(data.firstname)

        $('.avatarNav').attr('src', data.avatar)
    }

})
.catch((err) => {
    console.log(err);
})

let cookieValue =  getCookie('user') 
if( cookieValue ){
    $(".hoverIF").mouseenter(function() {
        $('.hoverIF01').css("display", "block");
    }).mouseleave(function() {
        $('.hoverIF01').css("display", "none");
    });
}
 function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

// Sign out
$(".signoutNAV").on("click", () => {
    $.ajax({
        url: "/api/cus/blacklist",
        type: "post"
    })
    .then((data) =>{
        if(data){
            delete_cookie('user')
            window.location.href = '/login-cus'
        }
    })
    .catch((err) => {
        console.log(err);
    })
})