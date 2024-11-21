import express from 'express';
import { getAllVehicles, getVehicleById } from '../controllers/vehicleController.mjs';

const router = express.Router();

router.get('/', getAllVehicles);
router.get('/:id', getVehicleById);

export default router;
