const pool = require('./db');

async function initDB() {
    try {
        console.log('Iniciando creación de tablas...');

        // Tabla Autores
        await pool.query(`
            CREATE TABLE IF NOT EXISTS autores (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                biografia TEXT,
                especialidad VARCHAR(255),
                frase_destacada TEXT
            )
        `);

        // Tabla Consejos
        await pool.query(`
            CREATE TABLE IF NOT EXISTS consejos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                categoria ENUM('hogar', 'negocios', 'relaciones') NOT NULL,
                texto TEXT NOT NULL
            )
        `);

        // Tabla Tareas
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tareas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                seccion ENUM('patria', 'horario') NOT NULL,
                titulo VARCHAR(255),
                texto TEXT NOT NULL
            )
        `);

        // Tabla Sabiduría Pilares (3 Pilares fijos, pero editables)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS pilares (
                id INT PRIMARY KEY,
                numero VARCHAR(10),
                titulo VARCHAR(255),
                frase_destacada TEXT,
                item_1 TEXT,
                item_2 TEXT
            )
        `);

        // Tabla Configuración (Clima, Hero, Tip del día)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS settings (
                clave VARCHAR(255) PRIMARY KEY,
                valor TEXT
            )
        `);

        // Tabla Artículos (Actualidad/Reflexiones)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS articulos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(255) NOT NULL,
                contenido TEXT NOT NULL,
                tipo ENUM('actualidad', 'reflexion') NOT NULL,
                autor_id INT,
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE SET NULL
            )
        `);

        // Tabla Refranes (Proverbios)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS refranes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                texto TEXT NOT NULL,
                categoria VARCHAR(255)
            )
        `);

        // Tabla Acontecimientos (Historia)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS acontecimientos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                anio VARCHAR(50),
                titulo VARCHAR(255) NOT NULL,
                descripcion TEXT NOT NULL,
                detalle TEXT,
                ubicacion VARCHAR(255)
            )
        `);

        console.log('Tablas creadas y expandidas exitosamente.');
        process.exit(0);
    } catch (err) {
        console.error('Error al inicializar la base de datos:', err);
        process.exit(1);
    }
}

initDB();
