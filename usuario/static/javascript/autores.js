//  FUNCION PARA BORRAR LOS DATOS DE UN AUTOR //
function AutorBorrar(id){
    var borrar = confirm('ADVERTENCIA \n Estas seguro que deseas eliminar este autor? \n Los libros asociados con este autor se perderan. \n')
    if(borrar == true){
        $.ajax({
            url: '/autores/',
            type: 'post',
            dataType: 'json',
            data: {
                id: id,
                csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
            },
            success: function(response){
               alert('El autor ah sido borrado exitosamente!')
               window.location.href = '/autores/'
            },
            error: function(err){
                alert('Hubo un problema al eliminar tu libro, intentelo mas tarde.')
                console.log(err)
            }
        })
    }
}

// FUNCION PARA OBTENER LOS DATOS DE UN LIBRO //
function ObtenerAutor(id){

    $.ajax({
        url: `/obtener_autor/?id=${id}/`,
        type: 'get',
        dataType: 'json',
        data: {
            id: id,
        },
        success: function(response){ 
            var autores = JSON.parse(response)
            for (const autor in autores) {
                if (autores.hasOwnProperty(autor)) {
                    const element = autores[autor];
                    $('#txt_nombres').val(element.fields.nombres)
                    $('#txt_apellidos').val(element.fields.apellidos)
                    $('#slc_nacionalidad').val(element.fields.nacionalidad)
                    if(element.fields.genero == 'Masculino'){
                        $('#rad_masculino').prop('checked', 'true')
                    }else{
                        $('#rad_femenino').prop('checked', 'true')
                    }
                    $('#txt_fecha_nac').val(element.fields.fecha_nac)
                    $('#txt_fecha_fall').val(element.fields.fecha_fall)
                }
            }
        },
        error: function(err){
            console.log(err)
        }
    })
}