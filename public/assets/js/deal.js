let productColor = document.querySelectorAll('.product-color span');
let productImg = document.querySelector('.deal-img');
let backgroundImg = document.querySelector('.deal-body-left');
let titleImg = document.querySelector('.deal-detail-title');
let colorPrice = document.querySelector('.price-shose');
let colorBtn = document.querySelector('.price-btn');
Array.prototype.map.call( productColor, (productColor) => {
    productColor.addEventListener('click', () => {
        document.querySelector('.active_color').classList.remove('active_color')
        productColor.classList.add('active_color')
        productImg.setAttribute('src', `${productColor.getAttribute('data-pic')}`)
        backgroundImg.setAttribute('style', `background-color:${productColor.getAttribute('data-color-sec')}`)
        titleImg.setAttribute('style', `color:${productColor.getAttribute('data-color-sec')}`)
        colorBtn.setAttribute('style', `background-color:${productColor.getAttribute('data-color-sec')}`)
        colorBtn.setAttribute('id', `${productColor.getAttribute('data-id')}`)
        colorPrice.setAttribute('style', `color:${productColor.getAttribute('data-color-sec')}`)
    })
});

$('.deal-price button').on('click', function(){
    let productId = $(this).attr('id').slice(10,1000);
    window.location.href = `http://localhost:3000/product-details/${productId}`
})
