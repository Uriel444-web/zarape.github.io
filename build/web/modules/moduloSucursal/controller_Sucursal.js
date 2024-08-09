let indexSucursalSeleccionado;
let sucursales = [];

document.getElementById('btnAdd').addEventListener('click',addSucursal);
document.getElementById('btnClean').addEventListener('click', clean);
function addSucursal() {
    let numero_unico_sucursal,
        nombre,
        calleYNum,
        colonia,
        GPS,
        telefono;

    numero_unico_sucursal = document.getElementById("txtNumUnico").value;
    nombre = document.getElementById("txtNombre").value;
    calleYNum = document.getElementById("txtCalleYNum").value;
    colonia = document.getElementById("txtColonia").value;
    GPS = document.getElementById("txtGPS").value;
    telefono = document.getElementById("txtTelefono").value;

    let sucursal = {
        numero_unico_sucursal: numero_unico_sucursal,
        nombre: nombre,
        calleYNum: calleYNum,
        colonia: colonia,
        telefono: telefono,
        GPS: GPS,
        estatus: "Activo"
    };
    
    sucursales.push(sucursal);
    loadTabla();
    clean(); // Descomentar si deseas limpiar los campos después de agregar
}

function loadTabla() {
    let cuerpo = "";
    sucursales.forEach(function (sucursal, index) {
        let registro = `
            <tr onclick="moduloSucursal.selectSucursal(${index});">
                <td>${sucursal.nombre}</td>
                <td>${sucursal.calleYNum}</td>
                <td>${sucursal.telefono}</td>
                <td>${sucursal.GPS}</td>
                <td>${sucursal.estatus}</td>
            </tr>
        `;
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblSucursal").innerHTML = cuerpo;
}

function selectSucursal(index) {
    let sucursal = sucursales[index];
    document.getElementById("txtNumUnico").value = sucursal.numero_unico_sucursal;
    document.getElementById("txtNombre").value = sucursal.nombre;
    document.getElementById("txtCalleYNum").value = sucursal.calleYNum;
    document.getElementById("txtColonia").value = sucursal.colonia;
    document.getElementById("txtTelefono").value = sucursal.telefono;
    document.getElementById("txtGPS").value = sucursal.GPS;

    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");

    indexSucursalSeleccionado = index;
}

fetch("modules/moduloSucursal/data_Sucursal.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(jsondata) {
        sucursales = jsondata;
        console.log(sucursales);
        loadTabla();
    })
    .catch(function(error) {
        console.error('Error fetching data:', error);
    });
    
    function clean(){
    document.getElementById("txtNumUnico").value = "";
    document.getElementById("txtNombre").value = "" ;
    document.getElementById("txtCalleYNum").value = "";
    document.getElementById("txtColonia").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtGPS").value = "";
    document.getElementById("txtHorario").value = "";
    document.getElementById("txtPagWeb").value = "";
    document.getElementById("txtNombre").focus();
    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexSucursalSeleccionado = 0;
}

function updateSucursal(){
    let numero_unico_cliente, 
        nombre,
        calleYNum,
        colonia,
        telefono,
        GPS,
        horario,
        pagWeb;
 
    numero_unico_cliente = document.getElementById("txtNumUnico").value;
    nombre = document.getElementById("txtNombre").value;
    calleYNum = document.getElementById("txtCalleYNum").value;
    colonia = document.getElementById("txtColonia").value;
    telefono = document.getElementById("txtTelefono").value;
    GPS = document.getElementById("txtGPS").value;
    horario = document.getElementById("txtHorario").value;
    pagWeb = document.getElementById("txtPagWeb").value;
    let sucursal = {};
    sucursal.numero_unico_cliente = "RF01";
    sucursal.nombre = nombre;
    sucursal.calleYNum = calleYNum;
    sucursal.Colonia = colonia;
    sucursal.telefono = telefono;
    sucursal.horario = horario;
    sucursal.GPS = GPS;
    sucursal.pagWeb = pagWeb;
    sucursal.estatus = "Activo";
    sucursales[indexSucursalSeleccionado] = sucursal;
    clean();
    loadTabla();
}

function deleteSucursal(){
    sucursales[indexSucursalSeleccionado].estatus = "Inactivo";
    clean();
    loadTabla();
}

function searchSucursal(){
    let filtro = document.getElementById("txtBusquedaSucursal").value;
    let resultados = sucursales.filter(element => element.nombre === filtro);
    let cuerpo = "";
    resultados.forEach(function(sucursal){
        let registro =  
                '<tr onclick="moduloSucursal.selectSucursal('+ sucursales.indexOf(sucursal) +');">'+
                '<td>' + sucursal.nombre + '</td>' +
                '<td>' + sucursal.calleYNum +  ' '+ sucursal.colonia +'</td>' +
                '<td>' + sucursal.GPS + '</td>' +
                '<td>' + sucursal.telefono + '</td>' +
                '<td>' + sucursal.estatus + '</td></tr>' ; 
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblSucursal").innerHTML = cuerpo;
}