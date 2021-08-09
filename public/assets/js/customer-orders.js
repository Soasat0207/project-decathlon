$( document ).ready( function(){
    renderUserOrder();
    // function render orders for user 
    $('.tabL ul li:nth-child(3)').on('click' , function(){
        renderUserOrder();
    })
    
    async function renderUserOrder(){
        $('.tabR').html('');
        let tabR_content = `
        <div class="ordersRank">
            <button class="exit123" onclick="exit4()" ><i class="fas fa-undo"></i></button>
            <h3 class="ordersRank1">Danh sách đơn hàng</h3>
            <div class="user--orders__list">
                <table class="user-orders__table">
                    <tr>
                      <th>Mã đơn hàng</th>
                      <th>Ngày mua</th>
                      <th>Danh sách sản phẩm</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái đơn hàng</th>
                    </tr>
                </table>
            </div>
        </div>
        `
        $('.tabR').append(tabR_content);

        try {
            let data = await $.ajax({
                url : '/api/user/findUserOrder',
                type : 'POST'
            })

            if( data.length > 0 ){
                data.forEach(item =>{
                    let orderCode = item._id.slice(item._id.length - 8, item._id.length);
                    let date = new Date(item.orderDate).getDate();
                    let month = new Date(item.orderDate).getMonth() + 1;
                    let year = new Date(item.orderDate).getFullYear();
                    let totalPrice = numberToCurrency(item.totalPrice);
                    let allProductName = [];
                    item.product.forEach( subItem =>{
                        allProductName.push( `<strong>${subItem.productId.name}</strong>` )
                    })
                    allProductName = allProductName.join(' và ')
                    let status = '';
                    if ( item.status === "Received"){
                        status = "Đã nhận hàng"
                    }else {
                        status = "Đang vận chuyển"
                    }
                    let userOrderTable = `
                    <tr>
                        <td>${orderCode}</td>
                        <td>${date}/${month}/${year}</td>
                        <td>${allProductName}</td>
                        <td>${totalPrice}</td>
                        <td>${status}</td>
                    </tr>
                    `
                    $('.user-orders__table').append(userOrderTable)
                })
            }else{
                let emptyOrderContent = `
                <div class="ordersRank">
                    <button class="exit123" onclick="exit4()" ><i class="fas fa-undo"></i></button>
                    <h3 class="ordersRank1">Danh sách đơn hàng</h3>
                    <div class="ordersRank2">
                        <i class="fas fa-cart-plus"></i>
                        <span>Bạn chưa có đơn hàng nào ^^</span>
                    </div>
                </div>
                `
                $('.tabR').html('');
                $('.tabR').append(emptyOrderContent);
                
            }

        // CSS by Duc
            if($('body').width() < 768){
                $(".tabR").css("display", "block");
                $(".tabL").css("display", "none")
            }    
            if($('body').width() >= 768){
            $(".tabR").css("display", "block");
            $(".tabL").css("display", "block");
            $(".exitButton").css("display", "none")
            $('.exit123').css("display", "none")
            }
        
        } catch (error) {
            console.log(error);
        }
    }

    // function convert number to VND format
    function numberToCurrency(number){
        let formatedNumber = (number).toLocaleString('en-US', {
        style: 'currency',
        currency: 'VND',
        });
        return formatedNumber
    }

})