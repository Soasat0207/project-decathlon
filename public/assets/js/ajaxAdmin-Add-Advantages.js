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
    let photoAll = []
    for (const key in av1) {
        let a1 = av1[key];
        let photo11 = [];
            for( let i = 0; i < a1.length; i++){
                let o1 = a1[i];
                photo11.push(o1)
            }
        photoAll.push(photo11)
    }
    let photoAll01 = photoAll[0];
    let photoAll02 = photoAll[1];
    $('.upload1').attr('src', photoAll01[0]);
    $('.upload2').attr('src', photoAll01[1]);
    $('.upload3').attr('src', photoAll01[2]);
    $('.upload4').attr('src', photoAll02[0]);
    $('.upload5').attr('src', photoAll02[1]);
    $('.upload6').attr('src', photoAll02[2]);
}
catch(error){
    console.log(error);
}
}

// Hiển thị ảnh trên giao diện admin


