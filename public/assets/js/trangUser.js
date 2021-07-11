function trahang() {
    $(".tabR").html("");
    let bien = `
        <div class="donhang">
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
        }
        
        let id 
        
    function nutThongtin() {
        
    $(".tabR").html("");
    let bien = `
    <div class="thongtin">
    <h3>Thông tin cá nhân</h3>
    <div class="hang1">
        <div>Tên <input type="text" placeholder="Tên" class="firstname2"></div>
        <div>Họ <input type="text" placeholder="Họ" class="lastname2"></div>
    </div>

    <div class="hang2">
        <div>Số điện thoại <input type="text" placeholder="Số điện thoại" class="phone2"></div>
        <div>Hòm thư Email <input type="text" placeholder="Hòm thư Email" class="email2"></div>
    </div>

    <div class="hang3">
        <p>Giới tính</p>
        <div class="gioitinh1">
            <div><input type="radio" name="giotinh" id="" class="nam2"></input><p>Nam</p></div>
            <div><input type="radio" name="giotinh" id="" class="nu2"></input><p>Nữ</p></div>
        </div>
    </div>

    <div class="hang5">
        <div>
            <input type="checkbox" name="" id="">
            <p>Tôi đã đọc và đồng ý với <a href="">Điều khoản và Điều kiện</a></p>
        </div>
        <button onclick="luuthongtin()">Lưu</button>
    </div>
    </div>
    `
    $(".tabR").append(bien);

    $.ajax({                            
        url: '/api/nguoidung',           
        type: 'get'                    
    
    })
    .then((data) => {
        console.log(59,data.e);
        let email;
        let firstname;
        let gender;
        let lastname;
        let phone;
        if(data.e){
            id = data.e._id
            console.log(68,id);
            email = data.e.email;       
            firstname = data.e.firstname;                                
            gender = data.e.gender;
            lastname = data.e.lastname;
            phone = data.e.phone;
        }
        $('.email2').val(email)
        $('.firstname2').val(firstname);
        $('.lastname2').val(lastname);
        $('.phone2').val(phone);

        if(gender='nam'){
            $('.nam2').prop('checked', true)
        }else{
            $('.nu2').prop('checked', true)
        }

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
                <button onclick="luydiachi()">Lưu địa chỉ</button>

            </div>
            

        </div>
    </div>
    `
    $("body").append(bien)
}

function nutThoatdiachi(){
    $(".anNen").css("display", "none")
}

function luuthongtin(){
    $.ajax({
        url: '/api/nguoidung/thongtin/' + id,
        type: 'put',
        data: {
            firstname: $('.firstname2').val(),
            lastname: $('.lastname2').val(),
            email: $('.email2').val(),
            phone: $('.phone2').val(),
        }
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
}
