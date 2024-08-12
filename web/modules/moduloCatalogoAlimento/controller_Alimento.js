let indexAlimentoSeleccionado;
let alimentos = []

document.getElementById('btnCleanAlimento').addEventListener('click', cleanAlimento);
document.getElementById('btnBusquedaAlimento').addEventListener('click', searchAlimento);
document.getElementById('btnDeleteAlimento').addEventListener('click', deleteAlimento);
document.getElementById('btnUpdateAlimento').addEventListener('click', updateAlimento);
document.getElementById('btnAddAlimento').addEventListener('click', addAlimento);


function addAlimento() {
    // aqui le estas definiendo los datos que vas a oocupar
    let idAlimento,
        nombreAlimento,
        categoria,
        descripcion,
        foto,
        precio,
        estatus;
        // aqui le estas diciendo que estas variables su valor se lo vas a traer del html de la etiqueta tal
    idAlimento = document.getElementById("txtIdAlimento").value;
    nombreAlimento = document.getElementById("txtNombreAlimento").value;
    categoria = document.getElementById("txtCategoria").value;
    descripcion = document.getElementById("txtDescripcion").value;
    foto=document.getElementById("txtFoto").value;
    precio=document.getElementById("numPrecio").value;

    // aqui estas declarando una variable de tipo array donde vas a almacenar los datos que trajiste del html (el paso de  arriba)
    let alimento = {
        idAlimento: idAlimento, 
        nombreAlimento: nombreAlimento,
        categoria: categoria,
        descripcion: descripcion,
        foto: foto,
        precio: precio,
        estatus: "Activo"
    };
    // aqui le esstas diciendo que guarde en bebidas osea el Array, los valores de bebida, eel que declaramos aqui arrriba
    alimentos.push(alimento);
    loadTabla();
    cleanAlimento(); 
}

// function loadTabla() {
//     let cuerpo = "";
//     bebidas.forEach(function (bebida, index) {
//         let registro = `
//             <tr onclick="moduloCatalogoAlimento.selectBebida(${index});">
//                 <td>${bebida.nombreBebida}</td>
//                 <td>${bebida.categoria}</td>
//                 <td>${bebida.descripcion}</td>
//                 <td>${bebida.foto}</td>
//                 <td>${bebida.precio}</td>
//                 <td>${bebida.estatus}</td>
//             </tr>
//         `;
//         cuerpo += registro;
//     });
//     console.log(cuerpo);
//     document.getElementById("tblBebida").innerHTML = cuerpo;
// }

function loadTabla() {
    let cuerpo = "";
    alimentos.forEach(function (alimento, index) {
        let registro = `
            <tr data-index="${index}">
                <td>${alimento.nombreAlimento}</td>
                <td>${alimento.categoria}</td>
                <td>${alimento.descripcion}</td>
                <td>${alimento.foto}</td>
                <td>${alimento.precio}</td>
                <td>${alimento.estatus}</td>
            </tr>
        `;
        cuerpo += registro;
    });
    document.getElementById("tblAlimento").innerHTML = cuerpo;

    const rows = document.querySelectorAll("#tblAlimento tr");
    rows.forEach(row => {
        row.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            selectAlimento(parseInt(index, 10));
        });
    });
}

function selectAlimento(index) {
    let alimento = alimentos[index];
    document.getElementById("txtIdAlimento").disabled=true;
    document.getElementById("txtNombreAlimento").value = alimentos[index].nombreAlimento;
    document.getElementById("txtCategoria").value = alimentos[index].categoria;
    document.getElementById("txtDescripcion").value = alimentos[index].descripcion;
    document.getElementById("txtFoto").value = alimentos[index].foto;
    document.getElementById("numPrecio").value = alimentos[index].precio;

    document.getElementById("btnUpdateAlimento").classList.remove("disabled");
    document.getElementById("btnDeleteAlimento").classList.remove("disabled");
    document.getElementById("btnAddAlimento").classList.add("disabled");

    indexAlimentoSeleccionado = index;
}

fetch("http://proyectozarape.test/web/modules/moduloCatalogoAlimento/data_Alimento.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(jsondata) {
        alimentos = jsondata;
        console.log(alimentos);
        loadTabla();
    })
    .catch(function(error) {
        console.error('Error fetching data:', error);
    });
    
    function cleanAlimento(){
    document.getElementById("txtIdAlimento").value = "";
    document.getElementById("txtNombreAlimento").value = "" ;
   document.getElementById("txtCategoria").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtFoto").value = "";
    document.getElementById("numPrecio").value = "";
    document.getElementById("txtIdAlimento").focus();

    document.getElementById("btnUpdateAlimento").classList.add("disabled");
    document.getElementById("btnDeleteAlimento").classList.add("disabled");
    document.getElementById("btnAddAlimento").classList.remove("disabled");
    indexAlimentoSeleccionado = 0;
}

function updateAlimento(){
    let idAlimento, 
     nombreAlimento,
    categoria,
    descripcion,
    foto,
    precio,
    estatus;
 
    idAlimento = document.getElementById("txtIdAlimento").disabled=true;
    nombreAlimento = document.getElementById("txtNombreAlimento").value;
    categoria=document.getElementById("txtCategoria").value;
    descripcion=document.getElementById("txtDescripcion").value;
    foto=document.getElementById("txtFoto").value;
    precio=document.getElementById("numPrecio").value;

    let alimento = {};
    // alimento.idAlimento = "01";
    alimento.nombreAlimento = nombreAlimento;
    alimento.categoria=categoria;
    alimento.descripcion=descripcion;
    alimento.foto=foto;
    alimento.precio=precio;
    alimento.estatus="Activo"
    
   alimentos[indexAlimentoSeleccionado] = alimento;
    cleanAlimento();
    loadTabla();
}

function deleteAlimento(){
    alimentos[indexAlimentoSeleccionado].estatus = "Inactivo";
    cleanAlimento();
    loadTabla();
}

function searchAlimento(){
    let filtro = document.getElementById("txtBusquedaAlimento").value;
    let resultados = alimentos.filter(element => element.nombreAlimento === filtro);
    let cuerpo = "";
    resultados.forEach(function(alimento){
        let registro =  
                '<tr onclick="selectAlimento('+ alimentos.indexOf(alimento) +');">'+
                '<td>' + alimento.nombreAlimento + '</td>' +
                '<td>' + alimento.categoria +  '</td>' +
                '<td>' + alimento.descripcion + '</td>' +
                '<td>' + alimento.foto + '</td>' +
                '<td>' + alimento.precio + '</td>' +
                '<td>' + alimento.estatus + '</td></tr>' ; 
        cuerpo += registro;
    });
    // console.log(cuerpo);
    document.getElementById("tblAlimento").innerHTML = cuerpo;
}