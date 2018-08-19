//  FUNCION PARA BORRAR LOS DATOS DE UN AUTOR //
function AutorBorrar(id){
    var borrar = confirm('ADVERTENCIA \n Estas seguro que deseas eliminar este autor? \n Los libros asociados con este autor se perderan. \n')
    if(borrar == true){
        $.ajax({
            url: '/administrador/autores/',
            type: 'post',
            dataType: 'json',
            data: {
                id: id,
                csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
            },
            success: function(response){
               alert('El autor ah sido borrado exitosamente!')
               window.location.href = '/administrador/autores/'
            },
            error: function(err){
                alert('Hubo un problema al eliminar tu libro, intentelo mas tarde.')
                console.log(err)
            }
        })
    }
}

// FUNCION PARA OBTENER LOS DATOS DE UN AUTOR //
function ObtenerAutor(id){
    $.ajax({
        url: `/obtener_autor/?id=${id}/`,
        type: 'get',
        dataType: 'json',
        data: {
            id: id,
        },
        success: function(response){ 
            localStorage.removeItem('autor_id')
            localStorage.setItem('autor_id', id)
            window.location.href = '/administrador/modificar_autor/'
        },
        error: function(err){
            console.log(err)
        }
    })
}