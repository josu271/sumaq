from django.db import models
from artesanos.models import Artesano
from eventos.models import Evento
from productos.models import Producto  # asumo que tienes un modelo Producto

class Venta(models.Model):
    idVenta = models.AutoField(primary_key=True)
    fecha = models.DateTimeField()
    cantidad = models.IntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Relaciones foráneas
    artesano = models.ForeignKey(Artesano, on_delete=models.CASCADE)
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)

    def __str__(self):
        return f"Venta #{self.idVenta} - {self.producto} ({self.cantidad})"
    
    class Meta:
        db_table = 'ventas_venta'  # asegura que use tu tabla existente
