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



const modalAgregar = document.getElementById("md-agregarProducto");
const btnAgregar = document.getElementById("BtnAgregar");

const btnCerrar = document.getElementById("BtnCerrar");

btnAgregar.addEventListener("click", () => {
    modalAgregar.showModal()
});

btnCerrar.addEventListener("click", () => {
    modalAgregar.close();
});




document.getElementById("frmAgregarProductos").addEventListener("submit", async e => {
    e.preventDefault();

        const imagen = document.getElementById("imagen-file").value.trim();
        const descripcion = document.getElementById("txtDescripcion").value.trim();
        const estado = document.getElementById("txtAEstado").value.trim();
        const stock = document.getElementById("txtStock").value.trim();
        const precio = document.getElementById("txtPrecio").value.trim();
    

    if (!descripcion || !estado || !stock || !precio) {
        alert("Por favor, complete todos los campos.");
    }
    
    const respuesta = await fetch(API_URL, {
       method: "POST",
       headers: {'Content-Type':'application/json'},
       body: JSON.stringify({descripcion, estado, stock, precio, imagen})

    });;

    if(respuesta.ok){
        alert("El producto se añadio correctamente");

        document.getElementById("frmAgregarProductos").reset();

        modalAgregar.close();

        CargarProductos();

    }else{
        alert("El Registro no se añadio!");
    }

});



async function eliminarProducto(id){
    const confirmacion = confirm("Quieres eliminar este producto?")

    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        })
        alert("El registro fue eliminado");
    }
    CargarProductos();
}



async function SubirImagen(file) {
    const fd = new FormData();
    fd.append('image', file); 
    const res = await fetch(API_IMG_URL, {method: 'POST', body: fd}); 
    const obj = await res.json();
    return obj.data.url;
    
}

const modalEditar = document.getElementById("md-EditarProducto");
const modalCerrarEditar = document.getElementById("BtnCerrarEditar");

modalCerrarEditar.addEventListener("click", () => {
    modalCerrarEditar.close();
});

function AbrirModalEditar(id, descripcion, estado, stock, precio){
    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtDescProductoED").value = descripcion;
    document.getElementById("txtAEstadoED").value = estado;
    document.getElementById("txtStockED").value = stock;
    document.getElementById("txtPrecioED").value = precio

    modalEditar.showModal();
}

document.getElementById("frmEditarProducto").addEventListener("submit", async e => {
    e.preventDefault();

    const id = document.getElementById("txtIdEditar").value;
    const descripcion = document.getElementById("txtDescProductoED").value;
    const estado = document.getElementById("txtAEstadoED").value;
    const stock = document.getElementById("txtStockED").value;
    const precio = document.getElementById("txtPrecioED").value;

    if(!id || !descripcion || !estado || !stock || !precio){
        alert("Primero complete los campos");
        return;
    }

    const respuesta = await fetch(`${API_URL}/${id}}`, {
        method: "PUT",
        headers: {"Content-Type":"applicatinon/json"},
        body: JSON.stringify({descripcion, estado, stock, precio})
    });

    if(respuesta.ok){
        alert("El producto ha sido Actualizado!");
        modalEditar.close;
        CargarProductos();
    }else{
        alert("El registro no se actualizo!");
    }
})



document.getElementById('imagen-file').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function(e) {
      const preview = document.getElementById('preview-img');
      preview.src = e.target.result;
      preview.style.display = 'block';
    }
  
    if (file) {
      reader.readAsDataURL(file);
    }
  });