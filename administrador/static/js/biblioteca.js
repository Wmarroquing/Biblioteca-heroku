//  FUNCION PARA BORRAR LOS DATOS DE UNA BIBLIOTECA //
function BiblioBorrar(id){
    var borrar = confirm('Estas seguro que deseas eliminar esta biblioteca? \n \n Todos los datos se perderan.')
    if(borrar == true){
        $.ajax({
            url: '/administrador/bibliotecas/',
            type: 'post',
            dataType: 'json',
            data: {
                id: id,
                csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
            },
            success: function(response){
               alert('La biblioteca ah sido borrada exitosamente!')
               window.location.href = '/administrador/bibliotecas/'
            },
            error: function(err){
                alert('Hubo un problema al eliminar la biblioteca, intentelo mas tarde.')
                console.log(err)
            }
        })
    }
}

// FUNCION PARA OBTENER LOS DATOS DE UN LIBRO //
function ObtenerBiblio(id){
    $.ajax({
        url: `/obtener_biblioteca/?id=${id}/`,
        type: 'get',
        dataType: 'json',
        data: {
            id: id,
        },
        success: function(response){ 
            localStorage.removeItem('biblio_id')
            localStorage.setItem('biblio_id', id)
            window.location.href = '/administrador/modificar_biblioteca/'
        },
        error: function(err){
            console.log(err)
        }
    })
}
