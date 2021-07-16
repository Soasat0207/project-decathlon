window.onscroll = function() {
    scrollFunction()
}
function scrollFunction(){ 
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.querySelector('.navbar').classList.add('navbar-fiexd');
        // document.querySelector('.navbar').setAttribute('style', 'background-color:#fff');
    }
    else{
        document.querySelector('.navbar').classList.remove('navbar-fiexd');
    }
}