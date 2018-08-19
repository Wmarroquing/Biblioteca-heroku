$('input[type=submit]').on('click', function(evt){

    evt.preventDefault()
    
    var titulo = $('#txt_titulo').val()
    var autor = $('#slc_autor').val()
    var tema = $('#slc_tema').val()
    var ubicacion = $('#txt_ubicacion').val()
    var existencia = $('#txt_existencia').val()
    var biblioteca = $('#slc_biblioteca').val()
    var mensage_error = false
    var boton = $(this).val()

    if(titulo == ""){
        $('#msg_titulo').removeClass('d-none')
        $('#txt_titulo').focus();
        mensage_error = true
    }
    if(autor == null){
        $('#msg_autor').removeClass('d-none')
        $('#slc_autor').focus();
        mensage_error = true
    }
    if(tema == null){
        $('#msg_tema').removeClass('d-none')
        $('#slc_tema').focus();
        mensage_error = true
    }
    if(ubicacion == ""){
        $('#msg_ubicacion').removeClass('d-none')
        $('#txt_ubicacion').focus();
        mensage_error = true
    }
    if(existencia == ""){
        $('#msg_existencia').removeClass('d-none')
        $('#txt_existencia').focus();
        mensage_error = true
    }
    if(biblioteca == null){
        $('#msg_biblioteca').removeClass('d-none')
        $('#slc_biblioteca').focus();
        mensage_error = true
    }

    if(mensage_error == true){
        return false
    }
    
    $.ajax({
        url: '/administrador/nuevo_libro/',
        type: 'post',
        dataType: 'json', 
        data: {
            titulo: titulo,
            autor: autor,
            tema: tema,
            ubicacion: ubicacion,
            existencia: existencia,
            biblioteca: biblioteca,
            csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
        },
        success: function(response){
            if(boton == "Guardar"){
                window.location.href = '/administrador/libros/'
            }else{
                $('#alert_message').html('<div class="alert alert-success alert-dismissible fade show" role="alert"><i class="fas fa-check-circle"></i> El libro <strong>'+titulo+'</strong> se guardo correctamente.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
                $('#txt_titulo').focus()
                $('#txt_titulo').val('')
                $('#slc_autor').val('1')
                $('#slc_tema').val('1')
                $('#txt_ubicacion').val('')
                $('#txt_existencia').val('')
                $('#slc_biblioteca').val('1')
            }
        },
        error: function(err){
            alert('Hubo un problema al registrar tu libro, por favor intentalo mas tarde.')
            console.log(err)
        }
    })
})