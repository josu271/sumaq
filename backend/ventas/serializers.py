from rest_framework import serializers
from ventas.models import Venta

class VentaSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source='producto.ProductosNombre', read_only=True)
    evento_nombre = serializers.CharField(source='evento.EventosNombre', read_only=True)

    class Meta:
        model = Venta
        fields = ['idVenta', 'fecha', 'cantidad', 'total', 'producto_nombre', 'evento_nombre', 'evento_id']
