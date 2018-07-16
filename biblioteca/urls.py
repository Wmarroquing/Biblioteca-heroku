"""biblioteca URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from administrador import views as admin_views
from usuario import views as user_views

urlpatterns = [

    path('', admin_views.LoginView.as_view(), name='login'),

    path('admin/', admin.site.urls),
    path('administrador/login/', admin_views.LoginView.as_view(), name='login'),
    path('administrador/registro/', admin_views.RegistroView.as_view(), name='registro'),
    path('administrador/terminos/', admin_views.terminos, name='terminos'),
    path('administrador/libros/', admin_views.LibroView.as_view(), name='libros'),
    path('administrador/modificar_libro/', admin_views.LibroModificar.as_view(), name='modificar_libro'),
    path('administrador/autores/', admin_views.AutorView.as_view(), name='autores'),
    path('administrador/modificar_autor/', admin_views.AutorModificar.as_view(), name='modificar_autor'),
    path('administrador/temas/', admin_views.TemaView.as_view(), name='temas'),
    path('administrador/modificar_tema/', admin_views.TemaModificar.as_view(), name='modificar_tema'),
    path('administrador/prestamos/', admin_views.PrestamosView.as_view(), name='prestamos'),
    path('administrador/usuarios/', admin_views.UsersView.as_view(), name='usuarios'),
    path('administrador/nuevo_libro/', admin_views.NuevoLibroView.as_view(), name='nuevo_libro'),
    path('administrador/nuevo_autor/', admin_views.NuevoAutorView.as_view(), name='nuevo_autor'),
    path('administrador/nuevo_tema/', admin_views.NuevoTemaView.as_view(), name='nuevo_tema'),
    path('obtener_muni/', admin_views.GetMuni.as_view(), name='obtener_muni'),
    path('obtener_libro/', admin_views.GetLibro.as_view(), name='obtener_libro'),
    path('obtener_autor/', admin_views.GetAutor.as_view(), name='obtener_autor'),
    path('obtener_tema/', admin_views.GetTema.as_view(), name='obtener_tema'),

    path('usuario/login/', user_views.LoginUserView.as_view(), name='user_login'),
    path('usuario/registro/', user_views.RegistroUserView.as_view(), name='user_registro'),
    path('usuario/libros/', user_views.LibroView.as_view(), name='user_libros'),
    path('usuario/autores/', user_views.AutorView.as_view(), name='user_autores'),
    path('usuario/temas/', user_views.TemaView.as_view(), name='user_temas'),
    path('usuario/prestamos/', user_views.PrestamosView.as_view(), name='user_prestamos'),
    path('usuario/perfil/', user_views.PerfilView.as_view(), name='user_perfil'),
    path('usuario/prestar_libro/', user_views.PrestarLibroView.as_view(), name='user_prestar_libro'),
    path('obtener_usuario/', user_views.GetUser.as_view(), name='obtener_usuario'),
]
