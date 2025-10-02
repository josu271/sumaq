from rest_framework import serializers
from .models import Productos
from rest_framework import serializers
from .models import Artesanos
from .models import Eventos

class ProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = "__all__"
class ArtesanosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artesanos
        fields = [
            "DNIArtesanos",
            "ArtesanosNombres",
            "ArtesanosApellidos",
            "ArtesanosTelefono",
            "ArtesanosCorreo",
            "ArtesanosAsociacion",
        ]
class EventosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eventos
        fields = "__all__"