let moduloSucursal;
let moduloUsuario;

document.getElementById('btnSucursal').addEventListener('click',cargarModuloSucursal);
document.getElementById('btnUsuario').addEventListener('click',cargarModuloUsuario);

async function cargarModuloSucursal(){
    fetch("http://localhost:8080/proyectoZarape/modules/moduloSucursal/view_Sucursal.html")
            .then( (response)=> {
                    return response.text();
                }
            )
            .then((html)=>{
                    document.getElementById("contenedorPrincipal").innerHTML = html;
                    import ("../modules/moduloSucursal/controller_Sucursal.js").then(
                            function(controller){
                                moduloSucursal = controller;
                            }
                            );
                }
            ).catch((err)=>console.log(err));
    /*const response = await fetch("http://localhost:8080/proyectoZarape/modules/moduloSucursal/view_Sucursal.html");
    if(response.ok){
        let html = await response.text();
        document.getElementById("contenedorPrincipal").innerHTML = html;
    }else console.log(response.status, response.statusText);*/
}
 
async function cargarModuloUsuario(){
    fetch("http://localhost:8080/proyectoZarape/modules/moduloUsuario/view_Usuario.html")
            .then( (response)=>{
                    return response.text();
                }
            )
            .then((html)=>{
                    document.getElementById("contenedorPrincipal").innerHTML = html;
                    import ("../modules/moduloUsuario/controller_Usuario.js").then(
                            function(controller){
                                moduloUsuario = controller;
                            }
                            );
                }
            ).catch((err)=>console.log(err));
}