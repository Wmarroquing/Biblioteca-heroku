/* OBTENER MUNICIPIOS SEGUN EL ID DEL DEPARTAMENTO SELECCIONADO */ 
$('#slc_departamento').on('change', function(){

    const id = $(this).val()

    axios.get(`/obtener_muni/?id=${id}`)
        .then((response) => {
            $('#slc_municipio').html('')
            const municipios = JSON.parse(response.data)

            for (const municipio of municipios) {
                $('#slc_municipio').append(`<option value="${municipio.pk}">${municipio.fields.municipio}</option>`)
            }
        })
        .catch((err) => {
            console.log(err)
        }) 
})

/* VALIDAR CADA TECLA QUE EL USUARIO PRESIONE Y RETORNAR TRUE SI LA TECLAA ES VALIDA */
function ValidarTecla(event, tipo){

    var tecla = (document.all)?event.keyCode:event.which;
    
    switch(tipo){
        case 0: // Aceptacion solo de letras
            if(tecla == 8 || tecla == 32){
                return true;
            }else{
                var patron = /^[A-Za-z]+$/;
            }
            break;
        case 1: // Aceptacion solo de numeros
            if(tecla == 8){
                return true;
            }else{
                var patron = /[0-9]/;
            }
            break;
        case 2: // Aceptacion del formato de fecha 
            if(tecla == 8 || tecla == 47){
                return true;
            }else{
                var patron = /[0-9]/;
            }
    }
    var tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

// VERIICAR SI EL USUARIO ESTA LOGEADO, SI NO LO ESTA, SE REGRESARA A LA PAGINA DE INICIO DE SESION//
function VerificarLogin(){

    var sesion = localStorage.getItem('admin_log');

    if(sesion == null){
        window.location.href = '/administrador/login/'
    }
}

// VERIICAR SI EL USUARIO ESTA LOGEADO, SI LO ESTA, NO PODRA ESTAR EN LA PAGINA DE LOGIN //
function LogearUsuaario(){

    var sesion = localStorage.getItem('admin_log');

    if(sesion != null){
        window.location.href = '/administrador/libros/'
    }
}

// FUNCION PARA CERRAR SESION //
function CerrarSesion(){
    var confirmacion = confirm('Estas seguro que deseas Cerrar Sesion?');
    if(confirmacion == true){
        localStorage.removeItem('admin_log');
        window.location.href = '/administrador/login/'
    }
}

// FUNCIO PARA HACER LA PAGINACION DE LAS TABLAS //
function Paginacion() {
    $('#tbl_libros').DataTable();
}


// LLAMAR LA FUNCION DE PAGINACION Y VERIFICAR EL LOGIN AL CARGAR UNA LA PAGINA // 
function CallFunction() {
    Paginacion()
    VerificarLogin()
}
