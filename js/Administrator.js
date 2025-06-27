const API_URL = "https://retoolapi.dev/AEZ1u6/API-Don-Pollo";
const API_IMG_URL = "https://api.imgbb.com/1/upload"

async function CargarProductos(){
    
    const respuesta = await fetch(API_URL);
    const data = await respuesta.json();
    MostrarDatos(data);
}


//Funcion para crear las filas de la tabla en funcion al json
//"Datos" representara al json donde viene la informacion
function MostrarDatos(datos){
    const tabla = document.querySelector("#tabla tbody")

    tabla.innerHTML = ""


    datos.forEach(producto => {
        tabla.innerHTML += `
        <tr>
            <td>${producto.id}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.estado}</td>
            <td>${producto.stock}</td>
            <td>${producto.precio}</td>
            <td>${producto.imagen}</td>

            <td> 
               <button onClick = "AbrirModalEditar('${producto.id}', '${producto.stock}', '${producto.estado}', '${producto.precio}', '${producto.descripcion}', '${producto.imagen-producto}')">Editar</button>
               <button onClick = "eliminarPersona(${producto.id})">Eliminar</button>
            </td>
        </tr>
        `
    });
}
CargarProductos();

async function SubirImagen(file) {
    const fd = new FormData();
    fd.append('image', file); 
    const res = await fetch(API_IMG_URL, {method: 'POST', body: fd}); 
    const obj = await res.json();
    return obj.data.url;
    
}

const modal1 = document.getElementById("md-agregarProducto");
const btnAgregar = document.getElementById("btnGuardar");
const btnCerrar = document.getElementById("BtnCerrar");

btnAgregar.addEventListener("click", () => {
    modal1.showModal()
});

btnCerrar.addEventListener("click", () => {
    modal1.close();
});

document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault();

        const descripcion = document.getElementById("txtDescripcion").value.trim();
        const estado = document.getElementById("txtAEstado").value.trim();
        const stock = document.getElementById("txtStock").value.trim();
        const precio = document.getElementById("txtPrecio").value.trim();
    

    if (!descripcion || !estado || !stock || !precio) {
        alert("Por favor, complete todos los campos.");
    }
    
    const respuesta = await fetch(API_URL)

});
