from django.db import models

class Artesano(models.Model):
    idArtesano = models.AutoField(primary_key=True)
    dni = models.CharField(max_length=15, unique=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15, null=True, blank=True)
    correo = models.EmailField(unique=True)
    contrasena = models.CharField(max_length=255)
    asociacion = models.CharField(max_length=100, null=True, blank=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"
