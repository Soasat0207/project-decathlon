let body_leftMenu = document.querySelectorAll('.body_admin-left-menu');
let body_leftMenuLink = document.querySelectorAll('.body_admin-left-menu-link');
let body_leftMenuList =document.querySelector('.body_admin-left-menu-list');
Array.prototype.map.call(body_leftMenu,(body_leftMenu)=>{
    body_leftMenu.addEventListener('click',()=>{
        body_leftMenu.parentElement.parentElement.querySelector('.body_admin-left-menu-active').classList.remove('body_admin-left-menu-active');
        body_leftMenu.classList.add('body_admin-left-menu-active');    
        if(body_leftMenu.parentElement.querySelector('.body_admin-left-menu-list').style.display==""){
            body_leftMenuList.style.display ="none";
            body_leftMenu.parentElement.querySelector('.body_admin-left-menu-list').style.display ='block';
        }
        else if(body_leftMenu.parentElement.querySelector('.body_admin-left-menu-list').style.display == "block"){
            body_leftMenuList.style.display ="none";
            body_leftMenu.parentElement.querySelector('.body_admin-left-menu-list').style.display ='none';
        }
        else if(body_leftMenu.parentElement.querySelector('.body_admin-left-menu-list').style.display == "none"){
            body_leftMenuList.style.display ="none";
            body_leftMenu.parentElement.querySelector('.body_admin-left-menu-list').style.display ='block';
        }
    })
})
Array.prototype.map.call(body_leftMenuLink,(body_leftMenuLink)=>{
    body_leftMenuLink.addEventListener('click',()=>{
      console.log(body_leftMenuLink.parentElement);
      body_leftMenuLink.parentElement.parentElement.querySelector('.body_admin-left-menu-link-active').classList.remove('body_admin-left-menu-link-active');
      body_leftMenuLink.classList.add('body_admin-left-menu-link-active');
    })
})