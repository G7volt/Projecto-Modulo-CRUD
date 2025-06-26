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
            <td>${producto.stock}</td>
            <td>${producto.estado}</td>
            <td>${producto.precio}</td>
            <td>${producto.descripcion}</td>
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