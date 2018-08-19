// FUNCION PARA GUARDAR LOS DATOS DE UN LIBRO //
$('input[type=submit]').on('click', function(evt){
    
    evt.preventDefault()

    var nombres = $('#txt_nombres').val()
    var apellidos = $('#txt_apellidos').val()
    var nacionalidad = $('#slc_nacionalidad').val()
    var genero = $('input:radio[name=rad_genero]:checked').val()
    var fecha_nac = $('#txt_fecha_nac').val()
    var fecha_fall = $('#txt_fecha_fall').val()
    var mensage_error = false;
    var boton = $(this).val()

    if(nombres == ""){
        $('#msg_nombres').removeClass('d-none')
        $('#txt_nombres').focus();
        mensage_error = true
    }
    if(apellidos == ""){
        $('#msg_apellidos').removeClass('d-none')
        $('#txt_apellidos').focus();
        mensage_error = true
    }
    if(nacionalidad == null){
        $('#msg_nacionalidad').removeClass('d-none')
        $('#slc_nacionalidad').focus();
        mensage_error = true
    }
    if(genero == undefined){
        $('#msg_genero').removeClass('d-none')
        mensage_error = true
    }else if(genero == 1){
        genero = 'Masculino';
    }else{
        genero = 'Femenino';
    }
    if(fecha_nac == ""){
        $('#msg_fecha_nac').removeClass('d-none')
        $('#txt_fecha_nac').focus();
        mensage_error = true
    }else if(fecha_nac.length != 10){
        $('#msg_fecha_nac').removeClass('d-none')
        $('#msg_fecha_nac').html('Ingresa el formato de fecha dd/mm/aaaa')
        $('#txt_fecha_nac').focus();
        mensage_error = true
    }else if(fecha_nac.substring(2,3)!="/" || fecha_nac.substring(5,6)!="/"){
        $('#msg_fecha_nac').removeClass('d-none')
        $('#msg_fecha_nac').html('Debes separar el dia mes año con "/"')
        $('#txt_fecha_nac').focus();
        mensage_error = true
    }else if(fecha_nac.substring(0,2)>31){
        $('#msg_fecha_nac').removeClass('d-none')
        $('#msg_fecha_nac').html('Ingresa un dia valido')
        $('#txt_fecha_nac').focus();
        mensage_error = true
    }else if(fecha_nac.substring(3,5)>12){
        $('#msg_fecha_nac').removeClass('d-none')
        $('#msg_fecha_nac').html('Ingresa un mes valido')
        $('#txt_fecha_nac').focus();
        mensage_error = true
    }else if(fecha_nac.substring(6,10)>2018){
        $('#msg_fecha_nac').removeClass('d-none')
        $('#msg_fecha_nac').html('Ingresa un año valido')
        $('#txt_fecha_nac').focus();
        mensage_error = true
    }

    if(fecha_fall.length > 0){
            
        if(fecha_fall.length != 10){
            $('#msg_fecha_fall').removeClass('d-none')
            $('#msg_fecha_fall').html('Ingresa el formato de fecha dd/mm/aaaa')
            $('#fecha_fall').focus();
            mensage_error = true
        }else if(fecha_fall.substring(2,3)!="/" || fecha_fall.substring(5,6)!="/"){
            $('#msg_fecha_fall').removeClass('d-none')
            $('#msg_fecha_fall').html('Debes separar el dia mes año con "/"')
            $('#fecha_fall').focus();
            mensage_error = true
        }else if(fecha_fall.substring(0,2)>31){
            $('#msg_fecha_fall').removeClass('d-none')
            $('#msg_fecha_fall').html('Ingresa un dia valido')
            $('#fecha_fall').focus();
            mensage_error = true
        }else if(fecha_fall.substring(3,5)>12){
            $('#msg_fecha_fall').removeClass('d-none')
            $('#msg_fecha_fall').html('Ingresa un mes valido')
            $('#fecha_fall').focus();
            mensage_error = true
        }else if(fecha_fall.substring(6,10)>2018){
            $('#msg_fecha_fall').removeClass('d-none')
            $('#msg_fecha_fall').html('Ingresa un año valido')
            $('#fecha_fall').focus();
            mensage_error = true
        }

    }

    if(mensage_error == true){
        return false
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
            if(boton == "Guardar"){
                window.location.href = '/administrador/autores/'
            }else{
                $('#alert_message').html('<div class="alert alert-success alert-dismissible fade show" role="alert"><i class="fas fa-check-circle"></i> El Autor <strong>'+nombres+'</strong> se guardo correctamente.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
                $('txt_nombres').focus()
                $('#txt_nombres').val('')
                $('#txt_apellidos').val('')
                $('#slc_nacionalidad').val('1')
                $('input:radio[name=rad_genero]').removeAttr(':checked')
                $('#txt_fecha_nac').val('')
                $('#txt_fecha_fall').val('')
                $('small').addClass('d-none')
            }
        },
        error: function(err){
            $('#alert_message').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><i class="fas fa-check-circle"></i> El Autor <strong>'+nombres+'</strong> se guardo correctamente.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
            console.log(err)
        }

    })
})