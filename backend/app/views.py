from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.db import connection

@csrf_exempt  # ⚠️ solo para pruebas, luego mejor usar tokens o JWT
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
