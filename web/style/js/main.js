let moduloSucursal;
let moduloUsuario;
let moduloBebida;
let moduloAlimento;
let moduloCombo;
let moduloLogin;

document.getElementById('btnSucursal').addEventListener('click',cargarModuloSucursal);
document.getElementById('btnUsuario').addEventListener('click',cargarModuloUsuario);
document.getElementById('btnBebida').addEventListener('click', cargarModuloBebida);
document.getElementById('btnAlimento').addEventListener('click', cargarModuloAlimento);
document.getElementById('btnCombo').addEventListener('click', cargarModuloCombo);
document.getElementById('btnLogin').addEventListener('click', cargarLogin);

async function cargarModuloSucursal(){
    fetch("http://proyectozarape.test/web/modules/moduloSucursal/view_Sucursal.html")
            .then( (response)=> {
                    return response.text();
                }
            )
            .then((html)=>{
                    document.getElementById("contenedorPrincipal").innerHTML = html;
                    import ("http://proyectozarape.test/web/modules/moduloSucursal/controller_Sucursal.js").then(
                            function(controller){
                                moduloSucursal = controller;
                            }
                            );
                }
            ).catch((err)=>console.log(err));
}
 
async function cargarModuloUsuario(){
    fetch("http://proyectozarape.test/web/modules/moduloUsuario/view_Usuario.html")
            .then( (response)=>{
                    return response.text();
                }
            )
            .then((html)=>{
                    document.getElementById("contenedorPrincipal").innerHTML = html;
                    import ("http://proyectozarape.test/web/modules/moduloUsuario/controller_Usuario.js").then(
                            function(controller){
                                moduloUsuario = controller;
                            }
                            );
                }
            ).catch((err)=>console.log(err));
}

async function cargarModuloBebida(){
    fetch("http://proyectozarape.test/web/modules/moduloCatalogoBebida/view_Bebida.html")
            .then( (response)=>{
                    return response.text();
                }
            )
            .then((html)=>{
                    document.getElementById("contenedorPrincipal").innerHTML = html;
                    import ("http://proyectozarape.test/web/modules/moduloCatalogoBebida/controller_Bebida.js").then(
                            function(controller){
                                moduloBebida = controller;
                            }
                            );
                }
            ).catch((err)=>console.log(err));
}

async function cargarModuloAlimento(){
    fetch("http://proyectozarape.test/web/modules/moduloCatalogoAlimento/view_Alimento.html")
            .then( (response)=>{
                    return response.text();
                }
            )
            .then((html)=>{
                    document.getElementById("contenedorPrincipal").innerHTML = html;
                    import ("http://proyectozarape.test/web/modules/moduloCatalogoAlimento/controller_Alimento.js").then(
                            function(controller){
                                moduloAlimento = controller;
                            }
                            );
                }
            ).catch((err)=>console.log(err));
}

async function cargarModuloCombo(){
    fetch("http://proyectozarape.test/web/modules/moduloDetalleCombo/view_Combo.html")
            .then( (response)=>{
                    return response.text();
                }
            )
            .then((html)=>{
                    document.getElementById("contenedorPrincipal").innerHTML = html;
                    import ("http://proyectozarape.test/web/modules/moduloDetalleCombo/controller_Combo.js").then(
                            function(controller){
                                moduloCombo = controller;
                            }
                            );
                }
            ).catch((err)=>console.log(err));
}

async function cargarLogin(){
    fetch("http://proyectozarape.test/web/modules/moduloLogin/view_Login.html")
            .then( (response)=>{
                    return response.text();
                }
            )
            .then((html)=>{
                    document.getElementById("contenedorPrincipal").innerHTML = html;
                    import ("http://proyectozarape.test/web/modules/moduloLogin/controller_Login.js").then(
                            function(controller){
                                moduloLogin = controller;
                            }
                            );
                }
            ).catch((err)=>console.log(err));
}