// FUNCION PARA OBTENER LOS DATOS DE UN LIBRO //
function ObtenerLibro(){

    var id = localStorage.getItem('libro_id')

    $.ajax({
        url: `/obtener_libro/?id=${id}/`,
        type: 'get',
        dataType: 'json',
        data: {
            id: id,
        },
        success: function(response){ 
            var libros = JSON.parse(response)
            for (const libro in libros) {
                if (libros.hasOwnProperty(libro)) {
                    const element = libros[libro];
                    $('#txt_titulo').val(element.fields.titulo)
                    $('#slc_autor').val(element.fields.autor)
                    $('#slc_tema').val(element.fields.tema)
                    $('#txt_ubicacion').val(element.fields.ubicacion)
                    $('#txt_existencia').val(element.fields.existencia)
                }
            }
        },
        error: function(err){
            console.log(err)
        }
    })
}

// FUNCION PARA MODIFICAR LOS DATOS DE UN LIBRO //
$('form').on('submit', function(evt){
    
    evt.preventDefault()

    var titulo = $('#txt_titulo').val()
    var autor = $('#slc_autor').val()
    var tema = $('#slc_tema').val()
    var ubicacion = $('#txt_ubicacion').val()
    var existencia = $('#txt_existencia').val()

    if(titulo == ""){
        alert('ingresa un titulo');
        $('#txt_titulo').focus();
        return false;
    }
    if(autor == null){
        alert('ingresa un autor');
        $('#slc_autor').focus();
        return false;
    }
    if(tema == null){
        alert('ingresa un tema');
        $('#slc_tema').focus();
        return false;
    }
    if(ubicacion == ""){
        alert('ingresa una ubicacion');
        $('#txt_ubicacion').focus();
        return false;
    }
    if(existencia == ""){
        alert('ingresa este campo');
        $('#txt_existencia').focus();
        return false;
    }

    var id = localStorage.getItem('libro_id')

    $.ajax({
        url: '/administrador/modificar_libro/',
        type: 'post',
        typeType: 'json',
        data: {
            id: id,
            titulo: titulo,
            autor: autor,
            tema: tema,
            ubicacion: ubicacion,
            existencia: existencia,
            csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
        },
        success: function(response){
            alert('Libro modificado!')
            window.location.href = '/administrador/libros'   
        },
        error: function(err){
            alert('Se ah producido un error al modificar tu libro, intentalo mas tarde')
            console.log(err)
        }

    })
})