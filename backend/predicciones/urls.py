from django.urls import path
from . import views

urlpatterns = [
    path("prueba_conexion/", views.prueba_conexion, name="prueba_conexion"),
    path("login_artesano/", views.login_artesano, name="login_artesano"),
    path("obtener_predicciones/", views.obtener_predicciones, name="obtener_predicciones"),
    path("train/", views.train_model_view, name="train_model_view"),
    path("predict/", views.predict_view, name="predict_view"),
    path("trends/", views.trends_view, name="trends_view"),
]
