from rest_framework.decorators import api_view
from rest_framework.response import Response
from ventas.models import Venta
from ventas.serializers import VentaSerializer

@api_view(['GET'])
def ventas_por_artesano(request, id_artesano):
    """Devuelve todas las ventas realizadas por un artesano específico."""
    ventas = Venta.objects.filter(artesano_id=id_artesano)
    serializer = VentaSerializer(ventas, many=True)
    return Response(serializer.data)
