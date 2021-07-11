function tiengviet2 (){
    $(".annen").css("display","flex")
    $(".bangngonngu").css("display","flex")
    
    
}

function nutthoat(){
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
function nutChuyenDK(){
    window.location.href = '/dangky'
}

// Nút đăng nhập
async function nutdangnhap(){
    try{
        let data = await $.ajax({
            url: '/api/nguoidung/dangnhap',
            type: 'post',
            data:{
                username: $('.taikhoan').val(),
                password: $('.matkhau').val(),
            }
        })
        if(data.status == 200){
            setCookie('user', data.data, 30);
            window.location.href = '/nguoidung';
        }
    }
    catch(error){
        console.log(error);
    }
}

// Đăng nhập bằng enter
$('.taikhoan').on("keyup", (event)=>{
    if (event.keyCode === 13) {
        event.preventDefault();
        nutdangnhap()
       }
})

$('.matkhau').on("keyup", (event)=>{
    if (event.keyCode === 13) {
        event.preventDefault();
        nutdangnhap()
       }
})


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
