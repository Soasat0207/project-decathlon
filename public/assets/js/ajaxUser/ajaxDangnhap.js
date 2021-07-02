// Đăng ký
$(".nutTiep").on("click", async () => {
    console.log($(".gender:checked").val());

try{
    if($(".taikhoandangky").val().length <8){
        console.log('username qua ngan');
        $('.thongBao').html('username qua ngan')
    }
    else{
        let data = await $.ajax({
        
            url: '/api/nguoidung/dangky',
            type: 'post',
            data: {
                username: $(".taikhoandangky").val(),
                password: $(".matkhaudangky").val(),
                firstname: $(".tendemdangky").val(),
                lastname: $(".hodangky").val(),
                email: $(".emaildangky").val(),
                phone: $(".sdtdangky").val(),
                gender: $(".gender:checked").val(),
            }
        })
        if(data){
            console.log(data);
            window.location.href = '/dangnhap'
        }
    }
}
catch(error){
    console.log(error);
}
})

// Đăng nhập
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

$(".dangNhap").on("click", async ()=>{
try{
    let data = await $.ajax({
        url: "/api/nguoidung/dangnhap",
        type: "post",
        data: {
            username: $(".taikhoandangnhap").val(),
            password: $(".matkhaudangnhap").val()
        }    
    })
    console.log(data);
    if(data._id){
        console.log(data.id);
        setCookie('user', data._id, 30);
        window.location.href = "/nguoidung"
    }
}
catch(error){
    console.log(error);
}
})
$('.taikhoandangnhap').on('keyup',function enter(e){
    if (e.keyCode === 13) {
        console.log($('.taikhoandangnhap').val());
        $('.dangNhap').trigger('click');
      }
})
$('.matkhaudangnhap').on('keyup',function enter(e){
    if (e.keyCode === 13) {
        console.log($('.matkhaudangnhap').val());
        $('.dangNhap').trigger('click');
      }
})

function chuyentrangdangky(){
    window.location.href = "/dangky"
}
