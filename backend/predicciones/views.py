from rest_framework.decorators import api_view
from rest_framework.response import Response
from predicciones.ml.predictor import predict_status
from productos.models import Producto
from ventas.models import Venta
from artesanos.models import Artesano   # 👈 importa el modelo correcto
from django.db.models import Sum


@api_view(['GET'])
def prueba_conexion(request):
    """Verifica conexión entre frontend y backend."""
    return Response({"mensaje": "Backend conectado correctamente 😎"})


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