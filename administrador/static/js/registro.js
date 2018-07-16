var fecha_actual = new Date()
// VALIDAR SI TODOS LOS CAMPOS ESTAN INGRESADOS CORRECTAMENTE // 
$('form').on('submit', function(evt){

    evt.preventDefault()

    // DECLARACION DE VARIABLES //
    var nombres = $('#txt_nombres').val();
    var apellidos = $('#txt_apellidos').val();
    var direccion = $('#txt_direccion').val();
    var telefono = $('#txt_telefono').val();
    var email = $('#txt_email').val();
    var password = $('#txt_password').val();
    var confirm_password = $('#txt_confirm_password').val();
    var genero = $('input:radio[name=rad_genero]:checked').val();
    var fecha_nac = $('#txt_fecha_nac').val();
    var cui = $('#txt_cui').val();
    var municipio = $('#slc_municipio').val();

    // DECLARACION DE VARIABLES QUE CONTENDRAN LAS EXPRESIONES REGULARES PARA VALIDAR EL CORREO Y CONTRASENA //
    var expr_correo = /^[a-zA-Z][a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/;
    var expr_contra = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

    // VALIDACION DE LOS NOMBRES //
    if(nombres == ""){
        alert('Debes de ingresar tus nombres');
        $('#txt_nombres').focus();
        return false;
    }
    // VALIDACION DE LOS APELLIDOS //
    if(apellidos == ""){
        alert('Debes de ingresar tus apellidos');
        $('#txt_apellidos').focus();
        return false;
    }
    // VALIDACION DE LA DIRECCION //
    if(direccion == ""){
        alert('Debes de ingresar una direccion');
        $('#txt_direccion').focus();
        return false;
    }
    // VALIDACION DEL TELEFONO //
    if(telefono == ""){
        alert('Debes de ingresar un numero telefonico');
        $('#txt_telefono').focus();
        return false;
    }else if(telefono.length != 8){
        alert('El numero telefonico debe de ser de 8 digitos');
        $('#txt_telefono').focus();
        return false;
    }
    // VALIDACION DEL CORREO ELECTRONICO //
    if(email == ""){
        alert('Debes de ingresar un email');
        $('#txt_email').focus();
        return false;
    }else if(!expr_correo.test(email)){
        alert('ingresa un email valido');
        $('#txt_email').focus();
        return false;
    }
    // VALIDACION DE LA CONTRASENA //
    if(password == ""){
        alert('Debes de ingresar una contraseña');
        $('#txt_password').focus();
        return false;
    }else if(password.length < 8){
        alert('La contraseña debe de ser por lo menos 8 caracteres');
        $('#txt_password').focus();
        return false;
    }else if(!expr_contra.test(password)){
        alert('La contraseña debe tener al menos 2 letras Mayúsculas, 2 letras minúsculas, 1 número y 1 símbolo');
        $('#txt_password').focus();
        return false;
    }
    // CONFIRMACION DE LA CONTRASENA //
    if(confirm_password == ""){
        alert('Confirma tu contraseña');
        $('#txt_confirm_password').focus();
        return false;
    }else if(confirm_password != password){
        alert('Las contraseñas no coinciden');
        $('#txt_confirm_password').focus();
        return false;
    }
    // VALIDACION DEL GENERO //
    if(genero == undefined){
        alert('Es necesario que selecciones un genero');
        return false;
    }else if(genero == 1){
        genero = 'Masculino';
    }else{
        genero = 'Femenino';
    }
    // VALIDACION DEL FORMATO DE LA FECHA DE NACIMIENTO //
    if(fecha_nac == ""){
        alert('Ingresa la fecha de tu nacimiento');
        $('#txt_fecha_nac').focus();
        return false;
    }else if(fecha_nac.length != 10){
        alert('Ingresa el formato de fecha dd/mm/aaaa');
        $('#txt_fecha_nac').focus();
        return false;
    }else if(fecha_nac.substring(2,3)!="/" || fecha_nac.substring(5,6)!="/"){
        alert('Debes separar el dia, mes y año con "/"');
        $('#txt_fecha_nac').focus();
        return false;
    }else if(fecha_nac.substring(0,2)>31){
        alert('Ingresa un dia valido');
        $('#txt_fecha_nac').focus();
        return false;
    }else if(fecha_nac.substring(3,5)>12){
        alert('Ingresa un mes valido');
        $('#txt_fecha_nac').focus();
        return false;
    }else if(fecha_nac.substring(6,10)>2018){
        alert('Ingresa un año valido');
        $('#txt_fecha_nac').focus();
        return false;
    } 
    // VALIDACION DEL CUI //
    if(cui == ""){
        alert('Ingresa tu CUI');
        $('#txt_cui').focus();
        return false;
    }else if(cui.length != 13){
        alert('Ingresa un CUI valido');
        $('#txt_cui').focus();
        return false;
    }

    // COMPROBAR SI EL USUARIO ES MAYOR O MENOR DE EDAD // 
    var edad_anio = Number(fecha_actual.getFullYear()) - Number(fecha_nac.substring(6,10));
    var mayor_edad = false;
    
    // VERIFICAR SI EL USUARIO ES MAYOR DE EDAD A PARTIR DE LA FFECHA ACTUAL //
    if(edad_anio > 18){
        mayor_edad = true;
    }else if(edad_anio == 18 && fecha_nac.substring(3,5) <= fecha_actual.getMonth()+1 && fecha_nac.substring(0,2) <= fecha_actual.getDate()){
        mayor_edad = true;
    }else{
        mayor_edad = false;
    }
    
    // SI EL USUARIO ES MENOR DE EDAD EL RADIO BUTTON SE HABILITARA Y SERA OBLIGATORIO SELECCIONARLO //
    if(mayor_edad == false){
        $('#rad_confirm').attr('disabled', false);
        if(!($('#rad_confirm').is(':checked'))){
            alert('Tus padres deben autorizar el uso de la navegacion y utilizaicion de los dervicios');
            return false;
        }
    }else{
        $('#rad_confirm').attr('disabled', true);
    }

    // COMPROBAR SI EL CHECKBOX DE LOS TERMINOS ESTA SELECCIONADA //
    if(!($('#chk_terminos').is(':checked'))){
        alert('Debes aceptar los terminos y condiciones para continuar');
        return false;
    }

    // SI TODOS LOS DATOS ESTAN CORRECTOS GUARDARALOS EN LA BASE DE DATOS //
    $.ajax({
        url: '/administrador/registro/',
        type: 'post',
        dataType: 'json',
        data: {
            nombres: nombres,
            apellidos: apellidos,
            direccion: direccion,
            telefono: telefono,
            correo: email,
            password: password,
            genero: genero,
            fecha_nac: fecha_nac,
            cui: cui,
            municipio: municipio,
            csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
        },
        success: function(jqXHR, textStatus, errorResponse){
            // OBTENER LA RESPUESTA DEL SERVIDOR Y CONVERTIRLA A STRING //
            var mensaje_confirm = JSON.stringify(errorResponse.status)
            // SI LOS DATOS SE GUARDARON CORRECTAMENTE EL ESTATUS DEBE SER DE 200 // 
            if (mensaje_confirm == 200) {
                alert('Datos Guardados!')
                window.location.href = '/administrador/login/'
            } else {
                alert('Error al guardar los datos')
                console.log('Status: ' + textStatus + ' ' + JSON.stringify(errorResponse.status))
            }  
        },
        error: function(jqXHR, textStatus, errorResponse){
            // OBTENER LA RESPUESTA DEL SERVIDOR Y CONVERTIRLA A STRING //
            var mensaje_error = JSON.stringify(jqXHR.status)
            // SI EL CORREO SE REPITE EL STATUS DEBE SER DE 500 //
            if (mensaje_error == 500) {
                alert('El correo que ingresaste ya existe, por favor prueba con otro')
                $('#txt_email').focus();
            } else {
                console.log('Error ' + JSON.stringify(jqXHR.status))
            }
        },
    })
})