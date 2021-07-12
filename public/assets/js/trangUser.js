

function resize (){
    console.log(screen.width );
    if(screen.width < 768){
        $(".tabR").css("display", "none");
        $(".tabL").css("display", "block")
    }
    if(screen.width >= 768){
        $(".tabR").css("display", "block");
        $(".tabL").css("display", "block");
        $(".nutthoat").css("display", "none")
    }

}

$(".tabR").html("");
let bien = `
    <div class="donhang">
        <button class="nutthoat" onclick="thoat()">X</button>
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


function trahang() {
    $(".tabR").html("");
    let bien = `
        <div class="donhang">
            <button onclick="thoat()">X</button>
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

   if(screen.width < 768){
       $(".tabR").css("display", "block");
       $(".tabL").css("display", "none")

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
    <h3>Thông tin cá nhân</h3>
    <div class="hang1">
        <div>Tên <input type="text" placeholder="Tên" class="ten3"></div>
        <div>Họ <input type="text" placeholder="Họ" class="ho3"></div>
    </div>

    <div class="hang2">
        <div>Số điện thoại <input type="number" placeholder="Số điện thoại" class="sdt3"></div>
        <div>Hòm thư Email <input type="text" placeholder="Hòm thư Email" class="email3"></div>
    </div>

    <div class="hang3">
        <p>Giới tính</p>
        <div class="gioitinh1">
            <div><input type="radio" name="giotinh" id="" class='nam3'></input><p>Nam</p></div>
            <div><input type="radio" name="giotinh" id="" class = 'nu3'></input><p>Nữ</p></div>
        </div>
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
        url: '/api/nguoidung/thongtin',
        type: 'get',
    })
    .then((data) => {
        console.log(data);
        let ten;
        let ho;
        let email;
        let sdt;
        let gender
        if(data){
            ten = data.firstname;
            ho = data.lastname;
            email = data.email;
            sdt = data.phone;
            gender = data.gender
        }
        $(".ten3").val(ten);
        $(".ho3").val(ho);
        $(".email3").val(email);
        $(".sdt3").val(sdt);
        if(gender == 'nu'){
            $('.nu3').prop("checked", true)
        }else{
            $('.nam3').prop("checked", true)
        }
    })
    .catch((err) => {
        console.log(err);
    })


}

function nutDiachi() {
    $(".tabR").html("");
    let bien = `
    <div class="diachi">
        <h3>Địa chỉ</h3>
        <button onclick="nutThemdiachi()">
            <i class="fas fa-plus"></i>
            <p>Thêm địa chỉ mới</p>
        </button>
    </div>
    `
    $(".tabR").append(bien)

    $.ajax({
        url: '/api/nguoidung/thongtin',
        type: 'get',
    })
    .then((data) => {
        let diachi;
        let ghichu;
        let bien2;
        if(data.mainAddress){
            diachi = data.mainAddress;
            ghichu = data.noteAddress;
            $(".tabR").html("");
            bien2 =`
            <div class="diachi">
                <h3>Địa chỉ</h3>
                <div>
                    <div class="hangDiachi"><p>Địa chỉ nhận hàng:</p><textarea name="" id="" cols="30" rows="10" class="diachinhanhang"></textarea></div>
                    <div class="hangGhichu"><p>Ghi chú:</p><textarea name="" id="" cols="30" rows="10" class="ghichu"></textarea></div>
                </div>
                <button class="nutdiachi4" onclick="suadiachi()">Sửa</button>
            </div>
            `
            $(".tabR").append(bien2);
            $(".diachinhanhang").append(diachi);
            $(".ghichu").append(ghichu);
        }
        
    })
    .catch((err) => {
        console.log(err);
    })

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
    url: '/api/nguoidung/checkcookies',
    type: 'post',
})
.then((data) => {
    if(data !== 'Đăng nhập thành công'){
        window.location.href = '/dangnhap'
    }
})
.catch((err) => {
    console.log(err);
})

// Cập nhập thông tin
function nutLuuthongtin(){
    $.ajax({
        url: "/api/nguoidung/capnhap",
        type: 'put',
        data: {
            firstname: $('.ten3').val(),
            lastname: $('.ho3').val(),
            phone: $('.sdt3').val(),
            email: $('.email3').val(),
        }
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
}

// Hiển thị email ở ô giao diện người dùng

$.ajax({
    url: '/api/nguoidung/thongtin',
    type: 'get',
})
.then((data) => {
    let chenEmail;
    if(data){
        chenEmail = data.email;
    }
    $('.hienthiEmail').append(chenEmail)
})
.catch((err) => {
    console.log(err);
})

// Thêm địa chỉ
function luudiachi(){
    $.ajax({
        url: '/api/nguoidung/diachi',
        type: 'put',
        data:{
            mainAddress: $('.a').val(),
            noteAddress: $('.b').val(),
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
        url: "/api/nguoidung/diachi",
        type: 'put', 
        data: {
            mainAddress: $(".diachinhanhang").val(),
            noteAddress: $(".ghichu").val(),
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
        url: "/api/nguoidung/blacklist",
        type: "post"
    })
    .then((data) =>{
        if(data){
            delete_cookie('user')
            window.location.href = '/dangnhap'
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
