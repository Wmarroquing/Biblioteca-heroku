$('form').on('submit', function(evt){

    evt.preventDefault()
    
    var titulo = $('#txt_titulo').val()
    var autor = $('#slc_autor').val()
    var tema = $('#slc_tema').val()
    var ubicacion = $('#txt_ubicacion').val()
    var existencia = $('#txt_existencia').val()
    var biblioteca = $('#slc_biblioteca').val()

    if(titulo == ""){
        alert('Ingresa el titulo del libro');
        $('#txt_titulo').focus();
        return false;
    }
    if(autor == null){
        alert('Debes ingresar un Autor para poder registrar un libro');
        $('#slc_autor').focus();
        return false;
    }
    if(tema == null){
        confirm('Debes ingresar un Tema para poder registrar un libro');
        $('#slc_tema').focus();
        return false;
    }
    if(ubicacion == ""){
        alert('Ingresa una ubicacion');
        $('#txt_ubicacion').focus();
        return false;
    }
    if(existencia == ""){
        alert('Ingresa una cantidad');
        $('#txt_existencia').focus();
        return false;
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
            alert('Libro registrado!')
            $('#txt_titulo').focus()
            $('#txt_titulo').val('')
            $('#slc_autor').val('1')
            $('#slc_tema').val('1')
            $('#txt_ubicacion').val('')
            $('#txt_existencia').val('')
        },
        error: function(err){
            alert('Hubo un problema al registrar tu libro, por favor intentalo mas tarde.')
            console.log(err)
        }
    })
})