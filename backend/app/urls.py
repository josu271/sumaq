from django.urls import path, include
from rest_framework import routers
from .views import login_artesano, ProductoViewSet, perfil_artesano
from .views import cambiar_contrasena, EventosViewSet, proximos_eventos

router = routers.DefaultRouter()
router.register(r'models/productos', ProductoViewSet, basename="productos")
router.register(r'eventos', EventosViewSet, basename="eventos")  # 👈 CRUD eventos

urlpatterns = [
    path("login/", login_artesano, name="login_artesano"),
    path("perfil/<str:dni>/", perfil_artesano, name="perfil_artesano"),
    path("cambiar-contrasena/", cambiar_contrasena, name="cambiar_contrasena"),
    path("proximos-eventos/", proximos_eventos, name="proximos_eventos"),
    path("", include(router.urls)),
]
