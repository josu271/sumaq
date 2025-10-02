from django.urls import path, include
from rest_framework import routers
from .views import login_artesano, ProductoViewSet

router = routers.DefaultRouter()
router.register(r'models/productos', ProductoViewSet, basename="productos")  # 👈 CRUD productos

urlpatterns = [
    path("login/", login_artesano, name="login_artesano"),  # login manual
    path("", include(router.urls)),  # todas las rutas de productos
]
