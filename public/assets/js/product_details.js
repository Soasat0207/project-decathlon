// function render cart 
async function renderCart(){
    try {
    $('.listSelectedProduct').html('');
    let data = await $.ajax({
        url: '/api/user/findShoppingCart',
        type : 'POST'
    })
    console.log(9, data);
    if(data === "Nothing" || data.product.length === 0){
        $('.navbarShowListCart').html('');
        let listCart = `
        <div class="navbar-list_cart-nocart">
            <img class="navbar-list-nocart-img" src="../mint/assets/image/no-cart.png" alt="">
            <p class="navbar-list-nocart-text">Chưa có sản phẩm </p>
        </div>
        `
        $('.navbarShowListCart').append(listCart);
    }else{
        $('.navbarShowListCart').html('');
        let listCart = `
        <h4 class="list_cart-heading">Sản phẩm đã thêm </h4>
        <ul class="list_cart listSelectedProduct">
        </ul>
        <button class=" btn btn-primary list-view-cart">Show Cart</button>
        `;
        $('.navbarShowListCart').append(listCart);
        // $('.cartContainer').html('');
        $('.cartContainer').append(`<p class ="numberProductInCart">${data.product.length}</p>`);
    }
    let arrProduct = data.product
    arrProduct.forEach(element => {
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
                <p class="list-cart-item-category">Species: ${element.productId.categoryProductId.name}</p>
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
        });
        // end loop
    } catch (error) {
        console.log(error);
    }

}
renderCart();

// function to delete selected item from Database
    function deleteSelectedProduct(selectedId){
        $.ajax({
            url: '/api/user/findAndDeleteOneProduct',
            type: 'PUT',
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
});