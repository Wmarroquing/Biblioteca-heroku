//  FUNCION PARA BORRAR LOS DATOS DE UN AUTOR //
function DevolverLibro(id){

    $.ajax({
        url: '/administrador/prestamos/',
        type: 'post',
        dataType: 'json',
        data: {
            id: id,
            csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
        },
        success: function(response){
            alert('El autor ah sido devuelto!')
            window.location.href = '/administrador/prestamos/'
        },
        error: function(err){
            alert('Hubo un problema al devolver tu libro, intentelo mas tarde.')
            console.log(err)
        }
    })
}