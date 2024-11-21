// authController.mjs
import { login } from './authController.mjs';  // Verifica si tienes esto

// Deberías tener algo así en tu archivo de rutas para manejar el login
import express from 'express';
const router = express.Router();

router.post('/login', login);  // Ruta para login

export default router;
