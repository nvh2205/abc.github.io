import { listUser } from './validatorUser.js'
//API foods
import { listFoods } from './Api_foods/foods.js'
import {updateUser} from './validatorUser.js'
//API Market
import { marketMenu } from './Api_foods/foods.js'


const dataUsers = await listUser()
//Danh sach cac muc do an
const dataFoods = await listFoods();
//Danh sach cac muc di cho
const dataMarket = await marketMenu();

let cart_ = 0;
var arrCart = [];

let anouncementUser = document.querySelector(".p_header");
//Lấy ra user đã đăng nhập
const usersLogin = dataUsers[0].data.data.find((item) => {
    return item.checkLogin === 'true'
})

if (usersLogin) {
    let user_LogIn = document.querySelectorAll(".user_LogIn");
    Array.from(user_LogIn).forEach((item) => {
        item.removeAttribute('data-toggle');
    })

    anouncementUser.textContent = ` ${usersLogin.nameUser}`;
    //Chào mừng người dùng trên thanh công cụ
    let header_user = document.querySelector('.header_user');
    header_user.textContent = ` ${usersLogin.nameUser}`;

    cart_ = usersLogin.cart.length;

}


//Tìm Món ăn cụ thể mà mình vừa click ở trang trước
let detailFood;
let idSessionStorage;
dataFoods.forEach((item, index) => {
    //console.log(item);
    item.menu.forEach((element, indexElement) => {

        if (sessionStorage.getItem(`${"foods_" + item.id + "_" + element.id}`)) {
            detailFood = element;
            idSessionStorage=sessionStorage.getItem(`${"foods_" + item.id + "_" + element.id}`);
        }
    })
})




console.log(idSessionStorage);
//Hiển thị theo giá vnd.................................
function displayPrice(price) {
    var number = price;
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number);
}

let price = displayPrice(detailFood["price"]);

//HIển thị nguyên liệu
let ingredient_p = [];
detailFood.ingredient.forEach((item, index) => {
    let p = `<p class="gioiThieu1 ingredient">- ${item}</p>`
    ingredient_p.push(p);
})


//Hiển thị nội dung món ăn

let content_food = document.querySelector(".content_food");

content_food.innerHTML += `<h2>${detailFood["name"]}
    </h2>
    <p class="gioiThieu">Bạn sẽ mua được tất cả nguyên liệu bên dưới</p>
    ${ingredient_p.join('')}

    <div class="movieCarousel__trailer mt-2 mt-md-3">
        <span>${price}</span>
        <button class="btn buy_foods">
            <span>Thêm giỏ hàng<i class="ml-2 fa fa-play"></i></span>
        </button>
    </div>`

//Hiển thị hình ảnh món ăn và miêu tả
let img_food = document.querySelector(".img_food");

img_food.innerHTML += `<img class="img-fluid" src="${detailFood["img"]}" alt="">
<div class="chiTiet__content">

    <div class="protein  px-0 mb-none mb-md-4">
        <p>Thành phần dinh dưỡng
        </p>
        <div class="row mx-0">
            <div class="col-3">
                <div class="protein__item">
                    <p>216</p>
                    <span>KKAL</span>
                </div>
            </div>
            <div class="col-3">
                <div class="protein__item">
                    <p>3,8</p>
                    <span>SQRI</span>
                </div>
            </div>
            <div class="col-3">
                <div class="protein__item">
                    <p>9,2</p>
                    <span>FAT</span>
                </div>
            </div>
            <div class="col-3">
                <div class="protein__item">
                    <p>15,6</p>
                    <span>CARBS</span>
                </div>
            </div>
        </div>
    </div>
    <p class="gioiThieu">Giới thiệu
        món ăn</p>
    <p class="gioiThieu--NoiDung">${detailFood["describe"]}</p>

</div>`

//.....................................Hiển thị các bước làm
let making_food = document.querySelector(".making_food");
detailFood["making"].forEach((item, index) => {
    making_food.innerHTML += `<div class="col-12 col-md-6 ">
    <div class="chiTiet__content ">
        <p class="gioiThieu">Bước ${index + 1}:</p>
        <p class="gioiThieu--NoiDung">${item}</p>
    </div>
</div>`
})


//Hiển thị các bước ở dưới video

//---Hiển thị ít nguyên liệu
let ingredient_video = document.querySelector(".ingredient_video");

detailFood.ingredient.forEach((item, index) => {
    if (index <= 3) {
        ingredient_video.innerHTML += `<p class="nguyenLieu">${item}</p>`
    }
    else if (index == 4) {
        ingredient_video.innerHTML += `---------------🍲-----------------`
    }

})
//Hiển thị thời gian chuẩn bị
let time_food = document.querySelector(".time_food");
time_food.innerHTML += `<div class="col-6">
<p class="thoiGian1">Thời gian chuẩn bị</p>
</div>
<div class="col-6">
<p class="thoiGian1">Thời gian nấu</p>
</div>
<div class="col-6">
<p>${detailFood["Prepare"]}</p>
</div>
<div class="col-6">
<p>${detailFood["Cook"]}</p>
</div>
</div>`
//Hiển thị số lượng người ăn
let khauPhan = document.querySelector('.khauPhan');
khauPhan.innerText = `Khẩu phần ăn dành cho ${detailFood["numberPeople"]} người`
//Hiển thị tên món ăn
let name_food = document.querySelector('.name_food');
name_food.innerText = `${detailFood["name"]}`




