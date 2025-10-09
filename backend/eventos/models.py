from django.db import models

class Evento(models.Model):
    idEvento = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    fecha = models.DateField()
    ubicacion = models.CharField(max_length=150)
    descripcion = models.TextField()

    def __str__(self):
        return f"{self.nombre} - {self.fecha}"

    class Meta:
        db_table = 'eventos_evento'  # Usa la tabla existente
