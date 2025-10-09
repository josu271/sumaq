# backend/artesanos/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from django.utils.decorators import method_decorator
from django.views import View
import json

from .models import Artesano

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            correo = data.get("correo")
            contrasena = data.get("contrasena")

            if not correo or not contrasena:
                return JsonResponse({"error": "Correo y contraseña requeridos"}, status=400)

            try:
                artesano = Artesano.objects.get(correo=correo)
            except Artesano.DoesNotExist:
                return JsonResponse({"error": "Usuario no encontrado"}, status=404)

            # Si las contraseñas no están hasheadas
            if artesano.contrasena == contrasena:
                return JsonResponse({
                    "message": "Login exitoso",
                    "artesano": {
                        "id": artesano.idArtesano,
                        "nombres": artesano.nombres,
                        "correo": artesano.correo,
                        "asociacion": artesano.asociacion,
                    }
                }, status=200)

            # Si las contraseñas están hasheadas (usar esta línea si usas make_password)
            # if check_password(contrasena, artesano.contrasena):

            return JsonResponse({"error": "Contraseña incorrecta"}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
