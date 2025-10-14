from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Producto
from artesanos.models import Artesano
from django.http import JsonResponse



@api_view(['GET'])
def listar_productos(request, id_artesano):
    productos = Producto.objects.filter(artesano_id=id_artesano)
    data = [
        {
            "id": p.id,
            "nombre": p.nombre,
            "descripcion": p.descripcion,
            "categoria": p.categoria,
            "precio": p.precio,
            "stock": p.stock,
            "es_general": p.es_general,
        }
        for p in productos
    ]
    return JsonResponse(data, safe=False)

@api_view(['POST'])
def crear_producto(request):
    """Crea un nuevo producto para el artesano"""
    data = request.data
    try:
        artesano = Artesano.objects.get(idArtesano=data.get("artesano_id"))
        producto = Producto.objects.create(
            nombre=data.get("nombre"),
            descripcion=data.get("descripcion"),
            categoria=data.get("categoria"),
            precio=data.get("precio"),
            stock=data.get("stock"),
            es_general=data.get("es_general", False),
            artesano=artesano
        )
        return Response({"mensaje": "Producto creado exitosamente", "id": producto.id}, status=201)
    except Artesano.DoesNotExist:
        return Response({"error": "Artesano no encontrado"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=400)


@api_view(['PUT'])
def editar_producto(request, id_producto):
    """Edita los datos de un producto existente"""
    try:
        producto = Producto.objects.get(id=id_producto)
        data = request.data

        producto.nombre = data.get("nombre", producto.nombre)
        producto.descripcion = data.get("descripcion", producto.descripcion)
        producto.categoria = data.get("categoria", producto.categoria)
        producto.precio = data.get("precio", producto.precio)
        producto.stock = data.get("stock", producto.stock)
        producto.es_general = data.get("es_general", producto.es_general)
        producto.save()

        return Response({"mensaje": "Producto actualizado correctamente"})
    except Producto.DoesNotExist:
        return Response({"error": "Producto no encontrado"}, status=404)
@api_view(['GET'])
def productos_por_artesano(request, id_artesano):
    """Devuelve los productos registrados por un artesano."""
    try:
        artesano = Artesano.objects.get(pk=id_artesano)
    except Artesano.DoesNotExist:
        return Response({'error': 'Artesano no encontrado'}, status=404)

    productos = Producto.objects.filter(artesanos=artesano)  # si es ManyToMany
    # o usa esto si es ForeignKey:
    # productos = Producto.objects.filter(artesano_id=id_artesano)

    data = [
        {
            "idProductos": p.idProductos,
            "ProductosNombre": p.ProductosNombre,
            "ProductosDescripcion": p.ProductosDescripcion,
            "ProductosCategoria": p.ProductosCategoria,
            "ProductosPrecio": float(p.ProductosPrecio),
            "ProductosStock": p.ProductosStock,
        }
        for p in productos
    ]
    return JsonResponse(data, safe=False)