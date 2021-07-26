$( document ).ready(function() {
    renderListOrder();
    async function renderListOrder(){
        try {
            $('.admin-list-order').html('');
            let data = await $.ajax({
                url: '/api/user/findAllOrders',
                type: 'POST'
            })
            if( data.length > 0){
                data.forEach(item =>{
                    let orderCode = item._id.slice(item._id.length - 8, item._id.length);
                    let date = new Date(item.orderDate).getDate();
                    let month = new Date(item.orderDate).getMonth() + 1;
                    let year = new Date(item.orderDate).getFullYear();
                    let totalPrice = numberToCurrency(item.totalPrice);
                    let content = `
                    <tr>
                        <th><button><a href="http://localhost:3000/admin-order-details/${item._id}">Show</a></button></th>
                        <th>${orderCode}</th>
                        <th>${item.userId.firstname} ${item.userId.lastname}</th>
                        <th>${item.status}</th>
                        <th>${date}/${month}/${year}</th>
                        <th>${item.address.district} ${item.address.province}</th>
                        <th>${totalPrice}</th>
                        <th>
                            <div><button id = "del${item._id}" class= "deleteButton">X</button></div>
                        </th>
                    </tr>
                    `
                    $('.admin-list-order').append(content);
                // add event for delete button 
                    $(`#del${item._id}`).on('click', function(){
                        let orderId = $(this).attr('id').slice(3,100);
                        $.ajax({
                            url: '/api/user/deleteOrder/' + orderId,
                            type: 'DELETE',
                        }).then(data =>{
                            if (data.deleteCount !== 0){
                                alert('Order has deleted');
                                renderListOrder();
                            }else{
                                alert('Nothing to delete')
                            }
                        }).catch(err =>{
                            console.log(err);
                        })
                    })
                })
                
            } // end condition
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
});
