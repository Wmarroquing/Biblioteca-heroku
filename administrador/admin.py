from django.contrib import admin
from administrador import models

admin.site.register(models.Administrador)
admin.site.register(models.Pais)
admin.site.register(models.Departamento)
admin.site.register(models.Municipio)
admin.site.register(models.Tema)
admin.site.register(models.Autor)
admin.site.register(models.Libro)
admin.site.register(models.Biblioteca)

