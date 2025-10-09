-- 1️⃣ Crear base de datos DROP DATABASE IF EXISTS sumaq; CREATE DATABASE sumaq CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci; USE sumaq;
DROP DATABASE IF EXISTS sumaq; 
CREATE DATABASE sumaq CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci; 
USE sumaq;
-- 2️⃣ Tabla: eventos -- Representa los eventos donde los artesanos pueden participar o vender. 
CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,
    ubicacion VARCHAR(255) NOT NULL
);
CREATE TABLE artesanos ( idArtesano INT AUTO_INCREMENT PRIMARY KEY, dni VARCHAR(15) UNIQUE NOT NULL, nombres VARCHAR(100) NOT NULL, apellidos VARCHAR(100) NOT NULL, telefono VARCHAR(15), correo VARCHAR(100) UNIQUE NOT NULL, contrasena VARCHAR(255) NOT NULL, asociacion VARCHAR(100), fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP ) ENGINE=InnoDB;
-- 3️⃣ Tabla: productos -- Representa los productos que los artesanos pueden ofrecer.
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    idArtesano INT,
    FOREIGN KEY (idArtesano) REFERENCES artesanos(idArtesano)
);
CREATE TABLE ventas ( idVenta INT AUTO_INCREMENT PRIMARY KEY, fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, cantidad INT NOT NULL, total DECIMAL(10,2) NOT NULL, artesano_id INT NOT NULL, evento_id INT NOT NULL, producto_id INT NOT NULL, FOREIGN KEY (artesano_id) REFERENCES artesanos(idArtesano) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (evento_id) REFERENCES eventos(idEvento) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (producto_id) REFERENCES productos(idProducto) ON DELETE CASCADE ON UPDATE CASCADE ) ENGINE=InnoDB;

CREATE TABLE reporte_ventas ( idReporte INT AUTO_INCREMENT PRIMARY KEY, fecha_reporte DATE NOT NULL, total_ventas DECIMAL(10,2) DEFAULT 0, cantidad_total INT DEFAULT 0 ) ENGINE=InnoDB;

INSERT INTO artesanos (dni, nombres, apellidos, telefono, correo, contrasena, asociacion) VALUES ('74589632', 'Ana', 'Huamán', '987654321', 'ana@sumaq.com', '123456', 'Manos del Sol'), ('74589633', 'Luis', 'Condori', '998877665', 'luis@sumaq.com', '123456', 'Arte Andino'); INSERT INTO eventos (nombre, fecha, ubicacion, descripcion) VALUES ('Feria Artesanal Cusco', '2025-10-25', 'Plaza de Armas Cusco', 'Evento regional de artesanías'), ('Expo Arte Lima', '2025-11-10', 'Parque Kennedy - Miraflores', 'Feria de exposición nacional'); INSERT INTO productos (nombre, descripcion, categoria, precio, stock, es_general, artesano_id) VALUES ('Chullo Andino', 'Chullo de lana con diseño tradicional', 'Ropa', 45.00, 10, FALSE, 1), ('Pulsera de semillas', 'Pulsera artesanal hecha a mano', 'Accesorios', 15.00, 20, FALSE, 2), ('Taza decorativa', 'Taza cerámica decorada', 'Decoración', 30.00, 50, TRUE, NULL); INSERT INTO ventas (cantidad, total, artesano_id, evento_id, producto_id) VALUES (2, 90.00, 1, 1, 1), (3, 45.00, 2, 1, 2);