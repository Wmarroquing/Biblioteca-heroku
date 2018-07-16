$('form').on('submit', function(evt){

    evt.preventDefault();

    var email = $('#txt_email').val();
    var password = $('#txt_password').val();

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
            var user_log = response.data.email
            localStorage.setItem('user_log', user_log)
            alert('Bienvenido!')
            window.location.href = '/usuario/libros/'
        },
        error: function(err){
            alert('Email o contraseña no coinciden, intentalo nuevamente.')
        },
    })
})