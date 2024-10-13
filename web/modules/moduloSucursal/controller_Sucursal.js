let indexSucursalSeleccionado;
let sucursales = []

document.getElementById('btnAddSucursal').addEventListener('click',addSucursal);
document.getElementById('btnCleanSucursal').addEventListener('click', clean);
document.getElementById('btnSearchSucursal').addEventListener('click', searchSucursal);
document.getElementById('btnDeleteSucursal').addEventListener('click', deleteSucursal);
document.getElementById('btnUpdateSucursal').addEventListener('click', updateSucursal);

function addSucursal() {
    let foto,
        numero_unico_sucursal,
        nombre,
        calleYNum,
        colonia,
        gps,
        telefono,
        horario,
        pagWeb;

        foto = document.getElementById("txtImg").value;
    numero_unico_sucursal = document.getElementById("txtNumUnico").value;
    nombre = document.getElementById("txtNombre").value;
    calleYNum = document.getElementById("txtCalleYNum").value;
    colonia = document.getElementById("txtColonia").value;
    gps = document.getElementById("txtGPS").value;
    telefono = document.getElementById("txtTelefono").value;
    horario = document.getElementById("txtHorario").value;
    pagWeb = document.getElementById("txtPagWeb").value;

    let sucursal = {
        foto: foto,
        numero_unico_sucursal: numero_unico_sucursal,
        nombre: nombre,
        calleYNum: calleYNum,
        colonia: colonia,
        telefono: telefono,
        gps: gps,
        horario : horario,
        pagWeb: pagWeb,
        estatus: "Activo"
    };
    
    sucursales.push(sucursal);
    loadTabla();
    clean();
}

function loadTabla() {
    let cuerpo = "";
    sucursales.forEach(function (sucursal, index) {
        let registro = `
            <tr data-index="${index}">
            <td>${sucursal.foto}</td>
                <td>${sucursal.numero_unico_sucursal}</td>
                 <td>${sucursal.nombre}</td>
                 <td>${sucursal.calleYNum +  ' '+ sucursal.colonia}</td>
                 <td>${sucursal.telefono}</td>
                 <td>${sucursal.GPS}</td>
                 <td>${sucursal.horario}</td>
                 <td>${sucursal.pagWeb}</td>
                 <td>${sucursal.estatus}</td>
            </tr>
        `;
        cuerpo += registro;
    });
    document.getElementById("tblSucursal").innerHTML = cuerpo;

    const rows = document.querySelectorAll("#tblSucursal tr");
    rows.forEach(row => {
        row.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            selectSucursal(parseInt(index, 10));
        });
    });
}

function selectSucursal(index) {
    let sucursal = sucursales[index];
    document.getElementById("txtImg").value = sucursales[index].foto;
    document.getElementById("txtNumUnico").disabled=true;
    document.getElementById("txtNumUnico").value = sucursales[index].numero_unico_sucursal;
    document.getElementById("txtNombre").value = sucursales[index].nombre;
    document.getElementById("txtCalleYNum").value = sucursales[index].calleYNum;
    document.getElementById("txtColonia").value = sucursales[index].colonia;
    document.getElementById("txtTelefono").value = sucursales[index].telefono;
    document.getElementById("txtGPS").value = sucursales[index].GPS;
    document.getElementById("txtHorario").value = sucursales[index].horario;
    document.getElementById("txtPagWeb").value = sucursales[index].pagWeb;
    

    document.getElementById("btnUpdateSucursal").classList.remove("disabled");
    document.getElementById("btnDeleteSucursal").classList.remove("disabled");
    document.getElementById("btnAddSucursal").classList.add("disabled");

    indexSucursalSeleccionado = index;
}

fetch("https://uriel444-web.github.io/zarape.github.io/web/modules/moduloSucursal/data_Sucursal.json")
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
        document.getElementById("txtImg").value="";
    document.getElementById("txtNumUnico").value = "";
    document.getElementById("txtNombre").value = "" ;
    document.getElementById("txtCalleYNum").value = "";
    document.getElementById("txtColonia").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtGPS").value = "";
    document.getElementById("txtHorario").value = "";
    document.getElementById("txtPagWeb").value = "";
    document.getElementById("txtNombre").focus();
    document.getElementById("btnUpdateSucursal").classList.add("disabled");
    document.getElementById("btnDeleteSucursal").classList.add("disabled");
    document.getElementById("btnAddSucursal").classList.remove("disabled");
    indexSucursalSeleccionado = 0;
}

function updateSucursal(){
    let foto,
     numero_unico_cliente, 
        nombre,
        calleYNum,
        colonia,
        telefono,
        gps,
        horario,
        pagWeb;

        foto = document.getElementById("txtImg").value;
    numero_unico_cliente = document.getElementById("txtNumUnico").disabled=true;
    nombre = document.getElementById("txtNombre").value;
    calleYNum = document.getElementById("txtCalleYNum").value;
    colonia = document.getElementById("txtColonia").value;
    telefono = document.getElementById("txtTelefono").value;
    gps = document.getElementById("txtGPS").value;
    horario = document.getElementById("txtHorario").value;
    pagWeb = document.getElementById("txtPagWeb").value;
    let sucursal = {};
    sucursal.foto = foto;
    sucursal.numero_unico_cliente = numero_unico_cliente;
    sucursal.nombre = nombre;
    sucursal.calleYNum = calleYNum;
    sucursal.Colonia = colonia;
    sucursal.telefono = telefono;
    sucursal.horario = horario;
    sucursal.gps = gps;
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

export function searchSucursal(){
    let filtro = document.getElementById("txtBusquedaSucursal").value;
    let resultados = sucursales.filter(element => element.nombre === filtro);
    let cuerpo = "";
    resultados.forEach(function(sucursal){
        let registro =  
                '<tr onclick="moduloSucursal.selectSucursal('+ sucursales.indexOf(sucursal) +');">'+
                '<td>' + sucursal.foto + '</td>' +
                '<td>' + sucursal.numero_unico_sucursal + '</td>' +
                '<td>' + sucursal.nombre + '</td>' +
                '<td>' + sucursal.calleYNum +  ' '+ sucursal.colonia +'</td>' +
                '<td>' + sucursal.telefono + '</td>' +
                '<td>' + sucursal.gps + '</td>' +
                '<td>' + sucursal.horario + '</td>' +
                '<td>' + sucursal.pagWeb + '</td>' +
                '<td>' + sucursal.estatus + '</td></tr>' ; 
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblSucursal").innerHTML = cuerpo;
}
