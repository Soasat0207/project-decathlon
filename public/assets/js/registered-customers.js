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
// Enter registration information
async function subscribeButton(){
    try{
        $( "form" ).submit(function( event ) {
            event.preventDefault();
          });
        $('.ndtk3').css('display', 'block')
        let gender
        if($('.male2').prop("checked") == false && $('.female2').prop("checked") == false){
            console.log('no gender selected');
        }else if($('.male2').prop("checked")){
            gender = 'male'
        }else{
            gender = 'female'
        }

        //-------------------------------------------
        if($('.account2').val().length < 8){
            $('.ndtk3').html('Account must enter at least 8 characters!')
            $('.ndtk2').html('Account must enter at least 8 characters!')
        }else{
            if($('.account2').val() == "" || $('.password2').val() == "" || $('.name2').val() == '' ||  $('.lastName2').val() =="" || $('.phone2').val() =="" || $('.email2').val() ==""){
                console.log("Do not leave the input field blank");
                $('.ndtk2').html('Do not leave the input field blank')
            }else{
                let data = await $.ajax({
                    url: '/api/cus/registeredcus',
                    type: 'post',
                    data: {
                        username: $('.account2').val(),
                        password: $('.password2').val(),
                        firstname: $('.name2').val(),
                        lastname: $('.lastName2').val(),
                        phone: $('.phone2').val(),
                        gender: gender,
                        email: $('.email2').val(), 
                    }
                })
                //---------------------------------------
                if(data){
                    // console.log(43, data);
                    
                        $('.ndtk2').html(data)
                   
                }
            }
        }


    }
    catch(error){
        console.log(error);
    }
}

function loginSwitch(){
    window.location.href = '/login-cus'
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