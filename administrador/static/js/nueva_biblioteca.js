$('form').on('submit', function(evt){

    evt.preventDefault()
    
    var nombre = $('#txt_nombre').val()
    var descripcion = $('#txt_descripcion').val()
    var direccion = $('#txt_direccion').val()
    
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
            alert('Biblioteca registrada!')
            $('#txt_nombre').focus()
            $('#txt_nombre').val('')
            $('#txt_descripcion').val('')
            $('#txt_direccion').val('')
        },
        error: function(err){
            alert('Hubo un problema al registrar tu libro, por favor intentalo mas tarde.')
            console.log(err)
        }
    })
})