

function resize (){
    if($('body').width() < 768){
        $(".tabR").css("display", "none");
        $(".tabL").css("display", "block")
    }
    if($('body').width() >= 768){
        $(".tabR").css("display", "block");
        $(".tabL").css("display", "block");
        $(".nutthoat").css("display", "none")
        $('.thoat123').css("display", "none")
    }

}

$(".tabR").html("");
let bien = `
    <div class="donhang">
        <h3 class="donhang1">Đơn hàng & Trả hàng</h3>
        <div class="donhang2">
            <i class="fas fa-cart-plus"></i>
            <span>Chưa có đơn hàng!</span>
        </div>
    </div>
  
`
$(".tabR").append(bien);


function trahang() {
    $(".tabR").html("");
    let bien = `
    <div class="donhang">
        <button class="thoat123" onclick="thoat()" ><i class="fas fa-undo"></i></button>
        <h3 class="donhang1">Đơn hàng & Trả hàng</h3>
        <div class="donhang2">
            <i class="fas fa-cart-plus"></i>
            <span>Chưa có đơn hàng!</span>
        </div>
    </div>
    </div>
        </div>
    `
   $(".tabR").append(bien);

   if($('body').width() < 768){
       $(".tabR").css("display", "block");
       $(".tabL").css("display", "none")

   }    if($('body').width() >= 768){
    $(".tabR").css("display", "block");
    $(".tabL").css("display", "block");
    $(".nutthoat").css("display", "none")
    $('.thoat123').css("display", "none")
}


}

function thoat(){
    $(".tabR").css("display", "none")
    $(".tabL").css("display", "block")
    
}



function nutThongtin() {
    $(".tabR").html("");
    let bien = `
    <div class="thongtin">
    <button class="thoat123" onclick="thoat()" ><i class="fas fa-undo"></i></button>
    <h3>Thông tin cá nhân</h3>
    <div class="hang1 row">
        <div class="col-xs-12 col-md-6">Tên <input type="text" placeholder="Tên" class="ten3"></div>
        <div class="col-xs-12 col-md-6">Họ <input type="text" placeholder="Họ" class="ho3"></div>
    </div>

    <div class="hang2 row">
        <div class="col-xs-12 col-md-6">Số điện thoại <input type="number" placeholder="Số điện thoại" class="sdt3"></div>
        <div class="col-xs-12 col-md-6">Hòm thư Email <input type="text" placeholder="Hòm thư Email" class="email3"></div>
    </div>

    <div class="hang3">
        <div class="ngaysinh">
        <p>Ngày sinh</p>
        <input class="ngaysinh3" type="date">
        </div>
        <p class="gioitinh3">Giới tính</p>
        <div class="gioitinh1">
            <div><input type="radio" name="giotinh" id="" class='nam3'></input><p>Nam</p></div>
            <div><input type="radio" name="giotinh" id="" class = 'nu3'></input><p>Nữ</p></div>
        </div>
    </div>

    <div>
    <p>Ảnh đại diện</p>
    <form>
        <img class="avacus" src="" alt="">
        <input type="file" name="avatarUser" multiple>
    </form>
    </div>

    <div class="hang5">
        <div>
            <input type="checkbox" name="" id="">
            <p>Tôi đã đọc và đồng ý với <a href="">Điều khoản và Điều kiện</a></p>
        </div>
        <button onclick="nutLuuthongtin()">Lưu</button>
    </div>
    </div>
    `
    $(".tabR").append(bien);

    $.ajax({
        url: '/api/cus/information',
        type: 'get',
    })
    .then((data) => {
        console.log(data);
        let ten;
        let ho;
        let email;
        let sdt;
        let gender;
        let birthday;
        let avatar;
        if(data){
            ten = data.firstname;
            ho = data.lastname;
            email = data.email;
            sdt = data.phone;
            gender = data.gender;
            birthday = data.birthday.slice('0', '10');
            avatar = data.avatar;
        }
        $('.avacus').attr('src', avatar) 
        $(".ten3").val(ten);
        $(".ho3").val(ho);
        $(".email3").val(email);
        $(".sdt3").val(sdt);
        $(".ngaysinh3").val(birthday);
        if(gender == 'nu'){
            $('.nu3').prop("checked", true)
        }else{
            $('.nam3').prop("checked", true)
        }
    })
    .catch((err) => {
        console.log(err);
    })

    if($('body').width() < 768){
        $(".tabR").css("display", "block");
        $(".tabL").css("display", "none")
 
    }    if($('body').width() >= 768){
        $(".tabR").css("display", "block");
        $(".tabL").css("display", "block");
        $(".nutthoat").css("display", "none")
        $('.thoat123').css("display", "none")
    }

 
}

