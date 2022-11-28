console.log("Hola mundo - main")

// Función para crear las cards

const createCard = (_producto, _lugar) => {
    _lugar.innerHTML +=
        `<div class="card">
            <div class="d-flex justify-content-center">
                <img src="${_producto.imagen}" class="card-img-top">
            </div>
            <div class="card-body">
                <p class="mb-2">${_producto.categoria}</p>
                <h6 class="card-title mb-2">${_producto.nombre}</h6>
                <p class="mb-2">${_producto.contenido}</p>
                <h6 class="card-title mb-3 text-green">$ ${_producto.precio}</h6>
                <div class="input-group">
                <input disabled type="text" class="form-control add" placeholder="Add">
                <button class="btn btn-outline-success" onclick="guardarCart(${_producto.id})" type="button"><i class="fa-solid fa-cart-shopping"></i></button>
                <button class="btn btn-outline-danger" onclick="guardarFav(${_producto.id})"><i class="fa-sharp fa-solid fa-heart"></i></i></button>
                </div>
            </div>
        </div> `
}

//Función para mostrar las cards filtradas 

let cardsDiv = document.querySelector("#cardsDiv")

let data;

const showProductos = async (_productos, _lugar) => {
    _lugar.innerHTML = ""

    data = await getProductoFiltro(_productos)

    data.forEach(producto => {
        createCard(producto, cardsDiv)

    });

}

//Mostrar cards cuando cargue el DOM
window.addEventListener("DOMContentLoaded", showProductos(data, cardsDiv))


//Función para filtrar

let busqueda = document.querySelector("#search")
busqueda.addEventListener("submit", (e) => {
    e.preventDefault()
    let buscado = e.target.searched.value
    console.log(buscado);
    showProductos(buscado, cardsDiv)
})

//Guardar favoritos en el localStorage

const guardarFav = (_id) => {

    let localData = localStorage.getItem("favJSON")
    let dataArr;

    dataArr = JSON.parse(localData)
    if (dataArr == undefined) {  //si es undefined dataArr se vuelve un array vacio
        dataArr = [];
    }

    console.log(dataArr)

    if (dataArr.some((producto) => producto.id === _id)) {
        localStorage.removeItem("favJSON")   //remueve todo el favJSON si el id ya existe
        alert("Product removed from your wishlist")
        let filterArray = dataArr.filter((e) => {
            return e.id != _id
        })
        console.log(filterArray)

        let favJSON = JSON.stringify(filterArray)
        localStorage.setItem("favJSON", favJSON)
        location.reload()

    } else {

        //Usamos el find del data traido del data.json para compararlo con el id 
        //del click y guardamos ese elemento en data2
        let data2 = data.find((producto) => producto.id === _id);

        dataArr.push(data2)

        let favJSON = JSON.stringify(dataArr)
        localStorage.setItem("favJSON", favJSON)
        alert("Product added to your wishlist")
    }
}

//Guardar carrito en el localStorage
const guardarCart = (_id) => {

    let localData = localStorage.getItem("cartJSON")
    let dataArr;

    dataArr = JSON.parse(localData)
    if (dataArr == undefined) {  //si es undefined dataArr se vuelve un array vacio
        dataArr = [];
    }

    console.log(dataArr)

    if (dataArr.some((producto) => producto.id === _id)) {
        localStorage.removeItem("cartJSON")   //remueve todo el favJSON si el id ya existe
        alert("Product removed from your cart")
        let filterArray = dataArr.filter((e) => {
            return e.id != _id
        })
        console.log(filterArray)

        let cartJSON = JSON.stringify(filterArray)
        localStorage.setItem("cartJSON", cartJSON)
        location.reload()

    } else {

        //Usamos el find del data traido del data.json para compararlo con el id 
        //del click y guardamos ese elemento en data2
        let data2 = data.find((producto) => producto.id === _id);

        dataArr.push(data2)

        let cartJSON = JSON.stringify(dataArr)
        localStorage.setItem("cartJSON", cartJSON)
        alert("Product added to your cart")
        showNotify()
    }

}

const showNotify = () => {
    let notificacion = document.getElementById("notificacion")
    let dataArr = JSON.parse(localStorage.getItem("cartJSON"))

    notificacion.innerHTML = `${dataArr.length}`
}

showNotify()




