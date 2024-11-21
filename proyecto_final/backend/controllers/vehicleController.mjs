import { pool } from '../config/db.mjs';

export const getAllVehicles = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM vehicles');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los vehículos' });
    }
};

export const getVehicleById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM vehicles WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Vehículo no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el vehículo' });
    }
};
