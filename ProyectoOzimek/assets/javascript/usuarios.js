let EstiloLogin = document.getElementById("EstiloLogin");
const sesion = document.getElementById("sesion")
let insertUser = document.getElementById("profile");

// Función para validar el inicio de sesión
function iniciarSesion() {
    const usuario = document.getElementById("usuario").value;
    const contra = document.getElementById("contrasena").value;

    // Verificar si las credenciales coinciden con las de un administrador (esto es un ejemplo, debes ajustarlo)
    if (usuario === "admin" && contra === "admin123") {
        // Las credenciales son correctas, establecer como administrador en localStorage
        localStorage.setItem('esAdministrador', true);

        // Redirigir a la página de administrador
        window.location.reload();
    } else {
        // Las credenciales son incorrectas, mostrar un mensaje de error
        localStorage.setItem('esAdministrador', false);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
        });
    }
}

// Agregar un evento para el envío del formulario
const formulario = document.querySelector("form");
formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar el envío del formulario normal

    iniciarSesion();
});

// Verificar si el usuario es un administrador
if (JSON.parse(localStorage.getItem("esAdministrador"))) {
    sesion.innerText="CERRAR SESION"
    EstiloLogin.innerHTML = `
    <h1>Hola, admin</h1>
    <button class="btn" id="btn-unlog">Cerrar Sesión</button>
    `;
    let btnUnlog = document.getElementById("btn-unlog");
    btnUnlog.onclick = (e) => {
        e.preventDefault();
        localStorage.setItem('esAdministrador', false);
        window.location.reload();
    };
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
