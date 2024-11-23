import express from 'express';
import { getAllVehicles, getVehicleById } from '../controllers/vehicleController.mjs';

const router = express.Router();


// Ruta para obtener todos los vehiculos para el catálogo
router.get('/', getAllVehicles);

//Ruta para obtener un único vehiculo por su ID.
router.get('/:id', getVehicleById);

export default router;
