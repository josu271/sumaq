from django.urls import path
from .views import obtener_artesano
from .views import dashboard_data

urlpatterns = [
    path('<int:id>/', obtener_artesano),
    path('dashboard/', dashboard_data),
]
