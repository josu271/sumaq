import os
import django
import MySQLdb

# 1. Decirle a Django dónde están las settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')
django.setup()

from django.conf import settings

print("🔍 Probando conexión con la base de datos...")

try:
    db = MySQLdb.connect(
        host=settings.DATABASES['default']['HOST'],
        user=settings.DATABASES['default']['USER'],
        passwd=settings.DATABASES['default']['PASSWORD'],
        db=settings.DATABASES['default']['NAME'],
        port=int(settings.DATABASES['default']['PORT'])
    )
    print("✅ Conexión exitosa a la base de datos:", settings.DATABASES['default']['NAME'])

    # Verificar tablas existentes
    cursor = db.cursor()
    cursor.execute("SHOW TABLES;")
    tables = cursor.fetchall()
    print("📋 Tablas encontradas:", tables)

    db.close()
except Exception as e:
    print("❌ Error de conexión:", e)
