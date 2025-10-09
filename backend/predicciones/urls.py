from django.urls import path
from .views import predecir_producto

urlpatterns = [
    path('producto/<int:id_producto>/', predecir_producto),
]
