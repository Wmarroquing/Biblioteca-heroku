// FUNCION PARA OBTENER LOS DATOS DE UN LIBRO //
function ObtenerBiblio(){

    var id = localStorage.getItem('biblio_id')

    $.ajax({
        url: `/obtener_biblioteca/?id=${id}/`,
        type: 'get',
        dataType: 'json',
        data: {
            id: id,
        },
        success: function(response){ 
            var bibliotecas = JSON.parse(response)
            for (const biblioteca in bibliotecas) {
                if (bibliotecas.hasOwnProperty(biblioteca)) {
                    const element = bibliotecas[biblioteca];
                    $('#txt_nombre').val(element.fields.nombre)
                    $('#txt_descripcion').val(element.fields.descripcion)
                    $('#txt_direccion').val(element.fields.ubicacion)
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
    
    var nombre = $('#txt_nombre').val()
    var descripcion = $('#txt_descripcion').val()
    var direccion = $('#txt_direccion').val()
    
    $.ajax({
        url: '/administrador/modificar_biblioteca/',
        type: 'post',
        dataType: 'json', 
        data: {
            nombre: nombre,
            descripcion: descripcion,
            direccion: direccion,
            csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
        },
        success: function(response){
            alert('Biblioteca registrada!')
            window.location.href = '/bibliotecas/'
        },
        error: function(err){
            alert('Hubo un problema al registrar tu libro, por favor intentalo mas tarde.')
            console.log(err)
        }
    })
})