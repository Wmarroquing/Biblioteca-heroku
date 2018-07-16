// FUNCION PARA OBTENER LOS DATOS DE UN LIBRO //
function ObtenerUsuario(id){

    $.ajax({
        url: `/obtener_usuario/?id=${id}/`,
        type: 'get',
        dataType: 'json',
        data: {
            id: id,
        },
        success: function(response){ 
            var usuarios = JSON.parse(response)
            for (const usuario in usuarios) {
                if (usuarios.hasOwnProperty(usuario)) {
                    const element = usuarios[usuario];
                    $('#txt_nombres').val(element.fields.nombres);
                    $('#txt_apellidos').val(element.fields.apellidos);
                    $('#txt_direccion').val(element.fields.direccion);
                    $('#txt_telefono').val(element.fields.telefono);
                    $('#txt_email').val(localStorage.getItem('user_log'));
                    $('#txt_password').val(element.fields.password);
                    $('#txt_confirm_password').val(element.fields.password);
                    if(element.fields.genero == 'Masculino'){
                        $('#rad_masculino').prop('checked', 'true')
                    }else{
                        $('#rad_femenino').prop('checked', 'true')
                    }
                    $('#txt_fecha_nac').val(element.fields.fecha_nac);          
                    $('#txt_cui').val(element.fields.cui);
                    $('#slc_municipio').val(element.fields.municipio);
                    $('#txt_zona').val(element.fields.zona);
                    $('#txt_institucion').val(element.fields.institucion);
                    $('#slc_escolaridad').val(element.fields.escolaridad);
                    const img64 = document.getElementById('img64');
                    img64.src = element.fields.foto;
                    $('#img64').prop('src');
                }
            }
        },
        error: function(err){
            console.log(err)
        }
    })
}

//FUNCION PARA AGREGAR IMAGEN///
function ParseTo64(evt) {
    const files = evt.target.files;
    const file = files[0];

    console.log(file);
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', function(){
        const stringImg64 = this.result;
        const img64 = document.getElementById('img64');
        img64.src = stringImg64;
    });
}