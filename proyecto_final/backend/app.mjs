import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import vehicleRoutes from './routes/vehicleRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';
import dotenv from 'dotenv';
import reservationRoutes from './routes/reservationRoutes.mjs';
import { getReservedVehicleIds } from './controllers/reservationController.mjs';

dotenv.config();

const app = express();

//End-points

app.use(cors());
app.use(bodyParser.json());
app.use('/api/vehicle-availability', (req, res, next) => {
    if (req.path === '/') {
        return getReservedVehicleIds(req, res);
    }
    next();
});
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/users', authRoutes);



export default app;
