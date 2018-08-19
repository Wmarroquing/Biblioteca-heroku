//  FUNCION PARA BORRAR LOS DATOS DE UN LIBRO //
function LibroBorrar(id){
    var borrar = confirm('Estas seguro que deseas eliminar este libro? \n \n Todos los datos se perderan.')
    if(borrar == true){
        $.ajax({
            url: '/administrador/libros/',
            type: 'post',
            dataType: 'json',
            data: {
                id: id,
                csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
            },
            success: function(response){
               alert('El libro ah sido borrado exitosamente!')
               window.location.href = '/administrador/libros/'
            },
            error: function(err){
                alert('Hubo un problema al eliminar tu libro, intentelo mas tarde.')
                console.log(err)
            }
        })
    }
}

// FUNCION PARA OBTENER LOS DATOS DE UN LIBRO //
function ObtenerLibro(id){
    $.ajax({
        url: `/obtener_libro/?id=${id}/`,
        type: 'get',
        dataType: 'json',
        data: {
            id: id,
        },
        success: function(response){ 
            localStorage.removeItem('libro_id')
            localStorage.setItem('libro_id', id)
            window.location.href = '/administrador/modificar_libro/'
        },
        error: function(err){
            console.log(err)
        }
    })
}
