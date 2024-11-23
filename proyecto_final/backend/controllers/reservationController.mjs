import { createReservation, getReservationByUserId as getReservationFromDB, cancelReservationByUserId, getAllReservations  } from '../models/reservationModel.mjs';
import jwt from 'jsonwebtoken';

// Controlador para realizar una reserva
export const reserveVehicle = async (req, res) => {
    const { authorization } = req.headers; // Capturar el token desde el encabezado de la solicitud
    const { vehicleId, startDate, endDate } = req.body;

    // Validar si el encabezado de autorización está presente
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No autorizado. Token faltante o inválido.' });
    }

    try {
        // Extraer y verificar el token
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodificar el token
        const userId = decoded.id; // Extraer el ID del usuario del token

        // Verificar si el usuario ya tiene una reserva activa
        const existingReservation = await getReservationFromDB(userId); // Cambié el nombre aquí
        if (existingReservation) {
            return res.status(400).json({ error: 'El usuario ya tiene una reserva activa' });
        }

        // Crear una nueva reserva
        const reservation = await createReservation(userId, vehicleId, startDate, endDate);
        res.status(201).json({ message: 'Reserva creada con éxito', reservation });
    } catch (error) {
        console.error(error);

        // Manejar errores de JWT
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'No autorizado. Token inválido.' });
        }

        res.status(500).json({ error: 'Error al realizar la reserva' });
    }
};

// Controlador para cancelar una reserva
export const cancelReservation = async (req, res) => {
    const { authorization } = req.headers; // Capturar el token desde el encabezado de la solicitud

    // Validar si el encabezado de autorización está presente
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No autorizado. Token faltante o inválido.' });
    }

    try {
        // Extraer y verificar el token
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodificar el token
        const userId = decoded.id; // Extraer el ID del usuario del token

        // Cancelar la reserva del usuario
        const canceledReservation = await cancelReservationByUserId(userId);
        if (!canceledReservation) {
            return res.status(404).json({ error: 'No se encontró ninguna reserva para cancelar.' });
        }

        res.status(200).json({ message: 'Reserva cancelada con éxito', canceledReservation });
    } catch (error) {
        console.error(error);

        // Manejar errores de JWT
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'No autorizado. Token inválido.' });
        }

        res.status(500).json({ error: 'Error al cancelar la reserva' });
    }
};

export const getReservationByUser = async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No autorizado. Token faltante o inválido.' });
    }

    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Obtener la reserva activa del usuario
        const reservation = await getReservationFromDB(userId);

        if (!reservation) {
            return res.status(404).json({ error: 'No tienes ninguna reserva activa.' });
        }

        // Incluir el vehicle_id en la respuesta
        res.status(200).json({
            id: reservation.id,
            start_date: reservation.start_date,
            end_date: reservation.end_date,
            vehicle_id: reservation.vehicle_id, // Aqui ya está incluido el ID del vehículo
            vehicle_name: reservation.vehicle_name,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la reserva del usuario' });
    }
};


export const getReservedVehicleIds = async (req, res) => {
    try {
        // Consultar la base de datos y obtener todas las reservas
        const reservations = await getAllReservations(); // Obtener todas las reservas
        const reservedVehicleIds = reservations.map(r => r.vehicle_id); // Extraer los IDs de vehículos reservados

        // Verifica si reservedVehicleIds es un array
        console.log('reservedVehicleIds:', reservedVehicleIds);

        res.json(reservedVehicleIds); // Retorna el array de IDs
    } catch (error) {
        console.error('Error al obtener disponibilidad:', error);
        res.status(500).json({ error: 'Error interno al obtener disponibilidad' });
    }
};
