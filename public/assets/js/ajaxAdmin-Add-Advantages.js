async function uploadAdvantagesPhoto(){
try{
    let data = $("form")[0];
    let form = new FormData(data)
    let av1 = await $.ajax({
        url: '/profile2',
        type: 'post',
        data: form,
        processData: false,
        contentType: false,
    })
    console.log(av1);
}
catch(error){
    console.log(error);
}
}