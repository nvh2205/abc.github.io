
import {createUser} from './validatorUser.js'
import {updateUser} from './validatorUser.js'
import {listUser} from './validatorUser.js'

const dataUsers= await listUser();




function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }


        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {

                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});
                    options.onSubmit(formValues);
                }

                else {
                    formElement.submit();
                }
            }


        }

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function (rule) {

            // Lưu lại các rules cho mỗi input

            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }
            });
        });
    }

}



// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Bạn ko được để trống'
        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Bạn vui lòng nhập email';
        }
    };
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Hai mật khẩu chưa giống nhau';
        }
    }
}


Validator.isPhone = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var checkPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
            return checkPhone.test(value) ? undefined : message || ' sdtVn';
        }
    }
}



//console.log(dataUsers);
// var users = " http://localhost:8000/api/v1/users";
// const dataUsers = [];

// function getUsers() {
//     fetch(users)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             dataUsers.push(data);
//             console.log(data)
//             console.log(dataUsers);
//         });
// }

// getUsers();

//  function createUser(data) {
//     var options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     };
//     fetch(users, options)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             dataUsers.push(data);
//         })
// }

// function updateUser(id, data) {
//     var options = {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     };
//     fetch(users + "/" + id, options)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {

//             dataUsers1[0].data.data.forEach((item, index) => {
//                 if (item.id == id) {
//                     dataUsers[0].data.data[index].checkLogin = data;
//                 }
//             })
//         });
// }



//document.addEventListener('DOMContentLoaded', function () {
    // Đăng kí--Contructor
    Validator({
        form: '#form-1',
        formGroupSelector: '.form-group',
        errorSelector: '.form-message',
        rules: [
            Validator.isRequired('#nameUser', 'Vui lòng nhập tên đầy đủ của bạn'),
            Validator.isEmail('#email'),
            Validator.minLength('#password', 6),
            Validator.isRequired('#password_confirmation'),
            Validator.isConfirmed('#password_confirmation', function () {
                return document.querySelector('#form-1 #password').value;
            }, 'Mật khẩu nhập lại không chính xác'),
            Validator.isRequired('#phoneNumber'),
            Validator.isPhone('#phoneNumber'),
            Validator.isRequired('#address'),
        ],
        onSubmit: function (data) {
            let checkdataUsers=0;
            let checkDangKi = document.querySelector("#Check_DangKi");
            dataUsers[0].data.data.forEach((item,index) => {
                
                if (item.email === data.email || item.phoneNumber === data.phoneNumber) {
                    checkDangKi.classList.remove("hidden");
                    //setTimeout(location.reload(),400);

                }
                else{
                    checkdataUsers++;
                    checkDangKi.classList.add("hidden");
                    
                }
            })
            if(checkdataUsers===dataUsers[0].data.data.length){
                data.checkLogin="false";
                data.cart=[];
                data.purchase_history=[];
                alert("Đăng kí thành công");
                createUser(data);
            }

        }
    });

    //Đăng nhập
    Validator({
        form: '#form-2',
        formGroupSelector: '.form-group',
        errorSelector: '.form-message',
        rules: [
            Validator.isEmail('#email'),
            Validator.minLength('#password', 6),
        ],
        onSubmit: function (data) {
            let checkDangNhap = document.querySelector("#Check_DangNhap");
            let logInUser = dataUsers[0].data.data.find(function (items) {

                return items.email == data.email && items.password == data.password
            })
            if (logInUser) {
                //checkDangNhap.classList.add("hidden");
                console.log(logInUser);
                console.log('success');
                logInUser.checkLogin = "true";
                const idCheckLoginUser = logInUser.id;
                updateUser(idCheckLoginUser, { checkLogin: "true" });
                //alert("Tc")
                //window.location.href = 'http://127.0.0.1:5500/client/index.html'

            }
            else {
                checkDangNhap.classList.remove("hidden");
                //alert('Sai tên đăng nhập hoặc mật khẩu');
                //location.reload();           
            }
            console.log(data);

        }
    });


//});

// var formElement1 = document.querySelector("#form-1");
// //formElement1.classList.add("hidden")

// var formElement2 = document.querySelector("#form-2");
// //formElement2.classList.add("hidden")
// let registration = document.querySelector('#dk');
// registration.onclick = function () {
//     formElement1.classList.remove("hidden")
//     //formElement2.classList.add("hidden")
// }

// let logIn = document.querySelector('#dn');
// logIn.onclick = function () {
//     formElement2.classList.remove("hidden")
//     //formElement1.classList.add("hidden")
// }

