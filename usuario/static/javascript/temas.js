//  FUNCION PARA BORRAR LOS DATOS DE UN TEMA //
function TemaBorrar(id){
    var borrar = confirm('ADVERTENCIA \n Estas seguro que deseas eliminar este tema? \n Todos los libros asociados con este tema se perderan. \n ')
    if(borrar == true){
        $.ajax({
            url: '/temas/',
            type: 'post',
            dataType: 'json',
            data: {
                id: id,
                csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
            },
            success: function(response){
               alert('El tema ah sido borrado exitosamente!')
               window.location.href = '/temas/'
            },
            error: function(err){
                alert('Hubo un problema al eliminar tu tema, intentelo mas tarde.')
                console.log(err)
            }
        })
    }
}

// FUNCION PARA OBTENER LOS DATOS DE UN LIBRO //
function ObtenerTema(id){

    $.ajax({
        url: `/obtener_tema/?id=${id}/`,
        type: 'get',
        dataType: 'json',
        data: {
            id: id,
        },
        success: function(response){ 
            var temas = JSON.parse(response)
            for (const tema in temas) {
                if (temas.hasOwnProperty(tema)) {
                    const element = temas[tema];
                    $('#txt_tema').val(element.fields.tema) 
                }
            }
        },
        error: function(err){
            console.log(err)
        }
    })
}