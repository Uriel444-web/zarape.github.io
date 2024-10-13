let indexBebidaSeleccionado;
let bebidas = []

document.getElementById('btnAddBebida').addEventListener('click',addBebida);
document.getElementById('btnCleanBebida').addEventListener('click', cleanBebida);
document.getElementById('btnBusquedaBebida').addEventListener('click', searchBebida);
document.getElementById('btnDeleteBebida').addEventListener('click', deleteBebida);
document.getElementById('btnUpdateBebida').addEventListener('click', updateBebida);

function addBebida() {
    // aqui le estas definiendo los datos que vas a oocupar
    let idBebida,
        nombreBebida,
        categoria,
        descripcion,
        foto,
        precio,
        estatus;
        // aqui le estas diciendo que estas variables su valor se lo vas a traer del html de la etiqueta tal
    idBebida = document.getElementById("txtIdBebida").value;
    nombreBebida = document.getElementById("txtNombreBebida").value;
    categoria = document.getElementById("txtCategoria").value;
    descripcion = document.getElementById("txtDescripcion").value;
    foto=document.getElementById("txtFoto").value;
    precio=document.getElementById("numPrecio").value;

    // aqui estas declarando una variable de tipo array donde vas a almacenar los datos que trajiste del html (el paso de  arriba)
    let bebida = {
        idBebida: idBebida, 
        nombreBebida: nombreBebida,
        categoria: categoria,
        descripcion: descripcion,
        foto: foto,
        precio: precio,
        estatus: "Activo"
    };
    // aqui le esstas diciendo que guarde en bebidas osea el Array, los valores de bebida, eel que declaramos aqui arrriba
    bebidas.push(bebida);
    loadTabla();
    cleanBebida(); 
}

function loadTabla() {
    let cuerpo = "";
    bebidas.forEach(function (bebida, index) {
        let registro = `
            <tr data-index="${index}">
                <td>${bebida.nombreBebida}</td>
                <td>${bebida.categoria}</td>
                <td>${bebida.descripcion}</td>
                <td>${bebida.foto}</td>
                <td>${bebida.precio}</td>
                <td>${bebida.estatus}</td>
            </tr>
        `;
        cuerpo += registro;
    });
    document.getElementById("tblBebida").innerHTML = cuerpo;

    const rows = document.querySelectorAll("#tblBebida tr");
    rows.forEach(row => {
        row.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            selectBebida(parseInt(index, 10));
        });
    });
}

function selectBebida(index) {
    let bebida = bebidas[index];
    document.getElementById("txtIdBebida").disabled=true;
    document.getElementById("txtIdBebida").value = bebidas[index].idBebida;
    document.getElementById("txtNombreBebida").value = bebidas[index].nombreBebida;
    document.getElementById("txtCategoria").value = bebidas[index].categoria;
    document.getElementById("txtDescripcion").value = bebidas[index].descripcion;
    document.getElementById("txtFoto").value = bebidas[index].foto;
    document.getElementById("numPrecio").value = bebidas[index].precio;

    document.getElementById("btnUpdateBebida").classList.remove("disabled");
    document.getElementById("btnDeleteBebida").classList.remove("disabled");
    document.getElementById("btnAddBbebida").classList.add("disabled");

    indexBebidaSeleccionado = index;
}

fetch("https://uriel444-web.github.io/zarape.github.io/web/modules/moduloCatalogoBebida/data_Bebida.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(jsondata) {
        bebidas = jsondata;
        console.log(bebidas);
        loadTabla();
    })
    .catch(function(error) {
        console.error('Error fetching data:', error);
    });
    
    function cleanBebida(){
    document.getElementById("txtIdBebida").value = "";
    document.getElementById("txtNombreBebida").value = "" ;
   document.getElementById("txtCategoria").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtFoto").value = "";
    document.getElementById("numPrecio").value = "";
    document.getElementById("txtIdBebida").focus;

    document.getElementById("btnUpdateBebida").classList.add("disabled");
    document.getElementById("btnDeleteBebida").classList.add("disabled");
    document.getElementById("btnAddBebida").classList.remove("disabled");
    indexBebidaSeleccionado = 0;
}

function updateBebida(){
    let idBebida, 
        nombreBebida,
        categoria,
        descripcion,
        foto,
        precio,
        estatus;
 
    idBebida = document.getElementById("txtIdBebida").value;
    nombreBebida = document.getElementById("txtNombreBebida").value;
    categoria=document.getElementById("txtCategoria").value;
    descripcion=document.getElementById("txtDescripcion").value;
    foto=document.getElementById("txtFoto").value;
    precio=document.getElementById("numPrecio").value;
    

    let bebida = {};
    bebida.idBebida = "01";
    bebida.nombreBebida = nombreBebida;
    bebida.categoria=categoria;
    bebida.descripcion=descripcion;
    bebida.foto=foto;
    bebida.precio=precio;
    bebida.estatus="Activo";
    
   bebidas[indexBebidaSeleccionado] = bebida;
    cleanBebida();
    loadTabla();
}

function deleteBebida(){
    bebidas[indexBebidaSeleccionado].estatus = "Inactivo";
    cleanBebida();
    loadTabla();
}

function searchBebida(){
    let filtro = document.getElementById("txtBusquedaBebida").value;
    let resultados = bebidas.filter(element => element.nombreBebida === filtro);
    let cuerpo = "";
    resultados.forEach(function(bebida){
        let registro =  
                '<tr onclick="moduloBebida.selectBebida('+ bebidas.indexOf(bebida) +');">'+
                '<td>' + bebida.nombreBebida + '</td>' +
                '<td>' + bebida.categoria +  '</td>' +
                '<td>' + bebida.descripcion + '</td>' +
                '<td>' + bebida.foto + '</td>' +
                '<td>' + bebida.precio + '</td></tr>' ; 
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblBebida").innerHTML = cuerpo;
}
