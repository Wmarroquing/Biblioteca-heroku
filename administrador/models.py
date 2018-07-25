from django.db import models
from django.utils import timezone

class Pais(models.Model):
    pais = models.CharField(max_length=75)

    def __str__(self):
        return self.pais

class Departamento(models.Model):
    departamento = models.CharField(max_length=75)
    pais = models.ForeignKey(Pais, on_delete=models.PROTECT)

    def __str__(self):
        return self.departamento

class Municipio(models.Model):
    municipio = models.CharField(max_length=75)
    departamento = models.ForeignKey(Departamento, on_delete=models.PROTECT)

    def __str__(self):
        return self.municipio

class Administrador(models.Model):
    nombres = models.CharField(max_length=75)
    apellidos = models.CharField(max_length=75)
    direccion = models.CharField(max_length=150)
    telefono = models.CharField(max_length=8)
    correo = models.EmailField(max_length=125, primary_key=True)
    password = models.CharField(max_length=75)
    genero = models.CharField(max_length=10)
    fecha_nac = models.CharField(max_length=10)
    cui = models.CharField(max_length=13)
    municipio = models.ForeignKey(Municipio, on_delete=models.PROTECT)

    def __str__(self):
        return self.correo

class Tema(models.Model):
    tema = models.CharField(max_length=75)
    fecha_ingreso = models.DateField(default=timezone.now)

    def __str__(self):
        return self.tema

class Autor(models.Model):
    nombres = models.CharField(max_length=75)
    apellidos = models.CharField(max_length=75)
    nacionalidad = models.ForeignKey(Pais, on_delete=models.PROTECT)
    genero = models.CharField(max_length=10)
    fecha_ingreso = models.DateField(default=timezone.now)
    fecha_nac = models.CharField(max_length=10)
    fecha_fall = models.CharField(max_length=10)

    def __str__(self):
        return self.nombres + ' ' + self.apellidos

class Biblioteca(models.Model):
    nombre = models.CharField(max_length=75)
    descripcion = models.TextField()
    ubicacion = models.CharField(max_length=125)
    latitud = models.CharField(max_length=250, null=True)
    longitud = models.CharField(max_length=250, null=True)
    fecha_ingreso = models.DateField(default=timezone.now)

    def __str__(self):
        return self.nombre

class Libro(models.Model):
    titulo = models.CharField(max_length=125)
    autor = models.ForeignKey(Autor, on_delete=models.PROTECT)
    tema = models.ForeignKey(Tema, on_delete=models.PROTECT)
    ubicacion = models.CharField(max_length=150)
    existencia = models.IntegerField()
    fecha_ingreso = models.DateField(default=timezone.now)
    biblioteca = models.ForeignKey(Biblioteca, on_delete=models.PROTECT, null=True)

    def __str__(self):
        return self.titulo