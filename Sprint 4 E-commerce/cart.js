console.log("Hola Mundo - cart");

let cardsCart = document.querySelector("#cardsCart")
let total = 0;

//Función que crea las cards del carrito

const cartCard = async (_product) => {
    let producto = await getProducto(_product.id)
    let cantidad = parseInt(producto.cantidad)
    let subtotal = (_product.precio * cantidad)
    total = total + subtotal

    document.getElementById("total-final").innerHTML = `<h6 class="text-green" id="total-final">$<u>${total}</u></h6>`

    cardsCart.innerHTML += `
<div class="cart bg-light d-flex flex-wrap flex-row align-items-center justify-content-around">
            <div class="img-cart">
                <img src="${_product.imagen}" style="width:7rem">
            </div>
            <div class="text-cart">
                <p class="mb-1" style="width:12rem"> <strong>${_product.nombre}</strong></p>
                <span class="text-grey">${_product.contenido}</span>
            </div>
            <div class="price-cart">
                <p><strong>Price</strong></p>
                <p class="text-success">${_product.precio}</p>
            </div>
            <div class="quantity-cart input-group">
                <button class="btn btn-outline-secondary" onclick="subtract(${_product.id})">-</button>
                <input id="quantity${_product.id}" type="text" value="${cantidad}" class="form-control" disabled>
                <button class="btn btn-outline-secondary" onclick="add(${_product.id})" type="button">+</button>               
            </div>
            <div class="subtotal-cart">
                <p><strong>Subtotal</strong></p>
                <p class="text-success" id= "subtotal${_product.id}"> $ ${subtotal}</p> 
            </div>
            <div>
                <p><strong>Action</strong></p>
                <p id="remove" class="text-danger" onclick="guardarCart(${_product.id})"> <strong> <u>Remove</u> </strong> </p>
            </div>`
}

//Función para traer carts desde LocalStorage y mostrar las cards

let carrito = JSON.parse(localStorage.getItem("cartJSON"))
let carritoLocal = carrito

const showCart = () => {
    if (carrito == null || carrito.length === 0) {
        cardsCart.innerHTML =
            `<div>
<h3 class= "text-danger m-5">Your cart is empty</h3>
<h5 class= "m-5">Click here to add some products -> <a href ="./index.html"><i class="fa-solid fa-house"></i> </h5>
</div>`
    } else {
        carrito.forEach(element => {
            cartCard(element)
        })
    }
}

window.addEventListener("DOMContentLoaded", showCart);

// Funciones para el contador 
/* La cantidad se va a modificar en la copia local del carrito que trajimos
del local storage, NO del json server porque esto es del lado del cliente, más no 
de la base de datos */

let nuevaCantidad;

const subtract = async (_id) => {

    let product = carritoLocal.find((producto) => producto.id === _id)

    if (product.cantidad != 0) {

        nuevaCantidad = product.cantidad - 1

        //actualizamos la cantidad del producto según la posición en que
        //se encuentre en el array c:

        for (let index = 0; index < carritoLocal.length; index++) {
            if (carritoLocal[index].id == _id) {
                carritoLocal[index].cantidad = nuevaCantidad
            }
        }

        //Sobreescribimos la cantidad según vaya restando
        document.getElementById(`quantity${_id}`).value = nuevaCantidad;

        //Actualizamos el valor del subtotal según nuevaCantidad
        document.getElementById(`subtotal${product.id}`).innerHTML = `$ ${(nuevaCantidad * product.precio)}`

        //Actualizamos el total de abajito c:
        total -= product.precio
        document.getElementById("total-final").innerHTML = `<h6 class="text-green" id="total-final">$<u>${total}</u></h6>`

        return total
    }
}

const add = async (_id) => {

    let product = carritoLocal.find((producto) => producto.id === _id)

    nuevaCantidad = product.cantidad + 1

    //actualizamos la cantidad del producto según la posición en que
    //se encuentre en el array c:
    for (let index = 0; index < carritoLocal.length; index++) {
        if (carritoLocal[index].id == _id) {
            carritoLocal[index].cantidad = nuevaCantidad
        }
    }
    //Sobreescribimos la cantidad según vaya sumando
    document.getElementById(`quantity${_id}`).value = nuevaCantidad;

    //Actualizamos el valor del subtotal según nuevaCantidad
    document.getElementById(`subtotal${product.id}`).innerHTML = `$ ${(nuevaCantidad * product.precio)}`

    //Actualizamos el valor del total de abajito
    total += product.precio
    document.getElementById("total-final").innerHTML = `<h6 class="text-green" id="total-final">$<u>${total}</u></h6>`

    return total
}

let btnBuy = document.getElementById("buy-now")
btnBuy.addEventListener("click", async () => {

    //Capturamos datos del formulario

    const name = document.getElementById("input-nombre").value
    const adress = document.getElementById("input-adress").value
    const cellphone = document.getElementById("input-celular").value
    const totalCompra = `$ ${total}`
    const compra = carritoLocal
    const factura = []

    //Metemos en la factura el nombre y la cantidad de cada producto comprado

    compra.forEach(element => {
        factura.push(`${element.nombre} x ${element.cantidad}`)
    })

    //Creamos el objeto de la nueva compra

    const newCompra = {
        name: name,
        adress: adress,
        cellphone: cellphone,
        factura: factura,
        total: totalCompra
    }

    //Agregamos la compra al json server

    await createCompras(newCompra)
    localStorage.removeItem("cartJSON")
    location.reload()

})