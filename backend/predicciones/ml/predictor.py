# backend/predicciones/ml/predictor.py
import os
import numpy as np
import pandas as pd
from datetime import timedelta
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from sklearn.preprocessing import MinMaxScaler
from ventas.models import Venta
from productos.models import Producto

BASE_DIR = os.path.dirname(os.path.dirname(__file__)) 
MODEL_DIR = os.path.join(BASE_DIR, "model")
MODEL_PATH = os.path.join(MODEL_DIR, "demand_model.keras")

SCALER_PATH = os.path.join(MODEL_DIR, "scaler.npy")

from ventas.models import Venta
from productos.models import Producto

def load_artifacts():
    if not os.path.exists(MODEL_PATH):
        return None, None
    model = load_model(MODEL_PATH)
    if os.path.exists(SCALER_PATH):
        loaded = np.load(SCALER_PATH, allow_pickle=True).item()
        scaler = StandardScaler()
        scaler.mean_ = loaded["mean"]
        scaler.scale_ = loaded["scale"]
    else:
        scaler = None
    return model, scaler

def product_recent_series(producto_id, days=30):
    """
    Devuelve DataFrame con los últimos 'days' días de ventas agregadas por día para el producto.
    """
    # ✅ Campos correctos
    qs = Venta.objects.filter(producto_id=producto_id).values("fecha", "cantidad")

    rows = []
    for r in qs:
        date = r["fecha"].date() if hasattr(r["fecha"], "date") else r["fecha"]
        rows.append({"fecha": date, "cantidad": r["cantidad"]})

    df = pd.DataFrame(rows)
    if df.empty:
        return pd.DataFrame({"fecha": pd.date_range(end=pd.Timestamp.today(), periods=days), "cantidad": 0})
    
    df = df.groupby("fecha").sum().reset_index()
    df["fecha"] = pd.to_datetime(df["fecha"])
    df = df.set_index("fecha").asfreq("D", fill_value=0).reset_index()
    # tomar solo los últimos 'days'
    df = df.tail(days).reset_index(drop=True)
    return df


def predict_for_product(producto_id, dias=14, lookback=7):
    model, scaler = load_artifacts()
    df = product_recent_series(producto_id, days=max(lookback, 30))
    # prepare rolling input: last `lookback` days
    preds = []
    if model is None:
        return {"ok": False, "message": "No hay modelo entrenado."}
    series = df.copy()
    for i in range(dias):
        last_window = series["cantidad"].values[-lookback:]
        dayofweek = (series["fecha"].values[-1] + np.timedelta64(1, 'D')).astype('datetime64[D]').astype(object)
        # compute dayofweek integer
        next_date = pd.to_datetime(series["fecha"].values[-1]) + pd.Timedelta(days=1)
        dow = next_date.weekday()
        feat = np.concatenate([last_window, [dow, producto_id]])
        X = feat.reshape(1, -1).astype(float)
        if scaler is not None:
            # apply same scaling
            X = (X - scaler.mean_) / scaler.scale_
        p = model.predict(X, verbose=0)[0][0]
        if p < 0:
            p = 0.0
        next_date_str = (pd.to_datetime(series["fecha"].values[-1]) + pd.Timedelta(days=1)).strftime("%Y-%m-%d")
        preds.append({"date": next_date_str, "pred": float(p)})
        # append to series for iterative prediction
        series = pd.concat(
    [series, pd.DataFrame([{"fecha": pd.to_datetime(next_date_str), "cantidad": p}])],
    ignore_index=True
)
    # compute slope of last window to give a trend
    slope = np.polyfit(range(len(series["cantidad"].tail(lookback))), series["cantidad"].tail(lookback), 1)[0]
    trend = "estable"
    if slope > 0.01:
        trend = "sube"
    elif slope < -0.01:
        trend = "baja"
    return {"ok": True, "predictions": preds, "slope": float(slope), "trend": trend}
def predict_status():
    """
    Entrena un modelo simple para predecir la demanda de productos (ventas)
    y retorna los productos más y menos demandados.
    """
    # 1️⃣ Obtener datos desde la base de datos
    ventas = Venta.objects.select_related('producto').values(
        'producto__nombre',
        'cantidad',
        'fecha'
    )

    if not ventas.exists():
        return {"error": "No hay datos de ventas para analizar."}

    df = pd.DataFrame(ventas)

    # 2️⃣ Agrupar por producto (cantidad total vendida)
    data_grouped = df.groupby('producto__nombre')['cantidad'].sum().reset_index()
    data_grouped.rename(columns={'producto__nombre': 'producto', 'cantidad': 'total_vendido'}, inplace=True)

    # 3️⃣ Normalizar los valores
    scaler = MinMaxScaler()
    data_grouped['scaled'] = scaler.fit_transform(data_grouped[['total_vendido']])

    # 4️⃣ Preparar datos de entrenamiento
    X = np.arange(len(data_grouped)).reshape(-1, 1)
    y = data_grouped['scaled'].values

    # 5️⃣ Crear modelo simple
    model = Sequential([
        Dense(8, input_dim=1, activation='relu'),
        Dense(4, activation='relu'),
        Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer='adam', loss='mse')
    model.fit(X, y, epochs=50, verbose=0)

    # 6️⃣ Hacer predicciones
    predictions = model.predict(X).flatten()

    # 7️⃣ Asociar predicciones con productos
    data_grouped['prediccion'] = predictions

    # 8️⃣ Ordenar productos por demanda
    data_sorted = data_grouped.sort_values(by='prediccion', ascending=False)

    top_productos = data_sorted.head(3).to_dict(orient='records')
    low_productos = data_sorted.tail(3).to_dict(orient='records')

    return {
        "productos_en_tendencia": top_productos,
        "productos_con_baja_demanda": low_productos
    }
