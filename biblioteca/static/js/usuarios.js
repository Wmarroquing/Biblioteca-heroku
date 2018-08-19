// FUNCION PARA OBTENER LOS DATOS DE UN USUARIO //
function ObtenerUsuario(id){

    $.ajax({
        url: `/obtener_usuario/?id=${id}/`,
        type: 'get',
        dataType: 'json',
        data: {
            id: id,
        },
        success: function(response){ 
            var usuarios = $.parseJSON(response["usuario"])

            $('#txt_nombres').val(usuarios[0].nombres + ' ' + usuarios[0].apellidos);
            $('#txt_direccion').val(usuarios[0].direccion + ' zona ' + usuarios[0].zona);
            $('#txt_telefono').val(usuarios[0].telefono);
            $('#txt_email').val(id);
            $('#txt_password').val(usuarios[0].password);
            $('#txt_confirm_password').val(usuarios[0].password);
            if(usuarios[0].genero == 'Masculino'){
                $('#rad_masculino').prop('checked', 'true')
            }else{
                $('#rad_femenino').prop('checked', 'true')
            }
            $('#txt_fecha_nac').val(usuarios[0].fecha_nac);          
            $('#txt_cui').val(usuarios[0].cui);
            $('#slc_municipio').val(usuarios[0].municipio);
            $('#slc_departamento').val(usuarios[0].municipio__departamento);
            $('#txt_institucion').val(usuarios[0].institucion);
            $('#slc_escolaridad').val(usuarios[0].escolaridad);
            const img64 = document.getElementById('img64');
            img64.src = usuarios[0].foto;
            $('#img64').prop('src');

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