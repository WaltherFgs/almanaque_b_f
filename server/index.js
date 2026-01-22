const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- ROUTES: REFRANES ---
app.get('/api/refranes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM refranes');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/refranes', async (req, res) => {
    const { texto, categoria } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO refranes (texto, categoria) VALUES (?, ?)', [texto, categoria]);
        res.json({ id: result.insertId, texto, categoria });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ROUTES: ACONTECIMIENTOS ---
app.get('/api/acontecimientos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM acontecimientos');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/acontecimientos', async (req, res) => {
    const { anio, titulo, descripcion, detalle, ubicacion } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO acontecimientos (anio, titulo, descripcion, detalle, ubicacion) VALUES (?, ?, ?, ?, ?)', [anio, titulo, descripcion, detalle, ubicacion]);
        res.json({ id: result.insertId, anio, titulo, descripcion, detalle, ubicacion });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ROUTES: ARTICULOS ---
app.get('/api/articulos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT a.*, au.nombre as autor FROM articulos a LEFT JOIN autores au ON a.autor_id = au.id');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/articulos', async (req, res) => {
    const { titulo, contenido, tipo, autor_id } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO articulos (titulo, contenido, tipo, autor_id) VALUES (?, ?, ?, ?)', [titulo, contenido, tipo, autor_id]);
        res.json({ id: result.insertId, titulo, contenido, tipo, autor_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- DELETE ROUTES ---
app.delete('/api/refranes/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM refranes WHERE id = ?', [req.params.id]);
        res.json({ message: 'Eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/acontecimientos/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM acontecimientos WHERE id = ?', [req.params.id]);
        res.json({ message: 'Eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/articulos/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM articulos WHERE id = ?', [req.params.id]);
        res.json({ message: 'Eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- UPDATE ROUTES ---
app.put('/api/refranes/:id', async (req, res) => {
    const { texto, categoria } = req.body;
    try {
        await pool.query('UPDATE refranes SET texto = ?, categoria = ? WHERE id = ?', [texto, categoria, req.params.id]);
        res.json({ message: 'Actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/acontecimientos/:id', async (req, res) => {
    const { anio, titulo, descripcion, detalle, ubicacion } = req.body;
    try {
        await pool.query('UPDATE acontecimientos SET anio = ?, titulo = ?, descripcion = ?, detalle = ?, ubicacion = ? WHERE id = ?', [anio, titulo, descripcion, detalle, ubicacion, req.params.id]);
        res.json({ message: 'Actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/articulos/:id', async (req, res) => {
    const { titulo, contenido, tipo, autor_id } = req.body;
    try {
        await pool.query('UPDATE articulos SET titulo = ?, contenido = ?, tipo = ?, autor_id = ? WHERE id = ?', [titulo, contenido, tipo, autor_id, req.params.id]);
        res.json({ message: 'Actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ROUTES: AUTORES ---
app.get('/api/autores', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM autores');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/autores', async (req, res) => {
    const { nombre, biografia, especialidad, frase_destacada } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO autores (nombre, biografia, especialidad, frase_destacada) VALUES (?, ?, ?, ?)', [nombre, biografia, especialidad, frase_destacada]);
        res.json({ id: result.insertId, nombre, biografia, especialidad, frase_destacada });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/autores/:id', async (req, res) => {
    const { nombre, biografia, especialidad, frase_destacada } = req.body;
    try {
        await pool.query('UPDATE autores SET nombre = ?, biografia = ?, especialidad = ?, frase_destacada = ? WHERE id = ?', [nombre, biografia, especialidad, frase_destacada, req.params.id]);
        res.json({ message: 'Actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/autores/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM autores WHERE id = ?', [req.params.id]);
        res.json({ message: 'Eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ROUTES: CONSEJOS ---
app.get('/api/consejos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM consejos');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/consejos', async (req, res) => {
    const { categoria, texto } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO consejos (categoria, texto) VALUES (?, ?)', [categoria, texto]);
        res.json({ id: result.insertId, categoria, texto });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/consejos/:id', async (req, res) => {
    const { categoria, texto } = req.body;
    try {
        await pool.query('UPDATE consejos SET categoria = ?, texto = ? WHERE id = ?', [categoria, texto, req.params.id]);
        res.json({ message: 'Actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/consejos/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM consejos WHERE id = ?', [req.params.id]);
        res.json({ message: 'Eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ROUTES: TAREAS ---
app.get('/api/tareas', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tareas');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/tareas', async (req, res) => {
    const { seccion, titulo, texto } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO tareas (seccion, titulo, texto) VALUES (?, ?, ?)', [seccion, titulo, texto]);
        res.json({ id: result.insertId, seccion, titulo, texto });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/tareas/:id', async (req, res) => {
    const { seccion, titulo, texto } = req.body;
    try {
        await pool.query('UPDATE tareas SET seccion = ?, titulo = ?, texto = ? WHERE id = ?', [seccion, titulo, texto, req.params.id]);
        res.json({ message: 'Actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/tareas/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM tareas WHERE id = ?', [req.params.id]);
        res.json({ message: 'Eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ROUTES: PILARES ---
app.get('/api/pilares', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM pilares ORDER BY id ASC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/pilares/:id', async (req, res) => {
    const { titulo, frase_destacada, item_1, item_2 } = req.body;
    try {
        await pool.query('UPDATE pilares SET titulo = ?, frase_destacada = ?, item_1 = ?, item_2 = ? WHERE id = ?', [titulo, frase_destacada, item_1, item_2, req.params.id]);
        res.json({ message: 'Actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ROUTES: SETTINGS ---
app.get('/api/settings', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM settings');
        const settings = {};
        rows.forEach(r => settings[r.clave] = r.valor);
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/settings', async (req, res) => {
    const { clave, valor } = req.body;
    try {
        await pool.query('INSERT INTO settings (clave, valor) VALUES (?, ?) ON DUPLICATE KEY UPDATE valor = ?', [clave, valor, valor]);
        res.json({ message: 'Guardado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor de El Faro del Siglo corriendo en http://localhost:${PORT}`);
});
