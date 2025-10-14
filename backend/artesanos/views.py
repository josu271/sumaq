# backend/artesanos/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from django.utils.decorators import method_decorator
from django.views import View
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Artesano
from productos.models import Producto
from eventos.models import Evento
from ventas.models import Venta
from django.db.models import Count
from django.db.models import Sum

import json


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request):
        data = json.loads(request.body)
        correo = data.get("correo")
        contrasena = data.get("contrasena")

        try:
            artesano = Artesano.objects.get(correo=correo)
            if artesano.contrasena == contrasena:
                return JsonResponse({"message": "Login exitoso"}, status=200)
            else:
                return JsonResponse({"error": "Contraseña incorrecta"}, status=401)
        except Artesano.DoesNotExist:
            return JsonResponse({"error": "Usuario no encontrado"}, status=404)
@api_view(['GET'])
def obtener_artesano(request, id):
    try:
        a = Artesano.objects.get(idArtesano=id)
        return Response({
            "id": a.idArtesano,
            "nombres": a.nombres,
            "apellidos": a.apellidos,
            "correo": a.correo,
            "telefono": a.telefono,
            "asociacion": a.asociacion
        })
    except Artesano.DoesNotExist:
        return Response({"error": "Artesano no encontrado"}, status=404)


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Artesano
import json

@csrf_exempt
def editar_artesano(request, idArtesano):
    try:
        artesano = Artesano.objects.get(idArtesano=idArtesano)
    except Artesano.DoesNotExist:
        return JsonResponse({'error': 'Artesano no encontrado'}, status=404)

    if request.method == 'PUT':
        data = json.loads(request.body)
        artesano.dni = data.get('dni', artesano.dni)
        artesano.nombres = data.get('nombres', artesano.nombres)
        artesano.apellidos = data.get('apellidos', artesano.apellidos)
        artesano.telefono = data.get('telefono', artesano.telefono)
        artesano.correo = data.get('correo', artesano.correo)
        artesano.asociacion = data.get('asociacion', artesano.asociacion)
        artesano.save()
        return JsonResponse({
            'idArtesano': artesano.idArtesano,
            'dni': artesano.dni,
            'nombres': artesano.nombres,
            'apellidos': artesano.apellidos,
            'telefono': artesano.telefono,
            'correo': artesano.correo,
            'asociacion': artesano.asociacion,
            'fecha_registro': artesano.fecha_registro,
        })
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)
@api_view(['GET'])
def dashboard_data(request):
    try:
        total_artesanos = Artesano.objects.count()
        total_eventos = Evento.objects.count()
        total_productos = Producto.objects.count()
        total_ventas = Venta.objects.aggregate(Sum('total'))['total__sum'] or 0
        cantidad_total = Venta.objects.aggregate(Sum('cantidad'))['cantidad__sum'] or 0

        ultimas_ventas = (
            Venta.objects.order_by('-fecha')[:5]
            .values('idVenta', 'fecha', 'total', 'cantidad')
        )

        data = {
            "total_artesanos": total_artesanos,
            "total_eventos": total_eventos,
            "total_productos": total_productos,
            "total_ventas": float(total_ventas),
            "cantidad_total": int(cantidad_total),
            "ultimas_ventas": list(ultimas_ventas),
        }
        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        # Esto permite ver el error exacto
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
