from rest_framework.decorators import api_view
from rest_framework.response import Response
from predicciones.ml.predictor import predict_status
from productos.models import Producto
from ventas.models import Venta
from django.db.models import Sum

@api_view(['GET'])
def predecir_producto(request, id_producto):
    """Predice si un producto tiene riesgo de desabasto o sobreproducción."""
    try:
        producto = Producto.objects.get(id=id_producto)
    except Producto.DoesNotExist:
        return Response({'error': 'Producto no encontrado'}, status=404)

    ventas = Venta.objects.filter(producto=producto).aggregate(Sum('cantidad'))['cantidad__sum'] or 0
    resultado = predict_status(producto.stock, ventas)

    return Response({
        'producto': producto.nombre,
        'stock': producto.stock,
        'ventas_totales': ventas,
        'prediccion': resultado
    })
