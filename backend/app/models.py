from django.db import models

class Productos(models.Model):
    idProductos = models.AutoField(primary_key=True)
    ProductosNombre = models.CharField(max_length=45)
    ProductosDescripcion = models.CharField(max_length=45)
    ProductosCategoria = models.CharField(max_length=45)
    ProductosPrecio = models.DecimalField(max_digits=5, decimal_places=2)
    ProductosStock = models.IntegerField()

    class Meta:
        db_table = "productos"  # 👈 respeta el nombre de tu tabla MySQL

    def __str__(self):
        return self.ProductosNombre
