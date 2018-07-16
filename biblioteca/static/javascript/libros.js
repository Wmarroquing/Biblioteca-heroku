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
            window.location.href = '/usuario/prestar_libro/'
        },
        error: function(err){
            console.log(err)
        }
    })
}



