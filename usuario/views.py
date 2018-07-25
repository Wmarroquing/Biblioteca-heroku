from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.generic import View
from django.core import serializers
from django.utils import timezone
from administrador.models import Pais, Departamento, Municipio, Libro, Autor, Tema, Biblioteca
from usuario.models import Usuario, Escolaridad, Prestamos
from administrador.views import GetMuni, GetLibro, GetAutor, GetTema
import json

class LoginUserView(View):
    @staticmethod
    def get(request):
        biblioteca = Biblioteca.objects.all()
        return render(request, 'usuario/index.html', {'bibliotecas': biblioteca})

    @staticmethod
    def post(request):
        data = request.POST

        Usuario.objects.get(
            correo=data.get('email'),
            password=data.get('password'),
        )
        Biblioteca.objects.get(
            id=data.get('biblioteca'),
        )
        return JsonResponse({
            'data': data
        })

class RegistroUserView(View):
    @staticmethod
    def get(request):
        departamentos = Departamento.objects.all()
        escolaridades = Escolaridad.objects.all()
        return render(request, 'usuario/registro.html', {'escolaridades': escolaridades, 'deptos': departamentos})

    @staticmethod
    def post(request):
        data = request.POST

        Usuario.objects.create(
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
            zona=data.get('zona'),
            institucion=data.get('institucion'),
            escolaridad=Escolaridad.objects.get(id=data.get('escolaridad')),
            foto=data.get('foto'),
        )
        return JsonResponse({
            'data': data, 
        })

class LibroView(View):
    @staticmethod
    def get(request):
        return render(request, 'usuario/libros.html')

    @staticmethod
    def post(request):
        data = request.POST

        libro = Libro.objects.filter(
            biblioteca__id = data.get('id')
        ).values("id" ,"titulo", "autor__nombres", "tema__tema", "ubicacion", "existencia")      
        
        libro = json.dumps(list(libro), cls=serializers.json.DjangoJSONEncoder)
        return JsonResponse({
            'libro': libro
        })

class TemaView(View):
    @staticmethod
    def get(request):
        temas = Tema.objects.all()
        feha_actual = timezone.localdate
        return render(request, 'usuario/temas.html', {'temas': temas, 'fecha': feha_actual})

class AutorView(View):
    @staticmethod
    def get(request):
        autores = Autor.objects.all()
        feha_actual = timezone.localdate
        nacionalidad = Pais.objects.all()
        return render(request, 'usuario/autores.html', {'autores': autores, 'fecha': feha_actual, 'paises': nacionalidad})

class PrestamosView(View):
    @staticmethod
    def get(request):
        prestamos = Prestamos.objects.all()
        return render(request, 'usuario/prestamos.html', {'prestamos': prestamos})

class PerfilView(View):
    @staticmethod
    def get(request):
        departamentos = Departamento.objects.all()
        escolaridades = Escolaridad.objects.all()
        return render(request, 'usuario/perfil.html', {'escolaridades': escolaridades, 'deptos': departamentos})

    @staticmethod
    def post(request):
        data = request.POST

        usuario = Usuario.objects.get(correo=data.get('correo'))
        usuario.nombres = data.get('nombres')
        usuario.apellidos = data.get('apellidos')
        usuario.direccion = data.get('direccion')
        usuario.telefono = data.get('telefono')
        usuario.correo = data.get('correo')
        usuario.password = data.get('password')
        usuario.genero = data.get('genero')
        usuario.fecha_nac = data.get('fecha_nac')
        usuario.cui = data.get('cui')
        usuario.municipio = Municipio.objects.get(id=data.get('municipio'))
        usuario.zona = data.get('zona')
        usuario.institucion = data.get('institucion')
        usuario.escolaridad = Escolaridad.objects.get(id=data.get('escolaridad'))
        usuario.foto = data.get('foto')

        usuario.save()

        return JsonResponse({})

class PrestarLibroView(View):
    @staticmethod
    def get(request):
        temas = Tema.objects.all()
        autores = Autor.objects.all()
        return render(request, 'usuario/prestar_libro.html', {'temas': temas, 'autores': autores})

    @staticmethod
    def post(request):
        data = request.POST

        Prestamos.objects.create(
            libro=Libro.objects.get(titulo=data.get('libro')),
            usuario=Usuario.objects.get(correo=data.get('usuario')),
            fecha_prestamo=data.get('fecha_prestamo'),
            fecha_devolucion=data.get('fecha_devolucion'),
            token=data.get('token'),
            estado=data.get('estado'),
        )
        libro = Libro.objects.get(titulo=data.get('libro'))
        libro.existencia -= 1
        libro.save()

        return JsonResponse({
            'data': data
        })

class GetUser(View):
    @staticmethod
    def get(request):
        usuario_id = request.GET.get('id')

        usuario = Usuario.objects.filter(correo=usuario_id)
        data = serializers.serialize('json', usuario, fields=['nombres', 'apellidos', 'direccion', 'telefono', 'correo', 'password', 'genero', 'fecha_nac', 'cui', 'municipio', 'zona', 'institucion', 'escolaridad', 'foto'])

        return JsonResponse(data, safe=False)







