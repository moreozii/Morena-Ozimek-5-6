const sesion = document.getElementById("sesion")
let insertUser = document.getElementById("profile");

// Verificar si el usuario es un administrador
if (JSON.parse(localStorage.getItem("esAdministrador"))) {
    sesion.innerText="CERRAR SESION"
} else {
    // Función para crear la interfaz de usuario normal
    const crearUsuario = () => {
        let nombreUser = sessionStorage.getItem("nombreUser");
        let apellidoUser = sessionStorage.getItem("apellidoUser");
        let fotoUser = sessionStorage.getItem("fotoUser");
        insertUser.innerHTML = `
            <p id="user-name" style="margin: 0">Hola, ${nombreUser} ${apellidoUser}</p>
            <img src="${fotoUser}" id="user-pic">
        `;
    };

    // Verificar si ya existen datos de usuario en el sessionStorage
    if (!sessionStorage.getItem("nombreUser")) {
        fetch("https://randomuser.me/api/")
            .then((response) => response.json())
            .then((resultado) => {
                // Obtener datos aleatorios del usuario
                let apiNombre = resultado.results[0].name.first;
                let apiApellido = resultado.results[0].name.last;
                let apiFoto = resultado.results[0].picture.medium;

                // Almacenar los datos del usuario en el sessionStorage
                sessionStorage.setItem("nombreUser", apiNombre);
                sessionStorage.setItem("apellidoUser", apiApellido);
                sessionStorage.setItem("fotoUser", apiFoto);

                // Generar la interfaz de usuario con los datos almacenados
                crearUsuario();
            })
            .catch((error) => {
                console.log(error);
                insertUser.innerHTML = `
                    <p id="user-name">Error al cargar usuario.</p>
                `;
            });
    } else {
        // Si los datos del usuario ya existen en el sessionStorage, usarlos directamente
        crearUsuario();
    }
}







localStorage.getItem('carrito')
let carrito = JSON.parse(localStorage.getItem('carrito'))


function finalizarCompra() {

    swal.fire("¡Compra exitosa!", "Gracias por tu compra.", "success");

    vaciarCarrito();
}


function vaciarCarrito() {

    carrito = [];

    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarProductosEnCarrito();

    document.getElementById("finalizarCompra").disabled = true;
    document.getElementById("vaciarCarrito").disabled = true;
}

const finalizarCompraBtn = document.getElementById("finalizarCompra");
const vaciarCarritoBtn = document.getElementById("vaciarCarrito");

if (carrito.length > 0) {

    finalizarCompraBtn.disabled = false;
    vaciarCarritoBtn.disabled = false;
} else {
    finalizarCompraBtn.disabled = true;
    vaciarCarritoBtn.disabled = true;
}

function mostrarProductosEnCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");

    listaCarrito.innerHTML = "";

    for (const producto of carrito) {
        const productoDiv = document.createElement("div");
        productoDiv.className="divProd"
        const imagen = document.createElement("img");
        imagen.src = producto.imagenURL || "default.jpg";
        imagen.alt = producto.nombre;
        imagen.width = 275;

        const nombrePrecio = document.createElement("div");
        nombrePrecio.className="divNombrePrecio"
        nombrePrecio.innerHTML = `<b>${producto.nombre}</b><br>Precio: $${producto.precio.toFixed(2)}`;

        productoDiv.appendChild(imagen);
        productoDiv.appendChild(nombrePrecio);

        listaCarrito.appendChild(productoDiv);
    }
}

mostrarProductosEnCarrito()




