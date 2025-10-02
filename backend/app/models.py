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
class Artesanos(models.Model):
    DNIArtesanos = models.CharField(max_length=20, primary_key=True)
    ArtesanosNombres = models.CharField(max_length=45)
    ArtesanosApellidos = models.CharField(max_length=45)
    ArtesanosTelefono = models.CharField(max_length=20, blank=True, null=True)
    ArtesanosCorreo = models.EmailField(max_length=100)
    ArtesanosAsociacion = models.CharField(max_length=100, blank=True, null=True)
    ArtesanosContra = models.CharField(max_length=128)

    class Meta:
        db_table = "artesanos"

    def __str__(self):
        return f"{self.ArtesanosNombres} {self.ArtesanosApellidos}"
    
class Eventos(models.Model):
    idEventos = models.AutoField(primary_key=True)
    EventosNombre = models.CharField(max_length=45)
    EventosFecha = models.DateField()
    EventosUbicacion = models.CharField(max_length=45)
    EventosDescripcion = models.CharField(max_length=45)

    class Meta:
        db_table = "eventos"

    def __str__(self):
        return f"{self.EventosNombre} - {self.EventosFecha}"
