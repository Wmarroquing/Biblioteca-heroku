from django.shortcuts import render 
from django.http import JsonResponse, HttpResponse
from django.views.generic import View
from django.core import serializers
from django.utils import timezone
from administrador.models import Administrador, Departamento, Municipio, Pais, Autor, Tema, Libro, Biblioteca
from usuario.models import Usuario, Prestamos, Escolaridad

class LoginView(View):
    @staticmethod
    def get(request):
        return render(request, 'administrador/index.html')

    @staticmethod
    def post(request):
        data = request.POST

        Administrador.objects.get(
            correo=data.get('email'),
            password=data.get('password'),
        )
        return JsonResponse({
            'data': data
        })
 

class RegistroView(View):
    @staticmethod
    def get(request):
        dapartamentos = Departamento.objects.all()
        return render(request, 'administrador/registro.html', {'deptos': dapartamentos})

    @staticmethod
    def post(request):
        data = request.POST

        Administrador.objects.create(
            nombres=data.get('nombres'),
            apellidos=data.get('apellidos'),
            direccion=data.get('direccion'),
            telefono=data.get('telefono'),
            correo=data.get('correo'),
            password=data.get('password'),
            genero=data.get('genero'),
            fecha_nac=data.get('fecha_nac'),
            cui=data.get('cui'),
            municipio=Municipio.objects.get(id=data.get('municipio')),
        )
        return JsonResponse({
            'data': data, 
        })


def terminos (request):
    return render(request, 'administrador/terminos.html')

class LibroView(View):
    @staticmethod
    def get(request):
        libros = Libro.objects.all()
        return render(request, 'administrador/libros.html', {'libros': libros})

    @staticmethod
    def post(request):
        data = request.POST.get('id')
        identificador = Libro.objects.get(id=data)
        identificador.delete()
        response = {}
        return JsonResponse(response)

class TemaView(View):
    @staticmethod
    def get(request):
        temas = Tema.objects.all()
        return render(request, 'administrador/temas.html', {'temas': temas})

    @staticmethod
    def post(request):
        data = request.POST.get('id')
        identificador = Tema.objects.get(id=data)
        identificador.delete()
        response = {}
        return JsonResponse(response)

class AutorView(View):
    @staticmethod
    def get(request):
        autores = Autor.objects.all()
        return render(request, 'administrador/autores.html', {'autores': autores})

    @staticmethod
    def post(request):
        data = request.POST.get('id')
        identificador = Autor.objects.get(id=data)
        identificador.delete()
        response = {}
        return JsonResponse(response)

class BibliotecaView(View):
    @staticmethod
    def get(request):
        bibliotecas = Biblioteca.objects.all()
        return render(request, 'administrador/bibliotecas.html', {'bibliotecas': bibliotecas})

    @staticmethod
    def post(request):
        data = request.POST.get('id')
        identificador = Biblioteca.objects.get(id=data)
        identificador.delete()
        response = {}
        return JsonResponse(response) 

class NuevoLibroView(View):
    @staticmethod
    def get(request):
        feha_actual = timezone.localdate
        temas = Tema.objects.all()
        autores = Autor.objects.all()
        bibliotecas = Biblioteca.objects.all()
        return render(request, 'administrador/nuevo_libro.html', {'fecha': feha_actual, 'temas': temas, 'autores': autores, 'bibliotecas': bibliotecas})

    @staticmethod
    def post(request):
        data = request.POST

        Libro.objects.create(
            titulo=data.get('titulo'),
            autor=Autor.objects.get(id=data.get('autor')),
            tema=Tema.objects.get(id=data.get('tema')),
            ubicacion=data.get('ubicacion'),
            existencia=data.get('existencia'),
            biblioteca=Biblioteca.objects.get(id=data.get('biblioteca')),
        )
        return JsonResponse({
            'data': data
        })

class NuevoAutorView(View):
    @staticmethod
    def get(request):
        feha_actual = timezone.localdate
        nacionalidad = Pais.objects.all()
        return render(request, 'administrador/nuevo_autor.html', {'fecha': feha_actual, 'paises': nacionalidad})

    @staticmethod
    def post(request):
        data = request.POST

        Autor.objects.create(
            nombres=data.get('nombres'),
            apellidos=data.get('apellidos'),
            nacionalidad=Pais.objects.get(id=data.get('nacionalidad')),
            genero=data.get('genero'),
            fecha_nac=data.get('fecha_nac'),
            fecha_fall=data.get('fecha_fall'),
        )
        return JsonResponse({
            'data': data
        })

class NuevoTemaView(View):
    @staticmethod
    def get(request):
        feha_actual = timezone.localdate
        return render(request, 'administrador/nuevo_tema.html', {'fecha': feha_actual})

    @staticmethod
    def post(request):
        data = request.POST

        Tema.objects.create(
            tema=data.get('tema'),
        )
        return JsonResponse({
            'data': data
        })

class NuevaBiblioteca(View):
    @staticmethod
    def get(request):
        feha_actual = timezone.localdate
        return render(request, 'administrador/nueva_biblioteca.html', {'fecha': feha_actual})

    @staticmethod
    def post(request):
        data = request.POST

        Biblioteca.objects.create(
            nombre=data.get('nombre'),
            descripcion=data.get('descripcion'),
            ubicacion=data.get('direccion'),
        )

        return JsonResponse({
            'data': data
        })

