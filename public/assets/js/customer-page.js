
function resize (){
    if($('body').width() < 768){
        $(".tabR").css("display", "none");
        $(".tabL").css("display", "block")
    }
    if($('body').width() >= 768){
        $(".tabR").css("display", "block");
        $(".tabL").css("display", "block");
        $(".exitButton").css("display", "none")
        $('.exit123').css("display", "none")
    }

}


function exit4(){
    $(".tabR").css("display", "none")
    $(".tabL").css("display", "block")
    
}



function infoButton() {
    $(".tabR").html("");
    let variable = `
    <div class="information5">
    <button class="exit123" onclick="exit4()" ><i class="fas fa-undo"></i></button>
    <h3>Personal information</h3>
    <div class="rowC1 row">
        <div class="col-xs-12 col-md-6">Name <input type="text" placeholder="Name" class="name3"></div>
        <div class="col-xs-12 col-md-6">Last name<input type="text" placeholder="Surname" class="surname3"></div>
    </div>

    <div class="rowC2 row">
        <div class="col-xs-12 col-md-6">Phone number <input type="number" placeholder="Phone number" class="phone3"></div>
        <div class="col-xs-12 col-md-6">Email <input type="text" placeholder="Email" class="email3"></div>
    </div>

    <div class="rowC3">
        <div class="birthday">
        <p>Date of birth</p>
        <input class="birthday3" type="date">
        </div>
        <p class="sex3">Sex</p>
        <div class="sex1">
            <div><input type="radio" name="sex" id="" class='male3'></input><p>Male</p></div>
            <div><input type="radio" name="sex" id="" class = 'female3'></input><p>Female</p></div>
        </div>
    </div>

    <div>
    <p>Avatar</p>
    <form>
        <img class="avacus" src="" alt="">
        <input type="file" name="avatarUser" multiple>
    </form>
    </div>

    <div class="rowC5">
        <div>
            <input type="checkbox" name="" id="">
            <p>I have read and agree to <a href="/terms-of-purchase">Terms and Condition</a></p>
        </div>
        <button onclick="infoSaveButton5()">Save</button>
    </div>
    </div>
    `
    $(".tabR").append(variable);

    $.ajax({
        url: '/api/cus/information',
        type: 'get',
    })
    .then((data) => {
        console.log(data);
        let ten;
        let ho;
        let email;
        let phone;
        let gender;
        let birthday;
        let avatar;
        if(data){
            ten = data.firstname;
            ho = data.lastname;
            email = data.email;
            phone = data.phone;
            gender = data.gender;
            birthday = data.birthday.slice('0', '10');
            avatar = data.avatar;
        }
        $('.avacus').attr('src', avatar) 
        $(".name3").val(ten);
        $(".surname3").val(ho);
        $(".email3").val(email);
        $(".phone3").val(phone);
        $(".birthday3").val(birthday);
        if(gender == 'nu'){
            $('.female3').prop("checked", true)
        }else{
            $('.male3').prop("checked", true)
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
        $(".exitButton").css("display", "none")
        $('.exit123').css("display", "none")
    }

 
}

function addressButton() {
    $(".tabR").html("");
    let variable = `
    <div class="address">
    <button class="exit123" onclick="exit4()"><i class="fas fa-undo"></i></button>
        <h3>Address</h3>
        <button onclick="addAddressButton()">
            <i class="fas fa-plus"></i>
            <p>Add new address</p>
        </button>
    </div>
    `
    $(".tabR").append(variable)

    $.ajax({
        url: '/api/cus/information',
        type: 'get',
    })
    .then((data) => {
        let address;
        let note;
        let city
        let variable2;
        if(data.mainAddress){
            address = data.mainAddress;
            note = data.noteAddress;
            city = data.city;
            $(".tabR").html("");
            variable2 =`
            <div class="address">
                <button class="exit123" onclick="exit4()"><i class="fas fa-undo"></i></button>
                <h3>Address</h3>
                <div>
                    <div class="cityRow"><p>City:</p><input type="text" class="notecity"></div>
                    <div class="addressRow"><p>Delivery address:</p><textarea name="" id="" cols="30" rows="10" class="deliveryAddress"></textarea></div>
                    <div class="noteRow"><p>Note:</p><textarea name="" id="" cols="30" rows="10" class="note"></textarea></div>
                </div>
                <div class="adjust">
                    <button class="addressButton4" onclick="editAddress()">Edit</button>
                </div>
            </div>
            `
            $(".tabR").append(variable2);
            $(".deliveryAddress").append(diachi);
            $(".note").append(note);
            $('.notecity').val(city);
        }
        
    })
    .catch((err) => {
        console.log(err);
    })

    if($('body').width() < 768){
        $(".tabR").css("display", "block");
        $(".tabL").css("display", "none")
 
    }    if($('body').width() >= 768){
        console.log('ok')
        $(".tabR").css("display", "block");
        $(".tabL").css("display", "block");
        $(".exitButton").css("display", "none")
        $('.exit123').css("display", "none")
    }

 }

function addAddressButton() {
    let variable =`
    <div class="hideBackground1">
        <div class="addaddress">
            <div class="addressRow1">
                <h3>Add new address</h3>
                <button onclick="addressExitButton()"><i class="fas fa-times"></i></button>
            </div>

            <div class="deliveryAddress">
                <input class="c" type="text" placeholder="City...">
                <textarea name="" id="" cols="30" rows="10" placeholder="Delivery address..." class="a"></textarea>
                <textarea name="" id="" cols="30" rows="10" placeholder="Note when receiving goods..." class="b"></textarea>
                <button onclick="saveAddress()">Save address</button>

            </div>
            

        </div>
    </div>
    `
    $("body").append(variable)
    
}

function addressExitButton(){
    $(".hideBackground1").css("display", "none")
}

// Check cookies
$.ajax({
    url: '/api/cus/checkcookies',
    type: 'post',
})
.then((data) => {
    if(data !== 'Login successful'){
        window.location.href = '/login-cus'
    }
})
.catch((err) => {
    console.log(err);
})

// Update information
async function infoSaveButton5(){
    try{
        let genderS;
        if($('.male3').prop('checked')){
            genderS = "male"
        }else{genderS = "female"}
     let data = await $.ajax({
                    url: "/api/cus/update",
                    type: 'put',
                    data: {
                            firstname: $('.name3').val(),
                            lastname: $('.surname3').val(),
                            phone: $('.phone3').val(),
                            email: $('.email3').val(),
                            birthday: $('.birthday3').val(),
                            gender: genderS
                    }
                    })
                    
                    console.log(data);
                    

        let data12 = $('form')[0];
        // console.log(16, data12);
        let form1 = new FormData(data12);
        let ava = await $.ajax({
                        url: "/api/cus/avataruser",
                        type: "put",
                        data: form1,
                        processData: false,
                        contentType: false,
                    })
                    // console.log(15, ava.avatar);
                    $('.avacus').attr("src", ava.avatar)

        infoButton()              
    }
    catch(error){
        console.log(error);
    }
}

// Show email in UI box

$.ajax({
    url: '/api/cus/information',
    type: 'get',
})
.then((data) => {
    let insertEmail;
    let avatar;
    if(data){
        insertEmail = data.email;
        avatar = data.avatar;
    }
$('.avacus').attr('src', avatar);    
$('.showEmail').append(insertEmail);
})
.catch((err) => {
    console.log(err);
})

// Add address
function saveAddress(){
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

// Edit the address
function editAddress(){
    $.ajax({
        url: "/api/cus/address",
        type: 'put', 
        data: {
            mainAddress: $(".deliveryAddress").val(),
            noteAddress: $(".note").val(),
            city: $(".notecity").val(),
        }
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
}

// Log out
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

// Clear Cookies on logout
function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

