import { listUser } from './validatorUser.js'
//API foods
import { listFoods } from './Api_foods/foods.js'
//API Market
import { marketMenu } from './Api_foods/foods.js'
import {updateUser} from './validatorUser.js'

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

const menuCook = [];
let cookId;
let idStorage;

let introduce_title = document.querySelector(".introduce_title")
let backgroud_img = document.querySelector(".cook")


sessionStorage.removeItem('IsThisFirstTime_Log_From_LiveServer');
let lengthStorage = sessionStorage.length;
console.log(lengthStorage);

//nút đăng xuất
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
        //window.location.href = 'index.html'
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
        //window.location.href = 'index.html'
        updateUser(idCheckLoginUser, { checkLogin: "false" });
    }

}

//Lưu lại các arrStorageCook_
// let arrStorageCook_=[];
// dataFoods.forEach((item)=>{
//     if(sessionStorage.getItem(`${"cook_" + item.id}`)){
//         let a=sessionStorage.getItem(`${"cook_" + item.id}`);
//         arrStorageCook_.push(a)
//     }
// })


//Để lại 1 Strogare duy nhất để chuyển trang cho đúng 
// if(lengthStorage==1){
//     let idStorage1= Object.keys(sessionStorage)[0];
//     sessionStorage.clear()
//     sessionStorage.setItem(idStorage1, idStorage1)
// }
// else if(lengthStorage==2){
//     let idStorage1= Object.keys(sessionStorage)[1];
//     sessionStorage.clear()
//     sessionStorage.setItem(idStorage1, idStorage1)
// }

//Lấy cái cook đã xóa để tý nữa xóa Storage
let arrDeleteCook=[];

dataFoods.forEach((item, index) => {


    if (sessionStorage.getItem(`${"cook_" + item.id}`)) {

        backgroud_img.style.backgroundImage = `url('${item.img}')`

        introduce_title.innerHTML += `<h2 class="mt-md-5 animate__animated animate__fadeInDown font-weight-bold">${item.title} NGON</h2>
        <p class="mt-md-4 animate__animated animate__backInLeft animate__delay-1s animate__fast">
            Tổng hợp
            những công thức nấu ${item.title} đậm đà và chuẩn vị dành cho bữa cơm gia đình từ FreshFood
            Việt Nam.
        </p>`
        idStorage = `${"cook_" + item.id}`
        menuCook.push(item.menu);
        cookId=item.id;
        arrDeleteCook.push(item);
        dataFoods.splice(index, 1);
    }

})


console.log(arrDeleteCook);

//chia trang 6 món/trang
let pageList = Math.ceil(menuCook[0].length / 3);

//Lấy thẻ div các món ăn
let food__ = document.querySelector(".food__");

for (let i = 1; i <= pageList; i++) {
    food__.innerHTML += ` <div class="owl-carousel owl-theme product__" id="product__${i}"></div>`
}


//Hiển thị các món ăn
let product__ = document.querySelectorAll(".product__");

//sao chép các món ăn
let copyMenuCook = [...menuCook[0]];

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
                        <h5 class="card-title"></h5>
                        <p class="card-text">${element.name}</p>
                        <a href="#" class="btn btn-primary chi_tiet" id=${"foods_" + cookId + "_" + element.id}><i class="fa fa-shopping-cart mr-md-2"></i>Click mua ngay nào </a>
                        <span>${price} - Hộp</span>
                        <h1 style="display:none">${element.price}</h1>
                    </div>
                </div>
            </div>`

            }

        })
        copyMenuCook.splice(0, 3);
    })
}




displayMenu(copyMenuCook, product__)

//Click vào để xem chi tiết các món ăn
//lấy sesonStorage (nếu có)- xóa đi thêm mới

let idChiTietSp=Object.keys(sessionStorage);
//Sang tab chi tiết 
let chi_tiet = document.querySelectorAll(".chi_tiet");
function click_ChiTiet(chi_tiet){
    Array.from(chi_tiet).forEach((item, index) => {
    
        item.onclick = (e) => {
            if(usersLogin){
                arrDeleteCook.forEach((item1, index) => {
        
                    item1.menu.forEach((element, indexElement) => {
                        
                        if (sessionStorage.getItem(`${"foods_" + item1.id + "_" + element.id}`)) {
                            console.log("success");
                            sessionStorage.removeItem(`${"foods_" + item1.id + "_" + element.id}`);
                            
                        }
                    })
                })
                
                sessionStorage.setItem(`${item.id}`, `${item.id}`)
                window.open(
                    "chitietsp.html", "_blank");
                //window.location.href = 'chitietsp.html'
            }
            else{
                alert("Bạn hãy đăng nhập để thực hiện chức năng này")
            }

            
        }
    })
}

click_ChiTiet(chi_tiet);





//Gợi ý khác
let GoiYKhac__ = document.querySelector('.GoiYKhac__');
dataFoods.forEach((item, index) => {

    GoiYKhac__.innerHTML += `
    <div class="col-12 col-md-6 text-center mt-2 mt-md-0" >
            <div class="ThanhVien__box w-100 GoiY_cook" id=${"cook_" + item.id}>
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


