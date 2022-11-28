console.log("Hola Mundo - fav");

let cardsFav = document.querySelector("#cardsFav")

//Función para traer fav desde LocalStorage e imprimir cards

let favoritos = JSON.parse(localStorage.getItem("favJSON"))
const showFav = async () => {

    data = await getProductos();

    if (favoritos.length === 0) {
        cardsFav.innerHTML =
            `<div>
                <h3 class= "text-danger m-5">Your wishlist is empty</h3>
                <h5 class= "m-5">Click here to add some products -> <a href ="./index.html"><i class="fa-solid fa-house"></i> </h5>
            </div>`
    } else {
        favoritos.forEach(element => {
            createCard(element, cardsFav)
        })
    }
}

window.addEventListener("DOMContentLoaded", showFav);




