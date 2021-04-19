const Cook=" https://fresh-foods-project.herokuapp.com/api/v1/foods/1";

var listCook=[];

async function getListStyleFoods() {
    const data = await fetch(Cook)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            try {
                listCook = [...listCook, data];
            } catch (e) {
                console.log(e)
            }
            
            return listCook[0].data.listStyle;

        });
        
        return data

}



// //Sửa lại thông tin khi click vào tiêu đề nào checkClick sẽ đổi thành true
// export function updateCook(id, data) {
//     var options = {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     };
//      fetch(Cook + "/1/" + id, options)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {

//             listCook[0].data.listStyle.forEach((item, index) => {
//                 if (item.id == id) {
//                     listCook[0].data.listStyle[index].checkClick = data;
//                 }
//             })
//         });
// }

export const listFoods = async() => {
    let data = await getListStyleFoods()
    return data;
};


//Get market
const market="https://fresh-foods-project.herokuapp.com/api/v1/foods/2";

var listMarket=[];

async function getListStyleMarket() {
    const data = await fetch(market)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            try {
                listMarket = [...listMarket, data];
            } catch (e) {
                console.log(e)
            }
            return listMarket[0].data.listStyle;

        });
        
        return data

}



// //Sửa lại thông tin khi click vào tiêu đề nào checkClick sẽ đổi thành true
// export function updateMarket(id, data) {
//     var options = {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     };
//     fetch(Cook + "/1/" + id, options)
//         .then(function (response) {
//             return response.json();
//          })
//         .then(function (data) {

//             listMarket[0].data.listStyle.forEach((item, index) => {
//                 if (item.id == id) {
//                     listMarket[0].data.listStyle[index].checkClick = data;
//                 }
//             })
//         });
// }

export const marketMenu = async() => {
    let data = await getListStyleMarket()
    return data;
};

