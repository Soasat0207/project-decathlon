// Chèn thông tin vào trang

$.ajax({
    url:'/api/nguoidung/',
    type:'GET'
})
.then((data)=>{
    let email 
    if(data.mes != "success"){
        window.location.href = "/dangnhap"
    }
    if(data.e.email){
        email=data.e.email
    }else{
        email='chua co user'
    }
    $('.email').append(email)
    }
)



// check cookies trang user
// $.ajax({
//     url: "/api/nguoidung/checkcookies",
//     type: "post",
// })
// .then((data) => {
//     if(data !== 'Đã đăng nhập'){
//         window.location.href = "/dangnhap"
//     }
// })
// .catch((err) => {
//     console.log(err);
// })

// Cập nhập thêm thông tin
