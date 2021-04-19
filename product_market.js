
import { listUser } from '../validatorUser.js'
//API foods
import { listFoods } from './Api_foods/foods.js'
//API Market
import { marketMenu } from './Api_foods/foods.js'
import {updateUser} from '../validatorUser.js'

const dataUsers = await listUser()
//Danh sach cac muc do an
//const dataFoods = await listFoods();
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

//đăng xuất
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

const menuMarket = [];
let marketId;
let idStorage;

let introduce_title = document.querySelector(".introduce_title")
let backgroud_img = document.querySelector(".cook")


sessionStorage.removeItem('IsThisFirstTime_Log_From_LiveServer');
let lengthStorage = sessionStorage.length;


let arrDeleteMarket = [];

dataMarket.forEach((item, index) => {


    if (sessionStorage.getItem(`${"market_" + item.id}`)) {

        backgroud_img.style.backgroundImage = `url('${item.img}')`

        introduce_title.innerHTML += `<h2 class="mt-md-5 animate__animated animate__fadeInDown font-weight-bold">${item.title} </h2>
        <p class="mt-md-4 animate__animated animate__backInLeft animate__delay-1s animate__fast">
            Tổng hợp
            những thực phẩm ${item.title} tươi sạch nhất cho mỗi bữa ăn của bạn
        </p>`
        idStorage = `${"market_" + item.id}`
        menuMarket.push(item.menu);
        marketId = item.id;
        arrDeleteMarket.push(item);
        dataMarket.splice(index, 1);
    }

})





//chia trang 6 món/trang
let pageList = Math.ceil(menuMarket[0].length / 3);

//Lấy thẻ div các món ăn
let food__ = document.querySelector(".food__");

for (let i = 1; i <= pageList; i++) {
    food__.innerHTML += ` <div class="owl-carousel owl-theme product__" id="product__${i}"></div>`
}







//Hiển thị các món ăn
let product__ = document.querySelectorAll(".product__");

//sao chép các món ăn
let copyMenuMarket = [...menuMarket[0]];

//Hiển thị giá có vnđ
function displayPrice(price) {
    var number = price;
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number);
}

//Hiển thị các món ăn
function displayMenu(copyMenuCook, product__) {
    Array.from(product__).forEach((item, index, arr) => {
        var i = 0;
        copyMenuCook.forEach((element, indexElement) => {
            let price = displayPrice(element.price)
            i++;
            if (i <= 3) {


                arr[index].innerHTML += `<div class="item">
                <div class="card card--DiCho w-100">
                    <img src="${element.img}"
                        class="card-img-top card-img--DiCho img-fluid img-circle rounded-circle" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">Thực phẩm tươi sạch từ Việt Nam</p>
                            <a href="#" class="btn btn-primary add_cart"><i class="fa fa-shopping-cart mr-md-2 "></i>Thêm vào giỏ hàng</a>
                                            
                            <input class="buy_"  type="number" min="0" max="50" step="1" value="1" style="width: 50px;height:35px;background-color: #;">
                            <span>${price} - ${element.quantitative}</span>
                        <h1 style="display:none">${element.price}</h1>
                    </div>
                </div>
            </div>`

            }

        })
        copyMenuCook.splice(0, 3);
    })
}
displayMenu(copyMenuMarket, product__)





//Gợi ý khác
let GoiYKhac__ = document.querySelector('.GoiYKhac__');
dataMarket.forEach((item, index) => {

    GoiYKhac__.innerHTML += `
    <div class="col-12 col-md-6 text-center mt-2 mt-md-0" >
            <div class="ThanhVien__box w-100 GoiY_cook" id=${"market_" + item.id}>
                 <a target="_blank" href="#">
                    <img class="img-fluid"  src="${item.img}" alt=""></a>
                <h2>${item.title}</h2>
                <p>Xem thêm về các ${item.title} có sẵn</p>
            </div>

    </div`
})

//Khi click vào các món khác
let GoiY_cook = document.querySelectorAll(".GoiY_cook");
Array.from(GoiY_cook).forEach((item) => {
    item.onclick = () => {
        sessionStorage.clear()
        sessionStorage.setItem(`${item.id}`, `${item.id}`)
        location.reload();
    }
})

//Giỏ hàng
function addToCart_(cart_){
    let pay_cart=document.querySelectorAll(".pay_cart")
    Array.from(pay_cart).forEach((item)=>{
        item.textContent=`${cart_}`
    })
}
addToCart_(cart_);
//thêm vào giỏ hàng của user
let addToCart=document.querySelectorAll(".add_cart");
//Số lượng mua

//Chức năng tìm kiếm tên món ăn 
let Tim_KiemInput = document.getElementById("Tim_Kiem");
let click_search = document.getElementById("click_search");
let valueInput;

