from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include("app.urls")),  # 👈 redirige todo lo de la app
]
