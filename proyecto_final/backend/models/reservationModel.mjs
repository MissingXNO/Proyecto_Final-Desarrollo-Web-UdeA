import { pool } from '../config/db.mjs';

// Crear una nueva reserva
export const createReservation = async (userId, vehicleId, startDate, endDate) => {
    const query = `
        INSERT INTO reservations (user_id, vehicle_id, start_date, end_date)
        VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [userId, vehicleId, startDate, endDate];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const getReservationFromDB = async (userId) => {
    const query = `
        SELECT r.id, r.start_date, r.end_date, r.vehicle_id, v.name AS vehicle_name
        FROM reservations r
        JOIN vehicles v ON r.vehicle_id = v.id
        WHERE r.user_id = $1`;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
};



// Cancelar la reserva de un usuario
export const cancelReservationByUserId = async (userId) => {
    const query = 'DELETE FROM reservations WHERE user_id = $1 RETURNING *';
    const result = await pool.query(query, [userId]);
    return result.rows[0]; // Retornar la reserva eliminada (si existe)
};

// Verificar si un usuario ya tiene una reserva activa
export const getReservationByUserId = async (userId) => {
    const query = `
        SELECT r.id, r.start_date, r.end_date, r.vehicle_id, v.name AS vehicle_name
        FROM reservations r
        JOIN vehicles v ON r.vehicle_id = v.id
        WHERE r.user_id = $1`;
    const result = await pool.query(query, [userId]);
    return result.rows[0]; // Retornar la reserva si existe
};

// Obtener todas las reservas activas
export const getAllReservations = async () => {
    const query = 'SELECT vehicle_id FROM reservations'; // Solo extrae los vehicle_id
    const { rows } = await pool.query(query); // Usa pool.query en lugar de db.query 
    return rows;
};
