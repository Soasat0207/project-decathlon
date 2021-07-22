renderListOrder();

function renderListOrder(){
    $('.admin-list-order').html('');
    $.ajax({
        url: '/api/user/findAllOrders',
        type: 'POST'
    }).then(data =>{
        // console.log(data);
        if( data.length > 0){
            data.forEach(item =>{
                console.log(item);
                let orderCode = item._id.slice(item._id.length - 8, item._id.length);
                let date = new Date(item.orderDate).getDate();
                let month = new Date(item.orderDate).getMonth() + 1;
                let year = new Date(item.orderDate).getFullYear();

                let content = `
                <tr>
                    <th>${orderCode}</th>
                    <th>${item.userId.firstname} ${item.userId.lastname}</th>
                    <th>${item.status}</th>
                    <th>${date}/${month}/${year}</th>
                    <th>${item.address.district} ${item.address.province}</th>
                    <th>${item.totalPrice}</th>
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
        }

    }).catch(err =>{
        console.log(err);
    })
}