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

// Nhập thông tin đăng ký
async function nutDangky(){
    try{
        let data = await $.ajax({
            url: '/api/nguoidung/dangky',
            type: 'post',
            data: {
                username: $('.taikhoan2').val(),
                password: $('.matkhau2').val(),
                firstname: $('.ten2').val(),
                lastname: $('.ho2').val(),
                phone: $('.sdt2').val(),
                gender: $('.nam2').val(),
                gender: $('.nu2').val(),
                email: $('.email2').val(), 
            }
        })
        if(data){
            console.log(data);
        }
    }
    catch(error){
        console.log(error);
    }
}

function nutchuyenDN(){
    window.location.href = '/dangnhap'
}