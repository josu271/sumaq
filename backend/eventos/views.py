from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Evento
from .serializers import EventoSerializer
from datetime import date

@api_view(['GET'])
def listar_eventos(request):
    eventos = Evento.objects.all().order_by('fecha')
    serializer = EventoSerializer(eventos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def proximos_eventos(request):
    hoy = date.today()
    eventos = Evento.objects.filter(fecha__gte=hoy).order_by('fecha')[:5]
    serializer = EventoSerializer(eventos, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def crear_evento(request):
    serializer = EventoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def editar_evento(request, id):
    try:
        evento = Evento.objects.get(pk=id)
    except Evento.DoesNotExist:
        return Response({'error': 'Evento no encontrado'}, status=404)

    serializer = EventoSerializer(evento, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def eliminar_evento(request, id):
    try:
        evento = Evento.objects.get(pk=id)
        evento.delete()
        return Response({'mensaje': 'Evento eliminado correctamente'})
    except Evento.DoesNotExist:
        return Response({'error': 'Evento no encontrado'}, status=404)
@api_view(['GET'])
def eventos_por_artesano(request, id_artesano):
    """Lista los eventos en los que el artesano participó (según sus ventas)."""
    eventos_ids = Venta.objects.filter(artesano_id=id_artesano).values_list('evento_id', flat=True).distinct()
    eventos = Evento.objects.filter(idEventos__in=eventos_ids)
    
    data = [
        {
            "idEvento": e.idEventos,
            "nombre": e.EventosNombre,
            "fecha": e.EventosFecha,
            "ubicacion": e.EventosUbicacion,
        }
        for e in eventos
    ]
    return Response(data)
