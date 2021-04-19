
import { listUser } from './validatorUser.js'
//API foods
import { listFoods } from './Api_foods/foods.js'
//API Market
import { marketMenu } from './Api_foods/foods.js'
import { updateUser } from './validatorUser.js'
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

    $(document).ready(function () {
        var typed = new Typed('.camOn__thanhToan h2', {
            strings: ["🛵🛵🛵🛵🛵🛵🛵🛵🛵",],
            loop: true,
            typeSpeed: 70,
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
}

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

//........................................
let idStorage1;
let arrDeleteCook = [];
dataFoods.forEach((item, index) => {
    if (sessionStorage.getItem(`${"cook_" + item.id}`)) {

        arrDeleteCook.push(item);
        dataFoods.splice(index, 1);
    }


})

arrDeleteCook.forEach((item1, index) => {

    item1.menu.forEach((element, indexElement) => {

        if (sessionStorage.getItem(`${"foods_" + item1.id + "_" + element.id}`)) {
            idStorage1 = sessionStorage.getItem(`${"foods_" + item1.id + "_" + element.id}`)
            console.log("success");
            //sessionStorage.removeItem(`${"foods_" + item1.id + "_" + element.id}`);

        }
    })
})




//HIển thị đăng xuất khi user đăng  nhập
let Dang_Xuat = document.querySelector(".Dang_Xuat");
let user_icon = document.querySelector(".user_icon");

let Dang_Xuat_header = document.querySelector(".Dang_Xuat_header");
let user_icon_header = document.querySelector(".user_icon_header");
//Trên trang chủ
if (usersLogin) {
    user_icon.onmousemove = () => {
        Dang_Xuat.classList.remove("hidden");
    }

    user_icon.onmouseout = () => {
        Dang_Xuat.classList.add("hidden");
    }

    Dang_Xuat.onclick = () => {

        //usersLogin.checkLogin = "false";
        const idCheckLoginUser = usersLogin.id;
        window.location.href = 'index.html'
        updateUser(idCheckLoginUser, { checkLogin: "false" });
    }

    user_icon_header.onmousemove = () => {
        Dang_Xuat_header.classList.remove("hidden");
    }

    user_icon_header.onmouseout = () => {
        Dang_Xuat_header.classList.add("hidden");
    }

    Dang_Xuat_header.onclick = () => {

        //usersLogin.checkLogin = "false";
        const idCheckLoginUser = usersLogin.id;
        window.location.href = 'index.html'
        updateUser(idCheckLoginUser, { checkLogin: "false" });
    }

}



//Tính tiền vnđ
function displayPrice(price) {
    var number = price;
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number);
}

//mảng các lựa chọn của user
let arr_food=[];
usersLogin.cart.forEach((item) => {
    arr_food.push(item)
    
})

//Hiển thị giỏ hàng
if (usersLogin.cart.length > 0) {
    console.log(usersLogin.cart);
    let cart_user = document.querySelector(".cart_user");

    usersLogin.cart.forEach((item) => {
        if (item.sesionStorage) {

            cart_user.innerHTML += `<div class="row gioHang__content py-md-5 border-dark border-bottom delete__">
        <div class="col-5">
            <img class="img-fluid img_foods"  src="${item.imgProduct}" alt="">
            <a href="#"class="name_food " >${item.name}</a>
            <p class="hidden sesionStorage_food">${item.sesionStorage}</p>
        </div>
        <div class="col-7 sanPham__GioHang text-center pt-md-5">
            <span class="price_origin">${item.unitPrice}</span>
            <button class="btn border-dark tang_">+</button>
            <span class="border-dark px-md-2 amount_food" style="width:200px ">${item.amount}</span>
            <button class="btn border-dark giam_">-</button>
            <span class="ml-md-3 total__cart">${item.total}</span>
            <button class="btn btn-success py-3 delete_product">Xóa sản phẩm</button>
        </div>
        </div>`
        }
        else {

            // let price_unitPrice=item.unitPrice;
            // let price_total=item.total;
            cart_user.innerHTML += `<div class="row gioHang__content py-md-5 border-dark border-bottom delete__">
        <div class="col-5">
            <img class="img-fluid img_foods"  src="${item.imgProduct}" alt="">
            <a href="#"class="name_food">${item.name}</a>
        </div>
        <div class="col-7 sanPham__GioHang text-center pt-md-5">
            <span class="price_origin">${item.unitPrice}</span>
            <button class="btn border-dark tang_">+</button>
            <span class="border-dark px-md-2 amount_food" style="width:200px ">${item.amount}</span>
            <button class="btn border-dark giam_">-</button>
            <span class="ml-md-3 total__cart">${item.total}</span>
            <button class="btn btn-success py-3 delete_product">Xóa sản phẩm</button>
        </div>
        </div>`
        }

    })

    //Tang tăng so luong hang
    let tang_button = document.querySelectorAll(".tang_");
    let amount_food = document.querySelectorAll(".amount_food");
    //giá tổng
    let total__cart = document.querySelectorAll(".total__cart");
    let arr_total = [...Array.from(total__cart)]
    //giá gốc
    let price_origin = document.querySelectorAll(".price_origin");
    let arr_origin = [...Array.from(price_origin)]
    //arr đếm số lượng mua
    let span_amonut = [...Array.from(amount_food)];
    let amout = 0, total_price = 0, price_origin_food = 0;
    //Lấy ảnh
    let img_foods = document.querySelectorAll(".img_foods");
    let img_all_foods = [...Array.from(img_foods)];
    //Lấy name_food
    let name_food = document.querySelectorAll(".name_food");
    let name_all_foods = [...Array.from(name_food)];
    //xóa sp
    let delete_product = document.querySelectorAll(".delete_product");
    let delete_food = [...Array.from(delete_product)];

    let delete__ = document.querySelectorAll(".delete__")
    let delete__div = [...Array.from(delete__)]

    //Lấy storage của món ăn
    let sesionStorage_food = document.querySelectorAll(".sesionStorage_food");
    let Storage_food = [...Array.from(sesionStorage_food)];
    console.log(img_all_foods[0].src, "a");

    Array.from(tang_button).forEach((item, index, arr) => {
        item.onclick = () => {
            amout = span_amonut[index].textContent;
            amout++;
            span_amonut[index].innerText = `${amout}`;
            //Giá gốc
            price_origin_food = arr_origin[index].textContent * 1;
            //Giá hiện tại
            total_price = price_origin_food * amout;
            //hiển thị giá hiện tại
            arr_total[index].innerText = `${total_price}`
            //Tính tổng tất cả
            let price_all = document.querySelector(".price_all");
            let priceAllFoods = 0;
            arr_total.forEach((item) => {
                priceAllFoods += item.textContent * 1
            })
            price_all.innerText = `${priceAllFoods}đ`

        }
    })


    //Tang giam so luong hang
    let giam_button = document.querySelectorAll(".giam_");



    Array.from(giam_button).forEach((item, index, arr) => {
        item.onclick = () => {
            amout = span_amonut[index].textContent;
            if (amout === 0) {
                item.disabled = true;
            }
            if (amout > 0) {
                item.disabled = false;
                amout = span_amonut[index].textContent;
                amout--;
                span_amonut[index].innerText = `${amout}`;
                //Giá gốc
                price_origin_food = arr_origin[index].textContent * 1;
                //Giá hiện tại
                total_price = total_price = price_origin_food * amout;;
                //hiển thị giá hiện tại
                arr_total[index].innerText = `${total_price}`
            }
            //Tính tổng tất cả
            let price_all = document.querySelector(".price_all");
            let priceAllFoods = 0;
            arr_total.forEach((item) => {
                priceAllFoods += item.textContent * 1
            })
            price_all.innerText = `${priceAllFoods}đ`

        }
    })

    //Tính tổng tất cả
    let price_all = document.querySelector(".price_all");
    let priceAllFoods = 0;
    arr_total.forEach((item) => {
        priceAllFoods += item.textContent * 1
    })
    price_all.innerText = `${priceAllFoods}đ`

    delete_food.forEach((item, index) => {
        item.onclick = () => {
            //console.log(delete__div[index]);
            delete__div[index].remove();
            arr_food.splice(index,1);
            updateUser(usersLogin.id, { "cart": arr_food});
        }
    })

    let arrAllBuyFood = [...usersLogin.purchase_history];

    let pay_all_foods = document.querySelector(".pay_all_foods");
    pay_all_foods.onclick = () => {
        let price_all = document.querySelector(".price_all");
        img_all_foods.forEach((item, index, arr) => {
            let obj_foods = {
                "name": `${name_all_foods[index].textContent}`,
                "imgProduct": `${item.src}`,
                "amount": `${span_amonut[index].textContent}`,
                "total": `${arr_total[index].textContent}`,
                //"storage_food":`${Storage_food[index].textContent}`
            }
            arrAllBuyFood.push(obj_foods);
        })

        let cart_hidden = document.querySelector(".cart_hidden");

        cart_hidden.classList.add("hidden");

        let history_buy = document.querySelector(".history_buy");
        history_buy.classList.remove("hidden");
        let thankyou_user=document.querySelector(".thankyou_user");
        thankyou_user.classList.remove("hidden");


        let history_buy_child = document.querySelector(".history_buy_child");

        arrAllBuyFood.forEach((item, index) => {
            history_buy_child.innerHTML += `<div class="row gioHang__content py-md-5 border-dark border-bottom">
            <div class="col-6">
                <img class="img-fluid" src="${item.imgProduct}" alt="">
                <a href="#">${item.name}</a>
            </div>
            <div class="col-6 sanPham__GioHang text-center pt-md-5">

                <span class="border-dark px-md-3 border" style="width:250px">${item.amount}</span>

                <span class="ml-4">${item.total}</span>
            </div>
        </div>`

        })
        scrip();
        updateUser(usersLogin.id, { "cart": [], "purchase_history": arrAllBuyFood });

    }

}
else {
    let thankyou_user=document.querySelector(".thankyou_user");
    thankyou_user.classList.remove("hidden");
    let cart_hidden = document.querySelector(".cart_hidden");

    cart_hidden.classList.add("hidden");
    let cart_user = document.querySelector(".cart_user");
    cart_user.innerHTML = `<h1>GIỎ HÀNG BẠN ĐANG TRỐNG VUI LÒNG QUAY LẠI MUA HÀNG :))</h1>`
    let arrAllBuyFood = [...usersLogin.purchase_history];

    let history_buy_child = document.querySelector(".history_buy_child");
    if (arrAllBuyFood != null) {
        arrAllBuyFood.forEach((item, index) => {
            if (item.storage_food != null) {
               
                history_buy_child.innerHTML += `<div class="row gioHang__content py-md-5 border-dark border-bottom">
                <div class="col-6">
                    <img class="img-fluid" src="${item.imgProduct}" alt="">
                    <a href="#" class="xem_chi_tiet">${item.name}</a>
                    <p class="hidden sesionStorage_food">${item.storage_food}</p>
                </div>
                <div class="col-6 sanPham__GioHang text-center pt-md-5">
        
                    <span class="border-dark px-md-3 border" style="width:250px">${item.amount}</span>
        
                    <span class="ml-4">${item.total}</span>
                </div>
            </div>`
            }
            else {
                history_buy_child.innerHTML += `<div class="row gioHang__content py-md-5 border-dark border-bottom">
                <div class="col-6">
                    <img class="img-fluid" src="${item.imgProduct}" alt="">
                    <a href="#" class="xem_chi_tiet">${item.name}</a>
                </div>
                <div class="col-6 sanPham__GioHang text-center pt-md-5">
        
                    <span class="border-dark px-md-3 border" style="width:250px">${item.amount}</span>
        
                    <span class="ml-4">${item.total}</span>
                </div>
            </div>`
            }




        })
        let p_sesionStorage_food = document.querySelectorAll(".sesionStorage_food");
        
        let p_p_sesionStorage_foods = [...Array.from(p_sesionStorage_food)];
        p_p_sesionStorage_foods.forEach((item, index) => {

            let parent_p = item.parentElement;
            let a_chitietsp = parent_p.querySelector(".xem_chi_tiet");
            
            a_chitietsp.onclick = function () {
                sessionStorage.removeItem(idStorage1);
                console.log(idStorage1);
                sessionStorage.setItem(item.textContent, item.textContent);
                window.open(
                    "chitietsp.html", "_blank");
            }
        })


        scrip();
    }
    else {
        history_buy_child.innerHTML += `
        <div class="row gioHang__content py-md-5 border-dark border-bottom">
                <div class="col-6">
                    <p class="hidden sesionStorage_food">Bạn chưa sản phẩm nào quay lại ủng hộ cửa hàng nhé</p>
                </div>

            </div>`
    }

}

let history_buy_child = document.querySelector(".history_buy_child");


scrip();

//Hiển thị giỏ hàng...........................
function addToCart_(cart_) {
    let pay_cart = document.querySelectorAll(".pay_cart")
    Array.from(pay_cart).forEach((item) => {
        item.textContent = `${cart_}`
    })
}
addToCart_(cart_);

//Bấm vô giỏ hàng sẽ update user đã chọn
let pay_cart = document.querySelectorAll(".pay_cart1")
Array.from(pay_cart).forEach((item) => {
    item.onclick = () => {
        updateUser(usersLogin.id, { "cart": arrCart });
    }
})
































scrip();