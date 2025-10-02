from django.urls import path
from .views import login_artesano

urlpatterns = [
    path("login/", login_artesano, name="login_artesano"),
]
