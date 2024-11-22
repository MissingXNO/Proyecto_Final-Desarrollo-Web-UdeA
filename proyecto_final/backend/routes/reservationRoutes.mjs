import express from 'express';
import { reserveVehicle, getReservationByUser, cancelReservation } from '../controllers/reservationController.mjs';
import { getReservedVehicleIds } from '../controllers/reservationController.mjs';

const router = express.Router();

// Ruta para realizar una reserva
router.post('/', reserveVehicle);

// Ruta para obtener la reserva activa del usuario
router.get('/', getReservationByUser);

// Ruta para cancelar la reserva
router.delete('/', cancelReservation);

// Ruta para obtener la disponibilidad de los vehiculos
router.get('/vehicle-availability', getReservedVehicleIds);

export default router;
