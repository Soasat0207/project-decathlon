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
        $('.ndtk3').css('display', 'block')
        let gender
        if($('.nam2').prop("checked") == false && $('.nu2').prop("checked") == false){
            console.log('chuwa chon gioi tinh');
        }else if($('.nam2').prop("checked")){
            gender = 'nam'
        }else{
            gender = 'nu'
        }

        //-------------------------------------------
        if($('.taikhoan2').val().length < 8){
            $('.ndtk3').html('Tài khoản nhập tối thiểu 8 ký tự!')
            $('.ndtk2').html('Tài khoản nhập tối thiểu 8 ký tự!')
        }else{
            if($('.taikhoan2').val() == "" || $('.matkhau2').val() == "" || $('.ten2').val() == '' ||  $('.ho2').val() =="" || $('.sdt2').val() =="" || $('.email2').val() ==""){
                console.log("Không được để rỗng ô nhập");
                $('.ndtk2').html('Không được để rỗng ô nhập')
            }else{
                let data = await $.ajax({
                    url: '/api/nguoidung/dangky',
                    type: 'post',
                    data: {
                        username: $('.taikhoan2').val(),
                        password: $('.matkhau2').val(),
                        firstname: $('.ten2').val(),
                        lastname: $('.ho2').val(),
                        phone: $('.sdt2').val(),
                        gender: gender,
                        email: $('.email2').val(), 
                    }
                })
                //---------------------------------------
                if(data){
                    console.log(43, data);
                    if(data == 'Tài khoản đã tồn tại'){
                        $('.ndtk2').html('Tài khoản đã tồn tại')
                    }
                }
            }
        }


    }
    catch(error){
        console.log(error);
    }
}

function nutchuyenDN(){
    window.location.href = '/dangnhap'
}
