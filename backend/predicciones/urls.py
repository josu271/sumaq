# backend/predicciones/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("prueba_conexion/", views.prueba_conexion, name="prueba_conexion"),
    path("predecir/<int:id_producto>/", views.predecir_producto, name="predecir_producto"),
    path("login_artesano/", views.login_artesano, name="login_artesano"),  # 👈 ESTA ES LA NUEVA RUTA
]
