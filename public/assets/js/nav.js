window.onscroll = function() {
    scrollFunction()
}
function scrollFunction(){ 
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        document.querySelector('.navbar').classList.add('navbar-fiexd');
        document.querySelector('.grad-bar').classList.add('navbar-fiexd');

    }
    else{
        document.querySelector('.navbar').classList.remove('navbar-fiexd');
        document.querySelector('.grad-bar').classList.remove('navbar-fiexd');
    }
}

//Append avatar for My Account
$.ajax({
    url: '/api/cus/information',
    type: 'get',
})
.then((data) => {
    if(data){
        $('.myAccount').attr('data-i18n','')
        $('.myAccount').html(data.firstname)

        $('.avatarNav').attr('src', data.avatar)
    }

})
.catch((err) => {
    console.log(err);
})


