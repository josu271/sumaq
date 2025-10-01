-- Crear base de datos
CREATE DATABASE IF NOT EXISTS artesanias CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE artesanias;

-- Tabla: reporte
DROP TABLE IF EXISTS reporte;
CREATE TABLE reporte (
  idReporte INT(11) NOT NULL,
  ReporteFecha VARCHAR(45) NOT NULL,
  PRIMARY KEY (idReporte)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO reporte VALUES 
(0,'12/3/2025'),
(1,'11/4/2025');

-- Tabla: productos
DROP TABLE IF EXISTS productos;
CREATE TABLE productos (
  idProductos INT(11) NOT NULL,
  ProductosNombre VARCHAR(45) NOT NULL,
  ProductosDescripcion VARCHAR(45) NOT NULL,
  ProductosCategoria VARCHAR(45) NOT NULL,
  ProductosPrecio DECIMAL(5,2) NOT NULL,
  ProductosStock INT(11) NOT NULL,
  PRIMARY KEY (idProductos)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO productos VALUES 
(1,'Piedrecoral','Collar de piedras','Joyeria',35.00,50);

-- Tabla: artesanos
DROP TABLE IF EXISTS artesanos;
CREATE TABLE artesanos (
  DNIArtesanos INT(11) NOT NULL,
  ArtesanosNombres VARCHAR(45) NOT NULL,
  ArtesanosApellidos VARCHAR(45) NOT NULL,
  ArtesanosTelefono INT(11) NOT NULL,
  ArtesanosCorreo VARCHAR(45) NOT NULL,
  ArtesanosAsociacion VARCHAR(45) NOT NULL,
  Reporte_idReporte INT(11) NOT NULL,
  PRIMARY KEY (DNIArtesanos),
  KEY fk_Artesanos_Reporte1_idx (Reporte_idReporte),
  CONSTRAINT fk_Artesanos_Reporte1 FOREIGN KEY (Reporte_idReporte) REFERENCES reporte (idReporte)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO artesanos VALUES 
(97564832,'Julio','Ramos',987654098,'julio@gmail.com','AsocionCruzdeJesus',1);

-- Tabla: eventos
DROP TABLE IF EXISTS eventos;
CREATE TABLE eventos (
  idEventos INT(11) NOT NULL,
  EventosNombre VARCHAR(45) NOT NULL,
  EventosFecha DATE NOT NULL,
  EventosUbicacion VARCHAR(45) NOT NULL,
  EventosDescripcion VARCHAR(45) NOT NULL,
  PRIMARY KEY (idEventos)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO eventos VALUES 
(0,'RumayIedicion','2025-03-12','Chilca jr Union','Evento importante de Chilca');

-- Tabla: ventas
DROP TABLE IF EXISTS ventas;
CREATE TABLE ventas (
  idVentas INT(11) NOT NULL,
  VentasFecha DATE NOT NULL,
  VentasCantidad INT(11) NOT NULL,
  VentasTotal DECIMAL(5,2) NOT NULL,
  Artesanos_DNIArtesanos INT(11) NOT NULL,
  Eventos_idEventos INT(11) NOT NULL,
  Productos_idProductos INT(11) NOT NULL,
  PRIMARY KEY (idVentas),
  KEY fk_Ventas_Artesanos1_idx (Artesanos_DNIArtesanos),
  KEY fk_Ventas_Eventos1_idx (Eventos_idEventos),
  KEY fk_Ventas_Productos1_idx (Productos_idProductos),
  CONSTRAINT fk_Ventas_Artesanos1 FOREIGN KEY (Artesanos_DNIArtesanos) REFERENCES artesanos (DNIArtesanos)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_Ventas_Eventos1 FOREIGN KEY (Eventos_idEventos) REFERENCES eventos (idEventos)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_Ventas_Productos1 FOREIGN KEY (Productos_idProductos) REFERENCES productos (idProductos)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO ventas VALUES 
(0,'2025-02-15',10,54.00,97564832,0,1);

-- Tabla: artesanos_has_productos
DROP TABLE IF EXISTS artesanos_has_productos;
CREATE TABLE artesanos_has_productos (
  Artesanos_DNIArtesanos INT(11) NOT NULL,
  Productos_idProductos INT(11) NOT NULL,
  PRIMARY KEY (Artesanos_DNIArtesanos, Productos_idProductos),
  KEY fk_Artesanos_has_Productos_Productos1_idx (Productos_idProductos),
  KEY fk_Artesanos_has_Productos_Artesanos_idx (Artesanos_DNIArtesanos),
  CONSTRAINT fk_Artesanos_has_Productos_Artesanos FOREIGN KEY (Artesanos_DNIArtesanos) REFERENCES artesanos (DNIArtesanos)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_Artesanos_has_Productos_Productos1 FOREIGN KEY (Productos_idProductos) REFERENCES productos (idProductos)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla: predicciones
DROP TABLE IF EXISTS predicciones;
CREATE TABLE predicciones (
  idPredicciones INT(11) NOT NULL,
  PrediccionesFecha DATE NOT NULL,
  PrediccionesDemanda_Predicha INT(11) NOT NULL,
  PrediccionesConfianza DECIMAL(3,2) NOT NULL,
  Productos_idProductos INT(11) NOT NULL,
  PRIMARY KEY (idPredicciones),
  KEY fk_Predicciones_Productos1_idx (Productos_idProductos),
  CONSTRAINT fk_Predicciones_Productos1 FOREIGN KEY (Productos_idProductos) REFERENCES productos (idProductos)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
