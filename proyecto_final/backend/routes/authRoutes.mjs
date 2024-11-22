import express from 'express';
import { createUser, findUserByEmail, findUserByUsername, findUserById } from '../models/userModel.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificar si el email ya está registrado
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        // Crear un nuevo usuario
        const newUser = await createUser(username, email, password);

        // Generar un token JWT para el nuevo usuario
        const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.status(201).json({
            message: 'Usuario registrado con éxito',
            token,
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => { 
    const { nickname, password } = req.body;
    try {
        const user = await findUserByUsername(nickname);  // Comparar el nickname con el correo
        if (!user) return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });

        const isMatch = await bcrypt.compare(password, user.password); // Comparar contraseña
        if (!isMatch) return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

// Función para verificar y decodificar el token JWT
export const verifyToken = (authorization) => {
    if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new Error('Token faltante o inválido');
    }

    const token = authorization.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET); // Decodifica y verifica el token
};

// Ruta para obtener los datos del usuario logueado
router.get('/me', async (req, res) => {
    const { authorization } = req.headers; // Obtener el token de la cabecera de autorización

    // Verificar si el token está presente
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token faltante o inválido.' });
    }

    try {
        // Extraer el token de la cabecera
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Decodificar el token
        const userId = decoded.id;  // Extraer el ID del usuario

        // Obtener los datos del usuario a partir del ID
        const user = await findUserById(userId);  // Asegúrate de tener este método en tu modelo
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // Devolver los datos del usuario
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los datos del usuario.' });
    }
});

export default router;
