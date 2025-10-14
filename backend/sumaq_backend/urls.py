from django.contrib import admin
from django.urls import path, include
from predicciones.views import login_artesano, prueba_conexion
from productos.views import listar_productos, crear_producto, editar_producto, productos_por_artesano
from ventas.views import ventas_por_artesano
from eventos.views import eventos_por_artesano
from rest_framework.decorators import api_view
from rest_framework.response import Response



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', login_artesano),
    path('api/predicciones/', include('predicciones.urls')),
    path('api/prueba/', prueba_conexion, name='prueba_conexion'),
    path('api/eventos/', include('eventos.urls')),
    path("api/productos/<int:id_artesano>/", listar_productos),
    path("api/productos/crear/", crear_producto),
    path("api/productos/editar/<int:id_producto>/", editar_producto),
    path('productos/<int:id_artesano>/', productos_por_artesano),
    path('ventas/<int:id_artesano>/', ventas_por_artesano),
    path('eventos/<int:id_artesano>/', eventos_por_artesano),
    path('api/artesanos/', include('artesanos.urls')),
    
]
