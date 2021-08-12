// const { default: validator } = require("validator");
// đối tương validator
function Validator(options) {
    // hàm thực hiện valudate
    var selectorRules ={};
    function validate(inputElement, rules) {

        //value:inputElement.value
        //test func:rules:test
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage 
        // lấ ra các rules của selector  
        //lặp qua các rules 
        for (var i = 0; i <selectorRules[rules.selector].length;i++){
            errorMessage = selectorRules[rules.selector][i](inputElement.value)
            //nếu có lỗi thì sẽ dừng 
            if(errorMessage){
                break;
            }
        }
        if (errorMessage) {
            errorElement.innerHTML = errorMessage;
            inputElement.parentElement.classList.add(options.errorRed)
        } else {
            errorElement.innerHTML = ''
            inputElement.parentElement.classList.remove(options.errorRed)
        }
        return Boolean(!errorMessage);
    }
    //lấy element forrm vần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        formElement.addEventListener('submit', function(e){
            e.preventDefault();
            var isFormValid = true;
            //thực hiện lặp qua từng rules và validate
            options.rules.forEach(function(rules){
                var inputElement = formElement.querySelector(rules.selector);
                var isValid = validate(inputElement, rules)
                if(!isValid){
                    isFormValid = false;
                }
            });
            if(isFormValid){
                if(typeof options.onSubmit ==='function'){
                    var formEnableInputs = formElement.querySelectorAll('[name]:not([disable])')
                    var formValues = Array.from(formEnableInputs).reduce(function(values ,input ){
                        return (values[input.name] = input.value) && values;
                    },{});
                    options.onSubmit(formValues)
                }
                else{
                    formElement.submit();
                    console.log('có lỗi')
                }
            }
            
        })
        options.rules.forEach(function (rules) {
            // lưu lại các rules cho mỗi input
            if(Array.isArray(selectorRules[rules.selector])){
                selectorRules[rules.selector].push(rules.test);
            }
            else{
                selectorRules[rules.selector] =[rules.test]
            }
            // ở đây chúng ta lấy ra tất cả các thẻ in put ở trong thằng formElemt(#form1) nếu dùng document thì về sau nó sẽ nhầm tất cả những thằng input trong document sẽ lấy ra hết
            var inputElement = formElement.querySelector(rules.selector);
            if (inputElement) {
                //xử lý trường hợp blur khỏi input
                inputElement.addEventListener('blur', function () {
                    validate(inputElement, rules)
                })
            }
            //xử lý mỗi khiu người dùng nhập vào input 
            inputElement.oninput = function () {
                var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                errorElement.innerHTML = ''
                inputElement.parentElement.classList.remove(options.errorRed)
            }
        })
    }
}
// định nghĩa các rules 
// nguyển tắc của các rules    
//1.khi có ỗi => trả ra mesae lỗi
//2. khi hợp lệ => không trả ra cái gì 
Validator.isRequired = function (selector, message ) {
    return {
        selector: selector,
        test: function (value) {
            if (value.trim()) {
                return undefined;
            } else {
                if(message){
                    return message
                }
                else{
                    return 'vui lòng nhập trường này'
                }
                
            }

        }
    };
}
Validator.isEmail = function (selector, message ) {
    return {
        selector: selector,
        test: function (value) {
            var regex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            if(regex.test(value)){
                return undefined;
            }
            else{
                if(message){
                    return message
                }
                else{
                    return 'Trường này phải là email'
                }
                
            }
        }
    };
}
Validator.minLength = function (selector, message ) {
    return {
        selector: selector,
        test: function (value) {
            var regexpass =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
            if(regexpass.test(value)){
                return undefined;
            }
            else{
                if(message){
                    return message
                }
                else{
                    return `Mật khẩu phải dài 8 kí tự và chứ 1 kí tự in hoa 1 số và 1 kí tự đặc biệt`
                }
                
            }
        }
    };
}
Validator.isConfirmed = function (selector,getConfirmValue, message ) {
    return {
        selector: selector,
        test: function (value) {
            if(value === getConfirmValue()){
                return undefined;
            }
            else{
                if(message){
                    return message
                }
                else{
                    return `mật khẩu cần trùng nhau`
                }
                
            }
        }
    };
}