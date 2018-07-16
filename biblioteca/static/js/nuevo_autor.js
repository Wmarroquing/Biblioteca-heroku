// FUNCION PARA GUARDAR LOS DATOS DE UN LIBRO //
$('form').on('submit', function(evt){
    
    evt.preventDefault()

    var nombres = $('#txt_nombres').val()
    var apellidos = $('#txt_apellidos').val()
    var nacionalidad = $('#slc_nacionalidad').val()
    var genero = $('input:radio[name=rad_genero]:checked').val()
    var fecha_nac = $('#txt_fecha_nac').val()
    var fecha_fall = $('#txt_fecha_fall').val()

    if(nombres == ""){
        alert('ingresa un nombre');
        $('#txt_nombres').focus();
        return false;
    }
    if(apellidos == "null"){
        alert('ingresa un apellido');
        $('#txt_apellidos').focus();
        return false;
    }
    if(nacionalidad == null){
        alert('ingresa una nacionalidad');
        $('#slc_nacionalidad').focus();
        return false;
    }
    if(genero == undefined){
        alert('Es necesario que selecciones un genero');
        return false;
    }else if(genero == 1){
        genero = 'Masculino';
    }else{
        genero = 'Femenino';
    }
    if(fecha_nac == ""){
        alert('Ingresa la decha de nacimiento del autor');
        $('#txt_fecha_nac').focus();
        return false;
    }else if(fecha_nac.length != 10){
        alert('Ingresa el formato de fecha dd/mm/aaaa');
        $('#txt_fecha_nac').focus();
        return false;
    }else if(fecha_nac.substring(2,3)!="/" || fecha_nac.substring(5,6)!="/"){
        alert('Debes separar dia/mes/año con /');
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

    if(fecha_fall.length > 0){
            
        if(fecha_fall.length != 10){
            alert('Ingresa el formato de fecha dd/mm/aaaa');
            $('#fecha_fall').focus();
            return false;
        }else if(fecha_fall.substring(2,3)!="/" || fecha_fall.substring(5,6)!="/"){
            alert('Debes separar dia/mes/año con /');
            $('#fecha_fall').focus();
            return false;
        }else if(fecha_fall.substring(0,2)>31){
            alert('Ingresa un dia valido');
            $('#fecha_fall').focus();
            return false;
        }else if(fecha_fall.substring(3,5)>12){
            alert('Ingresa un mes valido');
            $('#fecha_fall').focus();
            return false;
        }else if(fecha_fall.substring(6,10)>2018){
            alert('Ingresa un año valido');
            $('#fecha_fall').focus();
            return false;
        }

    }

    $.ajax({
        url: '/administrador/nuevo_autor/',
        type: 'post',
        typeType: 'json',
        data: {
            nombres: nombres,
            apellidos: apellidos,
            nacionalidad: nacionalidad,
            genero: genero,
            fecha_nac: fecha_nac,
            fecha_fall: fecha_fall,
            csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
        },
        success: function(response){
            alert('Autor Guardado!')
            window.location.href = '/administrador/nuevo_autor'   
        },
        error: function(err){
            alert('Se ah producido un error al guardar tu autor, intentalo mas tarde')
            console.log(err)
        }

    })
})