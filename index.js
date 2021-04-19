let anouncementUser = document.querySelector(".p_header");
//Update user
import {updateUser} from './validatorUser.js'
//get user
import { listUser } from './validatorUser.js'
//API foods
import { listFoods } from './Api_foods/foods.js'
//API Market
import { marketMenu } from './Api_foods/foods.js'


const dataUsers = await listUser()
//Danh sach cac muc do an
const dataFoods = await listFoods();
//Danh sach cac muc di cho
const dataMarket = await marketMenu();


//Lấy ra user đã đăng nhập
const usersLogin = dataUsers[0].data.data.find((item) => {
    return item.checkLogin === 'true'
})


//Giỏ hàng
let cart_=0;
var arrCart=[];
if (usersLogin) {
    let user_LogIn = document.querySelectorAll(".user_LogIn");
    Array.from(user_LogIn).forEach((item) => {
        item.removeAttribute('data-toggle');
    })

    anouncementUser.textContent = ` ${usersLogin.nameUser}`;
    //Chào mừng người dùng trên thanh công cụ
    let header_user = document.querySelector('.header_user');
    header_user.textContent = ` ${usersLogin.nameUser}`;

    cart_=usersLogin.cart.length;
}

//HIển thị đăng xuất khi user đăng  nhập
let Dang_Xuat=document.querySelector(".Dang_Xuat");
let user_icon=document.querySelector(".user_icon");

let Dang_Xuat_header=document.querySelector(".Dang_Xuat_header");
let user_icon_header=document.querySelector(".user_icon_header");
//Trên trang chủ
if(usersLogin){
    user_icon.onmousemove=()=>{
        Dang_Xuat.classList.remove("hidden");
    }

    user_icon.onmouseout=()=>{
        Dang_Xuat.classList.add("hidden");
    }

    Dang_Xuat.onclick=()=>{
        
        //usersLogin.checkLogin = "false";
        const idCheckLoginUser = usersLogin.id;
        updateUser(idCheckLoginUser, { checkLogin: "false" });
    }

    user_icon_header.onmousemove=()=>{
        Dang_Xuat_header.classList.remove("hidden");
    }

    user_icon_header.onmouseout=()=>{
        Dang_Xuat_header.classList.add("hidden");
    }

    Dang_Xuat_header.onclick=()=>{
        
        //usersLogin.checkLogin = "false";
        const idCheckLoginUser = usersLogin.id;
        updateUser(idCheckLoginUser, { checkLogin: "false" });
    }

}



console.log(usersLogin);
//Thêm vào giỏ hàng
function addToCart_(cart_){
    let pay_cart=document.querySelectorAll(".pay_cart")
    Array.from(pay_cart).forEach((item)=>{
        item.textContent=`${cart_}`
    })
}
addToCart_(cart_);
// //HIển thị các nút

// let listStyleCooks=document.querySelector('.cook');
// dataFoods.forEach((item,index)=>{

//     listStyleCooks.innerHTML +=` <button class="cook_" id=${"cook_"+item.id}>${item.title}</button>`

// }) 
function displayPrice(price){
    var number=price;
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number);
}










let MonNgon__ = document.querySelector(".MonNgon__")

dataFoods.forEach((item, index) => {
    MonNgon__.innerHTML += `
    
    <div class="col-12 col-md-4 mb-4 mb-md-0">
        <div class="card w-100 MonNgon__card">
            <img  src="${item.img}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">Tổng hợp các ${item.title} ngon và dễ làm để mọi người cùng thưởng thức
                </p>
                <a target="_blank" href="" class="btn mt-md-3 cook_" id=${"cook_" + item.id}>Xem Thêm<i
                        class="fa fa-search ml-2" ></i></a>
            </div>
        </div>
    </div>`
})

let clickStyleCook= document.querySelectorAll('.cook_');  
//Xóa hết sessionStorage
sessionStorage.clear();
//console.log(clickStyleCook,"33");
Array.from(clickStyleCook).forEach((item)=>{
    
    item.onclick = ()=>{
        
        sessionStorage.setItem(`${item.id}`,`${item.id}`)
        //item.href="monChien.html"
        
        if(usersLogin){
            let arrSum=arrCart.concat(usersLogin.cart)
            updateUser(usersLogin.id,{"cart":arrSum})
        }

        window.location.href = 'product.html'
    }

})


