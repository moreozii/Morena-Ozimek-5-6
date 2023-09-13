let productos = [];
const sesion = document.getElementById("sesion")

class Producto {
    constructor(nombre, precio, imagenURL) {
        this.nombre = nombre;
        this.precio = parseFloat(precio); 
        this.imagenURL = imagenURL;
    }
}

function agregarProducto() {
    const nombreProducto = document.getElementById("nombreProducto").value;
    const precioProducto = document.getElementById("precioProducto").value;
    const imagenURLProducto = document.getElementById("imagenURLProducto").value;


    if (nombreProducto.trim() === "" || isNaN(precioProducto)) {
        alert("Por favor, ingrese un nombre y un precio válido.");
        return;
    }


    const producto = new Producto(nombreProducto, precioProducto, imagenURLProducto);


    productos.push(producto);


    localStorage.setItem('productos', JSON.stringify(productos));


    mostrarProductos();


    document.getElementById("nombreProducto").value = "";
    document.getElementById("precioProducto").value = "";
    document.getElementById("imagenURLProducto").value = "";
}


function cargarProductos() {
    const productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
        productos = JSON.parse(productosGuardados);
    } else {

        const producto1 = new Producto("Producto 1", 25000, "https://essential.vtexassets.com/arquivos/ids/945533-800-auto?v=638235726998570000&width=800&height=auto&aspect=true");
        const producto2 = new Producto("Producto 2", 35000, "https://www.moov.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwb4c4fe1a/products/NICU4489-063/NICU4489-063-1.JPG");
        const producto3 = new Producto("Producto 3", 30000, "https://www.moov.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwd788f1aa/products/AD_HF7535/AD_HF7535-1.JPG");
        const producto4 = new Producto("Producto 4", 80000, "https://www.moov.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwd36ca0e4/products/NIDV1414-010/NIDV1414-010-2.JPG");

        productos.push(producto1, producto2, producto3, producto4);

        localStorage.setItem('productos', JSON.stringify(productos));
    }


    mostrarProductos();
}



window.onload = cargarProductos;

function mostrarProductos() {
    const listaProductos = document.getElementById("listaProductos");


    listaProductos.innerHTML = "";


    for (const producto of productos) {
        const productoDiv = document.createElement("div");
        productoDiv.className="divProd"
        const imagen = document.createElement("img");
        imagen.src = producto.imagenURL || "default.jpg"; // Imagen por defecto si no se proporciona una URL
        imagen.alt = producto.nombre;
        imagen.width = 275; // Puedes ajustar el tamaño de la imagen según tus necesidades

        const nombrePrecio = document.createElement("div");
        nombrePrecio.className="divNombrePrecio"
        nombrePrecio.innerHTML = `<b>${producto.nombre}</b><br>Precio: $${producto.precio.toFixed(2)}`;

        const agregarAlCarritoBtn = document.createElement("button");
        agregarAlCarritoBtn.className="btn"
        agregarAlCarritoBtn.textContent = "Añadir al carrito";
        agregarAlCarritoBtn.addEventListener("click", () => agregarAlCarrito(producto));

        productoDiv.appendChild(imagen);
        productoDiv.appendChild(nombrePrecio);
        productoDiv.appendChild(agregarAlCarritoBtn);

        listaProductos.appendChild(productoDiv);
    }
}


function agregarAlCarrito(producto) {

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


    carrito.push(producto);


    localStorage.setItem('carrito', JSON.stringify(carrito));



    alert(`${producto.nombre} se ha añadido al carrito.`);
}

const agregarAlCarritoBtn = document.createElement("button");
agregarAlCarritoBtn.textContent = "Añadir al carrito";
agregarAlCarritoBtn.addEventListener("click", () => agregarAlCarrito(producto));










































const agregarProductos = document.getElementById("agregarProductos")
let insertUser = document.getElementById("profile");

// Verificar si el usuario es un administrador
if (JSON.parse(localStorage.getItem("esAdministrador"))) {
    sesion.innerText="CERRAR SESION"
    
} else {
    agregarProductos.innerHTML=""
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
