// FUNCION PARA OBTENER LOS DATOS DE UN LIBRO //
function ObtenerTema(){

    var id = localStorage.getItem('tema_id')

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

// FUNCION PARA MODIFICAR LOS DATOS DE UN LIBRO //
$('form').on('submit', function(evt){
    
    evt.preventDefault()

    var tema = $('#txt_tema').val()

    if(tema == ""){
        alert('ingresa un nombre');
        $('#txt_tema').focus();
        return false;
    }
    
    var id = localStorage.getItem('tema_id')

    $.ajax({
        url: '/administrador/modificar_tema/',
        type: 'post',
        typeType: 'json',
        data: {
            id: id,
            tema: tema,
            csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
        },
        success: function(response){
            alert('Tema modificado!')
            window.location.href = '/administrador/temas'   
        },
        error: function(err){
            alert('Se ah producido un error al modificar tu tema, intentalo mas tarde')
            console.log(err)
        }

    })
})