click_search.onclick = function (e) {
    e.preventDefault();
    valueInput = Tim_KiemInput.value;
    if (valueInput) {
        let searchValue = [];
        menuMarket[0].forEach((item) => {

            if (item.name.toUpperCase().includes(valueInput.toUpperCase().trim())) {
                searchValue.push(item);
            }

        })

        if (searchValue.length > 0) {
            //food__.innerHTML = ``;
            Array.from(product__).forEach((item, index, arr) => {
                food__.removeChild(item);
            })
            console.log(food__);
            let pageList1 = Math.ceil(searchValue.length / 3);

            for (let i = 1; i <= pageList1; i++) {
                food__.innerHTML += ` <div class="owl-carousel owl-theme product__" id="product__${i}"></div>`
            }
            // Array.from(product__).forEach((item, index, arr) => {
            //     console.log(item,"324");
            //     arr[index].innerHTML = ``;
            // })
            product__ = document.querySelectorAll(".product__");

            displayMenu(searchValue, product__);

            function addToCart_(cart_){
                let pay_cart=document.querySelectorAll(".pay_cart")
                Array.from(pay_cart).forEach((item)=>{
                    item.textContent=`${cart_}`
                })
            }
            addToCart_(cart_);
            //thêm vào giỏ hàng của user
            let addToCart1=document.querySelectorAll(".add_cart");

            Array.from(addToCart1).forEach((item1,index)=>{
                item1.onclick =()=>{
                    console.log(item1);
                    let divParent =  item1.parentElement;
                    let imgProduct=item1.parentElement.parentElement.querySelector('h1').innerText;
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

            scrip();
        }

        else {

            Array.from(product__).forEach((item, index, arr) => {
                arr[index].innerHTML = `KHÔNG TÌM THẤY SẢN PHẨM MÀ BẠN YÊU CẦU!`;
            })
        }
        //Tim_KiemInput.value="";
        //displayMenu(searchValue)

    }


}
//khi thay đổi hay chưa bấm tìm kiếm sẽ hiện cái menu ban đầu
Tim_KiemInput.onblur = function () {
    let arrInput = [...menuMarket[0]];
    Array.from(product__).forEach((item, index, arr) => {
        food__.removeChild(item);
    })


    for (let i = 1; i <= pageList; i++) {
        food__.innerHTML += ` <div class="owl-carousel owl-theme product__" id="product__${i}"></div>`
    }
    product__ = document.querySelectorAll(".product__");

    displayMenu(arrInput, product__);
    scrip();


}
//Sắp xếp từ thấp đến cao
let low_to_high = document.getElementById("low_to_high");
low_to_high.onclick = () => {
    let sortPrice = [...menuMarket[0]];
    const length = sortPrice.length;
    for (let i = 0; i < length - 1; i++) {
        for (let j = i + 1; j < length; j++) {
            if (sortPrice[i].price > sortPrice[j].price) {
                [sortPrice[i], sortPrice[j]] = [sortPrice[j], sortPrice[i]]
            }
        }
    }
    //Xóa hết xong ghi đè  lại
    Array.from(product__).forEach((item, index, arr) => {
        food__.removeChild(item);
    })


    for (let i = 1; i <= pageList; i++) {
        food__.innerHTML += ` <div class="owl-carousel owl-theme product__" id="product__${i}"></div>`
    }
    product__ = document.querySelectorAll(".product__");
    displayMenu(sortPrice, product__);

    function addToCart_(cart_){
        let pay_cart=document.querySelectorAll(".pay_cart")
        Array.from(pay_cart).forEach((item)=>{
            item.textContent=`${cart_}`
        })
    }
    addToCart_(cart_);
    //thêm vào giỏ hàng của user
    let addToCart1=document.querySelectorAll(".add_cart");

    Array.from(addToCart1).forEach((item1,index)=>{
        item1.onclick =()=>{
            console.log(item1);
            let divParent =  item1.parentElement;
            let imgProduct=item1.parentElement.parentElement.querySelector('h1').innerText;
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


    scrip();

}


//Sắp xếp từ cao xuống thấp
let high_to_low = document.getElementById("high_to_low");
high_to_low.onclick = () => {
    let sortPrice = [...menuMarket[0]];
    const length = sortPrice.length;
    for (let i = 0; i < length - 1; i++) {
        for (let j = i + 1; j < length; j++) {
            if (sortPrice[i].price < sortPrice[j].price) {
                [sortPrice[i], sortPrice[j]] = [sortPrice[j], sortPrice[i]]
            }
        }
    }
    //Xóa hết xong ghi đè  lại
    Array.from(product__).forEach((item, index, arr) => {
        food__.removeChild(item);
    })


    for (let i = 1; i <= pageList; i++) {
        food__.innerHTML += ` <div class="owl-carousel owl-theme product__" id="product__${i}"></div>`
    }
    product__ = document.querySelectorAll(".product__");
    displayMenu(sortPrice, product__);

    function addToCart_(cart_){
        let pay_cart=document.querySelectorAll(".pay_cart")
        Array.from(pay_cart).forEach((item)=>{
            item.textContent=`${cart_}`
        })
    }
    addToCart_(cart_);
    //thêm vào giỏ hàng của user
    let addToCart1=document.querySelectorAll(".add_cart");

    Array.from(addToCart1).forEach((item1,index)=>{
        item1.onclick =()=>{
            console.log(item1);
            let divParent =  item1.parentElement;
            let imgProduct=item1.parentElement.parentElement.querySelector('h1').innerText;
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


    scrip();

}











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
            
            updateUser(usersLogin.id,{"cart":arrCart});
            window.location.href='giohang.html'
        }
    })


















function scrip() {
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
}
scrip();