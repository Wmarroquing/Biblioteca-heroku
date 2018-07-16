//  FUNCION PARA BORRAR LOS DATOS DE UN TEMA //
function TemaBorrar(id){
    var borrar = confirm('ADVERTENCIA \n Estas seguro que deseas eliminar este tema? \n Todos los libros asociados con este tema se perderan. \n ')
    if(borrar == true){
        $.ajax({
            url: '/administrador/temas/',
            type: 'post',
            dataType: 'json',
            data: {
                id: id,
                csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
            },
            success: function(response){
               alert('El tema ah sido borrado exitosamente!')
               window.location.href = '/administrador/temas/'
            },
            error: function(err){
                alert('Hubo un problema al eliminar tu tema, intentelo mas tarde.')
                console.log(err)
            }
        })
    }
}

// FUNCION PARA OBTENER LOS DATOS DE UN TEMA //
function ObtenerTema(id){
    $.ajax({
        url: `/obtener_tema/?id=${id}/`,
        type: 'get',
        dataType: 'json',
        data: {
            id: id,
        },
        success: function(response){ 
            localStorage.removeItem('tema_id')
            localStorage.setItem('tema_id', id)
            window.location.href = '/administrador/modificar_tema/'
        },
        error: function(err){
            console.log(err)
        }
    })
}