import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import vehicleRoutes from './routes/vehicleRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/auth', authRoutes);


export default app;
