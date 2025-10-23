from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from predicciones.ml.predictor import predict_status
from productos.models import Producto
from ventas.models import Venta
from artesanos.models import Artesano   # 👈 importa el modelo correcto
from django.db.models import Sum
import numpy as np


from .ml.trainer import train_and_save
from .ml.predictor import predict_for_product, product_recent_series


@api_view(['GET'])
def prueba_conexion(request):
    """Verifica conexión entre frontend y backend."""
    return Response({"mensaje": "Backend conectado correctamente 😎"})


@api_view(["POST"])
def train_model_view(request):
    """
    POST /api/predicciones/train/
    Inicia entrenamiento (síncrono).
    """
    try:
        result = train_and_save(epochs=40, lookback=7)
        if not result.get("ok"):
            return Response({"message": result.get("message")}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": result.get("message")})
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def predict_view(request):
    producto_id = request.GET.get('producto_id')
    dias = request.GET.get('dias', 14)

    if not producto_id:
        return Response({"error": "Falta el parámetro producto_id"}, status=400)

    try:
        producto_id = int(producto_id)
        dias = int(dias)
    except ValueError:
        return Response({"error": "Parámetros inválidos"}, status=400)

    result = predict_for_product(producto_id, dias)
    return Response(result)

@api_view(["GET"])
def trends_view(request):
    """
    GET /api/predicciones/trends/
    Devuelve una lista simple de productos con tendencia y pendiente.
    """
    prods = Producto.objects.all().values("id", "nombre")[:200]  # limita
    out = []
    for p in prods:
        pid = p["id"]
        try:
            df = product_recent_series(pid, days=30)
            # pendiente simple
            slope = 0.0
            if len(df) >= 2:
                slope = float(np.polyfit(range(len(df["cantidad"])), df["cantidad"], 1)[0])
            trend = "estable"
            if slope > 0.01:
                trend = "sube"
            elif slope < -0.01:
                trend = "baja"
            out.append({"producto_id": pid, "nombre": p["nombre"], "slope": slope, "trend": trend})
        except Exception:
            out.append({"producto_id": pid, "nombre": p["nombre"], "slope": 0.0, "trend": "estable"})
    return Response(out)
@api_view(['GET'])
def obtener_predicciones(request):
    resultado = predict_status()
    return Response(resultado)


@api_view(['POST'])
def login_artesano(request):
    """Inicia sesión verificando los datos con la tabla 'artesanos'."""
    correo = request.data.get("correo")
    contrasena = request.data.get("contrasena")

    try:
        artesano = Artesano.objects.get(correo=correo)
        if artesano.contrasena == contrasena:
            return Response({
                "mensaje": "Inicio de sesión exitoso",
                "artesano": {
                    "idArtesano": artesano.idArtesano,
                    "nombres": artesano.nombres,
                    "apellidos": artesano.apellidos,
                    "correo": artesano.correo,
                    "asociacion": artesano.asociacion,
                }
            })
        else:
            return Response({"error": "Contraseña incorrecta"}, status=401)
    except Artesano.DoesNotExist:
        return Response({"error": "El correo no está registrado"}, status=404)
    