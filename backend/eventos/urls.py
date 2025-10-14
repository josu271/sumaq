from django.urls import path
from . import views

urlpatterns = [
    path('', views.listar_eventos),
    path('proximos/', views.proximos_eventos),
    path('crear/', views.crear_evento),
    path('editar/<int:id>/', views.editar_evento),
    path('eliminar/<int:id>/', views.eliminar_evento),
]
