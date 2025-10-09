from django.contrib import admin
from django.urls import path, include
from predicciones.views import login_artesano, prueba_conexion

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/prueba/', prueba_conexion, name='prueba_conexion'),
    path('api/login/', login_artesano, name='login_artesano'),
    path('api/predicciones/', include('predicciones.urls')),
]
