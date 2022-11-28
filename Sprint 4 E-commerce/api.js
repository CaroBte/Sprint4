console.log("Hola mundo - API");

//API

const API_URL = "http://localhost:3000"

//Paths de la API

const API_PATHS = {
    producto: "/producto/",
    compras: "/compras/",
}

//Manejador de errores

const handleError = (error) => {
    console.log("Error:" + error);
    alert("Ha habido un error" + error);
}

//Petición GET para el filtro

const httpGET = async (path, busqueda = "") => {
    try {
        let response = await fetch(API_URL + path + "?q=" + busqueda)
        let data = await response.json()
        return data

    } catch (error) {
        handleError(error);
    }
}

//Petición GET para obtener todos los objetos

const httpGETAll = async (path) => {
    try {
        let response = await fetch(API_URL + path)
        let data = await response.json()
        return data

    } catch (error) {
        handleError(error)

    }
}

//Petición GET para un producto según el id

const httpGETProduct = async (path, _id) => {
    try {
        let response = await fetch(API_URL + path + _id)
        let data = await response.json()
        return data

    } catch (error) {
        handleError(error)

    }
}

//Editar cosas en un objeto

const httpPATCH = async (path, newProp, id) => {

    try {
        let response = await fetch(API_URL + path + id,
            {
                body: JSON.stringify(newProp),
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        let data = await response.json()
        return data
    } catch (error) {
        handleError(error)
    }

}


//Agregar productos nuevos

const httpPOST = async (path, newObject) => {
    try {
        let response = await fetch(API_URL + path,

            {
                body: JSON.stringify(newObject),
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        let data = await response.json()
        return data
    } catch (error) {
        handleError(error);
    }
}

// Borrar cosas

const httpDELETE = async (path, id) => {
    try {
        let response = await fetch(
            `${API_URL}${path}${id}`,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        let data = await response.json()
        return data

    } catch (error) {
        handleError(error)
    }
}

// Utilizamos el crud de la parte inferior, porque la parte superior normalmente
// NO puedo acceder a ella desde el frontend, solo desde el backend !!

//CRUD para productos:

const getProductoFiltro = async (busqueda) => await httpGET(API_PATHS.producto, busqueda) //filtro 
const getProductos = async () => await httpGETAll(API_PATHS.producto)
const getProducto = async (id) => await httpGETProduct(API_PATHS.producto, id)

const updateProducto = async (id, newProp) => await httpPATCH(API_PATHS.producto, newProp, id)
const createProducto = async (newProducto) => await httpPOST(API_PATHS.producto, newProducto)
const eraseProducto = async (id) => await httpDELETE(API_PATHS.producto, id)

//CRUD para compras: 

const createCompras = async (newCompra) => await httpPOST(API_PATHS.compras, newCompra)
const getCompras = async () => await httpGETAll(API_PATHS.compras) 