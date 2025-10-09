from django.db import models
from artesanos.models import Artesano

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(null=True, blank=True)
    categoria = models.CharField(max_length=100, null=True, blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    es_general = models.BooleanField(default=False)
    artesano = models.ForeignKey(Artesano, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.nombre