//Đi chợ
 let DiCho__ = document.querySelector(".DiCho");


dataMarket.forEach((item, index) => {
    DiCho__.innerHTML += ` <a href="#" class="market_"  id=${"market_" + item.id}><h3 style="font-size:2.5rem">${item.title}</h3></a>
    <div class="DiCho__${item.title}"> <div class="owl-carousel owl-theme" id=${"market__" + item.id}>  </div></div>
    `
    var menuMarket = document.querySelector(`#${"market__" + item.id}`)
    //console.log(menuMarket);
    item.menu.forEach((element, index) => {
        let price=displayPrice(element.price)
    
        
        menuMarket.innerHTML += `
        
        <div class="item" >
            <div class="card card--DiCho w-100">
                <h1 style="display:none">${element.img}</h1>
                <img src="${element.img}"
                    class="card-img-top card-img--DiCho img-fluid img-circle rounded-circle" alt="...">
                <div class="card-body" id=${"market_"+item.id+"_"+element.id}>
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">Thực phẩm tươi sạch từ Việt Nam</p>
                        <a href="#" class="btn btn-primary add_cart"><i class="fa fa-shopping-cart mr-md-2 "></i>Thêm vào giỏ hàng</a>
                        
                        <input class="buy_"  type="number" min="0" max="50" step="1" value="1" style="width: 50px;height:35px;background-color: #;">
                        <span>${price} - ${element.quantitative}</span>
                        <h1 style="display:none">${element.price}</h1>
                </div>
            </div>
        </div>
        `
    })
})

//thêm vào giỏ hàng của user
let addToCart=document.querySelectorAll(".add_cart");
//Số lượng mua


var sumCart=0;
Array.from(addToCart).forEach((item,index)=>{
    item.onclick =()=>{
        let divParent =  item.parentElement;
        let imgProduct=item.parentElement.parentElement.querySelector('h1').innerText;
        let valueInput=divParent.querySelector('.buy_').value;
        if(usersLogin){
            let nameProduct=divParent.querySelector('h5');
            let priceProduct=divParent.querySelector('h1');
            let sum=priceProduct.innerText*1
            let objBuyProduct={
                "name":`${nameProduct.innerText}`,
                "imgProduct":`${imgProduct}`,
                "amount": `${valueInput}`,
                "unitPrice":`${priceProduct.innerText}`,
                "total":`${sum*valueInput}`
            };
            arrCart.push(objBuyProduct)
            
            sumCart=cart_+ arrCart.length
            console.log(sumCart,"cart_");
            addToCart_(sumCart);
            //updateUser(usersLogin.id,{"cart":arrCart});
        }
        else{
            alert("Bạn phải đăng nhập mới có thể thực hiện chức năng này");
        }
        
    }
})


//Bấm vô giỏ hàng sẽ update user đã chọn
let pay_cart=document.querySelectorAll(".pay_cart1")
    Array.from(pay_cart).forEach((item)=>{
        item.onclick=()=>{
            if(usersLogin){
                let arrSum=arrCart.concat(usersLogin.cart)
                updateUser(usersLogin.id,{"cart":arrSum})
                window.location.href='giohang.html'
            }
            else{
                alert("Bạn hãy đăng nhập để thực hiện chức năng này")
            }
            //updateUser(usersLogin.id,{"cart":arrCart});
            
        }
    })

let clickStyleMarket= document.querySelectorAll('.market_');    

//console.log(clickStyleCook,"33");
Array.from(clickStyleMarket).forEach((item)=>{
    
    item.onclick = ()=>{
        sessionStorage.clear();
        sessionStorage.setItem(`${item.id}`,`${item.id}`)
        //item.href="monChien.html"
        if(usersLogin){
            let arrSum=arrCart.concat(usersLogin.cart)
            updateUser(usersLogin.id,{"cart":arrSum})
        }
        window.location.href = './product_market.html'
    }
})




//Thư viện tạo hiệu ứng 3d khi hover
//Chuyển từ index.html  <scrip><>sang
VanillaTilt.init(document.querySelectorAll(".MonNgon__card"), {
    glare: true,
    reverse: true,
    "max-glare": 0.7,
    scale: 1.07,
});


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