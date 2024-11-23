import express from 'express'; 
const router = express.Router();

router.post('/login', login);  // Ruta para login

export default router;
