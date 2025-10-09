import tensorflow as tf
import numpy as np
import pandas as pd
from django.db.models import Sum
from productos.models import Producto
from ventas.models import Venta


def get_training_data():
    """Obtiene datos de la BD para entrenar."""
    data = []

    for producto in Producto.objects.all():
        ventas_total = Venta.objects.filter(producto=producto).aggregate(total=Sum('cantidad'))['total'] or 0
        data.append({
            'stock': producto.stock,
            'ventas': ventas_total
        })

    df = pd.DataFrame(data)

    # Crear etiquetas (0=Normal, 1=Desabasto, 2=Sobreproducción)
    df['etiqueta'] = df.apply(lambda x:
        1 if x['stock'] < x['ventas'] * 0.5 else
        2 if x['stock'] > x['ventas'] * 2 else 0, axis=1)

    return df


def train_model():
    """Entrena el modelo y guarda el archivo .h5"""
    df = get_training_data()
    if df.empty:
        print("⚠️ No hay datos suficientes para entrenar.")
        return None

    X = df[['stock', 'ventas']].values
    y = df['etiqueta'].values

    # Definir modelo TensorFlow
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(16, activation='relu', input_shape=(2,)),
        tf.keras.layers.Dense(8, activation='relu'),
        tf.keras.layers.Dense(3, activation='softmax')
    ])

    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    # Entrenar el modelo
    history = model.fit(X, y, epochs=50, verbose=0, validation_split=0.2)

    # Guardar modelo
    model.save('backend/predicciones/ml/model.h5')
    print("✅ Modelo entrenado y guardado correctamente en predicciones/ml/model.h5")

    # Mostrar precisión final
    final_acc = history.history['accuracy'][-1]
    val_acc = history.history['val_accuracy'][-1]
    print(f"📊 Precisión de entrenamiento: {final_acc:.2f}")
    print(f"📈 Precisión de validación: {val_acc:.2f}")

    return final_acc, val_acc


def predict_status(stock, ventas):
    """Realiza una predicción dada una cantidad de stock y ventas."""
    model = tf.keras.models.load_model('backend/predicciones/ml/model.h5')
    X = np.array([[stock, ventas]])
    pred = model.predict(X, verbose=0)
    idx = np.argmax(pred)
    etiquetas = ['Normal', 'Desabasto', 'Sobreproducción']
    return etiquetas[idx]
