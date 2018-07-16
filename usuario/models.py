from django.db import models
from administrador.models import Pais, Departamento, Municipio, Libro, Autor, Tema

class Escolaridad(models.Model):
    escolaridad = models.CharField(max_length=75)

    def __str__(self):
        return self.escolaridad

class Usuario(models.Model):
    nombres = models.CharField(max_length=75)
    apellidos = models.CharField(max_length=75)
    direccion = models.CharField(max_length=150)
    telefono = models.CharField(max_length=8)
    correo = models.EmailField(max_length=125, primary_key=True)
    password = models.CharField(max_length=75)
    genero = models.CharField(max_length=10)
    fecha_nac = models.CharField(max_length=10)
    cui = models.CharField(max_length=13)
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE)
    zona = models.IntegerField()
    institucion = models.CharField(max_length=75)
    escolaridad = models.ForeignKey(Escolaridad, on_delete=models.CASCADE)
    foto = models.TextField()

    def __str__(self):
        return self.correo

class Prestamos(models.Model):
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha_prestamo = models.CharField(max_length=10)
    fecha_devolucion = models.CharField(max_length=10)
    token = models.CharField(max_length=20)
    estado = models.CharField(max_length=1)

    def __str__(self):
        return str(self.libro)