function nutDiachi() {
    $(".tabR").html("");
    let bien = `
    <div class="diachi">
    <button class="thoat123" onclick="thoat()"><i class="fas fa-undo"></i></button>
        <h3>Địa chỉ</h3>
        <button onclick="nutThemdiachi()">
            <i class="fas fa-plus"></i>
            <p>Thêm địa chỉ mới</p>
        </button>
    </div>
    `
    $(".tabR").append(bien)

    $.ajax({
        url: '/api/cus/information',
        type: 'get',
    })
    .then((data) => {
        let diachi;
        let ghichu;
        let thanhpho
        let bien2;
        if(data.mainAddress){
            diachi = data.mainAddress;
            ghichu = data.noteAddress;
            thanhpho = data.city;
            $(".tabR").html("");
            bien2 =`
            <div class="diachi">
            <button class="thoat123" onclick="thoat()"><i class="fas fa-undo"></i></button>
                <h3>Địa chỉ</h3>
                <div>
                    <div class="hangThanhpho"><p>Thành phố:</p><input type="text" class="noteThanhpho"></div>
                    <div class="hangDiachi"><p>Địa chỉ nhận hàng:</p><textarea name="" id="" cols="30" rows="10" class="diachinhanhang"></textarea></div>
                    <div class="hangGhichu"><p>Ghi chú:</p><textarea name="" id="" cols="30" rows="10" class="ghichu"></textarea></div>
                </div>
                <button class="nutdiachi4" onclick="suadiachi()">Sửa</button>
            </div>
            `
            $(".tabR").append(bien2);
            $(".diachinhanhang").append(diachi);
            $(".ghichu").append(ghichu);
            $('.noteThanhpho').val(thanhpho);
        }
        
    })
    .catch((err) => {
        console.log(err);
    })

    if($('body').width() < 768){
        $(".tabR").css("display", "block");
        $(".tabL").css("display", "none")
 
    }    if($('body').width() >= 768){
        $(".tabR").css("display", "block");
        $(".tabL").css("display", "block");
        $(".nutthoat").css("display", "none")
        $('.thoat123').css("display", "none")
    }

 }

function nutThemdiachi() {
    let bien =`
    <div class="anNen">
        <div class="themdiachi">
            <div class="hangdiachi1">
                <h3>Thêm địa chỉ mới</h3>
                <button onclick="nutThoatdiachi()"><i class="fas fa-times"></i></button>
            </div>

            <div class="diachinhanhang">
                <input class="c" type="text" placeholder="Thành phố...">
                <textarea name="" id="" cols="30" rows="10" placeholder="Địa chỉ nhận hàng..." class="a"></textarea>
                <textarea name="" id="" cols="30" rows="10" placeholder="Ghi chú khi nhận hàng..." class="b"></textarea>
                <button onclick="luudiachi()">Lưu địa chỉ</button>

            </div>
            

        </div>
    </div>
    `
    $("body").append(bien)
    
}

function nutThoatdiachi(){
    $(".anNen").css("display", "none")
}

// Check cookies
$.ajax({
    url: '/api/cus/checkcookies',
    type: 'post',
})
.then((data) => {
    if(data !== 'Đăng nhập thành công'){
        window.location.href = '/login-cus'
    }
})
.catch((err) => {
    console.log(err);
})

// Cập nhập thông tin
async function nutLuuthongtin(){
    try{
     let data = await $.ajax({
                    url: "/api/cus/capnhap",
                    type: 'put',
                    data: {
                            firstname: $('.ten3').val(),
                            lastname: $('.ho3').val(),
                            phone: $('.sdt3').val(),
                            email: $('.email3').val(),
                            birthday: $('.ngaysinh3').val(),
                    }
                    })
                    
                    console.log(data);
                    

        let data12 = $('form')[0];
        console.log(16, data12);
        let form1 = new FormData(data12);
        let ava = await $.ajax({
                        url: "/api/cus/avataruser",
                        type: "put",
                        data: form1,
                        processData: false,
                        contentType: false,
                    })
                    console.log(15, ava.avatar);
                    $('.avacus').attr("src", ava.avatar)

        nutThongtin()              
    }
    catch(error){
        console.log(error);
    }
}

// Hiển thị email ở ô giao diện người dùng

$.ajax({
    url: '/api/cus/information',
    type: 'get',
})
.then((data) => {
    let chenEmail;
    let avatar;
    if(data){
        chenEmail = data.email;
        avatar = data.avatar;
    }
$('.avacus').attr('src', avatar)    
$('.hienthiEmail').append(chenEmail)
})
.catch((err) => {
    console.log(err);
})

// Thêm địa chỉ
function luudiachi(){
    $.ajax({
        url: '/api/cus/address',
        type: 'put',
        data:{
            mainAddress: $('.a').val(),
            noteAddress: $('.b').val(),
            city: $('.c').val(),
        }
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
}

// Sửa địa chỉ
function suadiachi(){
    $.ajax({
        url: "/api/cus/address",
        type: 'put', 
        data: {
            mainAddress: $(".diachinhanhang").val(),
            noteAddress: $(".ghichu").val(),
            city: $(".noteThanhpho").val(),
        }
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
}

// Đăng xuất
function signout(){
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
}

// Xóa Cookies khi đăng xuất
function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

// Upload Avatar
// async function upAvatar(){
//     try{
//         let data = $('form')[0];
//         let form1 = new FormData(data);
//         let ava = await $.ajax({
//             url: "/api/cus/avataruser",
//             type: "put",
//             data: form1,
//             processData: false,
//             contentType: false,
//         })
//         console.log(15, ava.avatar);
//         $('.avacus').attr("src", ava.avatar)


//     }
//     catch(error){
//         console.log(error);
//     }

// }