$('form').on('submit', function(evt){
    
    evt.preventDefault()

    var tema = $('#txt_tema').val();

    if(tema == ""){
        alert('ingresa un tema');
        $('#txt_tema').focus();
        return false;
    }

    $.ajax({
        url: '/administrador/nuevo_tema/',
        type: 'post',
        typeType: 'json',
        data: {
            tema: tema,
            csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
        },
        success: function(response){
            alert('Tema registrado!')
            $('#txt_tema').focus()
            $('#txt_tema').val('')    
        },
        error: function(err){
            alert('Se ah producido un error al registrar tu tema, intentalo mas tarde')
            console.log(err)
        }

    })
})