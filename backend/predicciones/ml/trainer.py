# backend/predicciones/ml/trainer.py
import os
import numpy as np
import pandas as pd
from datetime import timedelta
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping
from django.db import transaction

# Ajusta la ruta donde guardarás el modelo
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")
MODEL_PATH = os.path.join(MODEL_DIR, "demand_model.h5")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.npy")

# Asegúrate de que Django esté configurado cuando ejecutes (manejable desde views)
from ventas.models import Venta
from productos.models import Producto

def ensure_model_dir():
    os.makedirs(MODEL_DIR, exist_ok=True)

def build_sales_dataframe():
    """
    Construye un DataFrame histórico con columnas:
    fecha (date), producto_id, ventas_cantidad
    """
    qs = Venta.objects.all().values("fecha", "cantidad", "producto_id")
    rows = []
    for r in qs:
        # normalizar fecha a date
        date = r["fecha"].date() if hasattr(r["fecha"], "date") else r["fecha"]
        rows.append({"fecha": date, "producto_id": r["producto_id"], "cantidad": r["cantidad"]})
    df = pd.DataFrame(rows)
    if df.empty:
        return df
    df = df.groupby(["producto_id", "fecha"]).sum().reset_index()
    return df

def prepare_training_data(df, lookback=7):
    """
    Para cada producto creamos series con lags (lookback días)
    Input: df con columnas producto_id, fecha, cantidad
    Output: X, y (numpy) para entrenamiento
    """
    X_all = []
    y_all = []
    for pid, g in df.groupby("producto_id"):
        g = g.sort_values("fecha").set_index("fecha").asfreq("D", fill_value=0).reset_index()
        g["dayofweek"] = g["fecha"].dt.weekday
        # create lag features
        for i in range(lookback, len(g)):
            lags = g.loc[i - lookback:i - 1, "cantidad"].values  # lookback values
            dayofweek = g.loc[i, "dayofweek"]
            X_all.append(np.concatenate([lags, [dayofweek, pid]]))  # include product id as feature (numeric)
            y_all.append(g.loc[i, "cantidad"])
    if len(X_all) == 0:
        return np.array([]), np.array([])
    X = np.array(X_all, dtype=float)
    y = np.array(y_all, dtype=float)
    return X, y

def build_model(input_dim):
    model = Sequential([
        Dense(128, activation="relu", input_shape=(input_dim,)),
        Dropout(0.2),
        Dense(64, activation="relu"),
        Dense(1, activation="linear")
    ])
    model.compile(optimizer="adam", loss="mse", metrics=["mae"])
    return model

def train_and_save(epochs=50, lookback=7):
    ensure_model_dir()
    df = build_sales_dataframe()
    if df.empty:
        return {"ok": False, "message": "No hay datos de ventas para entrenar."}
    df["fecha"] = pd.to_datetime(df["fecha"])
    X, y = prepare_training_data(df, lookback=lookback)
    if X.size == 0:
        return {"ok": False, "message": "Datos insuficientes (series muy cortas)."}
    scaler = StandardScaler()
    Xs = scaler.fit_transform(X)
    model = build_model(Xs.shape[1])
    es = EarlyStopping(patience=6, restore_best_weights=True, monitor="val_loss")
    model.fit(Xs, y, validation_split=0.15, epochs=epochs, callbacks=[es], batch_size=32, verbose=1)
    # save model and scaler
    model.save(os.path.join(MODEL_DIR, "demand_model.keras"))

    # save scaler mean and var
    np.save(SCALER_PATH, {"mean": scaler.mean_, "scale": scaler.scale_}, allow_pickle=True)
    return {"ok": True, "message": "Entrenamiento completado", "model_path": MODEL_PATH}
