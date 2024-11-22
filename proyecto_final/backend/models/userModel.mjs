import { pool } from '../config/db.mjs';
import bcrypt from 'bcryptjs';

export const createUser = async (username, email, password) => {
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [username, email, hashedPassword];

    const result = await pool.query(query, values);
    return result.rows[0];  // Retorna el usuario recién creado
};

export const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];  // Retorna el usuario encontrado, si existe
};

export const findUserByUsername = async (username) => {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows[0];  // Retorna el usuario encontrado, si existe
};

export const findUserById = async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0]; // Devuelve el usuario si existe
};