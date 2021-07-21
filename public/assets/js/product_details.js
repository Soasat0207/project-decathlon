// function render cart 
function renderCart(){
    $('.listSelectedProduct').html('');
    $.ajax({
        url: '/api/user/findSelectedProduct',
        type : 'POST',
        data: {
            sold : false
        }
    }).then(data =>{
        // console.log(data);
        data.forEach(element => {

            let liItem = `
        <li class="list-cart-items">
            <img class="list-cart-items-img" src="${element.productId.img[0]}" alt="">
            <div class="list-cart-item-wrapper">
                <div class="list-cart-item-head">
                    <h5 class="list-cart-item-name">${element.productId.name}</h5>
                    <p class="list-cart-item-price">${element.productId.price}</p>
                    <p class="list-cart-item-multiphy">x</p>
                    <p class="list-cart-item-quatity">${element.quantity}</p>
                </div>
                <div class="list-cart-item-body">
                    <p class="list-cart-item-category">Phân loại: ${element.productId.categoryProductId.name}</p>
                    <p class="list-cart-item-delete"><button class ="delProduct" id ="item${element._id}">Delete</button></p>
                </div>
            </div>
        </li>
        `
        $('.listSelectedProduct').append(liItem);
    // add event for Delete button 
        $(`#item${element._id}`).on('click', ()=>{
          let selectedId = $(`#item${element._id}`).attr('id').slice(4,100);
          deleteSelectedProduct(selectedId)
        })

        }); // end loop

    }).catch(err =>{
        console.log('Server error');
    })
}
renderCart()

// function to delete selected item from Database
    function deleteSelectedProduct(selectedId){
        $.ajax({
            url: '/api/user/deleteSelectedProduct',
            type: 'DELETE',
            data: {
                selectedId : selectedId
            }
        }).then(data =>{
           if(data.deletedCount !== 0){
               renderCart()
           }
        }).catch(err =>{
            console.log(err);
        })
    }

// add event for Show Cart button

$('.list-view-cart').on('click', ()=>{
    window.location.href = 'http://localhost:3000/cart'
})