//Chức năng tìm kiếm tên món ăn 
let Tim_KiemInput = document.getElementById("Tim_Kiem");
let click_search = document.getElementById("click_search");
let valueInput;

click_search.onclick = function (e) {
    e.preventDefault();
    valueInput = Tim_KiemInput.value;
    if (valueInput) {
        let searchValue = [];
        menuCook[0].forEach((item) => {

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
            chi_tiet = document.querySelectorAll(".chi_tiet");
            click_ChiTiet(chi_tiet);
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
    let arrInput = [...menuCook[0]];
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
    let sortPrice = [...menuCook[0]];
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
    chi_tiet = document.querySelectorAll(".chi_tiet");
    click_ChiTiet(chi_tiet);
    scrip();

}
//Sắp xếp từ cao xuống thấp
let high_to_low = document.getElementById("high_to_low");
high_to_low.onclick = () => {
    let sortPrice = [...menuCook[0]];
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
    chi_tiet = document.querySelectorAll(".chi_tiet");
    click_ChiTiet(chi_tiet);
    scrip();

}







// menuCook[0].forEach((item, index) => {
//     DiCho__.innerHTML += ` <a href="#" class="market_" id=${"market_" + item.id}><h3>${item.title}</h3></a>
//     <div class="DiCho__${item.title}"> <div class="owl-carousel owl-theme" id=${"market__" + item.id}>  </div></div>
//     `
//     var menuMarket = document.querySelector(`#${"market__" + item.id}`)
//     //console.log(menuMarket);
//     item.menu.forEach((element, index) => {
//         let price=displayPrice(element.price)


//         menuMarket.innerHTML += `

//         <div class="item" >
//             <div class="card card--DiCho w-100">
//                 <h1 style="display:none">${element.img}</h1>
//                 <img src="${element.img}"
//                     class="card-img-top card-img--DiCho img-fluid img-circle rounded-circle" alt="...">
//                 <div class="card-body" id=${"market_"+item.id+"_"+element.id}>
//                         <h5 class="card-title">${element.name}</h5>
//                         <p class="card-text">Thực phẩm tươi sạch từ Việt Nam</p>
//                         <a href="#" class="btn btn-primary add_cart"><i class="fa fa-shopping-cart mr-md-2 "></i>Thêm vào giỏ hàng</a>

//                         <input class="buy_"  type="number" min="0" max="50" step="1" value="1" style="width: 50px;height:35px;background-color: coral;">
//                         <span>${price} - ${element.quantitative}</span>
//                         <h1 style="display:none">${element.price}</h1>
//                 </div>
//             </div>
//         </div>
//         `
//     })
// })
// let listMenu=document.querySelector('.listMenu')

// menuCook[0].forEach((item)=>{
//     listMenu.innerHTML +=`<li><h3>${item.name}</h3><h4>${item.price}</h4></li>`
// })











//Giỏ hàng





// //Thêm vào giỏ hàng.........................................


function addToCart_(cart_) {
    let pay_cart = document.querySelectorAll(".pay_cart")
    Array.from(pay_cart).forEach((item) => {
        item.textContent = `${cart_}`
    })
}
addToCart_(cart_);

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
        window.location.href='giohang.html'
    }
})
//.........................................................





//sessionStorage.removeItem(idStorage);










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