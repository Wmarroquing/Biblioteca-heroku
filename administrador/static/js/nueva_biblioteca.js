$('input[type=submit]').on('click', function(evt){

    evt.preventDefault()
    
    var nombre = $('#txt_nombre').val()
    var descripcion = $('#txt_descripcion').val()
    var direccion = $('#txt_direccion').val()
    var boton = $(this).val()
    var mensage_error = false

    if(nombre == ""){
        $('#msg_nombre').removeClass('d-none')
        $('#txt_nombre').focus()
        mensage_error = true
    }
    if(descripcion == ""){
        $('#msg_descripcion').removeClass('d-none')
        $('#txt_descripcion').focus()
        mensage_error = true
    }
    if(direccion == ""){
        $('#msg_direccion').removeClass('d-none')
        $('#txt_direccion').focus()
        mensage_error = true
    }

    if(mensage_error == true){
        return false
    }
    
    $.ajax({
        url: '/administrador/nueva_biblioteca/',
        type: 'post',
        dataType: 'json', 
        data: {
            nombre: nombre,
            descripcion: descripcion,
            direccion: direccion,
            csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
        },
        success: function(response){
            if(boton == "Guardar"){
                window.location.href = '/administrador/bibliotecas/'
            }else{
                $('#alert_message').html('<div class="alert alert-success alert-dismissible fade show" role="alert"><i class="fas fa-check-circle"></i> La biblioteca <strong>'+nombre+'</strong> se guardo correctamente.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
                $('#txt_nombre').focus()
                $('#txt_nombre').val('')
                $('#txt_descripcion').val('')
                $('#txt_direccion').val('')
                $('small').addClass('d-none')
            }
        },
        error: function(err){
            alert('Hubo un problema al registrar tu libro, por favor intentalo mas tarde.')
            console.log(err)
        }
    })
})