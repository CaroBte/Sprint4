console.log("Hola mundo - adm");

let adminCards = document.getElementById("showCards");

//Función para crear las cards de los productos c:

const cardsAdmin = (_producto) => {
    adminCards.innerHTML += `       
    <div id="cardAdmin" class="card mb-4">
        <div class="d-flex justify-content-center">
            <img src="${_producto.imagen}" class="card-img-top">
        </div>
        <div class="card-body">
            <p class="mb-2">${_producto.categoria}</p>
            <h6 class="card-title mb-2">${_producto.nombre}</h6>
            <p class="mb-2">${_producto.contenido}</p>
            <h6 class="card-title mb-3 text-green">$ ${_producto.precio}</h6>
            <div id="botones-cards-admin" class="d-flex justify-content-center input-group">
                <button onclick="erase(${_producto.id})" class="btn btn-outline-danger">Delete</button>
                <a href="#editAdmin"><button onclick="mostrarDatos(${_producto.id})" class="btn btn-outline-success">Edit</button></a>
            </div>
        </div>
    </div> `
}

//Función para obtener productos del data.json y mostrarlas en pantalla

const showCards = async () => {
    let productos = await getProductos()
    productos.forEach(producto => {
        cardsAdmin(producto)
    });
}

window.addEventListener("DOMContentLoaded", showCards);

//Función para obtener datos del formulario

const capturaDatos = () => {
    const imagen = document.getElementById("inputUrl").value
    const nombre = document.getElementById("inputNombre").value
    const precio = parseInt(document.getElementById("inputPrecio").value)
    const categoria = document.getElementById("inputCategoria").value
    const contenido = document.getElementById("inputContenido").value
    const newProducto = {
        imagen: imagen,
        nombre: nombre,
        precio: precio,
        categoria: categoria,
        contenido: contenido,
        cantidad: 1
    }
    //Crea el producto con los datos del formulario
    return newProducto
}

// Función para añadir el producto al json
let submit = document.getElementById("btn-enviar")
submit.addEventListener("click", async () => {
    const newProducto = capturaDatos()
    await createProducto(newProducto)
    location.reload()
})

//Función para eliminar el producto

const erase = async (id) => {
    await eraseProducto(id)
    location.reload()
}

//Función para editar el producto

//-Mostrar valores según id en editar

const mostrarDatos = async (id) => {

    const producto = await getProducto(id)

    document.getElementById("editId").value = producto.id
    document.getElementById("editUrl").value = producto.imagen
    document.getElementById("editNombre").value = producto.nombre
    document.getElementById("editPrecio").value = parseInt(producto.precio)
    document.getElementById("editCategoria").value = producto.categoria
    document.getElementById("editContenido").value = producto.contenido

    return producto
}

//-Actualizar productos según los nuevos value

let editBtn = document.getElementById("btn-modificar")
editBtn.addEventListener("click", async () => {

    const id = document.getElementById("editId").value
    const imagen = document.getElementById("editUrl").value
    const nombre = document.getElementById("editNombre").value
    const precio = parseInt(document.getElementById("editPrecio").value)
    const categoria = document.getElementById("editCategoria").value
    const contenido = document.getElementById("editContenido").value

    const editProducto = {
        id: id,
        imagen: imagen,
        nombre: nombre,
        precio: precio,
        categoria: categoria,
        contenido: contenido,
    }

    await updateProducto(id, editProducto)
    location.reload()

})

// Crea cada compra
let tableCompras = document.getElementById("tbody")

const crearCards = (_compra) => {
    let factura = "";
    _compra.factura.forEach((item) => {
        factura = factura + item + "<br/>"
    })

    tableCompras.innerHTML += `
    <tr>
        <td>${_compra.name}</td>
        <td>${_compra.adress}</td>
        <td>${_compra.cellphone}</td>
        <td>${factura}</td>
        <td>${_compra.total}</td>
    </tr>
    `
}

//Traer compras y pintarlas

let mostrarCompras = async () => {
    let compras = await getCompras()
    console.log(compras)
    compras.forEach(compra => {
        console.log(compra)
        crearCards(compra)
    })
}

let btnCompras = document.getElementById("btnCompras")
btnCompras.addEventListener("click", () => {
    mostrarCompras()
})
