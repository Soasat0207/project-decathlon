
// function render cart 
function renderCart(){

    $.ajax({
        url: '/api/user/findSelectedProduct',
        type : 'POST',
        data: {
            sold : false
        }
    }).then(data =>{
        console.log(data);
    }).catch(err =>{
        console.log('Server error');
    })


}
renderCart()