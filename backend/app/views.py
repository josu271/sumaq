from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.db import connection
from rest_framework import viewsets
from .models import Productos
from .serializers import ProductosSerializer
from .models import Artesanos
from .serializers import ArtesanosSerializer
from rest_framework.decorators import api_view



# ==========================
# 🔐 LOGIN ARTESANOS
# ==========================
@csrf_exempt  # ⚠️ solo para pruebas
def login_artesano(request):
    if request.method == "POST":
        data = json.loads(request.body)

        correo = data.get("correo")
        contra = data.get("contra")

        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT DNIArtesanos, ArtesanosNombres, ArtesanosApellidos 
                FROM artesanos 
                WHERE ArtesanosCorreo = %s AND ArtesanosContra = %s
            """, [correo, contra])
            row = cursor.fetchone()

        if row:
            return JsonResponse({
                "success": True,
                "message": "Login correcto",
                "user": {
                    "id": row[0],
                    "nombre": row[1],
                    "apellido": row[2]
                }
            })
        else:
            return JsonResponse({"success": False, "message": "Credenciales inválidas"}, status=401)

    return JsonResponse({"error": "Método no permitido"}, status=405)


# ==========================
# 📦 CRUD PRODUCTOS
# ==========================
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer  # <- aquí
    
# ==========================
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Artesanos
from .serializers import ArtesanosSerializer

@api_view(['GET', 'PUT'])
def perfil_artesano(request, dni):
    """
    GET: obtener datos del artesano
    PUT: actualizar datos del artesano
    """
    try:
        artesano = Artesanos.objects.get(DNIArtesanos=dni)
    except Artesanos.DoesNotExist:
        return Response({"error": "Artesano no encontrado"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ArtesanosSerializer(artesano)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ArtesanosSerializer(artesano, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # ==========================
# 🔑 Cambiar contraseña
# ==========================
@api_view(['POST'])
def cambiar_contrasena(request):
    correo = request.data.get("correo")
    actual = request.data.get("actual")
    nueva = request.data.get("nueva")

    try:
        artesano = Artesanos.objects.get(ArtesanosCorreo=correo)
    except Artesanos.DoesNotExist:
        return Response({"error": "Usuario no encontrado"}, status=404)

    # ⚠️ En producción deberías comparar hashes, aquí es texto plano solo de ejemplo
    if artesano.ArtesanosContra != actual:
        return Response({"error": "Contraseña actual incorrecta"}, status=400)

    artesano.ArtesanosContra = nueva  # ⚠️ En producción hashear
    artesano.save()
    return Response({"success": "Contraseña actualizada"})

