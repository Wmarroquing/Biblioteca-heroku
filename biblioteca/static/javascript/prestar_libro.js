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
            var fecha_prestamo = new Date()

            for (const libro in libros) {
                if (libros.hasOwnProperty(libro)) {
                    const element = libros[libro];
                    $('#txt_titulo').val(element.fields.titulo)
                    $('#slc_autor').val(element.fields.autor)
                    $('#slc_tema').val(element.fields.tema)
                    $('#txt_ubicacion').val(element.fields.ubicacion)
                    $('#txt_existencia').val(element.fields.existencia)
                    $('#txt_fecha_prestamo').val(fecha_prestamo.getDate()+'/'+(fecha_prestamo.getMonth()+1)+'/'+fecha_prestamo.getUTCFullYear())
                    $('#txt_fecha_devolucion').val((fecha_prestamo.getDate()+8)+'/'+(fecha_prestamo.getMonth()+1)+'/'+fecha_prestamo.getUTCFullYear())
                }
            }
        },
        error: function(err){
            console.log(err)
        }
    })
}


$('form').on('submit', function(evt){

    evt.preventDefault()
    
    var libro = $('#txt_titulo').val()
    var usuario = localStorage.getItem('user_log')
    var fecha_prestamo = $('#txt_fecha_prestamo').val()
    var fecha_devolucion = $('#txt_fecha_devolucion').val()
    var token = Math.random().toString(36).substr(2);
    
    $.ajax({
        url: '/usuario/prestar_libro/',
        type: 'post',
        dataType: 'json', 
        data: {
            libro: libro,
            usuario: usuario,
            fecha_prestamo: fecha_prestamo,
            fecha_devolucion: fecha_devolucion,
            token: token,
            estado: '1',
            csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
        },
        success: function(response){
            alert('Libro prestado!')
            window.location.href = '/usuario/libros/'

        },
        error: function(err){
            alert('Hubo un problema al prestar tu libro, por favor intentalo mas tarde.')
            console.log(err)
        }
    })
})
