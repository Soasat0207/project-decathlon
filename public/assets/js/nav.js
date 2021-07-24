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