class LibroModificar(View):
    @staticmethod
    def get(request):
        feha_actual = timezone.localdate
        temas = Tema.objects.all()
        autores = Autor.objects.all()
        return render(request, 'administrador/modificar_libro.html', {'fecha': feha_actual, 'temas': temas, 'autores': autores})

    @staticmethod
    def post(request):
        data = request.POST

        libro = Libro.objects.get(pk=int(data.get('id')))
        libro.titulo = data.get('titulo')
        libro.autor=Autor.objects.get(id=data.get('autor'))
        libro.tema=Tema.objects.get(id=data.get('tema'))
        libro.ubicacion=data.get('ubicacion')
        libro.existencia=data.get('existencia')

        libro.save()

        return JsonResponse({})

class AutorModificar(View):
    @staticmethod
    def get(request):
        feha_actual = timezone.localdate
        nacionalidad = Pais.objects.all()
        return render(request, 'administrador/modificar_autor.html', {'fecha': feha_actual, 'paises': nacionalidad})

    @staticmethod
    def post(request):
        data = request.POST

        autor = Autor.objects.get(pk=int(data.get('id')))
        autor.nombres = data.get('nombres')
        autor.apellidos = data.get('apellidos')
        autor.nacionalidad = Pais.objects.get(id=data.get('nacionalidad'))
        autor.genero = data.get('genero')
        autor.fecha_nac = data.get('fecha_nac')
        autor.fecha_fall = data.get('fecha_fall')

        autor.save()

        return JsonResponse({})

class TemaModificar(View):
    @staticmethod
    def get(request):
        feha_actual = timezone.localdate
        return render(request, 'administrador/modificar_tema.html', {'fecha': feha_actual})

    @staticmethod
    def post(request):
        data = request.POST

        temas = Tema.objects.get(pk=int(data.get('id')))
        temas.tema = data.get('tema')

        temas.save()

        return JsonResponse({})

class BibliotecaModificar(View):
    @staticmethod
    def get(request):
        feha_actual = timezone.localdate
        return render(request, 'administrador/modificar_biblioteca.html', {'fecha': feha_actual})

class GetLibro(View):
    @staticmethod
    def get(request):
        libro_id = request.GET.get('id')

        libro = Libro.objects.filter(id=libro_id)
        data = serializers.serialize('json', libro, fields=['titulo', 'autor', 'tema', 'ubicacion', 'existencia'])

        return JsonResponse(data, safe=False)

class GetAutor(View):
    @staticmethod
    def get(request):
        autor_id = request.GET.get('id')

        autor = Autor.objects.filter(id=autor_id)
        data = serializers.serialize('json', autor, fields=['nombres', 'apellidos', 'nacionalidad', 'genero', 'fecha_nac', 'fecha_fall'])

        return JsonResponse(data, safe=False)

class GetTema(View):
    @staticmethod
    def get(request):
        tema_id = request.GET.get('id')

        tema = Tema.objects.filter(id=tema_id)
        data = serializers.serialize('json', tema, fields=['tema'])

        return JsonResponse(data, safe=False)

class GetMuni(View):
    @staticmethod
    def get(request):
        depto_id = request.GET.get('id')

        municipios = Municipio.objects.filter(departamento__id=depto_id)
        data = serializers.serialize('json', municipios, fields=['municipio', 'id'])

        return JsonResponse(data, safe=False)

class GetBiblio(View):
    @staticmethod
    def get(request):
        biblio_id = request.GET.get('id')

        biblioteca = Biblioteca.objects.filter(id=biblio_id)
        data = serializers.serialize('json', biblioteca, fields=['nombre', 'descripcion', 'ubicacion', 'latitud', 'longitud'])

        return JsonResponse(data, safe=False)

class UsersView(View):
    @staticmethod
    def get(request):
        usuarios = Usuario.objects.all()
        departamentos = Departamento.objects.all()
        escolaridades = Escolaridad.objects.all()
        return render(request, 'administrador/usuarios.html', {'users': usuarios, 'escolaridades': escolaridades, 'deptos': departamentos})

class PrestamosView(View):
    @staticmethod
    def get(request):
        prestamos = Prestamos.objects.all()
        return render(request, 'administrador/prestamos.html', {'prestamos': prestamos})

    @staticmethod
    def post(request):
        data = request.POST.get('id')
        identificador = Prestamos.objects.get(id=data)
        identificador.estado = 3
        libro_id = identificador.libro.id
        libro = Libro.objects.get(id=libro_id)
        libro.existencia += 1
        libro.save()
        identificador.save() 
        response = {}
        return JsonResponse(response)

class GetUser(View):
    @staticmethod
    def get(request):
        usuario_id = request.GET.get('id')

        usuario = Usuario.objects.filter(correo=usuario_id)
        data = serializers.serialize('json', usuario, fields=['nombres', 'apellidos', 'direccion', 'telefono', 'correo', 'password', 'genero', 'fecha_nac', 'cui', 'municipio', 'zona', 'institucion', 'escolaridad', 'foto'])

        return JsonResponse(data, safe=False)
