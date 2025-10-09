# test_db_connection.py
from django.db import connections
from django.db.utils import OperationalError

db_conn = connections['default']
try:
    c = db_conn.cursor()
    print("✅ Conexión exitosa a la base de datos")
except OperationalError as e:
    print("❌ No se pudo conectar:", e)
