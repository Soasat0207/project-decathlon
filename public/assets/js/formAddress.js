// render for select province
renderAddressProvince()
// add event for select district
$('select#address-info_list-province').on( 'change',function(){
    renderAddressDistrict(); 
});
// add event for select ward
$('select#address-info_list-district').on( 'change',function(){
    renderAddressWard(); 
})
// append province
async function renderAddressProvince(){
    try {
        let data = await $.ajax({
            url: 'https://vapi.vnappmob.com/api/province/',
            type: 'GET'
        })
        $('#address-info_list-province').html('');
        $('#address-info_list-province').append('<option value="">Chọn Tỉnh/Thành phố</option>');
        if(data){
            data.results.forEach( item => {
                let option = `
                <option value="${item.province_id}">${item.province_name}</option>
                `
                $('#address-info_list-province').append(option);
            })
        }
    
    } catch (error) {
        console.log(error);
    }
}

// function select district
async function renderAddressDistrict(){
    try {
        let province_selected =  $('select#address-info_list-province').children("option:selected").val();
        let data = await $.ajax({
            url: 'https://vapi.vnappmob.com/api/province/district/'+province_selected,
            type: 'GET'
        })
        $('#address-info_list-district').html('');
        $('#address-info_list-district').append('<option value="">Chọn Quận/Huyện</option>');
        if(data){
            data.results.forEach( item => {
                let option = `
                <option value="${item.district_id}">${item.district_name}</option>
                `
                $('#address-info_list-district').append(option);
            })
        }
    } catch (error) {
        console.log(error);
    }
}

// function select ward
async function renderAddressWard(){
    try {
        let district_selected =  $('select#address-info_list-district').children("option:selected").val();
        let data = await $.ajax({
            url: 'https://vapi.vnappmob.com/api/province/ward/'+district_selected,
            type: 'GET'
        })
        $('#address-info_list-ward').html('');
        $('#address-info_list-ward').append('<option value="">Chọn Phường/Xã</option>');
        if(data){
            data.results.forEach( item => {
                let option = `
                <option value="${item.ward_id}">${item.ward_name}</option>
                `
                $('#address-info_list-ward').append(option);
            })
        }
    } catch (error) {
        console.log(error);
    }
}

// get info about address
$('.get__address__info').on('click', function(){
    console.log( 'fullname:' , $('#address-info__fullname').val() );
    console.log( 'company:' , $('#address-info__company').val() );
    console.log( 'phone:' , $('#address-info__phone').val() );
    console.log( 'province:' , $('select#address-info_list-province').children("option:selected").html() );
    console.log( 'district:' , $('select#address-info_list-district').children("option:selected").html() );
    console.log( 'ward:' , $('select#address-info_list-ward').children("option:selected").html() );
    console.log( 'details:' , $('textarea#address-info__details').val() );
    console.log( 'addressType:' , $('input[type="radio"]:checked').val() );
    checkPhoneNumber();
})

function checkPhoneNumber(){
    let phoneNumber = $('#address-info__phone').val();
    if( !phoneNumber.startsWith('0')  || phoneNumber.length < 10 || phoneNumber.length > 12 || phoneNumber.contains('.')){
        $('.phone-number__auth').html('');
        $('.phone-number__auth').append('<div style="color: red">Không đúng định dạng số điện thoại</div>');
    }
}
