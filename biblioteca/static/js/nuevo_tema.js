$('input[type=submit]').on('click', function(evt){

    evt.preventDefault()

    var boton = $(this).val()

    var tema = $('#txt_tema').val();

    if(tema == ""){
        $('small').removeClass('d-none')
        $('#txt_tema').focus();
        return false;
    }else{
        $('small').addClass('d-none')
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
            if(boton == 'Guardar'){
                $('#alert_message').html('<div class="alert alert-success alert-dismissible fade show" role="alert"><i class="fas fa-check-circle"></i> El tema <strong>'+tema+'</strong> se guardo correctamente.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
                window.location.href='/administrador/temas/'
            }else{
                $('#alert_message').html('<div class="alert alert-success alert-dismissible fade show" role="alert"><i class="fas fa-check-circle"></i> El tema <strong>'+tema+'</strong> se guardo correctamente.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
                $('#txt_tema').focus()
                $('#txt_tema').val('') 
            }        
        },
        error: function(err){
            $('#alert_message').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><i class="fas fa-exclamation-triangle"></i> Se produjo un error al agregar el tema, intentalo mas tarde.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
            console.log(err)
        }
    })
})

