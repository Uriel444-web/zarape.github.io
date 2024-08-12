let indexUsuarioSeleccionado;
let Usuarios = []

document.getElementById('btnAddUsuario').addEventListener('click', addUsuario);
document.getElementById('btnCleanUsuario').addEventListener('click', cleanUsuario);
document.getElementById('btnSearchUsuario').addEventListener('click', searchUsuario);

function addUsuario() {
    let idUsuario,
        nombreUsuario,
        contrasena;

    idUsuario = document.getElementById("txtIdUsuario").value;
    nombreUsuario = document.getElementById("txtNombreUsuario").value;
    contrasena = document.getElementById("txtContrasena").value;

    let usuario = {
        idUsuario : idUsuario,
        nombreUsuario: nombreUsuario,
        contrasena: contrasena,
    };
    
    Usuarios.push(usuario);
    loadTabla();
    cleanUsuario(); // Descomentar si deseas limpiar los campos después de agregar
}

// function loadTabla() {
//     let cuerpo = "";
//     Usuarios.forEach(function (usuario, index) {
//         let registro = `
//             <tr onclick="moduloSucursal.selectSucursal(${index});">
//                 <td>${usuario.idUsuario}</td>
//                 <td>${usuario.nombreUsuario}</td>
//             </tr>
//         `;
//         cuerpo += registro;
//     });
//     console.log(cuerpo);
//     document.getElementById("tblUsuario").innerHTML = cuerpo;
// }

function loadTabla() {
    let cuerpo = "";
    Usuarios.forEach(function (usuario, index) {
        let registro = `
            <tr data-index="${index}">
                <td>${usuario.idUsuario}</td>
                <td>${usuario.nombreUsuario}</td>
            </tr>
        `;
        cuerpo += registro;
    });
    document.getElementById("tblUsuario").innerHTML = cuerpo;

    const rows = document.querySelectorAll("#tblUsuario tr");
    rows.forEach(row => {
        row.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            selectUsuario(parseInt(index, 10));
        });
    });
}

function selectUsuario(index) {
    let usuario = Usuarios[index];
    document.getElementById("txtIdUsuario").disabled=true;
    document.getElementById("txtNombreUsuario").value = Usuarios[index].nombreUsuario;
    document.getElementById("txtContrasena").value = Usuarios[index].contrasena;

    document.getElementById("btnUpdateUsuario").classList.remove("disabled");
    document.getElementById("btnDeleteUsuario").classList.remove("disabled");
    document.getElementById("btnAddUsuario").classList.add("disabled");

    indexUsuarioSeleccionado = index;
}

fetch("http://proyectozarape.test/web/modules/moduloUsuario/data_Usuario.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(jsondata) {
        Usuarios = jsondata;
        console.log(Usuarios);
        loadTabla();
    })
    .catch(function(error) {
        console.error('error fetching data:', error);
    });
    
    function cleanUsuario(){
    document.getElementById("txtIdUsuario").value = "";
    document.getElementById("txtNombreUsuario").value = "" ;
    document.getElementById("txtContrasena").value = "";
    document.getElementById("txtIdUsuario").focus();
    document.getElementById("btnUpdateUsuario").classList.add("disabled");
    document.getElementById("btnDeleteUsuario").classList.add("disabled");
    document.getElementById("btnAddUsuario").classList.remove("disabled");
    indexUsuarioSeleccionado = 0;
}

function updateUsuario(){
    let idUsuario, 
        nombreUsuario,
        contrasena;
 
    idUsuario = document.getElementById("txtIdUsuario").disabled=true;
    nombreUsuario = document.getElementById("txtNombreUsuario").value;
    contrasena = document.getElementById("txtContrasena").value;
    let usuario = {};
    // usuario.idUsuario=idUsuario;
    usuario.nombreUsuario = nombreUsuario;
    usuario.contrasena = contrasena;
    Usuarios[indexUsuarioSeleccionado] = usuario;
    cleanUsuario();
    loadTabla();
}

function deleteUsuario(){
    Usuarios[indexUsuarioSeleccionado].estatus = "Inactivo";
    cleanUsuario();
    loadTabla();
}

function searchUsuario(){
    let filtro = document.getElementById("txtBusquedaUsuario").value;
    let resultados = Usuarios.filter(element => element.nombreUsuario === filtro);
    let cuerpo = "";
    resultados.forEach(function(usuario){
        let registro =  
                '<tr onclick="moduloUsuario.selectUsuario('+ Usuarios.indexOf(usuario) +');">'+
                '<td>' + usuario.idUsuario + '</td>' +
                '<td>' + usuario.nombreUsuario + '</td>'; 
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblUsuario").innerHTML = cuerpo;
}