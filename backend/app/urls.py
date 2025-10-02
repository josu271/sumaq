from django.urls import path, include
from rest_framework import routers
from .views import login_artesano, ProductoViewSet
from .views import perfil_artesano

router = routers.DefaultRouter()
router.register(r'models/productos', ProductoViewSet, basename="productos")  # 👈 CRUD productos

urlpatterns = [
    path("login/", login_artesano, name="login_artesano"),
    path("perfil/<str:dni>/", perfil_artesano, name="perfil_artesano"),
    path("", include(router.urls)),

    
]
