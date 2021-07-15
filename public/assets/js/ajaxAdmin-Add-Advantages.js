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

// Add Advantages
// let i  = 0
// function addAdvantages(){
//     i++
//     let add = `
//     <div class="col col-lg-12 aa${i}">
//     <div class="page-content-card-form-input  margin-bottom-2">
//         <label class="page-content-card-form-input-label" for="">Description Details</label>
//         <textarea name="content" class="form-control page-content-form_description-details" rows="6" placeholder="Enter Advantages 2"></textarea>
//         <span class="form-message"></span>
//         <input type="file" name="advantagesPhoto" multiple>
//         <button onclick="deleteAdvantagesPhoto('aa${i}')" type="button">Xóa</button>
//     </div>
//     <img class="upload4 uploadStyle" src="" alt=""> 
//     <img class="upload5 uploadStyle" src="" alt="">
//     <img class="upload6 uploadStyle" src="" alt="">
//     </div>
//     `
//     $('.addAdvantages00').append(add)
// }


// // Delete Advantages
// function deleteAdvantagesPhoto(aa){
//     console.log(aa);
//  $(`.${aa}`).html('')
// }


