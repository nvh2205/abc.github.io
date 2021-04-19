

var users = "https://fresh-foods-project.herokuapp.com/api/v1/users";
var listUser1 = [];


async function getUsers() {
    const data = await fetch(users)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            try {
                listUser1 = [...listUser1, data];
            } catch (e) {
                console.log(e)
            }
            //console.log(listUser1,"222222");
            return listUser1;

        });
        
        return data

}

// export function getUsers() {
//     fetch(users)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function(data){
//         return data;
//     });
// }






// async function getUsers() {
//     const data =  fetch(users)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             listUser1.push(data);
//             console.log(listUser1,"222222");
//             return listUser1;
//         });

//         //return data

// }



export function createUser(data) {
    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(users, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            listUser1.push(data);
        })
}

export function updateUser(id, data) {
    var options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(users + "/" + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            if(Object.keys(data)==='checkLogin'){
                listUser1[0].data.data.forEach((item, index) => {
                    if (item.id == id) {
                        listUser1[0].data.data[index].checkLogin = data;

                    }
                })
            }
            else if(Object.keys(data)==='cart'){
                listUser1[0].data.data.forEach((item, index) => {
                    if (item.id == id) {
                        listUser1[0].data.data[index].cart = [...data];
                    }
                })
            }
        });
}





export const listUser = async() => {
    let data = await getUsers()
    return data;
};