// //Thêm vào giỏ hàng.........................................

let buy_foods = document.querySelector(".buy_foods");

buy_foods.onclick = function () {
    let objBuyProduct = {
        "name": `${detailFood["name"]}`,
        "imgProduct": `${detailFood["img"]}`,
        "amount": `${1}`,
        "unitPrice": `${detailFood["price"]}`,
        "total": `${detailFood["price"]}`,
        "sesionStorage":`${idSessionStorage}`
    };
    
    arrCart.push(objBuyProduct)

    updateUser(usersLogin.id,{"cart":arrCart});
    window.location.href="./giohang.html"
}


function addToCart_(cart_) {
    let pay_cart = document.querySelectorAll(".pay_cart")
    Array.from(pay_cart).forEach((item) => {
        item.textContent = `${cart_}`
    })
}
addToCart_(cart_);


//Đối với đi chợ 


//let addToCart=document.querySelectorAll(".add_cart");
//Số lượng mua

// var sumCart=0;
// Array.from(addToCart).forEach((item,index)=>{
//     item.onclick =()=>{
//         let divParent =  item.parentElement;
//         let imgProduct=item.parentElement.parentElement.querySelector('h1').innerText;
//         let valueInput=divParent.querySelector('.buy_').value;
//         if(usersLogin){
//             let nameProduct=divParent.querySelector('h5');
//             let priceProduct=divParent.querySelector('h1');
//             let sum=priceProduct.innerText*1
//             let objBuyProduct={
//                 "name":`${nameProduct.innerText}`,
//                 "imgProduct":`${imgProduct}`,
//                 "amount": `${valueInput}`,
//                 "unitPrice":`${priceProduct.innerText}`,
//                 "total":`${sum*valueInput}`
//             };
//             arrCart.push(objBuyProduct)

//             sumCart=cart_+ arrCart.length
//             console.log(sumCart,"cart_");
//             addToCart_(sumCart);
//             //updateUser(usersLogin.id,{"cart":arrCart});
//         }
//         else{
//             alert("Bạn phải đăng nhập mới có thể thực hiện chức năng này");
//         }

//     }
// })


//Bấm vô giỏ hàng sẽ update user đã chọn
let pay_cart = document.querySelectorAll(".pay_cart1")
Array.from(pay_cart).forEach((item) => {
    item.onclick = () => {
        updateUser(usersLogin.id, { "cart": arrCart });
        window.location.href="./giohang.html"

    }
    
})
//.........................................................








window.onscroll = function () {
    //Code tạo hiệu ứng xuất hiện thanh màu đen khi scroll
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500)
    // thuộc tính document.body trả về thẻ <body> thì thuộc tính documentElement sẽ trả về thẻ <html>
    // element.scrollTop = pixels 
    // scrollTop : Lấy vị trí hiện tại của thanh trượt xuống của phần tử được chọn. Ở đây sẽ lấy được vị trí trượt xuống của thẻ HTML ; 
    {
        // translate(-50%,0)
        document.getElementById("headerFixed").style.transform = "translate(-50%,0)";
    } else {
        document.getElementById("headerFixed").style.transform = "translate(-50%,-100%)";
    }
}

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    responsive: {
        0: {
            items: 1
        },
        576: {
            items: 2
        },
        1200: {
            items: 3,
            loop: false
        }
    }
})

$(document).ready(function () {
    $('.venobox').venobox();
});

$('.counter').countUp({
    'time': 1000,
    'delay': 15
});

AOS.init({
    duration: 1000,
    easing: 'ease-out-quart',
    anchorPlacement: 'top-bottom'
});

VanillaTilt.init(document.querySelectorAll(".MonNgon__card"), {
    glare: true,
    reverse: true,
    "max-glare": 0.7,
    scale: 1.07,
});

$(document).ready(function () {
    var typed = new Typed('.heading h2', {
        strings: ["VỀ WEBSITE CỦA CHÚNG TÔI",],
        loop: true,
        typeSpeed: 40,
        backSpeed: 30,
        backDelay: 1500,
        startDelay: 100,
        fadeOut: true,
        cursorChar: "_",
        shuffle: true,
    });
});

$(document).ready(function () {
    var typed = new Typed('.ThanhVien__heading h2', {
        strings: ["THÀNH VIÊN TRONG NHÓM",],
        loop: true,
        typeSpeed: 40,
        backSpeed: 20,
        backDelay: 1500,
        startDelay: 100,
        fadeOut: true,
        cursorChar: "_",
        shuffle: true,
    });
});

