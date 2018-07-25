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


function LibrosMostrar(){
    
    var biblio_id = $.parseJSON(localStorage.getItem('user_log'))
    var id = biblio_id[1].biblio
    $.ajax({
        url: '/usuario/libros/',
        type: 'post',
        dataType: 'json',
        data: {
            id: id,
            csrfmiddlewaretoken: $('input:hidden[name=csrfmiddlewaretoken]').val(),
        },
        success: function (response) { 
            var libros = $.parseJSON(response["libro"])
            console.log(libros)
            var tabla_libros = ""
            tabla_libros += '<table id="tbl_libros" class="table table-bordered table-hover table-sm text-center">'
            tabla_libros += '<thead class="thead-dark">'
            tabla_libros += '<tr>'
            tabla_libros += '<th scope="col">#</th>'
            tabla_libros += '<th scope="col">Libro</th>'
            tabla_libros += '<th scope="col">Autor</th>'
            tabla_libros += '<th scope="col">Tema</th>'
            tabla_libros += '<th scope="col">Ubicacion</th>'
            tabla_libros += '<th scope="col">Disp.</th>'
            tabla_libros += '<th scope="col">Operaciones</th>'
            tabla_libros += '</tr>'
            tabla_libros += '</thead>'
            tabla_libros += '<tbody>'

            $.each(libros, function(index, value){  
                tabla_libros += '<tr>';
                tabla_libros += '<td>'+(index + 1)+'</td>';
                tabla_libros += '<td>'+libros[index].titulo+'</td>';
                tabla_libros += '<td>'+libros[index].autor__nombres+'</td>';
                tabla_libros += '<td>'+libros[index].tema__tema+'</td>';
                tabla_libros += '<td>'+libros[index].ubicacion+'</td>';
                tabla_libros += '<td>'+libros[index].existencia+'</td>';
                if (libros[index].existencia > 0 ){
                tabla_libros += '<td><button class="btn btn-sm btn-outline-primary" onclick="ObtenerLibro('+libros[index].id+')">Prestar</button></td>';
                tabla_libros += '</tr>';
                }
                else{
                    tabla_libros += '<td> >:v </td>' + 
                                    '</tr>';
                }
            })
            tabla_libros += '</tbody>'
            tabla_libros += '</table>'

            $('.table-responsive-md').html(tabla_libros);
            $('#tbl_libros').DataTable();
        },  
        error: function(err){
            console.log(err)
        }
    })
}



