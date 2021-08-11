function tiengviet2 (){
    $(".annen").css("display","flex")
    $(".bangngonngu").css("display","flex")
    
    
}

function exitButton(){
    $(".annen").css("display","none")
}

$(".lang").on("click", (event) => {
    // let i = $(event.target).children()
    let list = $($(event.target).parent()[0]).children()
    for(let i = 0;i<list.length;i++){
        let icon = $(list[i]).children()[0]
        console.log(icon);
        $(icon).attr('id','')
    }
    let i = $(event.target).children()[0]
    $(i).attr("id", "active")
})

// Nút chuyển sang trang đăng ký
function switchToRegis(){
    window.location.href = '/registered-cus'
}

// Nút đăng nhập
async function loginButton(){
    try{
        let data = await $.ajax({
            url: '/api/cus/login-cus',
            type: 'post',
            data:{
                username: $('.account').val(),
                password: $('.password').val(),
            }
        })
        console.log(data);
        if(data.status == 200){
            setCookie('user', data.data, 30);
            window.location.href = '/page-cus';
        }
    }
    catch(error){
        console.log(error);
    }
}

// Đăng nhập bằng enter
$('.account').on("keyup", (event)=>{
    if (event.keyCode === 13) {
        event.preventDefault();
        loginButton()
       }
})

$('.password').on("keyup", (event)=>{
    if (event.keyCode === 13) {
        event.preventDefault();
        loginButton()
       }
})


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }


// Go back to the main page
function goback(){
    window.location.href ='/'
}

$('.comeBack1').on("click", () => {
    window.location.href ='/'
})

$('.logo').on('click', () => {
    window.location.href ='/'
})

$.ajax({
    url: '/api/cus/checkcookies',
    type: 'post'
})
.then(data => {
    if( data === 'Login successful'){
        window.location.href = "/"
    }
})
.catch(err => {
    console.log(err);
})