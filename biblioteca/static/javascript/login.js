$('form').on('submit', function(evt){

    evt.preventDefault();

    var email = $('#txt_email').val();
    var password = $('#txt_password').val();
    var biblioteca = $('#slc_biblioteca').val()

    if(email == ''){
        alert('Es necesario que ingreses un Email!');
        $('#txt_email').focus();
        return false;
    }  
    if(password == ''){
        alert('Ingresa tu contraseña');
        $('#txt_clave').focus();
        return false;
    } 
    $.ajax({
        url: '/usuario/login/',
        type: 'post',
        dataType: 'json',
        data: {
            email: email,
            password: password,
            csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
        },
        success: function(response){
            usuario = response.data.email
            var user_log = usuario
            localStorage.setItem('user_log', user_log)
            window.location.href = '/usuario/libros/'
        },
        error: function(err){
            alert('Email o contraseña no coinciden, intentalo nuevamente.')
            console.log (err)
        },
    })
})