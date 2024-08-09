
document.getElementById("BtnRegistrar").addEventListener('click', mostrarAlerta);

function mostrarAlerta(){
    let email = document.getElementById("Email").value;
    let password = document.getElementById("Password").value;

    // if(email && password ==! ""){
    //     alert(succes)
    // }else{
    //     alert(err)
    // }
    if (email === '' || password === '') {
        // Campo vacío
        alert('Por favor, llena todos los campos.');
    } else {
        // Campo lleno
        alert('Registrado correctamente.');
        document.getElementById("Email").value="";
        document.getElementById("Password").value="";

    }
    return fetch("http://proyectozarape.test/web/modules/moduloLogin/view_Login.html");
}